# LabSense AI — Backend Foundation (FastAPI)

Backend service for **LabSense AI — Multilingual Clinical Report Intelligence**.

---

## 🏗️ Architecture & Features (Stage 2)

- **Framework**: FastAPI (Python 3.14 compatible)
- **Database**: SQLite database stored at `backend/data/labsense.db`
- **ORM**: SQLAlchemy with declarative base models
- **Privacy Design**: Strictly no patient names, phone numbers, or PII stored
- **Security**: Localhost-only binding (`127.0.0.1`) during development

---

## 🚀 Setup & Execution Guide

### 1. Activate Virtual Environment

**On Windows (PowerShell / Command Prompt):**
```bash
# If from the project root:
backend\venv\Scripts\activate
```

### 2. Install Dependencies (if not already installed)
```bash
pip install -r backend/requirements.txt
```

### 3. Run Automated Tests
```bash
# From the backend directory:
cd backend
python -m pytest
```

### 4. Start the Backend API Server
```bash
# From the backend directory:
uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Basic service metadata |
| `GET` | `/api/health` | Healthcheck and active SQLite database connectivity test |
| `GET` | `/docs` | Interactive OpenAPI documentation (Swagger UI) |
