import io
from typing import Tuple, Optional
from pypdf import PdfReader

MAX_PDF_SIZE_BYTES = 10 * 1024 * 1024  # 10 MB limit

class PDFExtractionError(Exception):
    """Custom exception for PDF extraction and validation errors."""
    pass

def validate_and_extract_pdf_text(file_bytes: bytes) -> Tuple[str, bool, Optional[str]]:
    """
    Validates a PDF byte stream in memory and extracts text.
    
    Returns:
        (extracted_text, is_scanned_or_empty, error_message)
    """
    if not file_bytes:
        raise PDFExtractionError("The uploaded file is empty (0 bytes).")

    if len(file_bytes) > MAX_PDF_SIZE_BYTES:
        raise PDFExtractionError(f"File size exceeds the 10 MB limit ({len(file_bytes) / (1024 * 1024):.1f} MB).")

    # Check PDF magic bytes '%PDF-'
    if not file_bytes.startswith(b"%PDF-"):
        raise PDFExtractionError("Invalid file format. The uploaded file does not appear to be a standard PDF document.")

    try:
        reader = PdfReader(io.BytesIO(file_bytes))
        total_pages = len(reader.pages)
        if total_pages == 0:
            raise PDFExtractionError("The PDF document contains 0 pages.")

        extracted_text_chunks = []
        for page_idx, page in enumerate(reader.pages):
            page_text = page.extract_text() or ""
            extracted_text_chunks.append(page_text.strip())

        full_text = "\n".join(chunk for chunk in extracted_text_chunks if chunk)
        
        # Check if the PDF has sufficient readable text or is an image/scanned document
        alphanumeric_count = sum(1 for c in full_text if c.isalnum())
        if alphanumeric_count < 20:
            return (
                "",
                True,
                "No readable text detected in this PDF. This appears to be a scanned image or photo. OCR (Optical Character Recognition) is not yet supported in this version."
            )

        return (full_text, False, None)

    except PDFExtractionError:
        raise
    except Exception as exc:
        raise PDFExtractionError(f"Failed to read PDF document: {str(exc)}")
