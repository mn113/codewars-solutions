<?php
	
function counter_effect($hit_count) {
	
	// Convert input:
	$numbers = str_split($hit_count);
	
	// Build arrays:
	for ($i = 0; $i < count($numbers); $i++) {
		$numbers[$i] = range(0, $numbers[$i]);
	}

	return $numbers;	
}

print_r(counter_effect("1250"));