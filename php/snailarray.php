<?php

function snail(array $array): array {
  $spiral = [];

  while (true) {
    # Copy first row:
    $spiral = array_merge($spiral, $array[0]);

    # Discard first row:
    $array = array_slice($array, 1);

    if (count($array) == 0 || count($array[0]) == 0) break;

    # Rotate ccw:
    $array = rotate_ccw($array);
  }
  return $spiral;
}

function rotate_ccw(array $array): array {
  $transposed = [];
  for ($x = 0; $x < count($array[0]); $x++) { # for 3 cols
    $transposed[] = []; # add row
    for ($y = 0; $y < count($array); $y++) { # for 2 rows
      $transposed[$x][$y] = $array[$y][$x];
    }
  }
  return array_reverse($transposed);
}
