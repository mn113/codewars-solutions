// https://www.codewars.com/kata/5ecc1d68c6029000017d8aaf/javascript
// In this kata, your task is to find the maximum sum of any straight "beam" on a hexagonal grid, where its cell values are determined by a finite integer sequence seq.

/*
 * Hexagon values map, coordinates indicate yx, __ are nulls:
 *
 *   00 01 02 __ __
 *   10 11 12 13 __
 *   20 21 22 23 24
 *   __ 31 32 33 34
 *   __ __ 42 43 44
 *
 */
function createHexagon(size = 2, fillSequence = [0]) {
  const maxSize = 2 * size - 1;
  const middleY = size - 1;
  // rowSize must grow then shrink as the hexagon is built
  let rowSize = size;
  let blanksSize = maxSize - rowSize;
  let delta = 1;

  // cycle through fill sequence
  let fillSequenceIndex = 0;

  let hexagon = [];

  for (let y = 0; y < maxSize; y++) {
    hexagon.push([]);

    // post-row blanks
    if (y >= middleY) {
      hexagon[y] = hexagon[y].concat(Array(blanksSize).fill(null));
      delta = -1;
    }

    // row values
    for (let x = 0; x < rowSize; x++) {
      hexagon[y].push(fillSequence[fillSequenceIndex % fillSequence.length]);
      fillSequenceIndex++;
    }

    // pre-row blanks
    if (y < middleY) {
      hexagon[y] = hexagon[y].concat(Array(blanksSize).fill(null));
    }

    // update for next row
    rowSize += delta;
    blanksSize -= delta;
  }

  return hexagon;
}

// horiz   20 21 22 23 24   (+0,+1)
function measureBeamHorizontal(hexagon, y) {
  return hexagon[y].map(Number).reduce((a,b) => a + b);
}

// vertical 02 12 22 32 42   (+1,+0)
function measureBeamVertical(hexagon, x) {
  return hexagon.map(row => row[x]).map(Number).reduce((a,b) => a + b);
}

// diagonal 00 11 22 33 44   (+1,+1)
function measureBeamDiagonal(hexagon, x, y) {
  let sum = 0;
  while (y < hexagon.length && x < hexagon.length) {
    sum += Number(hexagon[y][x]);
    y++;
    x++;
  }
  return sum;
}

function maxHexagonBeam(size, fillSequence) {
  const maxSize = 2 * size - 1;
  const hexagon = createHexagon(size, fillSequence);

  let maxBeam = -Infinity;

  // horiz: increase y from 0 to maxSize
  {
    let x = 0, y = 0;
    while (y < maxSize) {
      let beam = measureBeamHorizontal(hexagon, y);
      if (beam > maxBeam) maxBeam = beam;
      y++;
    }
  }

  // vertical: increase x from 0 to maxSize
  {
    let x = 0, y = 0;
    while (x < maxSize) {
      let beam = measureBeamVertical(hexagon, x);
      if (beam > maxBeam) maxBeam = beam;
      x++;
    }
  }

  // diagonal: reduce y to 0, then increase x from 0
  {
    let x = 0, y = size - 1;
    while (y > 0) {
      let beam = measureBeamDiagonal(hexagon, x, y);
      if (beam > maxBeam) maxBeam = beam;
      y--;
    }
    while (x < size) {
      let beam = measureBeamDiagonal(hexagon, x, y);
      if (beam > maxBeam) maxBeam = beam;
      x++;
    }
  }

  return maxBeam;
}

