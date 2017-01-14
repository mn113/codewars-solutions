function countCharsBarGraph(text, maxw) {
    text = text.toLowerCase();
    var counts = {};
    for (var i = 0; i < text.length; i++) {
        var c = text[i];
        if ('a' <= c && c <= 'z') {
            // Count occurrences:
            var re = new RegExp(c,"gi");
            counts[c] = text.match(re).length;
        }
    }
    return formatGraph(counts, maxw);
}

function formatGraph(data, maxw) {
    // Sort data by length, then alphabetical:
    var lines = [];
    for (var point in data) {
        if (data.hasOwnProperty(point)) {
            lines.push([point, data[point]]);
        }
    }
    lines.sort(function(a,b) {
        if (a[1] === b[1]) return a[0].localeCompare(b[0]);
        return b[1] - a[1];
    });

    var scaling = computeScalingFactor(data, maxw);

    // Build output:
    var out = [];
    lines.forEach(function(item) {
        out.push(item[0] + ":" + "#".repeat(Math.floor(scaling * item[1])));
    });

    return out.join('\n');
}

function computeScalingFactor(data, maxw) {
    // Scaling:
    var biggest = 1;
    for (var point in data) {
        if (data[point] > biggest) biggest = data[point];
    }
    return maxw / biggest;
}


console.log(countCharsBarGraph("aaazbbbzzfffffzRRrTTkkjjkkkkTtrr", 10));
