function toDecimal(decimal) {
    var arr = decimal.split('').reverse();
    var exponents = [1];
    // True trinary test:
    for (var d in arr) {
        if (!['0','1','2'].includes(arr[d])) return 0;
    }
    // Build exponents array:
    while (exponents.length < arr.length) {
        exponents.unshift(3 * exponents[0]);
    }
    // Calculate decimal:
    return arr.map(t => parseInt(t,10) * exponents.pop())
    .reduce((a,b) => a+b);
}

console.log(toDecimal('10201'));
