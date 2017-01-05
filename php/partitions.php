<?php

// Memoizer hash:
$known_results = [
    1   =>  [[1]]
];

function partitionise($n, $output_data = true) {
    //print "p($n)\n";
    global $known_results;

    // Retrieve cached result if available:
    if (!$output_data && array_key_exists($n, $known_results)) {
        //print "cache ok: " . "\n"; //json_encode($known_results[$n]) .
        return $known_results[$n];
    }

    // Obtain this partition's candidates by adding deltas to previous partitions:
    $candidates = [[$n]];
    for ($delta = 1; $delta <= $n/2; $delta++) {
        //print "n=$n, delta=$delta\n";
        foreach (partitionise($n - $delta, false) as $prev_part) {
            // Append delta to the lower partition:
            $candidates[] = array_merge($prev_part, [$delta]);
        }
    }

    // Remove duplicate candidates to get definitive partitions list:
    $partitions = deduplicate($candidates);

    // Store result:
    $known_results[$n] = $partitions;

    // Output stupid data or just return partitions?
    if ($output_data) {
        $x = calc_product_data($partitions);
        return $x;
    }
    else return $partitions;
}

function deduplicate($arr) {    // Supposedly faster than array_unique()
    $new_arr = [];
    foreach ($arr as $elem) {
//        sort($cand);
        if (!in_array($elem, $new_arr)) {
            $new_arr[] = $elem;
        }
    }
    return $new_arr;
}

function product($carry, $item) {
    $carry *= $item;
    return $carry;
}

function calc_product_data($partitions) {
    // Calculate products of partitions:
    $products = [];
    foreach ($partitions as $part) {
        // Multiply numbers together:
        $products[] = array_reduce($part, "product", 1);
    }
    // Low to high:
    sort($products);

    // Remove duplicate products:
    $unique_products = deduplicate($products);

    // Find required output data:
    $howmany = count($unique_products);
    $range = max($unique_products) - min($unique_products);
    $avg = array_sum($unique_products) / $howmany;
    // Median:
    if ($howmany % 2 == 1) {    // central item, if odd length
        $median = $unique_products[($howmany - 1) / 2];
    }
    else {  // average of 2 items, if even
        $median = ($unique_products[$howmany/2] + $unique_products[($howmany/2) - 1]) / 2;
    }

    // Format output:   e.g. "Range: 5 Average: 3.50 Median: 3.50"
    return "Range: " . $range . " Average: " . format_2dp($avg) . " Median: " . format_2dp($median);
}

function format_2dp($val) {
    return number_format($val, 2, '.', '');
}

// Test:
for ($i = 1; $i < 11; $i++) {          // out of memory beyond $i == 33
    print $i .' '. partitionise($i);   // Working perfectly
    print "\n";
}
// Skip a gap, go backwards...
for ($i = 15; $i > 10; $i--) {
    print $i .' '. partitionise($i);
    print "\n";
}
// Acid test:
$i = 33;
print $i .' '. partitionise($i);
