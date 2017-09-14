def sequence_classifier(arr):
    slimmed = list(set(arr))

    # One repeating element
    if len(slimmed) == 1:
        return 5

    # Decreasing?
    if sorted(arr, reverse=True) == arr:
        # Has repeats?
        if len(slimmed) < len(arr):
            return 4
        else:
            return 3

    # Increasing?
    if sorted(arr) == arr:
        # Has repeats?
        if len(slimmed) < len(arr):
            return 2
        else:
            return 1

    # Default case: unordered
    return 0

