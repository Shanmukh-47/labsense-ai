import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.database import Base
from app.models.report import Report
from app.models.test_item import TestItem

# Use an in-memory SQLite database for test isolation
TEST_DATABASE_URL = "sqlite:///:memory:"
engine = create_engine(TEST_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@pytest.fixture(scope="function")
def db_session():
    """Create a fresh isolated in-memory database schema for each test."""
    Base.metadata.create_all(bind=engine)
    session = TestingSessionLocal()
    try:
        yield session
    finally:
        session.close()
        Base.metadata.drop_all(bind=engine)

def test_create_and_query_report(db_session):
    """Verify that a report without patient PII can be inserted and queried."""
    new_report = Report(
        title="Comprehensive Metabolic Panel",
        lab_name="Diagnostic Healthcare Lab (Demo)",
        report_date="2025-01-15",
        notes="Synthetic test fixture without identifying patient information"
    )
    db_session.add(new_report)
    db_session.commit()
    db_session.refresh(new_report)

    assert new_report.id is not None
    assert len(new_report.id) == 36  # UUID format

    # Query back
    saved = db_session.query(Report).filter(Report.id == new_report.id).first()
    assert saved is not None
    assert saved.title == "Comprehensive Metabolic Panel"
    assert saved.lab_name == "Diagnostic Healthcare Lab (Demo)"

def test_report_test_item_relationship_and_cascade(db_session):
    """Verify that test items relate to report and cascade delete properly."""
    report = Report(
        title="Lipid Panel",
        lab_name="Apex Clinical Lab",
        report_date="2025-02-01"
    )
    db_session.add(report)
    db_session.commit()

    # Add test items to report
    item1 = TestItem(
        report_id=report.id,
        name="Total Cholesterol",
        category="Lipid",
        measured_value=218.0,
        unit="mg/dL",
        reference_range_min=125.0,
        reference_range_max=200.0,
        reference_range_display="< 200 mg/dL",
        status="outside_range_high"
    )
    item2 = TestItem(
        report_id=report.id,
        name="HDL Cholesterol",
        category="Lipid",
        measured_value=48.0,
        unit="mg/dL",
        reference_range_min=40.0,
        reference_range_max=60.0,
        reference_range_display="> 40 mg/dL",
        status="within_range"
    )
    db_session.add_all([item1, item2])
    db_session.commit()

    # Verify relationship query
    fetched_report = db_session.query(Report).filter(Report.id == report.id).first()
    assert len(fetched_report.test_items) == 2
    assert fetched_report.test_items[0].measured_value == 218.0
    assert fetched_report.test_items[1].status == "within_range"

    # Verify Cascade Delete
    db_session.delete(fetched_report)
    db_session.commit()

    remaining_items = db_session.query(TestItem).filter(TestItem.report_id == report.id).all()
    assert len(remaining_items) == 0
