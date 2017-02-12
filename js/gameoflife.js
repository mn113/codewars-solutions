function getGeneration(input, generations){

    // Make copy:
    var cells = transpose(transpose(input));

    while (generations > 0) {
        // Make more cells:
        expandGrid();
        // Iterate game:
        changeCells(computeChanges());
        // Clean up:
        shrinkGrid('vert');
        shrinkGrid('horiz');
        generations--;
    }
    return cells;


    function computeChanges() {
        var changes = {
            'toLive':[],
            'toDie':[]
        };
        for (var y = 0; y < cells.length; y++) {
            for (var x = 0; x < cells[0].length; x++) {
                var thisCell = cells[y][x];
                var around = liveNeighbours(x,y).length;

                // Game of Life rules:
                if (thisCell === 1) {
                    if (around < 2 || around > 3) changes['toDie'].push({'x':x,'y':y});
                }
                else {
                    if (around === 3) changes['toLive'].push({'x':x,'y':y});
                }
            }
        }
        return changes;
    }

    function changeCells(changes) {
        changes['toDie'].forEach(function(d) {
            cells[d.y][d.x] = 0;
        });
        changes['toLive'].forEach(function(d) {
            cells[d.y][d.x] = 1;
        });
    }

    function expandGrid() {
        // Add an empty row/column to each side, for game overflow:
        for (var r = 0; r < cells.length; r++) {
            cells[r].push(0);
            cells[r].unshift(0);
        }
        cells.push(Array(cells[0].length).fill(0));
        cells.unshift(Array(cells[0].length).fill(0));
    }

    function shrinkGrid(mode) {
        // Easier to shrink vertically, so horiz shrink will use pre- & post-transposition
        if (mode === 'horiz') cells = transpose(cells);

        // Eliminate empty rows at top/bottom:
        while (cells[0].indexOf(1) === -1) cells.shift();
        while (cells[cells.length-1].indexOf(1) === -1) cells.pop();

        if (mode === 'horiz') cells = transpose(cells);
    }

    function liveNeighbours(x,y) {
        // Get valid neighbours' coords:
        var neighbs = [[x-1,y-1], [x,y-1], [x+1,y-1],
                       [x-1,y  ],          [x+1,y  ],
                       [x-1,y+1], [x,y+1], [x+1,y+1]];

        return neighbs.filter(n => isValidCell(n[0],n[1]) && cells[n[1]][n[0]] === 1);
    }

    function isValidCell(x,y) {
        // Is (x,y) in the grid?
        var h = cells.length, w = cells[0].length;
        return (x >= 0 && x < w) && (y >= 0 && y < h);
    }

    function transpose(matrix) {
        var flipped = [];
        for (var x = 0; x < matrix[0].length; x++) {
            flipped.push([]);
            for (var y = 0; y < matrix.length; y++) {
                flipped[x].push(matrix[y][x]);
            }
        }
        return flipped;
    }
}

var gliders = [
  [[1,0,0],
   [0,1,1],
   [1,1,0]],
  [[0,1,0],
   [0,0,1],
   [1,1,1]]
];
console.log(getGeneration(gliders[0], 10));
