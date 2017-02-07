#! /usr/bin/env python
# Encode and decode strings from Base64

ALPH = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"

def to_base_64(string):
    binarystr = ''
    encoded = []
    for ch in string:
        # Concatenate 8 binary digits for each source character:
        eightbits = str(bin(ord(ch)))[2:]     # cut unwanted '0b'
        eightbits = eightbits.rjust(8,'0')
        binarystr += eightbits

    # Pad right end:
    if len(binarystr)%6 != 0:
        binarystr = binarystr + '0'*(6 - len(binarystr)%6)

    # Take 6-byte chunks and look them up in ALPH:
    while len(binarystr) >= 6:
        encoded.append(binarystr[:6])
        binarystr = binarystr[6:]

    return ''.join([ALPH[int(x,2)] for x in encoded])


def from_base_64(string):
    binarystr = ''
    decoded = []
    for ch in string:
        # Look up in ALPH and convert to binary:
        sixbits = str(bin(ALPH.index(ch)))
        sixbits = sixbits[sixbits.index('b')+1:]    # cut unwanted '0b'
        sixbits = sixbits.rjust(6,'0')
        binarystr += sixbits

    # Take 8-byte chunks and convert to ASCII chars:
    while len(binarystr) >= 8:
        decoded.append(binarystr[:8])
        binarystr = binarystr[8:]

    return ''.join([unichr(int(x,2)) for x in decoded])
