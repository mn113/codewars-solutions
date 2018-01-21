function Canvas(width, height) {
  var h = height;
  this.canvArr = [];
  while (h > 0) {
    this.canvArr.push(" ".repeat(width).split(""));
    h--;
  }

  this.draw = (x1, y1, x2, y2) => {
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
    function fillNeighbs(x,y,ch) {
      // Fill me:
      this.canvArr[y][x] = ch;
      // Fill my empty neighbs:
      var empty_neighbs = [[0,-1],[-1,0],[0,1],[1,0]]
        .map(nb => {x: x+nb[0], y: y+nb[1]})
        .filter(c => c.x >= 0 && c.x < width && c.y >= 0 && c.y < height) // stay in bounds
        .filter(c => this.canvArr[c.y][c.y] == " ")
        .forEach(nb => { fillNeighbs(nb) });        // will end recursion when no more neighbs
    }
    fillNeighbs(x,y,ch);
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
