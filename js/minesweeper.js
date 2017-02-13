function Cell(x,y,val) {
    this.x = x;
    this.y = y;
    this.val = val;
}

function solveMine(mineMap, totalMines){
    // Convert board:
    var board = mineMap.split('\n')
                       .map(row => row.split(' '));
    var height = board.length,
        width = board[0].length;

    // Initialise cells:
    var cells = [];
    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
            cells.push(new Cell(x,y,board[y][x]));
        }
    }

    var minesFound = 0,
        interesting = [],
        visited = [];

    // Start solving:
    return (function() {
        // Check all zeros, then all 1s, 2s... (multiple times)
        var passes = 0;
        while (passes < 5) {
            console.log("-- Pass", passes);
            interesting = interesting.concat(findAll('0'));
            interesting = interesting.concat(findAll('1'));
            interesting = interesting.concat(findAll('2'));    // more?
            console.log("Interesting:", interesting.length);
            while(interesting.length > 0) {
                var cell = interesting.shift();
                //visited.push(cell);    // only put them into visited here
                clickAround(cell);
            }
            passes++;
            console.log("Visited:", visited.length);
            console.log(board);
        }
        return solveEndgame();

    }());

    function solveEndgame() {
        var remaining = findAll('?');
        var rMines = totalMines - minesFound;
        var solutions = [];
        console.log("Remaining:", remaining);
        console.log("Interesting:", interesting);
        console.log(rMines, "mines left");
        if (remaining.length > 0) {
            // Try to resolve stalemate:
            console.log("Starting permutations...");
            var perms = simplePerms(rMines, remaining.length);
            for (var p of perms) {
                generateSolution(p);
            }
            if (solutions.length > 1) return '?';
            else {
                // Stringify for output:
                mineMap = board.map(row => row.join(' ')).join('\n');
                return (mineMap.includes('?')) ? '?' : mineMap;
            }
        }
        else {
            // Stringify for output:
            mineMap = board.map(row => row.join(' ')).join('\n');
            return (mineMap.includes('?')) ? '?' : mineMap;
        }

        function simplePerms(mines, spaces) {
            var basis = Array.from('x'.repeat(mines)).concat(Array.from('?'.repeat(spaces-mines)));
            var permutations = [];
            doPerm(basis, []);
            return permutations;

            function doPerm(str, arr) {
                if (typeof str === 'string') str = str.split('');
                if (str.length === 0 && !permutations.includes(arr.join(''))) {
                    permutations.push(arr.join(''));
                }
                for (var i = 0; i < str.length; i++) {
                    var x = str.splice(i, 1);
                    arr.push(x);
                    doPerm(str, arr);
                    arr.pop();
                    str.splice(i, 0, x);
                }
            }
        }

        function generateSolution(comboStr) {   // TODO: not finished
            var combo = comboStr.split('');
            for (var i = 0; i < combo.length; i++) {
                remaining[i].val = combo[i];
            }
            console.log(remaining);
            if (validateSolution(sol)) {
                solutions.push(sol);
            }
            // reset
            for (var r of remaining) {
                r.val = '?';
            }
        }

        function validateSolution(sol) {    // TODO: not finished
            for (var y = 0; y < height; y++) {
                for (var x = 0; x < width; x++) {
                    // Find respective cell object:
                    for (var cell of cells) {
                        if (x === cell.x && y === cell.y) {
                            if (cell.val !== neighbours(cell, 'x').length) return false;  // error in this solution
                            break;
                        }
                    }
                }
            }
            return true;
        }

    }

    function neighbours(c, matchChar) {
        // Get valid neighbours' coords:
        var x = c.x, y = c.y;
        var neighbs = [[x-1,y-1], [x,y-1], [x+1,y-1],
                       [x-1,y  ],          [x+1,y  ],
                       [x-1,y+1], [x,y+1], [x+1,y+1]];

        neighbs = neighbs.filter(n => isValidCell(n[0],n[1]) && board[n[1]][n[0]] === matchChar);

        // Find those as cell objects:
        var validCells = [];
        for (var nb of neighbs) {
            for (var cell of cells) {
                if (nb[0] === cell.x && nb[1] === cell.y) validCells.push(cell);
            }
        }
        return validCells;
    }


    function isValidCell(x,y) {
        // Is (x,y) in the board?
        var h = board.length, w = board[0].length;
        return (x >= 0 && x < w) && (y >= 0 && y < h);
    }


    function markMine(c) {
        board[c.y][c.x] = 'x';
        c.val = 'x';
        minesFound++;
        console.log('marking', c, ', now found', minesFound, '/', totalMines, 'mines');
        if (minesFound === totalMines) {
            // Board is safe, finish it off:
            var remaining = findAll('?');
            remaining.forEach(function(c) {
                clickCell(c);
            });
        }
    }


    function clickCell(c) {
        var numMinesHere = open(c.y,c.x);
        board[c.y][c.x] = numMinesHere;
        c.val = numMinesHere;
        //visited.push(c);
        console.log('clicking', c, '->', numMinesHere, 'mines');
    }


    function clickAround(c) {
        var numMinesHere = parseInt(c.val);
        console.log('clicking around', c, '(', numMinesHere,')');

        // Get neighbours:
        var knownMines = neighbours(c,'x'),
            unknowns = neighbours(c,'?');
        //console.log(numMinesHere, 'm', knownMines.length, 'x', unknowns.length, '?');  // ok

        // Open neighbours:
        if (numMinesHere === 0 || numMinesHere === knownMines.length) {
            //console.log('Im going to click all unknowns...');
            // Click all '?'s
            unknowns.forEach(function(unCell) {
                //console.log('cl',un);
                clickCell(unCell);
            });
            visited.push(c);
        }
        else if (numMinesHere === knownMines.length + unknowns.length) {
            //console.log('Im going to mark all unknowns...');
            // Mark all '?'s as 'x'
            unknowns.forEach(function(mineCell) {
                //console.log('mk',um);
                markMine(mineCell);
            });
            visited.push(c);
        }
        else {
            // Cell remains of interest
            //interesting.push(c);
            console.log('No action possible here');
            //console.log(board);
        }
        //console.log('Finished with', [x,y]);
    }


    function findAll(matchChar) {
        var found = [];
        // Search for everything that matches matchChar:
        for (var c of cells) {
            if (c.val === matchChar) {
                if (!visited.includes(c) && !interesting.includes(c)) {
                    found.push(c);
                }
            }
        }
        console.log('Found', found.length, 'of', matchChar);
        return found;
    }


    function analyse() {
        // Clear up doubt about remaining '?' cells:
        var sums = findAll('?').map(function(cell) {
            // Sum the numerical neighbours:
            var nbs = neighbours(cell).filter(c => c.val !== 'x' && c.val !=='?');
            return [cell, nbs.reduce(function(a,b) { return a+b; }, 0)];
        });
        sums.sort((a,b) => a[1] - b[1]);
        console.log("Sums:", sums);
        var lowCell = sums[0][0];
        clickCell(lowCell);
    }
}
