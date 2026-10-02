from app.services.parser import parse_clinical_report_text

def test_parse_standard_interval_tests():
    """Verify parser extracts glucose, cholesterol, and renal tests with interval ranges."""
    sample_text = """
    Apex Diagnostics & Clinical Laboratory
    Date: 2025-02-15
    Patient Test Summary
    -------------------------------------------
    Fasting Blood Glucose 118.0 mg/dL 70.0 - 99.0
    Serum Creatinine 0.95 mg/dL 0.70 - 1.30
    Hemoglobin (Hb) 14.2 g/dL 13.0 - 17.0
    """
    result = parse_clinical_report_text(sample_text)
    assert "Apex Diagnostics" in result["lab_name"]
    assert result["report_date"] == "2025-02-15"
    assert len(result["detected_tests"]) == 3

    glucose = next(t for t in result["detected_tests"] if t["name"] == "Fasting Blood Glucose")
    assert glucose["measured_value"] == 118.0
    assert glucose["unit"] == "mg/dL"
    assert glucose["reference_range_min"] == 70.0
    assert glucose["reference_range_max"] == 99.0
    assert "70.0 - 99.0" in glucose["reference_range_display"]

    creat = next(t for t in result["detected_tests"] if t["name"] == "Serum Creatinine")
    assert creat["measured_value"] == 0.95
    assert creat["category"] == "Renal"

def test_parse_bounded_ranges():
    """Verify parser correctly handles < and > inequality reference ranges."""
    sample_text = """
    Central Pathology Lab
    Total Cholesterol 224 mg/dL < 200
    HDL Cholesterol 52 mg/dL > 40
    Serum 25-OH Vitamin D 18.2 ng/mL 30 - 100
    """
    result = parse_clinical_report_text(sample_text)
    assert len(result["detected_tests"]) == 3

    tc = next(t for t in result["detected_tests"] if t["name"] == "Total Cholesterol")
    assert tc["measured_value"] == 224.0
    assert tc["reference_range_max"] == 200.0
    assert tc["reference_range_min"] is None
    assert "< 200" in tc["reference_range_display"]

    hdl = next(t for t in result["detected_tests"] if t["name"] == "HDL Cholesterol")
    assert hdl["measured_value"] == 52.0
    assert hdl["reference_range_min"] == 40.0
    assert hdl["reference_range_max"] is None
    assert "> 40" in hdl["reference_range_display"]

def test_parse_empty_or_unrelated_text():
    """Verify that unrelated text does not create hallucinated tests."""
    sample_text = """
    Random invoice or prescription memo.
    No clinical biomarkers mentioned here.
    """
    result = parse_clinical_report_text(sample_text)
    assert len(result["detected_tests"]) == 0

def test_parse_multiline_table_layout():
    """Verify parser correctly extracts multi-line sequential cell text from synthetic PDF."""
    sample_multiline = """
    SAMPLE DIAGNOSTIC LABORATORY
    SYNTHETIC LABORATORY REPORT
    Date: 2025-03-01
    BIOCHEMISTRY TEST RESULTS
    Test Parameter
    Measured Value
    Unit
    Reference Range
    Fasting Blood Glucose
    118.0
    mg/dL
    70.0 - 99.0
    Serum Creatinine
    0.95
    mg/dL
    0.70 - 1.30
    Total Cholesterol
    225.0
    mg/dL
    < 200
    Note: Synthetic verification data.
    """
    result = parse_clinical_report_text(sample_multiline)
    assert result["lab_name"] == "SAMPLE DIAGNOSTIC LABORATORY"
    assert result["report_date"] == "2025-03-01"
    assert len(result["detected_tests"]) == 3

    glucose = next(t for t in result["detected_tests"] if t["name"] == "Fasting Blood Glucose")
    assert glucose["measured_value"] == 118.0
    assert glucose["unit"] == "mg/dL"
    assert glucose["reference_range_min"] == 70.0
    assert glucose["reference_range_max"] == 99.0
    assert glucose["needs_review"] is False

    creat = next(t for t in result["detected_tests"] if t["name"] == "Serum Creatinine")
    assert creat["measured_value"] == 0.95
    assert creat["unit"] == "mg/dL"
    assert creat["reference_range_min"] == 0.70
    assert creat["reference_range_max"] == 1.30
    assert creat["needs_review"] is False

    chol = next(t for t in result["detected_tests"] if t["name"] == "Total Cholesterol")
    assert chol["measured_value"] == 225.0
    assert chol["unit"] == "mg/dL"
    assert chol["reference_range_max"] == 200.0
    assert chol["needs_review"] is False

