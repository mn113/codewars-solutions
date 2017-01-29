function unflatten(array, depth){
    let run = 0;
    while (depth > 0) {
        array = (run % 2) ? runThru(array, true) : runThru(array, false);
        depth--;
        run++;
    }
    return array;
}

function runThru(array, reversing = false) {
    if (reversing) array.reverse();
    var out = [];

    // Loop through array:
    for (var i = 0; i < array.length; i++) {
        var current = array[i];

        // Treat number elements different from sub-arrays:
        switch (typeof current) {
            case 'object':
                // Recurse on the sub-array:
                out.push(runThru(current, reversing));
                break;

            case 'number':
                var remainder = current % (array.length - i);

                // If the remainder-value is 2 or less, extract it only:
                if (remainder <= 2) {
                    out.push(current);
                }
                // If greater than 2, extract a sub-array of remainder length:
                else if (remainder > 2) {
                    var subarray = array.slice(i, Math.min(array.length, i+remainder));
                    if (reversing) subarray.reverse();
                    out.push(subarray);
                    i += remainder - 1;
                }
                break;
        }
    }

    if (reversing) out.reverse();
    return out;
}
