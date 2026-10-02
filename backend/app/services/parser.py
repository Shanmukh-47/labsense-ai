import re
from typing import List, Dict, Any, Optional

# Supported clinical parameter patterns
KNOWN_TEST_PATTERNS = [
    {
        "name": "Fasting Blood Glucose",
        "category": "Metabolic",
        "regex": r"(?:fasting\s+(?:blood\s+)?(?:glucose|sugar)|fbs|blood\s+glucose\s*\(?fasting\)?)",
    },
    {
        "name": "Total Cholesterol",
        "category": "Lipid",
        "regex": r"(?:total\s+cholesterol|serum\s+cholesterol|cholesterol\s*,\s*total)",
    },
    {
        "name": "HDL Cholesterol",
        "category": "Lipid",
        "regex": r"(?:hdl(?:\s+cholesterol)?|high\s+density\s+lipoprotein)",
    },
    {
        "name": "LDL Cholesterol",
        "category": "Lipid",
        "regex": r"(?:ldl(?:\s+cholesterol)?|low\s+density\s+lipoprotein)",
    },
    {
        "name": "Serum Creatinine",
        "category": "Renal",
        "regex": r"(?:serum\s+creatinine|creatinine\s*,\s*serum|creatinine)",
    },
    {
        "name": "Blood Urea Nitrogen (BUN)",
        "category": "Renal",
        "regex": r"(?:blood\s+urea\s+nitrogen|bun|urea\s+nitrogen)",
    },
    {
        "name": "Hemoglobin (Hb)",
        "category": "Hematology",
        "regex": r"(?:hemoglobin|haemoglobin|hb)",
    },
    {
        "name": "Total Leukocyte Count (WBC)",
        "category": "Hematology",
        "regex": r"(?:total\s+leukocyte\s+count|wbc(?:\s+count)?|white\s+blood\s+cells?)",
    },
    {
        "name": "Platelet Count",
        "category": "Hematology",
        "regex": r"(?:platelet(?:\s+count)?|thrombocytes?)",
    },
    {
        "name": "Serum 25-OH Vitamin D",
        "category": "Vitamins",
        "regex": r"(?:25[\s-]hydroxy[\s-]vitamin[\s-]d|vitamin[\s-]d3?|25[\s-]oh[\s-]vit(?:amin)?[\s-]d)",
    },
    {
        "name": "Hemoglobin A1c (HbA1c)",
        "category": "Metabolic",
        "regex": r"(?:hba1c|glycosylated\s+hemoglobin|glycated\s+haemoglobin)",
    },
    {
        "name": "Serum ALT (SGPT)",
        "category": "Liver",
        "regex": r"(?:alanine\s+aminotransferase|alt|sgpt)",
    },
]

# Common laboratory units
UNIT_PATTERN = r"(?:mg/dL|mg/dl|g/dL|g/dl|ng/mL|ng/ml|pg/mL|pg/ml|U/L|u/l|IU/L|iu/l|%|/cumm|/uL|cells/mcL|mm/hr|mmol/L|mEq/L)"

# Common reference range patterns:
# 1) 70 - 99 or 0.70 to 1.30
RANGE_INTERVAL_PATTERN = r"(?P<min>\d+(?:\.\d+)?)\s*(?:-|–|to)\s*(?P<max>\d+(?:\.\d+)?)"
# 2) < 200 or <= 5.7
RANGE_LESS_PATTERN = r"(?:<|<=|less\s+than)\s*(?P<max>\d+(?:\.\d+)?)"
# 3) > 40 or >= 30
RANGE_GREATER_PATTERN = r"(?:>|>=|greater\s+than)\s*(?P<min>\d+(?:\.\d+)?)"

