def memoize(f):
    """ Memoization decorator for a function taking one or more arguments. """
    class memodict(dict):
        def __getitem__(self, *key):
            return dict.__getitem__(self, key)

        def __missing__(self, key):
            ret = self[key] = f(*key)
            return ret

    return memodict().__getitem__

def total_var(limit, colorlist):
    return [
        find_sufficient_colors(limit, len(colorlist)),
        total_permutations(len(colorlist))
    ]

@memoize
def total_permutations(maxcolors):
    return sum([count_permutations(maxcolors, colors+1) for colors in range(maxcolors)])

def count_permutations(maxcolors, colors):
     return factorial(maxcolors) // factorial(maxcolors - colors)

def factorial(n):
    res = 1
    while n > 1:
        res *= n
        n -= 1
    return res

def find_sufficient_colors(limit, colors):
    while total_permutations(colors) <= limit:
        colors += 1
    return colors

