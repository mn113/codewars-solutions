#! /usr/bin/env python
# CodeWars LCM kata

def kiyo_lcm(grid):
    if grid == [[],[],[],[],[],[],[],[],[]]:
        return 0

    nums = convert_grid(grid)
    print nums

    return lcm(nums)


def convert_grid(grid):
    # Convert grid to sums of odd elements:
    totals = []
    for row in grid:
        tot = 0
        for i in range(len(row)):
            if i % 2 == 0 and isinstance(row[i], (int, long)):
                tot += row[i]
        totals.append(tot)

    return totals


primes = [2,3,5,7,11,13,17,19,23,29,31,37,41,43]  # input cannot exceed 45


def lcm(nums):
    # Get prime factors of each num:
    pfs = prime_factorise(nums)
    baseprimes = []
    print pfs

    # Extract all common primes, starting with 2:
    for p in primes:
        most_p = 0
        for pf in pfs:
            this_many_p = len([x for x in pf if x == p])
            if this_many_p > most_p:
                most_p = this_many_p
        for i in range(most_p):
            baseprimes.append(p)

    # Multiply out:
    print baseprimes
    return reduce(lambda x, y: x*y, baseprimes, 1)


def prime_factorise(nums):
    pfs = []
    for num in nums:
        pf = []
        for p in primes:
            if p > num:
                break
            while num % p == 0:
                pf.append(p)
                num /= p
        pfs.append(pf)

    print pfs
    return pfs


g = [[4, 3, 7, 8, 9, 2, 1, 5, 'c'], [6, 5, 6, 1, 'v', 1, 0, 5, 1], [4, 4, 'c', 7, 6, 6, 3, 6, 7],
     [1, 7, 7, 'l', 5, 8, 9, 5, 9], [0, 't', 8, 2, 8, 9, 0, 8, 0], [4, 6, 2, 6, 'o', 8, 4, 2, 4],
     [3, 6, 9, 2, 0, 8, 2, 3, 'u'], [9, 3, 1, 9, 4, 4, 'u', 7, 7], [0, 'n', 9, 0, 0, 0, 9, 2, 2]]
print kiyo_lcm(g)
