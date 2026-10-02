import uuid
from sqlalchemy import Column, String, Float, ForeignKey, Text
from sqlalchemy.orm import relationship
from app.database import Base

class TestItem(Base):
    """
    Extracted Clinical Test Item model.
    Stores numerical values, units, reference range thresholds, 
    and calculated range status.
    """
    __tablename__ = "test_items"
    __test__ = False  # Prevents pytest from discovering model as a test class

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    report_id = Column(String(36), ForeignKey("reports.id", ondelete="CASCADE"), nullable=False)
    
    name = Column(String(255), nullable=False)
    category = Column(String(100), nullable=False, default="General")
    measured_value = Column(Float, nullable=True)
    unit = Column(String(50), nullable=True)
    
    reference_range_min = Column(Float, nullable=True)
    reference_range_max = Column(Float, nullable=True)
    reference_range_display = Column(String(100), nullable=True)
    
    # Status: 'within_range', 'outside_range_high', 'outside_range_low', 'unknown'
    status = Column(String(50), nullable=False, default="unknown")
    raw_extracted_text = Column(Text, nullable=True)

    # Relationship back to parent report
    report = relationship("Report", back_populates="test_items")

    def __repr__(self) -> str:
        return f"<TestItem(name='{self.name}', value={self.measured_value} {self.unit}, status='{self.status}')>"
