#! /usr/bin/env python
# Decode roman numerals under 4000

def solution(roman):
    """complete the solution by transforming the roman numeral into an integer"""
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

print solution("MCMLXXXIV")
