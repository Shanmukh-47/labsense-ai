from typing import List, Optional
from pydantic import BaseModel, Field

class ParsedTestItemPreview(BaseModel):
    name: str
    category: str
    measured_value: Optional[float] = None
    unit: str = ""
    reference_range_min: Optional[float] = None
    reference_range_max: Optional[float] = None
    reference_range_display: str = ""
    needs_review: bool = False
    raw_extracted_text: Optional[str] = None

class ExtractionPreviewResponse(BaseModel):
    success: bool
    is_scanned: bool = False
    error_message: Optional[str] = None
    lab_name: Optional[str] = None
    report_title: str = "Laboratory Report"
    report_date: Optional[str] = None
    detected_tests: List[ParsedTestItemPreview] = Field(default_factory=list)
    raw_text_preview: str = ""
