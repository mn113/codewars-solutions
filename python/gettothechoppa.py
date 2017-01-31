#! /usr/bin/env python
# BFS - shortest path through a node graph

def neighbours(node, grid):
    w, h  = len(grid[0]), len(grid)
    x, y  = node.coords[0], node.coords[1]
    # Shift one place, but don't go outside grid:
    up    = grid[max(y-1, 0)][x]
    down  = grid[min(y+1, h-1)][x]
    left  = grid[y][max(x-1, 0)]
    right = grid[y][min(x+1, w-1)]
    # Only return passable nodes:
    return [nb for nb in [up, down, left, right] if nb != node and nb.passable]

#def manhattan_dist(a,b):
#    return abs(a.coords[0] - b.coords[0]) + abs(a.coords[1] - b.coords[1])

def find_shortest_path(grid, start_node, end_node):
    dist_to = {start_node: 0}    # measures steps to each node
    to_visit = [start_node]
    came_from = {start_node: None}   # traces the path taken
    maxsteps = 1000
    minsteps = manhattan_dist(start_node, end_node)

    while len(to_visit) > 0:
        current = to_visit.pop()
        print "Visiting", current, dist_to[current]

        if current == end_node:
            # Store shortest distance:
            maxsteps = dist_to[current]
            print 'GOAL!', len(to_visit), "to see"
            if minsteps == dist_to[current]:
                # Shortest path found!
                break
            # Keep searching, to guarantee shortest:
            continue

        # Give up when path is too long:
        if dist_to[current] >= maxsteps:
            continue

        neighbs = neighbours(current, grid)

        # Give up if at dead end:
        if len(neighbs) == 1 and neighbs[0] != end_node:
            continue

        for nextNode in neighbs:
            # nextNode unseen:
            if nextNode not in dist_to.keys():
                # Add to queue:
                to_visit.append(nextNode)
                # Next node will cost 1 more step than this node did:
                dist_to[nextNode] = dist_to[current] + 1
                came_from[nextNode] = current

            # nextNode seen before:
            else:
                if dist_to[nextNode] > dist_to[current] + 1:
                    # Via current, we have found a new, shorter path to this known nextNode:
                    dist_to[nextNode] = dist_to[current] + 1
                    came_from[nextNode] = current

    # Visuals:
    print_weighted_grid(dist_to, grid)

    # Finished seeing nodes now
    if end_node in came_from.keys():
        print "DONE"
        return traceback(end_node, came_from)
    else:
        return "No path found"

def print_weighted_grid(dist_dict, grid):
    # Insert dict values into grid positions:
    for node,dist in dist_dict.items():
        row = node.coords[0]
        col = node.coords[1]
        grid[row][col] = dist
    # Print grid:
    for y in range(len(grid)):
        for x in range(len(grid[0])):
            # Node or int?
            if isinstance(grid[y][x], Node):
                print ' X ',
            else:
                print str(grid[y][x]).center(3, ' '),
        print ""    # newline

def traceback(goal, came_from):
    parent = came_from[goal]
    nodelist = [goal]
    print goal, "Goal"
    while parent:
        print parent
        nodelist.append(parent)
        parent = came_from[parent]

    nodelist.reverse()
    return nodelist


# Test case:
class Node:
    def __init__(self, position, passable):
        self.coords = position
        self.position = {'x':position[0], 'y':position[1]}  # for CodeWars
        self.passable = passable

    def __hash__(self):
        return hash(self.coords)    # hash tuple version of coords for dict key

    def __eq__(self, other):
        return self.position == other.position

    def __ne__(self, other):
        return not(self == other)

    def __str__(self):
        return str(self.coords)

grid = [[0,0,1,1,0],
        [0,1,0,0,0],
        [0,1,0,1,0],
        [0,0,0,1,0],
        [0,0,0,1,0]]
# Convert above grid:
for y in range(len(grid)):
    for x in range(len(grid[0])):
        grid[y][x] = Node((x,y), grid[y][x] == 0)

# Define start, end:
s = Node((0,0), True)
e = Node((4,4), True)
#print s, e, grid[2][2]

#for nb in neighbours(s, grid):
#    print nb

# Solve grid:
path = find_shortest_path(grid, s, e)
print path
