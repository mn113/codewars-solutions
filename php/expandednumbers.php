<?php

function expanded_form($n) {
    $parts = array();
    $divisor = 1;

    // Process smallest digit of number:
    while ($n > 0) {

        // Check for non-zero LSB:
        $rem = $n % 10;

        // Store the part, if not zero:
        if ($rem !== 0) {
            $parts[] = $rem * $divisor;
            $n -= $rem;
        }

        // Make number 10x smaller:
        $n /= 10;
        $divisor *= 10;
    }

    // Reverse sort:
    rsort($parts, SORT_NUMERIC);

    // Combine parts array for output:
    return implode(" + ", $parts);
}

echo expanded_form(70304);
