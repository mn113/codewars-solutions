// Test:
var map1 =
`? ? ? ? ? ?
? ? ? ? ? ?
? ? ? 0 ? ?
? ? ? ? ? ?
? ? ? ? ? ?
0 0 0 ? ? ?`;
var result1 =
`1 x 1 1 x 1
2 2 2 1 2 2
2 x 2 0 1 x
2 x 2 1 2 2
1 1 1 1 x 1
0 0 0 1 1 1`;
var resBoard = new Board(result1);
//console.log(resBoard.toString());
const open = (y,x) => resBoard.board[y][x];
//console.log(open(4,4));
console.log(solveMine(map1,6));


function Cell(x,y,val) {
    return {x, y, val};
}

function Board(inputStr, totalMines) {
    // Set up board:
    this.board = inputStr.split('\n').map(row => row.split(' '));
    this.height = this.board.length;
    this.width = this.board[0].length;
    this.totalMines = totalMines;
    this.minesFound = 0;
    this.interesting = [];
    this.visited = [];

    // Initialise cells:
    this.cells = [];
    for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++) {
            this.cells.push(new Cell(x,y, this.board[y][x]));
        }
    }

    this.setCellVal = function(x,y,val) {
        this.board[y][x] = val;
        // Find and set appropriate cell:
        for (var c of this.cells) {
            if (c.x === x && c.y === y) {
                c.val = val;
                break;
            }
        }
    };

    this.getInteresting = function() {
        this.interesting =  this.interesting.concat(this.findAll('0'))
                                            .concat(this.findAll('1'))
                                            .concat(this.findAll('2'))
                                            .concat(this.findAll('3'));
    };

    this.findAll = function(matchChar) {
        var found = [];
        // Search for everything that matches matchChar:
        for (var c of this.cells) {
            if (c.val === matchChar) {
                if (!this.visited.includes(c) && !this.interesting.includes(c)) {
                    found.push(c);
                }
            }
        }
        //console.log('Found', found.length, 'of', matchChar);
        return found;
    };

    this.clickCell = function(c) {
        var numMinesHere = open(c.y,c.x);
        //console.log(c, '->', numMinesHere, 'mines');
        this.board[c.y][c.x] = numMinesHere;
        c.val = numMinesHere;
    };

    this.clickAround = function(c) {
        var numMinesHere = parseInt(c.val);
        //console.log('clicking around', c, '(', numMinesHere,')');

        // Get neighbours:
        var knownMines = this.neighbours(c,'x'),
            unknowns = this.neighbours(c,'?');
        //console.log(numMinesHere, 'm', knownMines.length, 'x', unknowns.length, '?');  // ok

        // Open neighbours:
        if (numMinesHere === 0 || numMinesHere === knownMines.length) {
            // Click all '?'s:
            unknowns.forEach(unCell => this.clickCell(unCell));
            this.visited.push(c);
        }
        else if (numMinesHere === knownMines.length + unknowns.length) {
            // Mark all '?'s as 'x':
            unknowns.forEach(mineCell => this.markMine(mineCell));
            this.visited.push(c);
        }
    };

    this.markMine = function(c) {
        c.val = 'x';
        this.setCellVal(c.x,c.y,'x');
        this.minesFound++;
        //console.log('marking', c, ', now found', this.minesFound, '/', this.totalMines, 'mines');
        // Check if we're done:
        if (this.minesFound === this.totalMines) {
            // Board is safe, finish it off:
            this.findAll('?').forEach(c => this.clickCell(c));
        }
    };

    this.neighbours = function(c, matchChar) {
        // Get valid neighbours' coords:
        var x = c.x, y = c.y;
        var coords = [[x-1,y-1], [x,y-1], [x+1,y-1],
                      [x-1,y  ],          [x+1,y  ],
                      [x-1,y+1], [x,y+1], [x+1,y+1]];

        coords = coords.filter(n => this.isValidCell(n[0],n[1]));
        if (matchChar !== '') {
            coords = coords.filter(n => this.board[n[1]][n[0]] === matchChar);
        }

        // Find those coords as cell objects:
        var validCells = [];
        for (var nb of coords) {
            for (var cell of this.cells) {
                if (nb[0] === cell.x && nb[1] === cell.y) validCells.push(cell);
            }
        }
        return validCells;
    };

    this.isValidCell = function(x,y) {
        // Is (x,y) in the board?
        var h = this.board.length, w = this.board[0].length;
        return (x >= 0 && x < w) && (y >= 0 && y < h);
    };

    this.toString = function() {
        // Stringify for output:
        return this.board.map(row => row.join(' ')).join('\n');
    };
}

