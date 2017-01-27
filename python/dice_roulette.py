#! /usr/bin/env python
# Generate a random integer from a given range, with equal probabilities, using dice rolls

import random

def roll_random_number(length = 100, rolls_left = 3, number_range = None):  # dice array option?
    """Uses dice rolls to generate an integer from 1 to an upper bound."""

    # Establish a number_range if not provided:
    if number_range is None:
        number_range = list(range(1,length+1))  # 1-100

    # Calculate number of chunks / max roll:
    for factor in [6,5,4,3,2,1]:
        if length % factor == 0:
            maxi = factor
            break

    # Calculate groupings of current number_range:
    groupings = []
    size = length / maxi    # 20
    for i in range(maxi):   # 0,1,2,3,4
        groupings.append(number_range[(size * i):size * (i+1)])

    # Roll die:
    d = roll_die(6, maxi)

    # Apply current roll:
    if rolls_left > 0:
        # Cut down number_range for next roll:
        number_range = groupings[d-1]
        # Start next roll:
        return roll_random_number(size, rolls_left-1, number_range)

    return number_range[0]     # the random number

def dice_array(size):
    """Returns an array of dice rolls."""
    dice = []
    while len(dice) < size:
        dice.append(roll_die(6))
    return dice

def roll_die(sides = 6, maxi = 6):
    """Generates an integer representing the roll of a die, discarding rolls above a maximum."""
    d = 1000
    # discard highest roll(s)
    while d > maxi:
        d = random.randint(1,sides)
    return d

# Stats functions:
def mean(data):
    """Return the sample arithmetic mean of data."""
    n = len(data)
    if n < 1:
        raise ValueError('mean requires at least one data point')
    return sum(data)/n # in Python 2 use sum(data)/float(n)

def _ss(data):
    """Return sum of square deviations of sequence data."""
    c = mean(data)
    ss = sum((x-c)**2 for x in data)
    return ss

def pstdev(data):
    """Calculates the population standard deviation."""
    n = len(data)
    if n < 2:
        raise ValueError('variance requires at least two data points')
    ss = _ss(data)
    pvar = ss/n # the population variance
    return pvar**0.5

def megatest():
    # Test many times:
    results = {}
    for i in range(40000):
        r = roll_random_number()
        if r not in results.keys():
            results[r] = 1
        else:
            results[r] += 1

    for k,v in results.items():
        if k % 4 == 0:
            print k, ':', '#'*int(v/8), v

    print pstdev(results.values())/mean(results.values())

#megatest()

print dice_array(3)
print roll_random_number()
