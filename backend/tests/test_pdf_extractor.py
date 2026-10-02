import io
import pytest
from pypdf import PdfWriter
from app.services.pdf_extractor import (
    validate_and_extract_pdf_text,
    PDFExtractionError,
    MAX_PDF_SIZE_BYTES,
)

def create_synthetic_pdf(text_content: str) -> bytes:
    """Helper to generate an in-memory synthetic PDF with specified text content."""
    from pypdf.generic import DictionaryObject, NameObject, DecodedStreamObject, ArrayObject, create_string_object
    
    writer = PdfWriter()
    page = writer.add_blank_page(width=612, height=792)
    
    if text_content:
        # Construct PDF content stream for text drawing
        stream_data = f"BT /F1 12 Tf 72 712 Td ({text_content}) Tj ET".encode("latin-1")
        contents = DecodedStreamObject()
        contents.set_data(stream_data)
        page[NameObject("/Contents")] = contents
        
        # Add basic font resource dictionary
        font_dict = DictionaryObject()
        font_f1 = DictionaryObject({
            NameObject("/Type"): NameObject("/Font"),
            NameObject("/Subtype"): NameObject("/Type1"),
            NameObject("/BaseFont"): NameObject("/Helvetica"),
        })
        font_dict[NameObject("/F1")] = font_f1
        resources = DictionaryObject({NameObject("/Font"): font_dict})
        page[NameObject("/Resources")] = resources

    buffer = io.BytesIO()
    writer.write(buffer)
    return buffer.getvalue()

def test_extract_valid_text_pdf():
    """Verify that text-based synthetic PDF extracts text correctly."""
    text = "Fasting Blood Glucose: 95 mg/dL (70-99)"
    pdf_bytes = create_synthetic_pdf(text)
    
    extracted_text, is_scanned, error = validate_and_extract_pdf_text(pdf_bytes)
    assert not is_scanned
    assert error is None
    assert "Fasting Blood Glucose" in extracted_text

def test_scanned_or_empty_pdf_detection():
    """Verify that an empty or image-like PDF without text is detected as scanned/unsupported."""
    # Blank PDF with no text stream
    writer = PdfWriter()
    writer.add_blank_page(width=612, height=792)
    buffer = io.BytesIO()
    writer.write(buffer)
    blank_pdf_bytes = buffer.getvalue()

    extracted_text, is_scanned, error = validate_and_extract_pdf_text(blank_pdf_bytes)
    assert is_scanned is True
    assert error is not None
    assert "scanned image or photo" in error
    assert extracted_text == ""

def test_empty_bytes_raises_error():
    """Verify that zero-byte input raises PDFExtractionError."""
    with pytest.raises(PDFExtractionError) as exc:
        validate_and_extract_pdf_text(b"")
    assert "empty (0 bytes)" in str(exc.value)

def test_invalid_header_raises_error():
    """Verify that non-PDF content raises PDFExtractionError."""
    with pytest.raises(PDFExtractionError) as exc:
        validate_and_extract_pdf_text(b"NOT A REAL PDF FILE HEADER")
    assert "Invalid file format" in str(exc.value)

def test_oversized_pdf_raises_error():
    """Verify that PDF exceeding MAX_PDF_SIZE_BYTES is rejected."""
    oversized = b"%PDF-1.4\n" + b"0" * (MAX_PDF_SIZE_BYTES + 10)
    with pytest.raises(PDFExtractionError) as exc:
        validate_and_extract_pdf_text(oversized)
    assert "exceeds the 10 MB limit" in str(exc.value)
