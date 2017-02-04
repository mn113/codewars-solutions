#! /usr/bin/env python
# Simplify a multilinear polynomial e.g. 2xy+3xz-yx+z-4z => -3z+xy+3xz

import re

def simplify(poly):
    terms = re.findall(r'([+\-]?)(\d*)(\w+)', poly)  # list of (sign, coefficient, letters) tuples
    terms = make_uniform(terms)
    terms = combine_matches(terms)
    # Sort first by number of letters, then alphabetical:
    terms = sorted(terms, key=lambda t: (len(t[1]), t[1]))
    return rejoin(terms)

def make_uniform(terms):
    # Uniformise term format:
    for i in range(len(terms)):
        sign = -1 if terms[i][0] == '-' else 1
        coeff = 1 if terms[i][1] == '' else int(terms[i][1])
        letters = ''.join(sorted(terms[i][2]))
        terms[i] = (sign*coeff, letters)
    return terms

def combine_matches(terms):
    # Look for matching groups of letters:
    for i in range(len(terms)):
        for j in range(i+1, len(terms)):
            if terms[i][1] == terms[j][1] and terms[i][1] != None:
                # Assimilate 2nd matching term into 1st:
                terms[i] = (terms[i][0] + terms[j][0], terms[i][1])
                terms[j] = (None,None)
    # Filter out Nones:
    return [t for t in terms if t[1] != None]

def rejoin(terms):
    out = ''
    for t in [t for t in terms if abs(t[0]) > 0]:    # skip zero terms
        sign = '-' if t[0] < 0 else '+'
        coeff = '' if abs(t[0]) == 1 else str(abs(t[0]))
        out += sign + coeff + t[1]
    return out if out[0] != '+' else out[1:]    # chop leading '+'
