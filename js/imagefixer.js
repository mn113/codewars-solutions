function fixImage(statement, image) {
    // Parse input:
    var rgb = parseColours(statement);
    var ops = parseOperators(statement);

    // Loop through image rows, & row pixels:
    return image.map(function(row) {
        return row.map(function(rgbPixel) {
            // Perform each undoing operation on each pixel colour value:
            rgb.forEach(function(val) {
                ops.forEach(function(op) {
                    rgbPixel[val] = undoOp(op, rgbPixel[val]);
                });
                // Correct rounding errors:
                rgbPixel[val] = Math.round(rgbPixel[val]);
            });
            return rgbPixel;
        });
    });
}

function parseColours(statement) {
    // Look for colour names in the statement and return an array of r|g|b
    var cols_re = /Green|Blue|Red/g;
    var colours = cols_re[Symbol.match](statement);
    // Decide which colours to act on:
    var rgb = ['r','g','b'];
    if (colours) rgb = colours.map(rgbMapper);
    return rgb;
}

function parseOperators(statement) {
    // Look for math words in the statement and return an array of strings
    var ops_re = /(?:multiply|divide|plus|minus) (?:\d+)/g;
    var ops = ops_re[Symbol.match](statement);
    if (ops) ops.reverse();
    return ops;
}

function undoOp(string, value) {
    // Reverse the operation specified by string e.g. "multiply 5"
    var modifier = parseInt(string.split(" ")[1]);
    if (string.startsWith("mult")) return value / modifier;
    if (string.startsWith("div")) return value * modifier;
    if (string.startsWith("plus")) return value - modifier;
    if (string.startsWith("minus")) return value + modifier;
}

function rgbMapper(c) {
    // Convert colour names to single letters
    return (c === 'Green') ? 'g' : (c === 'Red') ? 'r' : (c === 'Blue') ? 'b' : null;
}
