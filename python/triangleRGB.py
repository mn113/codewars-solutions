#!/usr/bin/env python

from random import choice
import sys

lookups = [None,None,{}]
for x in range(3,20):
    # pre-fill dicts with the long unchanging keys:
    lookups.append({'R'*x: 'R', 'G'*x: 'G', 'B'*x: 'B'})

lookups[2] = { # advances 1 row - 3^2 or 9 keys
    'RR': 'R', 'GG': 'G', 'BB': 'B',
    'GB': 'R', 'BR': 'G', 'RG': 'B',
    'BG': 'R', 'RB': 'G', 'GR': 'B'
}
#lookups[3] = {} # 3 chars - skips 2 rows - 3^3 or 27 possible keys
#lookups[5] = {} # 5 chars - skips 4 rows - 3^5 or 243 possible keys
#lookups[9] = {} # 9 chars - skips 8 rows - 3^9 or 19683 possible keys
#lookups[17] = {} # 17 chars - skips 16 rows - 3^17 or 129140163 possible keys (won't ever fill)

def lookup(segment):
    n = len(segment)
    # use memoizer of key length n (stored at list index n+1):
    if segment not in lookups[n+1].keys():
        lookups[n+1][segment] = sys.intern(skip_n_rows(skip_n_rows(segment, n//2), n//2))
    return lookups[n+1][segment]

def next_row(row1):
    return "".join([lookups[2][row1[i:i+2]] for i in range(len(row1) - 1)])

def skip_n_rows(inrow, n):
    if n == 1:
        return next_row(inrow)
    return "".join([lookup(inrow[i:i+n+1]) for i in range(len(inrow) - n)])

def triangle(row1):
    if len(row1) == 1:
        print("solved")
        print([len(d) for d in lookups[2:] if len(d) > 0])
        return row1
    else: # jump many rows
        while len(row1) > 16:
            # test for uniform row:
            if len(row1) == len(set(row1)):
                return row1[0]

            row1 = skip_n_rows(row1, 16)

            # see if memoizer works
            if len(lookups[17].keys()) > 10000:
                print(len(lookups[17]), "keys")
                print(len(lookups[9]), "keys")
                return False
        while len(row1) > 8:
            row1 = skip_n_rows(row1, 8)
            print("rowof8", row1)
        while len(row1) > 4:
            row1 = skip_n_rows(row1, 4)
            print("rowof4", row1)
        while len(row1) > 2:
            row1 = skip_n_rows(row1, 2)
            print("rowof2", row1)
        while len(row1) > 1:
            row1 = skip_n_rows(row1, 1)
            print("rowof1", row1)
        return triangle(row1)

longest = "".join([choice(["R","G","B"]) for i in range(10000)])
print(10000, "->", triangle(longest))

# 100 tests of length < 1000 takes almost 9 seconds
# 1 test of length 10000 takes almost 9 seconds
