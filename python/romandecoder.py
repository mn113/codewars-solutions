#! /usr/bin/env python
# Decode roman numerals under 4999

def decode_roman(roman):
    """Transforms a roman numeral string into an integer."""
    total = 0
    tabula = {
        "M": 1000, "CM": 900, "D": 500, "CD": 400,
        "C": 100,  "XC": 90,  "L": 50,  "XL": 40,
        "X": 10,   "IX": 9,   "V": 5,   "IV": 4,
        "I": 1
    }

    while len(roman) > 0:
        # Look for 2-character key. If none, take 1-character key:
        if roman[:2] in tabula.keys():
            total += tabula[roman[:2]]
            roman = roman[2:]
        else:
            total += tabula[roman[:1]]
            roman = roman[1:]

    return total


def encode_roman(num):
    """Transforms an integer into a roman numeral string."""
    roman = ""
    tabula = [
        ("M",1000), ("CM",900), ("D",500), ("CD",400),
        ("C",100),  ("XC",90),  ("L",50),  ("XL",40),
        ("X",10),   ("IX",9),   ("V",5),   ("IV",4),
        ("I",1)
    ]
    for v in tabula:
        while num >= v[1]:
            roman += v[0]
            num -= v[1]

    return roman

print decode_roman("MMMMDCDXCIX"), '=', encode_roman(1984)
