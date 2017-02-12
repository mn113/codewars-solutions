function Cell(x,y,val) {
    this.x = x;
    this.y = y;
    this.val = val;
}

function solveMine(mineMap, n){
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
    //console.log(cells);

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
                visited.push(cell);
                clickAround(cell);
            }
            passes++;
            console.log("Visited:", visited.length);
            console.log(board);
        }
        // Wait...
        setTimeout(function() {
            // Stringify for '?' check:
            mineMap = board.map(row => row.join(' ')).join('\n');
            var qs = (mineMap.match(/\?/g)||[]).length;
            console.log(qs, 'unknowns remaining');

            // Try to resolve stalemate:
            if (qs < 10 && qs > 1) {
                console.log("Analysing situation...");
                analyse();
            }

            // Stringify for output:
            mineMap = board.map(row => row.join(' ')).join('\n');
            return (mineMap.includes('?')) ? '?' : mineMap;
        }, 2000);

    }());


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
        console.log('marking', c, 'now found', minesFound, 'mines');
        if (minesFound === n) {
            // Board is safe, finish it off:
            var remaining = findAll('?');
            remaining.forEach(function(c) {
                clickCell(c,'finish off');
            });
        }
    }


    function clickCell(c) {
        var numMinesHere = open(c.y,c.x);
        board[c.y][c.x] = numMinesHere;
        c.val = numMinesHere;
        visited.push(c);
        console.log('clicking', c, '->', numMinesHere, 'mines');
    }


    function clickAround(c) {
        var numMinesHere = parseInt(c.val);
        console.log('clicking around', c, '(', numMinesHere,')');

        // Get neighbours:
        var knownMines = neighbours(c,'x'),
            unknowns = neighbours(c,'?');
        console.log(numMinesHere, 'm', knownMines.length, 'x', unknowns.length, '?');  // ok

        // Open neighbours:
        if (numMinesHere === 0 || numMinesHere === knownMines.length) {
            //console.log('Im going to click all unknowns...');
            // Click all '?'s
            unknowns.forEach(function(unCell) {
                //console.log('cl',un);
                clickCell(unCell);
            });
        }
        else if (numMinesHere === knownMines.length + unknowns.length) {
            //console.log('Im going to mark all unknowns...');
            // Mark all '?'s as 'x'
            unknowns.forEach(function(mineCell) {
                //console.log('mk',um);
                markMine(mineCell);
            });
        }
        else {
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
        var cells = [];
        for (var y = 0; y < height; y++) {
            for (var x = 0; x < width; x++) {
                if (board[y][x] === '?') cells.push([x,y]);
            }
        }
        console.log("Remaining:", cells);
        var sums = cells.map(function(cell) {
            // Sum the numerical neighbours:
            var nbs = neighbours(cell).filter(n => !['?','x'].includes(board[n[1]][n[0]]));
            return [cell, nbs.reduce(function(a,b) { return a+b; }, 0)];
        });
        sums.sort((a,b) => a[1] - b[1]);
        console.log("Sums:", sums);
        var lowCell = sums[0][0];
        clickCell(lowCell[0], lowCell[1], 'Analysis');
    }
}
