import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, DateTime, Text
from sqlalchemy.orm import relationship
from app.database import Base

class Report(Base):
    """
    Laboratory Report model.
    Note: Privacy-compliant by design — strictly stores no patient names, 
    birth dates, phone numbers, or personal identifying information (PII).
    """
    __tablename__ = "reports"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String(255), nullable=False, default="Laboratory Report")
    lab_name = Column(String(255), nullable=True, default="Diagnostic Laboratory")
    report_date = Column(String(50), nullable=True)
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    # Relationship to extracted test parameters
    test_items = relationship("TestItem", back_populates="report", cascade="all, delete-orphan")

    def __repr__(self) -> str:
        return f"<Report(id='{self.id}', title='{self.title}', date='{self.report_date}')>"
