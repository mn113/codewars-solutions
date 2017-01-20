function pascalsTriangle(n) {
    //return a flat array representing the values of Pascal's Triangle to the n-th level
    var triangle = [[1]],
        level = 1;

    while (level < n) {
        // Build the next level by adding adjacent items from previous level:
        var nextLevel = [1];
        for (var i = 0; i < level-1; i++) {
            nextLevel.push(triangle[level-1][i] + triangle[level-1][i+1]);
        }
        nextLevel.push(1);
        triangle.push(nextLevel);
        level++;
    }

    return triangle.reduce((a, b) => a.concat(b), []);
}

console.log(pascalsTriangle(5));
