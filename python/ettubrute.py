#! /usr/bin/env python
# Brute-force Julius Caesar's password

from hashlib import md5
import string
import itertools

secret1 = md5("AETHERIS").hexdigest()
secret2 = md5("BRVTVS56").hexdigest()
secret3 = md5("NON,,EST").hexdigest()

def latinise(string):
    return string.upper().replace('U','V')

def brute_force(wordlist, hashedpw):
    for w in wordlist:
        if md5(w).hexdigest() == hashedpw:
            print "FOUND:", w
            break
    return "Finished search, no match found."


# Import wordlist:  // NEED TO REDUCE TO 4-8k so 3rd search completes within 10sec
latinwords = []
with open("most-common-latin-words.txt") as fp:
    lines = fp.readlines()
    for line in lines:
        word = line.split()[0]
        if len(word) > 1:
            latinwords.append(latinise(word))
# Sort by length:
latinwords[:6000].sort(cmp = lambda a,b: len(a)-len(b))
print len(latinwords), "words"

# Single word, len > 6:
brute_force([w for w in latinwords if len(w) >= 6], secret1)

# Single word + 1|2 digits, len > 6:
brute_force([w+str(x)+str(y) for w in latinwords for x in string.digits for y in string.digits if len(w) >= 4], secret2)

# Sandwich: word(3-6) + /[\.,: ]{0,2}/ + word(3-6)
midchars = ":., "
midpairs = [t[0]+t[1] for t in list(itertools.product(midchars,midchars))]
midpairs += [m for m in midchars]

latinwords24 = [w for w in latinwords if len(w) >= 2 and len(w) <= 4]
print len(latinwords24), "words 2-4"
brute_force([w1+mid+w2 for w1 in latinwords24 for w2 in latinwords24 for mid in midpairs if len(w1) == len(w2)], secret3)
