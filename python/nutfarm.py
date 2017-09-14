def shake_tree(tree):
    # Convert to arrays of ints:
    tree = [[0 if c == ' ' else 1 if c == 'o' else c for c in row] for row in tree]
    # Replace tree trunk area with zeros:
    tree = [[0]*len(row) if '|' in row else row for row in tree]

    for i in range(len(tree)):
        tree = shift_my_nuts_once(tree)

    return tree[-1]


def shift_my_nuts_once(tree):
    for i in range(len(tree) - 1):
        for j in range(len(tree[0])):
            if isinstance(tree[i][j], int) and tree[i][j] > 0:    # Nuts found
                n = int(tree[i][j])

                if isinstance(tree[i+1][j], int):     # Nut or space below
                    tree[i+1][j] += n
                    tree[i][j] -= n

                elif tree[i+1][j] == '/':
                    # Shift left continuously
                    k = j
                    while tree[i+1][k] == '/':
                        k -= 1
                    if tree[i+1][k] != "\\":
                        tree[i+1][k] += n
                        tree[i][j] -= n

                elif tree[i+1][j] == '\\':
                    # Shift right continuously
                    k = j
                    while tree[i+1][k] == '\\':
                        k += 1
                    if tree[i+1][k] != '/':
                        # Space for nut found
                        tree[i+1][k] += n
                        tree[i][j] -= n
                else:
                    print(i,j, "Nutston, we have a problem...")
    return tree
