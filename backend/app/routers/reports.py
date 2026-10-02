from typing import List
from fastapi import APIRouter, Depends, UploadFile, File, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.report import Report
from app.models.test_item import TestItem
from app.schemas.extraction import ExtractionPreviewResponse
from app.schemas.report import (
    ReportCreateRequest,
    ReportSummaryResponse,
    ReportDetailResponse,
    TestItemResponse,
    BilingualExplanationSchema,
    EducationalContentSchema,
)
from app.services.pdf_extractor import validate_and_extract_pdf_text, PDFExtractionError
from app.services.parser import parse_clinical_report_text
from app.services.analyzer import evaluate_reference_range_status
from app.services.educational import get_educational_metadata

router = APIRouter(prefix="/api/reports", tags=["Reports"])

def build_status_labels(status: str) -> tuple[str, str]:
    """Generates human-readable neutral status labels in English and Telugu."""
    if status == "within_range":
        return ("Within range", "సాధారణ పరిధిలో ఉంది")
    elif status == "outside_range_high":
        return ("Outside stated range (Higher)", "సూచించిన పరిధి కంటే ఎక్కువ")
    elif status == "outside_range_low":
        return ("Outside stated range (Lower)", "సూచించిన పరిధి కంటే తక్కువ")
    return ("Range status not established", "పరిధి నిర్ధారించబడలేదు")

@router.post(
    "/extract-preview",
    response_model=ExtractionPreviewResponse,
    summary="Upload and Extract PDF Preview for User Review",
    description="Extracts raw text and clinical parameters from a text-based laboratory PDF for review before saving."
)
async def extract_pdf_preview(file: UploadFile = File(...)) -> ExtractionPreviewResponse:
    """Accepts PDF upload, extracts text, and returns structured preview for user review."""
    # Validate extension
    if not file.filename or not file.filename.lower().endswith(".pdf"):
        return ExtractionPreviewResponse(
            success=False,
            error_message="Invalid file type. Please upload a PDF document (.pdf)."
        )

    try:
        file_bytes = await file.read()
        raw_text, is_scanned, scan_error = validate_and_extract_pdf_text(file_bytes)

        if is_scanned:
            return ExtractionPreviewResponse(
                success=False,
                is_scanned=True,
                error_message=scan_error or "No readable text found in PDF."
            )

        # Parse text deterministically
        parsed = parse_clinical_report_text(raw_text)

        return ExtractionPreviewResponse(
            success=True,
            is_scanned=False,
            lab_name=parsed["lab_name"],
            report_title=parsed["report_title"],
            report_date=parsed["report_date"],
            detected_tests=parsed["detected_tests"],
            raw_text_preview=parsed["raw_text_preview"]
        )

    except PDFExtractionError as pe:
        return ExtractionPreviewResponse(
            success=False,
            error_message=str(pe)
        )
    except Exception as exc:
        return ExtractionPreviewResponse(
            success=False,
            error_message=f"An unexpected error occurred while reading the PDF: {str(exc)}"
        )

@router.post(
    "",
    response_model=ReportDetailResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Save Confirmed Report and Test Parameters",
    description="Saves user-reviewed report and test parameters to the SQLite database and evaluates range statuses."
)
def create_report(
    payload: ReportCreateRequest,
    db: Session = Depends(get_db)
) -> ReportDetailResponse:
    """Persists a user-reviewed clinical report to the database."""
    # Create parent report
    report = Report(
        title=payload.title,
        lab_name=payload.lab_name or "Diagnostic Laboratory",
        report_date=payload.report_date or "Current Draw",
        notes=payload.notes
    )
    db.add(report)
    db.flush()  # Generate report.id

    within_count = 0
    outside_count = 0
    saved_items_response = []

    for item_data in payload.test_items:
        # Deterministically evaluate range status
        item_status = evaluate_reference_range_status(
            measured_value=item_data.measured_value,
            ref_min=item_data.reference_range_min,
            ref_max=item_data.reference_range_max
        )

        if item_status == "within_range":
            within_count += 1
        elif "outside" in item_status:
            outside_count += 1

        db_item = TestItem(
            report_id=report.id,
            name=item_data.name,
            category=item_data.category or "General",
            measured_value=item_data.measured_value,
            unit=item_data.unit,
            reference_range_min=item_data.reference_range_min,
            reference_range_max=item_data.reference_range_max,
            reference_range_display=item_data.reference_range_display,
            status=item_status,
            raw_extracted_text=item_data.raw_extracted_text
        )
        db.add(db_item)
        db.flush()

        # Attach educational metadata
        edu_meta = get_educational_metadata(db_item.name)
        telugu_name = edu_meta["telugu_name"] if edu_meta else None
        bilingual_explanation = None
        if edu_meta:
            bilingual_explanation = BilingualExplanationSchema(
                en=EducationalContentSchema(**edu_meta["explanation"]["en"]),
                te=EducationalContentSchema(**edu_meta["explanation"]["te"])
            )

        label_en, label_te = build_status_labels(item_status)

        saved_items_response.append(TestItemResponse(
            id=db_item.id,
            report_id=db_item.report_id,
            name=db_item.name,
            telugu_name=telugu_name,
            category=db_item.category,
            measured_value=db_item.measured_value,
            unit=db_item.unit or "",
            reference_range_min=db_item.reference_range_min,
            reference_range_max=db_item.reference_range_max,
            reference_range_display=db_item.reference_range_display or "",
            status=db_item.status,
            status_label_en=label_en,
            status_label_te=label_te,
            raw_extracted_text=db_item.raw_extracted_text,
            explanation=bilingual_explanation
        ))

    db.commit()
    db.refresh(report)

    return ReportDetailResponse(
        id=report.id,
        title=report.title,
        lab_name=report.lab_name,
        report_date=report.report_date,
        notes=report.notes,
        created_at=report.created_at,
        total_tests=len(saved_items_response),
        within_range_count=within_count,
        outside_range_count=outside_count,
        test_items=saved_items_response
    )

