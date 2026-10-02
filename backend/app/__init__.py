import os
# Disable SQLAlchemy C/Cython extensions to ensure pure-Python portability across Windows App Control environments
os.environ["DISABLE_SQLALCHEMY_CEXT"] = "1"

"""LabSense AI Backend Package"""
__version__ = "0.1.0"
