<?php

$a = 'a';
$b = 'B';
echo "$a ? $b : ";
echo max($a, $b);

function yellowBeGone($colorNameOrCode) {

    $color_map = array(
        'gold' => 'ForestGreen',
        'khaki' => 'LimeGreen',
        'lemonchiffon' => 'PaleGreen',
        'lightgoldenrodyellow' => 'SpringGreen',
        'lightyellow' => 'MintCream',
        'palegoldenrod' => 'LightGreen',
        'yellow' => 'Lime'
    );
    // Codes:
    if (substr($colorNameOrCode, 0, 1) == '#') {
        return greenify($colorNameOrCode);
    }
    // Matching names:
    else if (array_key_exists(strtolower($colorNameOrCode), $color_map)) {
        return $color_map[strtolower($colorNameOrCode)];
    }
    // Other names:
    else {
        return $colorNameOrCode;
    }
}

function greenify($rgbColor) {
    $r = substr($rgbColor, 1, 2);
    $g = substr($rgbColor, 3, 2);
    $b = substr($rgbColor, 5, 2);
    // Red and green must both exceed blue:
    if ($r > $b && $g > $b) {
        // Reorder to enhance green:
        return '#' . $b . max($r,$g) . min($r,$g);
    }
    else {
        return $rgbColor;
    };
}
