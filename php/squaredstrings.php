function code($input) {
    $l = ceil(sqrt(strlen($input)));
    $input = str_pad($input, $l**2, chr(11));
    $rows = str_split($input, $l);

    // Apply CW rotation:
    $output = '';
    for ($j = 0; $j < $l; $j++) {
        for ($i = $l-1; $i >= 0; $i--) {
            $output .= $rows[$i][$j];
        }
        if ($j < $l-1) $output .= "\n";
    }
    return $output;
}


function decode($input) {
    $rows = explode("\n", $input);
    $l = strlen($rows[0]);

    // Apply CW rotation:
    $output = '';
    for ($i = $l-1; $i >= 0; $i--) {
        for ($j = 0; $j < $l; $j++) {
            $output .= $rows[$j][$i];
        }
        if ($j < $l-1) $output .= "\n";
    }
    return trim($output);
}
