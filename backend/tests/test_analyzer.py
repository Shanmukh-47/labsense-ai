from app.services.analyzer import evaluate_reference_range_status

def test_interval_evaluation():
    """Verify within range, high, and low for standard interval bounds [min, max]."""
    # Min=70, Max=99
    assert evaluate_reference_range_status(85.0, 70.0, 99.0) == "within_range"
    assert evaluate_reference_range_status(70.0, 70.0, 99.0) == "within_range"
    assert evaluate_reference_range_status(99.0, 70.0, 99.0) == "within_range"
    assert evaluate_reference_range_status(125.0, 70.0, 99.0) == "outside_range_high"
    assert evaluate_reference_range_status(64.0, 70.0, 99.0) == "outside_range_low"

def test_upper_bound_only_evaluation():
    """Verify evaluation for < max limits (e.g. Total Cholesterol < 200)."""
    assert evaluate_reference_range_status(180.0, None, 200.0) == "within_range"
    assert evaluate_reference_range_status(200.0, None, 200.0) == "within_range"
    assert evaluate_reference_range_status(215.0, None, 200.0) == "outside_range_high"

def test_lower_bound_only_evaluation():
    """Verify evaluation for > min limits (e.g. HDL > 40)."""
    assert evaluate_reference_range_status(55.0, 40.0, None) == "within_range"
    assert evaluate_reference_range_status(40.0, 40.0, None) == "within_range"
    assert evaluate_reference_range_status(32.0, 40.0, None) == "outside_range_low"

def test_missing_data_returns_unknown():
    """Verify that None values or missing bounds return unknown."""
    assert evaluate_reference_range_status(None, 70.0, 99.0) == "unknown"
    assert evaluate_reference_range_status(100.0, None, None) == "unknown"
