#! /usr/bin/env python
# Solve the Josephus problem - various ways

# Recursive method:
def josephus0(total,k):
    return 1 if total == 1 else ((josephus0(total-1,k) + k-1) % total) + 1


# Linked-list method:
def josephus1(total,k):
    men = dict(zip(list(range(1,total+1)), list(range(2,total+2))))
    men[total] = 1  # link final value back to first key, creating circle

    i = total
    while len(men) > 1:
        for step in range(k):
            i, prev = men[i], i
        # Kill him / take out of the chain
        # by assigning value of i+1 to key i-1:
        men[prev] = men[i]
        del men[i]
        i = prev

    return men.popitem()[0]


# List-slicing method:
def josephus2(total,k):
    men = list(range(1,total+1))
    i = -1
    while len(men) > 1:
        i = (i + k) % len(men)
        men = men[:i] + men[i+1:]
        i -= 1

    return men[0]


print josephus1(7,3)     # 4
print josephus1(11,19)   # 10
print josephus1(1,300)   # 1
print josephus1(14,2)    # 13
print josephus1(100,1)   # 100
#print josephus0(2349,2325)  # exceeds max recusion depth
#print josephus1(2349,2325)  # 924 locally   # exceeds 12000ms on CodeWars
print josephus2(2349,2325)  # 924
