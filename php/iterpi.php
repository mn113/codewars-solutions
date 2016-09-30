<?php	// Leibniz's Pi approximation series: Pi/4 = 1 - 1/3 + 1/5 - 1/7...

function iterPi($epsilon) {

	$realpi = pi();

	$qpi = 1;
	for ($i = 1; $i < 10000; $i++) {		// make upper bound big enough to achieve accuracy
		$sign = 1 - (2 * ($i % 2));
		// Formula:
		$term = (2 * $i) + 1;
		$qpi += $sign / $term;

		// Get out of loop when accuracy reached:
		if (abs(4*$qpi - $realpi) <= $epsilon) {
			//print pi() . "\n";
			//print $i + 1 .": ". 4 * $qpi . "\n";
			return [$i + 1, 4 * $qpi];
		}
	}
}

print_r(iterPi(0.1));
print_r(iterPi(0.01));
print_r(iterPi(0.001));
