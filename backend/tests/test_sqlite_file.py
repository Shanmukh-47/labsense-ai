import sqlite3
from pathlib import Path
from app.config import BASE_DIR

def test_sqlite_db_file_exists_and_has_schema():
    """Verify that backend/data/labsense.db exists and contains created tables."""
    db_path = BASE_DIR / "data" / "labsense.db"
    assert db_path.exists(), f"Database file not found at {db_path}"
    assert db_path.stat().st_size > 0, "Database file is empty"

    conn = sqlite3.connect(str(db_path))
    cursor = conn.cursor()
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = [row[0] for row in cursor.fetchall()]
    conn.close()

    assert "reports" in tables, f"Expected 'reports' table in {tables}"
    assert "test_items" in tables, f"Expected 'test_items' table in {tables}"
