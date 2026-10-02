from pydantic import BaseModel, Field

class HealthResponse(BaseModel):
    """Health check response schema."""
    status: str = Field(..., json_schema_extra={"example": "healthy"})
    app: str = Field(..., json_schema_extra={"example": "LabSense AI Backend"})
    version: str = Field(..., json_schema_extra={"example": "0.1.0"})
    database: str = Field(..., json_schema_extra={"example": "connected"})
    environment: str = Field(..., json_schema_extra={"example": "development"})
