function solveMine(mineMap, n){
    // Convert board:
    var board = mineMap.split('\n')
                       .map(row => row.split(' '));
    var height = board.length,
        width = board[0].length;

    var clicked = [];
    var found = 0;

    // Start solving:
    return (function() {
        // Check all zeros, then all 1s, 2s... (multiple times)
        var passes = 0;
        while (passes < 5) {
            console.log("Pass", passes);
            clickAll('0');
            clickAll('1');
            clickAll('2');
            clickAll('3');
            clickAll('4');  // more?
            passes++;
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


    function neighbours(x,y,matchChar) {
        // Get valid neighbours' coords:
        var neighbs = [[x-1,y-1], [x,y-1], [x+1,y-1],
                       [x-1,y  ],          [x+1,y  ],
                       [x-1,y+1], [x,y+1], [x+1,y+1]];

        return neighbs.filter(n => isValidCell(n[0],n[1]) && board[n[1]][n[0]] === matchChar);
    }


    function isValidCell(x,y) {
        // Is (x,y) in the board?
        var h = board.length, w = board[0].length;
        return (x >= 0 && x < w) && (y >= 0 && y < h);
    }


    function markMine(x,y) {
        board[y][x] = 'x';
        found++;
        console.log('marking', [x,y], 'found', found, 'mines');
        if (found === n) {
            // Board is safe, finish it off:
            clickAll('?');
        }
    }


    function clickCell(x,y, caller) {
        var numMinesHere = open(y,x);
        board[y][x] = numMinesHere;
        clicked.push([x,y]);
        console.log('clicking', [x,y], 'from', caller.toString(), '->', numMinesHere, 'mines');

        // Get neighbours:
        var knownMines = neighbours(x,y,'x'),
            unknowns = neighbours(x,y,'?');
        console.log(numMinesHere, 'm', knownMines.length, 'x', unknowns.length, '?');  // ok
        // Open neighbours:
        if (numMinesHere == 0 || numMinesHere == knownMines.length) {
            console.log('Im going to click all unknowns...');
            // Click all '?'s
            unknowns.forEach(function(un) {
                console.log('cl',un);
                clickCell(un[0],un[1], [x,y]);
            });
        }
        else if (numMinesHere == knownMines.length + unknowns.length) {
            console.log('Im going to mark all unknowns...');
            // Mark all '?'s as 'x'
            unknowns.forEach(function(um) {
                console.log('mk',um);
                markMine(um[0],um[1]);
            });
        }
        else {
            console.log('No action possible here');
        }
        console.log('Finished with', [x,y]);
        return true;
    }


    function clickAll(matchChar) {
        // Search for and click everything that matches matchChar:
        for (var y = 0; y < height; y++) {
            for (var x = 0; x < width; x++) {
                if (board[y][x] === matchChar) {
                    if (clicked.includes([x,y])) {
                        console.log("Seen", [x,y]);
                    }
                    else {
                        console.log("Found one");
                        clickCell(x,y,'clickAll('+matchChar+')');
                    }
                }
            }
        }
        console.log('All', matchChar, 'clicked');
        return true;
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
