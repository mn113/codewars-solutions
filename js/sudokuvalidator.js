var Sudoku = function(data)
{
    var h = data.length,
        ideals = [1];
    // Generate ideal digits:
    while (ideals.length < h) ideals.unshift(ideals[0] + 1);
    ideals.sort();   // [1,2,3,4,5,6,7,8,9]

    // Must be a square:
    function structureValid() {
        if (!Number.isInteger(Math.sqrt(h))) return false;
        for (var i in data) {
            if (data[i].length !== h) return false;
        }
        return true;
    }

    // Every row must contain 1-9:
    function rowsValid() {
        for (var r = 0; r < h; r++) {
            // Compare row with ideals array, first by length, then by values:
            var row = data[r].slice().sort();
            if (row.length !== ideals.length) return false;
            else {
                for (var i = 0; i < row.length; i++) {
                    if (row[i] !== ideals[i]) return false;
                }
            }
        }
        return true;
    }

    // Every column must contain 1-9:
    function colsValid() {
        var col;
        for (var c = 0; c < h; c++) {
            col = [];
            for (var r = 0; r < h; r++) {
                col.push(data[r][c]);
            }
            col.sort();
            // Compare col with ideals array, first by length, then by values:
            if (col.length !== ideals.length) return false;
            else {
                for (var i = 0; i < col.length; i++) {
                    if (col[i] !== ideals[i]) return false;
                }
            }
        }
        return true;
    }

    // Each 3x3 box must contain 1-9:
    function boxesValid() {
        var box,
            boxh = Math.sqrt(h);
        // 3x3 loop:
        for (var i = 1; i <= boxh; i++) {
            // Determine box position:
            var start = boxh * (i-1),
                end = boxh * i;
            box = [];
            // Build a box:
            for (var j = start; j < end; j++) {
                for (var k = start; k < end; k++) {
                    box.push(data[j][k]);
                }
            }
            box.sort();
            // Compare box with ideals array, first by length, then by values:
            if (box.length !== ideals.length) return false;
            else {
                for (var x = 0; x < box.length; x++) {
                    if (box[x] !== ideals[x]) return false;
                }
            }
        }
        return true;
    }

    // Public methods
    return {
        isValid: function() {
            return (structureValid() && rowsValid() && colsValid() && boxesValid());
        }
    };
};


var goodSudoku1 = new Sudoku([
    [7,8,4, 1,5,9, 3,2,6],
    [5,3,9, 6,7,2, 8,4,1],
    [6,1,2, 4,3,8, 7,5,9],

    [9,2,8, 7,1,5, 4,6,3],
    [3,5,7, 8,4,6, 1,9,2],
    [4,6,1, 9,2,3, 5,8,7],

    [8,7,6, 3,9,4, 2,1,5],
    [2,4,3, 5,6,1, 9,7,8],
    [1,9,5, 2,8,7, 6,3,4]
]);

var goodSudoku2 = new Sudoku([
    [1,4, 2,3],
    [3,2, 4,1],

    [4,1, 3,2],
    [2,3, 1,4]
]);

var badSudoku1 = new Sudoku([
    [1,2,3, 4,5,6, 7,8,9],
    [1,2,3, 4,5,6, 7,8,9],
    [1,2,3, 4,5,6, 7,8,9],

    [1,2,3, 4,5,6, 7,8,9],
    [1,2,3, 4,5,6, 7,8,9],
    [1,2,3, 4,5,6, 7,8,9],

    [1,2,3, 4,5,6, 7,8,9],
    [1,2,3, 4,5,6, 7,8,9],
    [1,2,3, 4,5,6, 7,8,9]
]);

var badSudoku2 = new Sudoku([
    [1,2,3,4,5],
    [1,2,3,4],
    [1,2,3,4],
    [1]
]);

var evilSudoku = new Sudoku([
    [1,3, 2,4],
    [3,2, 4,1],

    [2,4, 1,3],
    [4,1, 3,2]
]);

console.log(goodSudoku1.isValid());
console.log(goodSudoku2.isValid());
console.log(badSudoku1.isValid());
console.log(badSudoku2.isValid());
console.log(evilSudoku.isValid());