function solveMine(mineMap, totalMines) {
    var board = new Board(mineMap, totalMines);

    // Check all zeros, then all 1s, 2s... (multiple times)
    var passes = 0;
    while (passes < 6) {
        console.log("-- Pass", passes);
        board.getInteresting();
        console.log("Interesting:", board.interesting.length);
        while(board.interesting.length > 0) {
            board.clickAround(board.interesting.shift());
        }
        console.log("Visited:", board.visited.length);
        passes++;
    }

    // All procedural moves made, onto part 2:
    return solveEndgame(board);
}

function solveEndgame(board) {
    var remaining = board.findAll('?');
    var rMines = board.totalMines - board.minesFound;
    var solutions = [];
    console.log("Remaining:", remaining);
    console.log(rMines, "mines left");

    if (remaining.length === 0) {
        return board.toString();
    }
    else {
        // Try to resolve stalemate with permutations:
        console.log("Starting permutations...");
        var perms = simplePerms(rMines, remaining.length);
        for (var p of perms) {
            var sol = generateSolution(p);
            if (validateSolution(sol)) {
                console.log("VALID!");
                solutions.push(sol);
            }
        }
        // TODO: Reset remaining cells to '?'
        console.log(solutions.length, 'possible solutions');
        if (solutions.length > 1) {
            var betterSolutions;
            while (true) {
                betterSolutions = reduceSolutions(solutions);   // worst case, no change in solutions
                if (betterSolutions) solutions = betterSolutions;   // keep smaller amount
                else break;                                           // break when number stops decreasing
            }
            if (solutions.length !== 1) {
                return '?';                          // Unsolvable
            }
            else {
                return outputFinal(solutions[0]);     // 1 solution
            }
        }
        else {
            return outputFinal(solutions[0]);    // 1 solution
        }
    }

    function outputFinal(goodBoard) {
        // Safely open the final '?'s of solution:
        goodBoard.findAll('?').forEach((c) => goodBoard.clickCell(c));
        console.log(goodBoard.board);
        return goodBoard.toString();
    }

    function reduceSolutions(solutions) {
        if (!solutions) return false;
        // Need to try to reduce further:
        var betterSolutions = [];
        var safeCells = compareSolutions(solutions);
        console.log('safe:\n',safeCells);
        // Then click and eliminate some remaining cells
        for (var c of safeCells) {
            //console.log(c);
            // Open cell and remove from remainaing:
            c.val = open(c.y,c.x);
            remaining.splice(remaining.indexOf(c));
            console.log(remaining.length, "remaining");
            // Apply cell val to all solutions...
            for (var soln of solutions) {
                soln.setCellVal(c.x,c.y,c.val);
                if (!validateSolution(soln)) betterSolutions.push(soln);
            }
        }
        console.log('Better:\n', betterSolutions.length);
        return (betterSolutions.length > 0 && betterSolutions.length < solutions.length) ? betterSolutions : false;
    }

    function compareSolutions(solutions) {
        // Compare solutions (NOT as JSON!) and find safe squares (never marked as mine):
        var solBoards = solutions.map(sol => sol.board);
        var safeCells = [];
        for (var rCell of remaining) {
            var safe = true;
            for (var solb of solBoards) {
                if (solb[rCell.y][rCell.x] === 'x') safe = false;  // not universally safe
            }
            if (safe) safeCells.push(rCell);
        }
        return safeCells;
    }

    function generateSolution(comboStr) {
        console.log("Generating solution with", comboStr);
        //var combo = comboStr.split('');
        // Make a new Board object, via string, so it does not reference existing one:
        var sol = new Board(board.toString());
        for (var i = 0; i < remaining.length; i++) {
            var rCell = remaining[i];
            rCell.val = comboStr[i];
            // Load into solution:
            sol.setCellVal(rCell.x, rCell.y, rCell.val);
        }
        return sol;
    }

    function validateSolution(sol) {
        // Examine neighbours of remaining cells:
        for (var rCell of remaining) {
            //console.log("From", rCell);
            var nbs = sol.neighbours(rCell,'');
            for (var nbCell of nbs) {
                if (nbCell.val === 'x' || nbCell.val === '?') continue;
                var minesHere = sol.neighbours(nbCell, 'x').length;
                //console.log("Test", nbCell, 'i see', minesHere);
                if (parseInt(nbCell.val) !== minesHere) {
                    //console.log("INVALID!");
                    return false; // error in this solution
                }
            }
        }
        // No errors
        return true;
    }

    function simplePerms(mines, spaces) {
        var basis = Array.from('x'.repeat(mines)).concat(Array.from('?'.repeat(spaces-mines)));
        return perms(basis);

        function perms(arr) {
            var res = [''];
            for (var i = 0; i < arr.length; i++) {
                while (res[res.length-1].length === i) {
                    var last = res.pop().split('');
                    for (var j = 0; j <= last.length; j++) {
                        var copy = last.slice();
                        copy.splice(j, 0, arr[i]);
                        var copyStr = copy.join('');
                        if (!res.includes(copyStr)) res.unshift(copyStr);	// keep unique
                    }
                }
            }
            return res;
        }
    }
}
