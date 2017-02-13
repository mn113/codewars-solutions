function Cell(x,y,val) {
    this.x = x;
    this.y = y;
    this.val = val;
}

function solveMine(mineMap, totalMines){
    // Convert board:
    var board = mineMap.split('\n').map(row => row.split(' ')),
        height = board.length,
        width = board[0].length,
        minesFound = 0,
        interesting = [],
        visited = [];

    // Initialise cells:
    var cells = [];
    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
            cells.push(new Cell(x,y,board[y][x]));
        }
    }

    // Start solving:
    return (function() {
        // Check all zeros, then all 1s, 2s... (multiple times)
        var passes = 0;
        while (passes < 6) {
            console.log("-- Pass", passes);
            interesting = interesting.concat(findAll('0'));
            interesting = interesting.concat(findAll('1'));
            interesting = interesting.concat(findAll('2'));
            interesting = interesting.concat(findAll('3'));    // more?
            console.log("Interesting:", interesting.length);
            while(interesting.length > 0) {
                clickAround(interesting.shift());
            }
            passes++;
            console.log("Visited:", visited.length);
            //console.log(board);
        }
        console.log(JSON.stringify(board));
        // All procedural moves made, onto part 2:
        return solveEndgame(findAll('?'));

    }());

    function solveEndgame(remaining) {
        var rMines = totalMines - minesFound;
        var solutions = [];
        console.log("Remaining:", remaining);
        console.log(rMines, "mines left");
        if (remaining.length > 0) {
            // Try to resolve stalemate:
            console.log("Starting permutations...");
            var perms = simplePerms(rMines, remaining.length);
            for (var p of perms) {
                var sol = generateSolution(p);
                if (validateSolution(sol)) {
                    console.log("VALID!");
                    solutions.push(JSON.stringify(sol));  // freeze it
                }
            }
            console.log('All solutions:\n', solutions);
            if (solutions.length > 1) return '?';
            else {
                var goodBoard = JSON.parse(solutions[0]);  // unfreeze it
                console.log(goodBoard);
                // Safely open the final '?'s of solution:
                for (y = 0; y < height; y++) {
                    for (x = 0; x < width; x++) {
                        if (goodBoard[y][x] === '?') goodBoard[y][x] = open(y,x);
                    }
                }
                return outputSingleBoard(goodBoard);
            }
        }
        else {
            return outputSingleBoard(board);
        }

        function outputSingleBoard(board) {
            // Stringify for output:
            return board.map(row => row.join(' ')).join('\n');
        }


        function simplePermsOld(mines, spaces) {   // TODO Exceeds stack size when computing 2 from 10
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


        function generateSolution(comboStr) {
            console.log("Generating solution with", comboStr);
            var combo = comboStr.split('');
            var sol = board;
            for (var i = 0; i < remaining.length; i++) {
                var rCell = remaining[i];
                rCell.val = combo[i];
                // Load into solution:
                sol[rCell.y][rCell.x] = rCell.val;
            }
            return sol;
        }


        function validateSolution(sol) {
            // Examine neighbours of remaining cells:
            for (var rCell of remaining) {
                //console.log("From", rCell);
                var nbs = neighbours(rCell,'');
                for (var nbCell of nbs) {
                    if (nbCell.val === 'x' || nbCell.val === '?') continue;
                    var minesHere = neighbours(nbCell, 'x').length;
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
    }


    function neighbours(c, matchChar) {
        // Get valid neighbours' coords:
        var x = c.x, y = c.y;
        var coords = [[x-1,y-1], [x,y-1], [x+1,y-1],
                      [x-1,y  ],          [x+1,y  ],
                      [x-1,y+1], [x,y+1], [x+1,y+1]];

        coords = coords.filter(n => isValidCell(n[0],n[1]));
        if (matchChar !== '') {
            coords = coords.filter(n => board[n[1]][n[0]] === matchChar);
        }

        // Find those coords as cell objects:
        var validCells = [];
        for (var nb of coords) {
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
        //console.log('marking', c, ', now found', minesFound, '/', totalMines, 'mines');
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
        //console.log('clicking', c, '->', numMinesHere, 'mines');
    }


    function clickAround(c) {
        var numMinesHere = parseInt(c.val);
        //console.log('clicking around', c, '(', numMinesHere,')');

        // Get neighbours:
        var knownMines = neighbours(c,'x'),
            unknowns = neighbours(c,'?');
        //console.log(numMinesHere, 'm', knownMines.length, 'x', unknowns.length, '?');  // ok

        // Open neighbours:
        if (numMinesHere === 0 || numMinesHere === knownMines.length) {
            // Click all '?'s:
            unknowns.forEach(unCell => clickCell(unCell));
            visited.push(c);
        }
        else if (numMinesHere === knownMines.length + unknowns.length) {
            // Mark all '?'s as 'x':
            unknowns.forEach(mineCell => markMine(mineCell));
            visited.push(c);
        }
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
        //console.log('Found', found.length, 'of', matchChar);
        return found;
    }
}
