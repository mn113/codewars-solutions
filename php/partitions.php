<?php

// Memoizer hash:
$known_products = [
    1   =>  [1]
];

function get_products($n) {
    global $known_products;

    // Retrieve cached result if available:
    if (array_key_exists($n, $known_products)) {
        //print "cache ok: $n: " . json_encode($known_products[$n]) . "\n";
        return $known_products[$n];
    }

    // Start from the previous product array:
    $products = get_products($n-1);
    // Add single element:
    $products[] = $n;
    // Calculate extra elements:
    for ($delta = 2; $delta <= $n/2; $delta++) {
        //print "n=$n, delta=$delta\n";
        // Cross-multiply smaller product sets:
        $extras = cross_multiply(get_products($n - $delta), get_products($delta));
        //print "extras: " . json_encode($extras) . "\n";
        $products = array_merge($products, $extras);
    }
    $products = array_unique($products);
    sort($products);
    //print json_encode($products) . "\n";

    // Store in cache:
    $known_products[$n] = $products;

    return $products;
}

function cross_multiply($arr1, $arr2) {
    $out = [];
    foreach ($arr1 as $a) {
        foreach ($arr2 as $b) {
            $out[] = ($a * $b);
        }
    }
    //print json_encode($out);
    return array_values(array_unique($out));
}

function calc_product_data($products) {
    // Find required output data:
    $howmany = count($products);
    $range = max($products) - min($products);
    $avg = array_sum($products) / $howmany;
    // Median:
    if ($howmany % 2 == 1) {    // central item, if odd length
        $median = $products[($howmany - 1) / 2];
    }
    else {  // average of 2 items, if even
        $median = ($products[$howmany/2] + $products[($howmany/2) - 1]) / 2;
    }

    // Format output:   e.g. "Range: 5 Average: 3.50 Median: 3.50"
    return "Range: " . $range .
           " Average: " . format_2dp($avg) .
           " Median: " . format_2dp($median);
}

function format_2dp($val) {
    return number_format($val, 2, '.', '');
}

for ($i = 1; $i <= 50; $i++) {          // out of memory beyond $i == 33
    //print "---\n$i\n";
    print $i .' '. calc_product_data(get_products($i));   // Working perfectly
    print "\n";
}
