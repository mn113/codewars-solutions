function validate_battlefield(array $field): bool {
  // Pad field:
  $bigger_field = expand_field($field);

  // 1. Count total number of ship cells:
  $occupied_cells = [];
  for ($y = 1; $y < 11; $y++) {
    for ($x = 1; $x < 11; $x++) {
      if ($bigger_field[$y][$x] == 1) $occupied_cells[] = ['x' => $x, 'y' => $y];
    }
  }
  if (count($occupied_cells) != 20) return false;

  // 2. Check for 1 battleship (4x1), 2 cruisers (3x1) and 3 destroyers (2x1):
  $horiz = detect_ships($bigger_field);
  $vert = detect_ships($bigger_field, true);
  $all_ships = array_merge($horiz, $vert);
  rsort($all_ships);
  if ($all_ships != [4,3,3,2,2,2]) return false;

  // 3. Check no corners touch:
  foreach ($occupied_cells as $cell) {
    $x = $cell['x'];
    $y = $cell['y'];
    if (
      $bigger_field[$y-1][$x-1] == 1 ||
      $bigger_field[$y-1][$x+1] == 1 ||
      $bigger_field[$y+1][$x-1] == 1 ||
      $bigger_field[$y+1][$x+1] == 1
    ) {
        return false;
    }
  }

  // No fail conditions met; board seems valid
  return true;
}

function expand_field(array $field): array {
  for ($i = 0; $i < count($field); $i++) {
    array_push($field[$i], 0);
    array_unshift($field[$i], 0);
  }
  array_push($field, array_fill(0, 12, "0"));
  array_unshift($field, str_split(str_repeat("0", 12)));
  return $field;
}

function detect_ships(array $field, bool $transpose = false): array {
  if ($transpose) $field = transpose($field);

  $grid_string = rows_to_string($field);
  preg_match_all('/0(1+)0/', $grid_string, $matches);

  // Process matches to get ship lengths:
  $ships = array_map(function(string $match) {
    return strlen($match);
  }, array_values($matches[1]));  // element 1 is the first capture group

  // Discard anything <= 1:
  return array_filter($ships, function($el) {
    return $el > 1;
  });
}

function rows_to_string(array $field): string {
  return implode('/', array_map(function($row) {
    return implode($row);
  }, $field));
}

function transpose(array $array): array {
  $transposed = [];
  for ($x = 0; $x < count($array[0]); $x++) {
    $transposed[] = [];
    for ($y = 0; $y < count($array); $y++) {
      $transposed[$x][$y] = $array[$y][$x];
    }
  }
  return $transposed;
}
