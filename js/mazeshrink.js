// Return a stringified representation of the passed map.
function stringifyMap(map, power = 5) {
    var width = map[0].length;

    // flatten list:
    var flat = [].concat.apply([], map);

    // to bits:
    var bits = flat.map(x => x ? 1 : 0);

    // left pad:
    while (bits.length % power !== 0) bits.unshift(0);

    // chunk into 5-bit chunks:
    var chunked = [];
    while (bits.length > 0) {
        chunked.push(bits.slice(0,power));
        bits = bits.slice(power);
    }

    // each base2 chunk to base32:
    var base = 2**power;
    var hexed = chunked
        .map(c => c.join(""))
        .map(s => parseInt(s, 2))
        .map(b => b.toString(base));

    return hexed.join("") + "_" + width;
}


// Convert your stringified representation back into a map.
function parseMap(mapString, power = 5) {
    var [charString, width] = mapString.split("_");
    width = parseInt(width, 10);

    // take chars:
    var chars = Array.from(charString);

    // base32 to base2:
    var base = 2**power;
    var bitlist = chars
        .map(h => parseInt(h, base))
        .map(n => n.toString(2))
        .map(b => b.padStart(power, '0'))
        .join("")
        .split("")
        .map(s => parseInt(s));

    // to Booleans:
    var flatbools = bitlist.map(b => !!b);

    // pad:
    while (flatbools.length % width !== 0) flatbools.unshift('_');

    // chunk by width:
    var rows = [];
    while (flatbools.length >= width) {
        rows.push(flatbools.slice(0,width));
        flatbools = flatbools.slice(width);
    }

    // remove padded row:
    return rows.filter(r => r[0] !== "_")
}
