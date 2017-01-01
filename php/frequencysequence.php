<?php

function freq_seq($s, $sep){

    // Process string, counting occurrences of each letter:
    $counts = array();
    for ($i = 0; $i < strlen($s); $i++) {
        // Handle one letter:
        $c = $s[$i];
        $counts[$c] = array_key_exists($c, $counts) ? $counts[$c] + 1 : 1;
    }

    // Convert string to its letter counts:
    $s2 = array();
    for ($i = 0; $i < strlen($s); $i++) {
        $c = $s[$i];
        $s2[] = $counts[$c];
    }

    // Glue output together:
    return implode($sep, $s2);
}

print freq_seq("hello world", "-"); // => "1-1-3-3-2-1-1-2-1-3-1"
print "\n";
print freq_seq("19999999", ":"); // => "1:7:7:7:7:7:7:7"
print "\n";
print freq_seq("^^^**$", "x"); // => "3x3x3x2x2x1"
print "\n";
