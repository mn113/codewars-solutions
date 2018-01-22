function Canvas(width, height) {
  if (width < 1 || height < 1) throw "Out of bounds";

  var h = height;
  this.canvArr = [];
  while (h > 0) {
    this.canvArr.push(" ".repeat(width).split(""));
    h--;
  }

  this.draw = (xa, ya, xb, yb) => {
    var x1 = Math.min(xa,xb),
        x2 = Math.max(xa,xb),
        y1 = Math.min(ya,yb),
        y2 = Math.max(ya,yb);

    if (x1 < 0 || x2 >= width || y1 < 0 || y2 >= height) throw "Out of bounds";

    // Vertical line(s):
    for (var y = y1; y <= y2; y++) {
      this.canvArr[y][x1] = 'x';
      this.canvArr[y][x2] = 'x';
    }
    // Horizontal line(s):
    for (var x = x1; x <= x2; x++) {
      this.canvArr[y1][x] = 'x';
      this.canvArr[y2][x] = 'x';
    }
    return this;
  }

  this.fill = (x, y, ch) => {
    if (x < 0 || x >= width || y < 0 || y >= height) throw "Out of bounds";
    if (this.canvArr[y][x] !== " ") return;

    const fillNeighbs = (x, y, ch) => {
      // Fill me:
      this.canvArr[y][x] = ch;  // top-level context
      // Fill my empty neighbs:
      [[0,-1],[-1,0],[0,1],[1,0]]
        .map(nb => { return {x: x+nb[0], y: y+nb[1]}; })
        .filter(nb => nb.x >= 0 && nb.x < width && nb.y >= 0 && nb.y < height) // stay in bounds
        .filter(nb => this.canvArr[nb.y][nb.x] == " ")        // best case 0, worst case 4
        .forEach(nb => { fillNeighbs(nb.x, nb.y, ch) });      // will end recursion when no more neighbs
    }
    fillNeighbs(x, y, ch);
    return this;
  }

  this.drawCanvas = () => {
    // Add frame:
    var c = this.canvArr.map(row => "|" + row.join("") + "|" );
    c.unshift("-".repeat(width+2));
    c.push("-".repeat(width+2));
    return c.join("\n");
  }
}
