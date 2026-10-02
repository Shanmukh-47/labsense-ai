import io
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.main import app
from app.database import Base, get_db
from tests.test_pdf_extractor import create_synthetic_pdf

# Isolated in-memory SQLite database for API testing
TEST_DATABASE_URL = "sqlite:///:memory:"
engine = create_engine(
    TEST_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

@pytest.fixture(autouse=True)
def setup_test_db():
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)

@pytest.fixture
def client():
    return TestClient(app)

def test_extract_preview_endpoint_with_valid_pdf(client):
    """Verify POST /api/reports/extract-preview returns parsed preview without saving to db."""
    pdf_text = "Fasting Blood Glucose 110.0 mg/dL 70 - 99"
    pdf_bytes = create_synthetic_pdf(pdf_text)
    
    response = client.post(
        "/api/reports/extract-preview",
        files={"file": ("report.pdf", io.BytesIO(pdf_bytes), "application/pdf")}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert data["is_scanned"] is False
    assert len(data["detected_tests"]) >= 1
    assert data["detected_tests"][0]["name"] == "Fasting Blood Glucose"
    assert data["detected_tests"][0]["measured_value"] == 110.0

def test_extract_preview_with_scanned_pdf(client):
    """Verify POST /api/reports/extract-preview flags scanned PDF."""
    from pypdf import PdfWriter
    writer = PdfWriter()
    writer.add_blank_page(width=612, height=792)
    buf = io.BytesIO()
    writer.write(buf)
    
    response = client.post(
        "/api/reports/extract-preview",
        files={"file": ("scanned.pdf", io.BytesIO(buf.getvalue()), "application/pdf")}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is False
    assert data["is_scanned"] is True
    assert "scanned image or photo" in data["error_message"]

def test_create_and_fetch_report_workflow(client):
    """Verify saving a reviewed report, fetching details with educational metadata, and deletion."""
    payload = {
        "title": "Annual Wellness Panel",
        "lab_name": "City Diagnostic Center",
        "report_date": "2025-03-01",
        "notes": "Reviewed and confirmed by patient",
        "test_items": [
            {
                "name": "Fasting Blood Glucose",
                "category": "Metabolic",
                "measured_value": 115.0,
                "unit": "mg/dL",
                "reference_range_min": 70.0,
                "reference_range_max": 99.0,
                "reference_range_display": "70 - 99 mg/dL"
            },
            {
                "name": "Serum Creatinine",
                "category": "Renal",
                "measured_value": 0.88,
                "unit": "mg/dL",
                "reference_range_min": 0.70,
                "reference_range_max": 1.30,
                "reference_range_display": "0.70 - 1.30 mg/dL"
            }
        ]
    }

    # 1. Create report
    res_create = client.post("/api/reports", json=payload)
    assert res_create.status_code == 201
    created = res_create.json()
    report_id = created["id"]
    assert created["title"] == "Annual Wellness Panel"
    assert created["total_tests"] == 2
    assert created["within_range_count"] == 1  # Creatinine
    assert created["outside_range_count"] == 1  # Glucose 115.0

    # Verify educational metadata attached
    glucose_item = next(it for it in created["test_items"] if it["name"] == "Fasting Blood Glucose")
    assert glucose_item["status"] == "outside_range_high"
    assert glucose_item["explanation"] is not None
    assert "whatItMeasures" in glucose_item["explanation"]["en"]
    assert "whatItMeasures" in glucose_item["explanation"]["te"]

    # 2. List reports
    res_list = client.get("/api/reports")
    assert res_list.status_code == 200
    list_data = res_list.json()
    assert len(list_data) == 1
    assert list_data[0]["id"] == report_id

    # 3. Get detailed report by ID
    res_get = client.get(f"/api/reports/{report_id}")
    assert res_get.status_code == 200
    get_data = res_get.json()
    assert get_data["id"] == report_id
    assert len(get_data["test_items"]) == 2

def test_extract_preview_non_pdf_file_rejected(client):
    """Verify non-PDF file upload returns clear invalid file type error."""
    response = client.post(
        "/api/reports/extract-preview",
        files={"file": ("report.txt", io.BytesIO(b"Just a plain text file"), "text/plain")}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is False
    assert "Invalid file type" in data["error_message"]

def test_extract_preview_empty_file_rejected(client):
    """Verify empty 0-byte upload returns clear error."""
    response = client.post(
        "/api/reports/extract-preview",
        files={"file": ("empty.pdf", io.BytesIO(b""), "application/pdf")}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is False
    assert "empty" in data["error_message"].lower()

def test_extract_preview_unrecognized_text_returns_empty_tests(client):
    """Verify text without clinical test markers produces 0 tests instead of hallucinations."""
    unrelated_text = "Apex Hardware Store Invoice #12345. Total amount: $50.00. Thank you for your business."
    pdf_bytes = create_synthetic_pdf(unrelated_text)

    response = client.post(
        "/api/reports/extract-preview",
        files={"file": ("invoice.pdf", io.BytesIO(pdf_bytes), "application/pdf")}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert len(data["detected_tests"]) == 0

def test_extract_preview_incomplete_parameters_require_review(client):
    """Verify parameters missing numerical value or range are flagged with needs_review=True."""
    incomplete_text = """
    Central Diagnostic Laboratory
    Date: 2025-03-01
    Fasting Blood Glucose (Sample Hemolyzed - Unable to Report)
    Total Cholesterol 210 mg/dL
    """
    pdf_bytes = create_synthetic_pdf(incomplete_text)

    response = client.post(
        "/api/reports/extract-preview",
        files={"file": ("incomplete.pdf", io.BytesIO(pdf_bytes), "application/pdf")}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True

    glucose = next((t for t in data["detected_tests"] if t["name"] == "Fasting Blood Glucose"), None)
    if glucose:
        assert glucose["needs_review"] is True
        assert glucose["measured_value"] is None

def test_duplicate_report_uploads_remain_independent(client):
    """Verify uploading and saving the same PDF/payload twice creates distinct independent records."""
    payload = {
        "title": "Duplicate Test Report",
        "lab_name": "Test Lab",
        "report_date": "2025-03-01",
        "test_items": [
            {
                "name": "Serum Creatinine",
                "category": "Renal",
                "measured_value": 1.0,
                "unit": "mg/dL",
                "reference_range_min": 0.7,
                "reference_range_max": 1.3,
                "reference_range_display": "0.7 - 1.3 mg/dL"
            }
        ]
    }

    res1 = client.post("/api/reports", json=payload)
    res2 = client.post("/api/reports", json=payload)

    assert res1.status_code == 201
    assert res2.status_code == 201
    id1 = res1.json()["id"]
    id2 = res2.json()["id"]

    assert id1 != id2

    list_res = client.get("/api/reports")
    assert len(list_res.json()) == 2

    # Delete first, second remains
    client.delete(f"/api/reports/{id1}")
    list_after = client.get("/api/reports")
    assert len(list_after.json()) == 1
    assert list_after.json()[0]["id"] == id2

def test_get_nonexistent_report_returns_404(client):
    """Verify querying or deleting nonexistent report returns 404."""
    res_get = client.get("/api/reports/nonexistent-uuid-12345")
    assert res_get.status_code == 404

    res_del = client.delete("/api/reports/nonexistent-uuid-12345")
    assert res_del.status_code == 404