@router.get(
    "",
    response_model=List[ReportSummaryResponse],
    summary="List All Saved Reports",
    description="Returns a list of all laboratory reports saved in the SQLite database."
)
def list_reports(db: Session = Depends(get_db)) -> List[ReportSummaryResponse]:
    """Lists saved laboratory reports."""
    reports = db.query(Report).order_by(Report.created_at.desc()).all()
    summaries = []

    for r in reports:
        total = len(r.test_items)
        within_c = sum(1 for item in r.test_items if item.status == "within_range")
        outside_c = sum(1 for item in r.test_items if "outside" in item.status)

        summaries.append(ReportSummaryResponse(
            id=r.id,
            title=r.title,
            lab_name=r.lab_name,
            report_date=r.report_date,
            created_at=r.created_at,
            total_tests=total,
            within_range_count=within_c,
            outside_range_count=outside_c
        ))

    return summaries

@router.get(
    "/{report_id}",
    response_model=ReportDetailResponse,
    summary="Get Detailed Report with Parameters and Educational Metadata",
    description="Fetches a single report by ID along with its extracted tests and bilingual explanations."
)
def get_report(report_id: str, db: Session = Depends(get_db)) -> ReportDetailResponse:
    """Retrieves a single report by UUID."""
    report = db.query(Report).filter(Report.id == report_id).first()
    if not report:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Report with ID '{report_id}' not found."
        )

    items_response = []
    within_count = 0
    outside_count = 0

    for item in report.test_items:
        if item.status == "within_range":
            within_count += 1
        elif "outside" in item.status:
            outside_count += 1

        edu_meta = get_educational_metadata(item.name)
        telugu_name = edu_meta["telugu_name"] if edu_meta else None
        bilingual_explanation = None
        if edu_meta:
            bilingual_explanation = BilingualExplanationSchema(
                en=EducationalContentSchema(**edu_meta["explanation"]["en"]),
                te=EducationalContentSchema(**edu_meta["explanation"]["te"])
            )

        label_en, label_te = build_status_labels(item.status)

        items_response.append(TestItemResponse(
            id=item.id,
            report_id=item.report_id,
            name=item.name,
            telugu_name=telugu_name,
            category=item.category,
            measured_value=item.measured_value,
            unit=item.unit or "",
            reference_range_min=item.reference_range_min,
            reference_range_max=item.reference_range_max,
            reference_range_display=item.reference_range_display or "",
            status=item.status,
            status_label_en=label_en,
            status_label_te=label_te,
            raw_extracted_text=item.raw_extracted_text,
            explanation=bilingual_explanation
        ))

    return ReportDetailResponse(
        id=report.id,
        title=report.title,
        lab_name=report.lab_name,
        report_date=report.report_date,
        notes=report.notes,
        created_at=report.created_at,
        total_tests=len(items_response),
        within_range_count=within_count,
        outside_range_count=outside_count,
        test_items=items_response
    )

@router.delete(
    "/{report_id}",
    status_code=status.HTTP_200_OK,
    summary="Delete Report",
    description="Permanently deletes a report and all its associated test parameters from the database."
)
def delete_report(report_id: str, db: Session = Depends(get_db)):
    """Deletes a report by UUID."""
    report = db.query(Report).filter(Report.id == report_id).first()
    if not report:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Report with ID '{report_id}' not found."
        )

    db.delete(report)
    db.commit()
    return {"message": "Report successfully deleted.", "deleted_id": report_id}
