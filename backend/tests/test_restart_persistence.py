import tempfile
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.database import Base
from app.models.report import Report
from app.models.test_item import TestItem

def test_sqlite_restart_persistence():
    """Verify that reports saved to SQLite file persist and can be queried across backend restarts."""
    with tempfile.NamedTemporaryFile(suffix=".db", delete=False) as tmp:
        db_file_path = tmp.name

    try:
        db_url = f"sqlite:///{db_file_path}"
        
        # 1. First Backend Session: Initialize database and write report
        engine1 = create_engine(db_url, connect_args={"check_same_thread": False})
        Base.metadata.create_all(bind=engine1)
        Session1 = sessionmaker(autocommit=False, autoflush=False, bind=engine1)
        session1 = Session1()

        report = Report(
            title="Pre-Restart Persistent Report",
            lab_name="Persistent Labs Inc.",
            report_date="2025-04-10",
            notes="Should persist across restarts"
        )
        session1.add(report)
        session1.flush()

        item = TestItem(
            report_id=report.id,
            name="Hemoglobin A1c (HbA1c)",
            category="Metabolic",
            measured_value=5.6,
            unit="%",
            reference_range_min=4.0,
            reference_range_max=5.7,
            reference_range_display="< 5.7 %",
            status="within_range"
        )
        session1.add(item)
        session1.commit()
        report_id = report.id
        session1.close()
        engine1.dispose()  # Simulate backend shutdown

        # 2. Second Backend Session: Instantiate brand new engine on same file
        engine2 = create_engine(db_url, connect_args={"check_same_thread": False})
        Session2 = sessionmaker(autocommit=False, autoflush=False, bind=engine2)
        session2 = Session2()

        # Query back saved record
        persisted_report = session2.query(Report).filter(Report.id == report_id).first()
        assert persisted_report is not None
        assert persisted_report.title == "Pre-Restart Persistent Report"
        assert persisted_report.lab_name == "Persistent Labs Inc."
        assert len(persisted_report.test_items) == 1
        assert persisted_report.test_items[0].name == "Hemoglobin A1c (HbA1c)"
        assert persisted_report.test_items[0].measured_value == 5.6
        assert persisted_report.test_items[0].status == "within_range"

        session2.close()
        engine2.dispose()

    finally:
        if os.path.exists(db_file_path):
            os.remove(db_file_path)
