#! /usr/bin/env python
# CodeWars Morse kata

import re, string

def decodeBitsAdvanced(bits):
    print bits
    if string.find(bits, '1') == -1:
        return ''     # empty input
    if string.find(bits, '0') == -1 and len(bits) > 0:
        return '.'    # no zeroes: interpret as single dot

    # Trim whitespace:
    bits = re.sub(r'^0*', '', bits)
    bits = re.sub(r'0*$', '', bits)

    offlengths, onlengths = [], []
    # Search for longest strings down to shortest:
    for i in range(15,0,-1):
        if '0' + '1'*i + '0' in '0' + bits + '0':
            onlengths.append(i)
        if '1' + '0'*i + '1' in bits:
            offlengths.append(i)

    # Frequency analysis:
    onlengths = sorted(list(onlengths), None, None, True)
    offlengths = sorted(list(offlengths), None, None, True)
    print '1:', onlengths
    print '0:', offlengths

    # Pattern substitions:
    bits = pattern_sub(bits, onlengths, '1')
    bits = pattern_sub(bits, offlengths, '0')

    print bits
    return bits


def pattern_sub(bits, lengths_arr, bit):
    if len(lengths_arr) < 2:
        k = 1
    elif bit == '1':
        k = 2
    else:
        k = judge_splits(lengths_arr)
    print "bit=", bit, ", k=", k
    subs = {'1': ['-', '.'], '0': ['/', ' ', '']}[bit]
    sub = 0
    for cluster in split_into_clusters(lengths_arr, k):
        print 'cl', cluster
        for s in range(len(cluster)):
            # Start with longest 1 chain:
            patt = bit*cluster[s]
            bits = re.sub(patt, subs[sub], bits)
            print "Replaced", subs[sub], "for", patt
        sub += 1
    return bits


def split_into_clusters(arr, k=1):
    if k == 1:
        return [arr]

    mean = sum(arr) / len(arr)
    if k == 2:
        div = mean
        return [[x for x in arr if x > div], [x for x in arr if x <= div]]

    elif k == 3:
        # Heuristic / fudge factor:
        div1 = 0.75*mean
        div2 = 1.5*mean
        return [[x for x in arr if x > div2], [x for x in arr if x <= div2 and x > div1], [x for x in arr if x <= div1]]


def judge_splits(arr):
    diffs = [abs(arr[i]-arr[i+1]) for i in range(len(arr)-1)]
    diffs.sort(reverse=True)
    print "diffs", diffs
    return diffs.index(min(diffs)) + 1   # one >1 jump : index(min) == 1 : clusters == 2

    # [14,6,2] => diffs [8,4] => k=3

def decodeMorse(morseCode):
    if morseCode == '':
        return ''

    plaintext = []
    for word in morseCode.split('/'):
        plainword = []
        for letter in word.split(' '):
            plainword.append(MORSE_CODE[letter])
        plaintext.append(''.join(plainword))
    return ' '.join(plaintext)
