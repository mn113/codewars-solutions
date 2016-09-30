<?php
	
function seven($m) {	// argument can be number (initial) or array (after step 0)

	// Correct initial input:
	if (is_int($m)) {
		$m = array($m,0);
	}
	
	// Algo & Recursion:	
	if ($m[0] >= 100) {
		// Split:
		$unit = $m[0] % 10;
		$tens = ($m[0] - $unit) / 10;
		// Calculate new $m = (x - 2y):
		$m[0] = $tens - (2 * $unit);
		$m[1] += 1;
		//print "{$m[1]}. {$m[0]}\n";
		return seven($m);    
	}
	else {	// small enough number reached
		return $m;	
	}
}

//seven(371); //should return [35, 1]
print_r(seven(1603)); //should return [7, 2]
//seven(477557101); //should return [28, 7]