def parse_clinical_report_text(raw_text: str) -> Dict[str, Any]:
    """
    Parses raw laboratory text deterministically without hallucinating tests.
    
    Returns structured dictionary:
    {
        "lab_name": Optional[str],
        "report_title": Optional[str],
        "report_date": Optional[str],
        "detected_tests": List[Dict[str, Any]],
        "raw_text_preview": str
    }
    """
    lines = [line.strip() for line in raw_text.splitlines() if line.strip()]
    
    # Metadata heuristics from header
    lab_name = None
    report_date = None
    report_title = "Laboratory Report"

    date_match = re.search(r"(?:date|collected|reported)\s*[:\-]?\s*(\d{4}[/-]\d{1,2}[/-]\d{1,2}|\d{1,2}[/-]\d{1,2}[/-]\d{2,4}|\d{1,2}\s+[A-Za-z]{3,9}\s+\d{4})", raw_text, re.IGNORECASE)
    if date_match:
        report_date = date_match.group(1)

    # First few lines often contain lab name
    for line in lines[:5]:
        if any(term in line.lower() for term in ["laboratory", "diagnostics", "pathology", "hospital", "clinic", "health"]):
            lab_name = line
            break

    detected_tests: List[Dict[str, Any]] = []
    seen_tests = set()

    for line_idx, line in enumerate(lines):
        for known in KNOWN_TEST_PATTERNS:
            pattern = rf"\b{known['regex']}\b"
            match = re.search(pattern, line, re.IGNORECASE)
            if match and known["name"] not in seen_tests:
                # Build context window from current line and subsequent lines
                window_parts = [line[match.end():].strip()]
                raw_lines = [line]

                for next_idx in range(line_idx + 1, min(len(lines), line_idx + 5)):
                    next_line = lines[next_idx]
                    # Stop if next line matches any other known test pattern
                    if any(re.search(rf"\b{k['regex']}\b", next_line, re.IGNORECASE) for k in KNOWN_TEST_PATTERNS):
                        break
                    # Stop if section header/footer
                    if any(next_line.lower().startswith(prefix) for prefix in ["note:", "patient:", "doctor:", "report id:", "laboratory:", "date:"]):
                        break
                    window_parts.append(next_line)
                    raw_lines.append(next_line)

                combined_context = " ".join(part for part in window_parts if part)

                measured_val: Optional[float] = None
                unit: Optional[str] = None
                ref_min: Optional[float] = None
                ref_max: Optional[float] = None
                ref_display: Optional[str] = None

                # Find Unit in combined context
                unit_match = re.search(rf"\b{UNIT_PATTERN}\b", combined_context, re.IGNORECASE)
                if unit_match:
                    unit = unit_match.group(0)

                # Find Reference Range in combined context
                interval_m = re.search(RANGE_INTERVAL_PATTERN, combined_context, re.IGNORECASE)
                less_m = re.search(RANGE_LESS_PATTERN, combined_context, re.IGNORECASE)
                greater_m = re.search(RANGE_GREATER_PATTERN, combined_context, re.IGNORECASE)

                range_start_pos: Optional[int] = None

                if interval_m:
                    ref_min = float(interval_m.group("min"))
                    ref_max = float(interval_m.group("max"))
                    ref_display = f"{ref_min} - {ref_max}" + (f" {unit}" if unit else "")
                    range_start_pos = interval_m.start()
                elif less_m:
                    ref_max = float(less_m.group("max"))
                    ref_display = f"< {ref_max}" + (f" {unit}" if unit else "")
                    range_start_pos = less_m.start()
                elif greater_m:
                    ref_min = float(greater_m.group("min"))
                    ref_display = f"> {ref_min}" + (f" {unit}" if unit else "")
                    range_start_pos = greater_m.start()

                # Extract numbers before the range match to isolate the measured value
                search_for_value_text = combined_context[:range_start_pos] if range_start_pos is not None else combined_context
                num_matches = list(re.finditer(r"(?<![<>\-\d])(?P<val>\d+(?:\.\d+)?)(?![<>\-\d])", search_for_value_text))

                if num_matches:
                    measured_val = float(num_matches[0].group("val"))
                else:
                    # Fallback: scan all numbers in combined context that do not match range bounds
                    all_nums = list(re.finditer(r"(?<![<>\-\d])(?P<val>\d+(?:\.\d+)?)(?![<>\-\d])", combined_context))
                    for nm in all_nums:
                        v = float(nm.group("val"))
                        if (ref_min is None or v != ref_min) and (ref_max is None or v != ref_max):
                            measured_val = v
                            break

                needs_review = (measured_val is None or ref_display is None or unit is None)

                detected_tests.append({
                    "name": known["name"],
                    "category": known["category"],
                    "measured_value": measured_val,
                    "unit": unit or "",
                    "reference_range_min": ref_min,
                    "reference_range_max": ref_max,
                    "reference_range_display": ref_display or "Not detected",
                    "needs_review": needs_review,
                    "raw_extracted_text": " | ".join(raw_lines)
                })
                seen_tests.add(known["name"])
                break

    return {
        "lab_name": lab_name or "Diagnostic Laboratory",
        "report_title": report_title,
        "report_date": report_date or "Current Draw",
        "detected_tests": detected_tests,
        "raw_text_preview": "\n".join(lines[:20])
    }
