from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.database import get_db
from app.config import settings
from app.schemas.health import HealthResponse

router = APIRouter(prefix="/api", tags=["Health"])

@router.get(
    "/health",
    response_model=HealthResponse,
    summary="System Health & Database Connectivity Check",
    description="Verifies backend service status and verifies active SQLite database connectivity."
)
def check_health(db: Session = Depends(get_db)) -> HealthResponse:
    """Check backend and database health status."""
    try:
        # Execute lightweight database connectivity query
        db.execute(text("SELECT 1"))
        db_status = "connected"
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=f"Database connectivity failure: {str(exc)}"
        )

    return HealthResponse(
        status="healthy",
        app=settings.APP_NAME,
        version=settings.APP_VERSION,
        database=db_status,
        environment=settings.ENVIRONMENT
    )
