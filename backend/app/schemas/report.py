from typing import List, Optional, Dict, Any
from datetime import datetime
from pydantic import BaseModel, Field

class TestItemCreateRequest(BaseModel):
    name: str
    category: str = "General"
    measured_value: Optional[float] = None
    unit: str = ""
    reference_range_min: Optional[float] = None
    reference_range_max: Optional[float] = None
    reference_range_display: str = ""
    raw_extracted_text: Optional[str] = None

class ReportCreateRequest(BaseModel):
    title: str = Field(..., example="Comprehensive Metabolic Panel")
    lab_name: Optional[str] = Field(None, example="Apex Clinical Diagnostics")
    report_date: Optional[str] = Field(None, example="2025-02-15")
    notes: Optional[str] = None
    test_items: List[TestItemCreateRequest] = Field(default_factory=list)

class EducationalContentSchema(BaseModel):
    whatItMeasures: str
    whyRangeMatters: str
    generalQuestions: List[str] = Field(default_factory=list)

class BilingualExplanationSchema(BaseModel):
    en: EducationalContentSchema
    te: EducationalContentSchema

class TestItemResponse(BaseModel):
    id: str
    report_id: str
    name: str
    telugu_name: Optional[str] = None
    category: str
    measured_value: Optional[float] = None
    unit: str = ""
    reference_range_min: Optional[float] = None
    reference_range_max: Optional[float] = None
    reference_range_display: str = ""
    status: str
    status_label_en: str
    status_label_te: str
    raw_extracted_text: Optional[str] = None
    explanation: Optional[BilingualExplanationSchema] = None

    class Config:
        from_attributes = True

class ReportSummaryResponse(BaseModel):
    id: str
    title: str
    lab_name: Optional[str] = None
    report_date: Optional[str] = None
    created_at: Optional[datetime] = None
    total_tests: int = 0
    within_range_count: int = 0
    outside_range_count: int = 0

    class Config:
        from_attributes = True

class ReportDetailResponse(BaseModel):
    id: str
    title: str
    lab_name: Optional[str] = None
    report_date: Optional[str] = None
    notes: Optional[str] = None
    created_at: Optional[datetime] = None
    total_tests: int = 0
    within_range_count: int = 0
    outside_range_count: int = 0
    test_items: List[TestItemResponse] = Field(default_factory=list)

    class Config:
        from_attributes = True
