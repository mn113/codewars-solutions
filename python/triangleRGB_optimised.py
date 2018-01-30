special_lengths = [2,4,10,28,82,244,730,2188,6562,19684,59050] # next = multiply by 3, subtract 2

lookups = { # advances 1 row
    'RR': 'R', 'GG': 'G', 'BB': 'B',
    'GB': 'R', 'BR': 'G', 'RG': 'B',
    'BG': 'R', 'RB': 'G', 'GR': 'B'
}

def skip_n_rows(inrow, n):
    return "".join([lookups[inrow[i] + inrow[i+n-1]] for i in range(len(inrow) + 1 - n)])

def triangle(row):
    if len(row) == 1:
        return row
    elif len(row) == 2:
        return lookups[row]
    else: # jump many rows
        for s in reversed(special_lengths):
            while len(row) > s:
                row = skip_n_rows(row, s)
        return triangle(row)
