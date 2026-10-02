from typing import Optional

def evaluate_reference_range_status(
    measured_value: Optional[float],
    ref_min: Optional[float],
    ref_max: Optional[float]
) -> str:
    """
    Deterministically computes whether a measured numeric value is within or outside
    the extracted reference range bounds from the report.
    
    Returns:
        'within_range' | 'outside_range_high' | 'outside_range_low' | 'unknown'
    """
    if measured_value is None:
        return "unknown"

    # Case 1: Standard interval (e.g. 70 - 99)
    if ref_min is not None and ref_max is not None:
        if measured_value < ref_min:
            return "outside_range_low"
        elif measured_value > ref_max:
            return "outside_range_high"
        else:
            return "within_range"

    # Case 2: Upper bound only (e.g. < 200)
    elif ref_max is not None and ref_min is None:
        if measured_value > ref_max:
            return "outside_range_high"
        else:
            return "within_range"

    # Case 3: Lower bound only (e.g. > 40)
    elif ref_min is not None and ref_max is None:
        if measured_value < ref_min:
            return "outside_range_low"
        else:
            return "within_range"

    # Missing bounds
    return "unknown"
