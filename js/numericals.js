function numericals(str) {
    var lookup = {},
        keys = [],
        res = [];
    for (var c of str.split("")) {
        if (!keys.includes(c)) {
            keys.push(c);
            lookup[c] = 0;
        }
        lookup[c]++;
        res.push(lookup[c].toString());
    }
    return res.join("");
}
