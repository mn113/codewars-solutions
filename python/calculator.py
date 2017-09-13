class Calculator(object):
  def evaluate(self, string):
    from decimal import Decimal

    # Converting to Decimals to avoid floating-point arithmetic
    parts = [Decimal(n) if n[0].isdigit() else n for n in string.split(" ")]
    inf = float('inf')

    # Multiply and divide, L-R
    while "*" in parts or "/" in parts:
        try:
            m = parts.index("*")
        except ValueError:
            m = inf
        try:
            d = parts.index("/")
        except ValueError:
            d = inf
        if m < d:
            parts[m] = parts[m-1] * parts[m+1]
            del parts[m+1]
            del parts[m-1]
        else:
            parts[d] = parts[d-1] / parts[d+1]
            del parts[d+1]
            del parts[d-1]

    # Add and subtract, L-R
    while "+" in parts or "-" in parts:
        try:
            p = parts.index("+")
        except ValueError:
            p = inf
        try:
            s = parts.index("-")
        except ValueError:
            s = inf
        if p < s:
            parts[p] = parts[p-1] + parts[p+1]
            del parts[p+1]
            del parts[p-1]
        else:
            parts[s] = parts[s-1] - parts[s+1]
            del parts[s+1]
            del parts[s-1]

    # All operators processed, just cast remaining value to a float
    return float(parts[0])
