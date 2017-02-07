function Area(arr) {
    var area = 0;

    // Shoelace formula:
    arr.push(arr[0]);
    for (var i = 0; i < arr.length - 1; i++) {
        area += (arr[i].x * arr[i+1].y);
        area -= (arr[i].y * arr[i+1].x);
    }
    area = 0.5 * Math.abs(area);
    return parseFloat(area.toFixed(2));
}

function Perimeter(arr) {
    var perimeter = 0;
    // Distance between every pair of points:
    arr.push(arr[0]);
    for (var i = 0; i < arr.length - 1; i++) {
        perimeter += dist(arr[i], arr[i+1]);
    }
    return parseFloat(perimeter.toFixed(2));
}

function dist(a,b) {
    return Math.sqrt(Math.pow((a.x-b.x),2) + Math.pow((a.y-b.y),2));
}
