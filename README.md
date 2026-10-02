# 🩺 LabSense AI — Multilingual Clinical Laboratory Intelligence

> **Empowering patients with plain-language, bilingual clinical test insights, deterministic PDF report extraction, and report-specific reference range verification.**

[![Live Web Application](https://img.shields.io/badge/Live%20Demo-Render-blue?style=for-the-badge&logo=render)](https://labsense-ai-1.onrender.com)
[![FastAPI Backend](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://labsense-ai.onrender.com)
[![React 19](https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://labsense-ai-1.onrender.com)
[![Tests Passing](https://img.shields.io/badge/Pytest-28%20Passed-brightgreen?style=for-the-badge&logo=pytest&logoColor=white)](https://github.com/Shanmukh-47/labsense-ai)

---

## 🌐 Live Deployment Links

* 💻 **Live Web Application (Frontend):** [https://labsense-ai-1.onrender.com](https://labsense-ai-1.onrender.com)
* ⚙️ **Interactive API Documentation (Swagger / OpenAPI):** [https://labsense-ai.onrender.com/docs](https://labsense-ai.onrender.com/docs)
* 📁 **GitHub Source Repository:** [https://github.com/Shanmukh-47/labsense-ai](https://github.com/Shanmukh-47/labsense-ai)

---

## 💡 Problem Statement

Laboratory blood and diagnostic test reports are filled with complex medical jargon, abbreviations, and clinical numbers that are intimidating and confusing for everyday patients. In multilingual societies like India, this health-literacy gap is magnified because most lab reports are generated exclusively in English without patient-friendly context.

**LabSense AI** solves this by:
1. Providing **deterministic, zero-hallucination PDF extraction** for digital clinical reports.
2. Comparing biomarker values **strictly against the reference intervals provided by the diagnostic laboratory**.
3. Providing **interactive user review & manual correction** before persistence.
4. Delivering **bilingual educational breakdowns in English and Telugu (తెలుగు)** with doctor-discussion questions.

---

## 🔬 Supported Clinical Panels (12 Biomarkers)

| Clinical Category | Recognized Biomarkers | Standard Units |
| :--- | :--- | :--- |
| **Metabolic & Diabetes** | Fasting Blood Glucose (FBS), Hemoglobin A1c (HbA1c) | `mg/dL`, `%` |
| **Lipid Profile (Cardiovascular)** | Total Cholesterol, HDL Cholesterol, LDL Cholesterol | `mg/dL` |
| **Complete Blood Count (CBC / Hemogram)** | Hemoglobin (Hb), Total Leukocyte Count (WBC), Platelet Count | `g/dL`, `/cumm`, `/uL` |
| **Kidney / Renal Function (KFT / RFT)** | Serum Creatinine, Blood Urea Nitrogen (BUN) | `mg/dL` |
| **Liver Function (Hepatic)** | Serum ALT (SGPT) | `U/L` |
| **Vitamins & Micronutrients** | Serum 25-OH Vitamin D | `ng/mL` |

---

## 🏛️ System Architecture

```
[ Patient Digital PDF Report ] (<= 10 MB)
                |
                v
  +-----------------------------+
  |  Frontend (React 19 + Vite) | <--- Language Toggle (English / Telugu)
  +-----------------------------+
                |
          (POST /api/reports/extract-preview)
                |
                v
  +-----------------------------+
  |  FastAPI Backend Service    |
  |  - In-Memory PyPDF Stream   | ---> Validates real digital text vs. scanned image
  |  - Regex Deterministic      | ---> Extracts Biomarkers, Measured Values, Units & Ranges
  |    Clinical Parser          | ---> Sets needs_review flag on incomplete data
  +-----------------------------+
                |
                v
  +-----------------------------+
  |  Interactive Review Modal   | ---> Patient verifies and edits extracted fields
  +-----------------------------+
                |
          (POST /api/reports)
                |
                v
  +-----------------------------+
  |  Analyzer & Educational DB  | ---> Compares strictly to report's printed bounds
  |  - SQLite Database Storage  | ---> Generates bilingual explanation schemas (EN / TE)
  +-----------------------------+
                |
                v
  [ Visual Dashboard & Comprehensive Biomarker Health Analysis Screen ]
```

---

## 🔒 Security & Privacy by Design

* **Zero Cloud AI Token Dependency:** Uses deterministic parsing and localized medical knowledge dictionaries. Zero API key leakage risk and $0 ongoing AI cloud billing.
* **In-Memory PDF Lifecycle:** Uploaded PDF bytes are processed entirely in server memory and immediately garbage-collected. Raw PDF files are never persisted to disk or cloud buckets.
* **SQL Injection Prevention:** 100% SQLAlchemy ORM parameterized transactions with Pydantic payload validation.
* **XSS Defense:** React JSX sanitization protects user-supplied notes and review inputs.
* **Educational Guardrail:** Clear non-diagnostic boundary disclaimers stating that the system provides health literacy education, not clinical medical diagnosis or prescriptions.

---

## 🛠️ Technology Stack

* **Frontend:** React 19, TypeScript, Vite, Lucide Icons, Glassmorphism Vanilla CSS Design Tokens
* **Backend:** Python 3.14, FastAPI, Pydantic v2, SQLAlchemy, PyPDF, SQLite
* **Testing:** Pytest (28 automated test suites covering extraction, parsing, range analysis, SQLite persistence, and API routes)
* **Cloud Infrastructure:** Render (FastAPI Web Service + Static Site Global CDN)

---

## 🚀 Local Development Setup

### 1. Backend Setup
```bash
cd backend
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```

### 2. Frontend Setup
```bash
# In the root directory:
npm install
npm run dev
```

Open **[http://localhost:5173](http://localhost:5173)** in your browser.

---

## 🧪 Running Automated Tests

```bash
cd backend
pytest -v
```
*(All 28 tests passing)*
