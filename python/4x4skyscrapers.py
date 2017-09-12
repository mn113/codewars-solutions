from itertools import permutations

"""
Finds the unique solution for a 4x4 grid of values, given a list of clues
"""
def solve_puzzle (clues):
    rowperms = perms('1234')

    # generate row1+row2s
    grids = [(r1,r2) for r1 in rowperms for r2 in rowperms]
    # reject bad row2s
    grids = filter(lambda grid: no_cols_match(transpose(grid)), grids)

    # generate row3s
    grids = [(g[0],g[1],r3) for g in grids for r3 in rowperms]
    # reject bad row3s
    grids = filter(lambda grid: no_cols_match(transpose(grid)), grids)

    # generate row4s
    grids = [(g[0],g[1],g[2],r4) for g in grids for r4 in rowperms]
    # reject bad row4s
    grids = filter(lambda grid: no_cols_match(transpose(grid)), grids)

    return [g for g in grids if validate_clues(clues, g, transpose(g))][0]


"""
Generates all permutations of e.g. '1234'
"""
def perms(input_str):
    inputs = map(int, [i for i in input_str])
    return list(permutations(inputs, len(input_str)))


"""
Transposes a matrix of rows and columns to columns and rows
"""
def transpose(grid):
    return [[grid[i][j] for i in range(len(grid))] for j in range(len(grid[0]))]


"""
Makes sure each column contains only distinct values
"""
def no_cols_match(cols):
    good_cols = map(lambda arr: len(arr) == len(set(arr)), cols)
    return False not in good_cols


"""
Validates a list of 16 clues against their 16 corresponsing rows and columns
"""
def validate_clues(clues, rows, cols):
    sight_tests = [0]*16

    for i in range(0,16):
        if clues[i] != 0:
            if i in range(0,4):
                sight_tests[i] = look_line(cols[i])
            if i in range(4,8):
                sight_tests[i] = look_line(rows[i-4][::-1])
            if i in range(8,12):
                sight_tests[i] = look_line(cols[::-1][i-8][::-1])
            if i in range(12,16):
                sight_tests[i] = look_line(rows[::-1][i-12])

    return list(clues) == sight_tests


"""
Counts the number of buildings "seen" (not obscured behind taller buildings) looking side-on
"""
def look_line(arr):
    i = 0
    hi = arr[0]
    count = 0
    while i < len(arr):
        if arr[i] >= hi:
            count += 1
            hi = arr[i]
        i += 1
    return count
