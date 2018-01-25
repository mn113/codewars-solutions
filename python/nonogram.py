import re
from itertools import product

class Nonogram:
    def __init__(self, clues):
        self.vclues, self.hclues = list(clues[0]), list(clues[1])
        self.grid = [[None for x in range(5)] for y in range(5)]
    
    def clue_info_length(self, clue):
        # figure out how many cells (with minimal 0 spacing) the clue defines:
        return sum(list(map(lambda n: 0 if not n else n, clue))) + len(clue) - 1
    
    def expand_clue(self, clue, format):
        # convert clue into a partial row (with minimal 0 spacing):
        data_str = ""
        for n in clue:
            data_str += '1'*n + '0'
        if format == 'list':
            return [int(c) for c in data_str[:-1]]
        else:
            return data_str[:-1]
    
    def tackle_horiz_clues(self):
        # read the h-clues and attempt to fill each grid row:
        for y in range(5):
            row = self.grid[y]
            clue = self.hclues[y]
            if None == clue or None not in row:
                continue
            
            print("c", y, clue)
            row_sum = sum([c for c in row if c is not None])
            clength = self.clue_info_length(clue)
            if clength == 5:
                # perfect clue, so fill entire row:
                self.grid[y] = self.row_from(y, clue)
                print("fullrow", self.grid[y])
                self.hclues[y] = None
            
            elif row_sum == sum(clue):
                # 1's sufficient, so 0's can be filled:
                self.grid[y] = [1 if row[x] == 1 else 0 for x in range(5)]
                print("zerofilled row", y, self.grid[y])
                self.hclues[y] = None
                
            elif row.count(None) == 1:
                # single 1/0 missing:
                empty = row.index(None)
                if row_sum < sum(clue):
                    self.grid[y][empty] = 1
                else:
                    self.grid[y][empty] = 0
                print("final digit row", self.grid[y])
            
            elif clength > 2:
                # do left-right superimposition to get a partial row:
                partial = self.row_left_right(y, clue, clength)
                self.grid[y] = [partial[i] if partial[i] is not None else row[i] for i in range(5)]

            elif row.count(None) == 2:
                # generate all possible rows using 0/1 perms:
                row_str = "".join(list(map(lambda n: '?' if n is None else str(n), row)))
                print("test", row_str)
                rows = list(map(lambda f: self.fill_partial(row,f), product('01', repeat=2)))
                print(rows)
                valid_rows = self.pattern_match(clue, rows)
                if len(valid_rows) == 1:
                    print("sole match", valid_rows[0])
                    self.grid[y] = valid_rows[0]

    def fill_partial(self, row, fill):
        # replace Nones sequentially with the chars in fill:
        new_row = row[:]
        for f in fill:
            new_row[new_row.index(None)] = f
        return "".join(map(lambda n: str(n), new_row))

    def pattern_match(self, clue, rows):
        # use regex to compare clue string with possibilities:
        clue_str = self.expand_clue(clue, 'str')
        print('cs', clue_str)
        valid_rows = filter(re.search(clue_str, rows))
        print(valid_rows)
        return valid_rows

    def row_from(self, y, clue):
        row_str = '0'.join(map(lambda n: '1'*n, clue))
        return [int(c) for c in row_str]
        
    def row_left_right(self, y, clue, clength):
        padding = [None]*(5-clength)
        aligned_left = self.expand_clue(clue, 'list') + padding
        aligned_right = padding + self.expand_clue(clue, 'list')
        combined = [1 if aligned_left[i] and aligned_right[i] else None for i in range(len(aligned_left))]
        print("combined", combined)
        return combined
        
    def transpose(self):
        print("transposing")
        self.hclues, self.vclues = self.vclues, self.hclues
        self.grid = [[self.grid[y][x] for y in range(5)] for x in range(5)]
        
    def count_known_cells(self):
        #s = sum([sum([1 for x in range(5) if self.grid[y][x] not None]) for y in range(5)])
        known = 25 - sum(row.count(None) for row in self.grid)
        print(known, "cells known")
        return known
        
    def render(self):
        print("---")
        for row in self.grid:
            print(list(map(lambda n: 9 if n is None else n, row)))
        print("---")
    
    def solve(self):
        self.count_known_cells()
        passno = 1
        known = 0
        while 1:
            print("pass", passno)
            self.tackle_horiz_clues()
            self.transpose()
            self.tackle_horiz_clues()
            self.transpose()
            self.render()
            passno += 1
            now_known = self.count_known_cells()
            if now_known == known:   # stalled
                break
            known = now_known
        print('hc', self.hclues)
        print('vc', self.vclues)
        return tuple([tuple([self.grid[y][x] for x in range(5)]) for y in range(5)])

