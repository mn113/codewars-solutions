<?php
	
// $wealth - 9c = 1
// $wealth - 7b = 2

function howmuch($m, $n) {
	
	$upper = max($m, $n);
	$lower = min($m, $n);
	$b_upper = $upper / 7;	// max boat price
	$c_upper = $upper / 9;	// max car price
	$solutions = array();
	
	// Try ascending values of b:
	for ($b = 5; $b <= $b_upper; $b += 9) {	// b can go in jumps of 9
		// Try ascending values of c:
		for ($c = 4; $c <= $c_upper; $c += 7) {	// c can go in jumps of 7
			// Derive w's for these values:
			$w1 = 9 * $c + 1;
			$w2 = 7 * $b + 2;
			
			// Test for equality & bounds:
			if (($w1 == $w2) && $w1 <= $upper && $w1 >= $lower) {
				// Solution found!
				$solutions[] = array(
					"M: ".$w1,
					"B: ".$b,
					"C: ".$c
				);
			}
		}
	}

	print_r($solutions);
	return;
}

howmuch(1, 100);		// OK
howmuch(1000, 1100);	// OK
howmuch(10000, 9950);	// OK