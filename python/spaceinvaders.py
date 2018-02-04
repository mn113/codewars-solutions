def blast_sequence(aliens, player):
    return Game(aliens, player).run()


class Game(object):
    def __init__(self, aliens, player):
        # Wrap each cell in array:
        self.aliens = [[[a] if abs(a) > 0 else [] for a in r] for r in aliens]
        self.player_x = player[1]
        self.player_y = player[0]
        self.died = False
        self.width = len(self.aliens[0])


    def extend_grid(self, num_rows):
        while num_rows > 0:
            self.aliens.append([[] for x in range(self.width)])
            num_rows -= 1


    def print_grid(self):
        for row in self.aliens:
            print(row)


    def run(self):
        self.hit_blasts = []
        t = 0
        while self.count_all_aliens() > 0:
            t += 1
            # Extend grid if aliens in bottom row:
            if self.count_row(-1) > 0:
                self.extend_grid(1)
            # Move each alien and see if one gets us:
            self.move_all_aliens()
            if self.died:
                return None
            # Blast them - hit or miss?
            if self.blast(t):
                self.hit_blasts.append(t-1)
            #print(self.count_all_aliens(), "aliens remain")
        # Killed all aliens:
        return self.hit_blasts


    def count_row(self, y):
        return sum([len(a) for a in self.aliens[y]])


    def count_all_aliens(self):
        return sum([self.count_row(y) for y in range(len(self.aliens))])


    def move_all_aliens(self):
        empty_grid = [[[] for x in range(self.width)] for y in range(len(self.aliens))]
        for y in range(len(self.aliens)):
            for x in range(self.width):
                for a in range(len(self.aliens[y][x])):
                    val = self.aliens[y][x][a]
                    dest = self.move_alien(x,y,val)
                    if (dest):
                        empty_grid[dest[1]][dest[0]].append(dest[2])
                    else:
                        return
        self.aliens = empty_grid


    def move_alien(self, x, y, val):
        dir = val // abs(val)

        moved = 0
        # Move along same row:
        while moved < abs(val) and x + dir >= 0 and x + dir < self.width:
            x += dir
            moved += 1
        # Enter next row (create it if necessary):
        if moved < abs(val):
            y += 1
            if y == self.player_y:
                print(val, "got you!")
                self.died = True # game over soon
                return False
            moved += 1
            dir *= -1 # reverse dir
            val *= -1
        # Move along next row:
        while moved < abs(val) and x + dir >= 0 and x + dir < self.width:
            x += dir
            moved += 1

        return [x,y,val]


    def blast(self, t):
        x = self.player_x
        y = len(self.aliens)
        while y > 0:
            y -= 1
            victims = self.aliens[y][x]
            if len(victims) > 0:
                # Blast kills who? sort by 1: max(abs(v)), 2: max(v)
                victims.sort() # lo to hi
                if abs(victims[0]) > abs(victims[-1]):
                    victims.reverse()
                v = victims.pop()
                #print(v, "got blasted at", x, y, "by blast", t-1)
                return True
        # Missed everyone:
        #print("blast missed")
        return False
