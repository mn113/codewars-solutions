<?php
	
function solution($str) {
	
	// Fix odd length:
	if (strlen($str) % 2 == 1) {
		$str = $str . "_";
	}
	
	$output = array();
	
	// Start splitting:
	while (strlen($str) >= 2) {
		array_push($output, substr($str, 0, 2));
		$str = substr($str, 2, strlen($str) - 2);
	}
	
	print_r($output);
	return $output;
	
}

solution('cdabefg');