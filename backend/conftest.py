import os
import sys
from pathlib import Path

# Disable C-extensions before SQLAlchemy is imported
os.environ["DISABLE_SQLALCHEMY_CEXT"] = "1"

# Add backend directory to sys.path so 'app' is importable directly
backend_dir = Path(__file__).resolve().parent
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))
