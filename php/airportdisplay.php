<?php

define("ALPHABET", "ABCDEFGHIJKLMNOPQRSTUVWXYZ ?!@#&()|<>.:=-+*/0123456789");

function flap_display($lines, $rotors) {

    $alpha_len = strlen(ALPHABET);
    $alpha_arr = str_split(ALPHABET);
    $out_lines = array();

    // Process all the lines in order:
    foreach($lines as $line) {
        $out_line = '';
        $flapcount = 0;
        $rotor = array_shift($rotors);
        // Loop through the line's letters:
        for ($i = 0; $i < strlen($line); $i++) {
            // Get next char:
            $c = $line[$i];
            $rot = array_shift($rotor);
            // Rotate $rot times:
            $flapcount += $rot;
            // Calculate output character based on initial value and flap count (looping round):
            $newpos = (strpos(ALPHABET, $c) + $flapcount) % $alpha_len;
            $out_line .= $alpha_arr[$newpos];
        }
        // When line is done, store it:
        $out_lines[] = $out_line;
    }
    return $out_lines;
}

$lines = ["CAT"];
$rotors = [[1,13,27]];
print flap_display($lines, $rotors);    // DOG
