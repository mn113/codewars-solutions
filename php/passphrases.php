<?php
	
function caesar($arr, $n) {
	$s_arr_shifted = array();
	// Caesar shift:
	$caesar = 'abcdefghijklmnopqrstuvwxyz';
	$caesarup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

	for ($i = 0; $i < count($arr); $i++) {
		$c = $arr[$i];
		$d = ord($c);
		// Find alphas:
		if ($d >= 65 && $d <= 90) {
			$new = $d + $n;
			if ($new > 90) { $new -= 26; }
			$s_arr_shifted[] = chr($new);
		}
		else if ($d >= 97 && $d <= 122) {
			$new = $d + $n;
			if ($new > 122) { $new -= 26; }
			$s_arr_shifted[] = chr($new);
		}
		else {
			$s_arr_shifted[] = $c;
		}
	}	
	return $s_arr_shifted;
}	

function camelcase($arr) {
	$s_arr_camelcase = array();
	// Lowercase odd, uppercase even:
	for ($i = 0; $i < count($arr); $i++) {
		$c = $arr[$i];
		$d = ord($c);
		// Find alphas:
		if (($d >= 65 && $d <= 90) || ($d >= 97 && $d <= 122)) {
			if ($i % 2 == 0) {	// even
				$s_arr_camelcase[] = strtoupper($c);
			}
			else {	// odd
				$s_arr_camelcase[] = strtolower($c);				
			}
		}
		else {
			$s_arr_camelcase[] = $c;
		}
	}
	return $s_arr_camelcase;
}

function digits_complement9($arr) {
	$s_arr_digits = array();
	// Digits to 9-complements:
	foreach ($arr as $c) {
		if (is_numeric($c)) {
			$s_arr_digits[] = 9 - $c;
		}
		else {
			$s_arr_digits[] = $c;
		}
	}
	return $s_arr_digits;
}

function playPass($s, $n) {
	
	// Sanitise inputs:
	$n = $n % 26;
	$s_arr = str_split($s);

	// Mutate:	
	$s_arr_caesar_camel_digits = digits_complement9(camelcase(caesar($s_arr, $n)));

	// Reverse:
	return join('', array_reverse($s_arr_caesar_camel_digits));
}

print_r(caesar(str_split('Et tu, Brute?'), 5));
print "\n";

//print_r(camelcase(str_split('how does this look?')));
//print "\n";

//print_r(digits_complement9(str_split('345_98-ike')));
//print "\n";

print playPass("I LOVE YOU 456!!!", 1);
print "\n";

print chr(65) . '-' . chr(90) . ', ' . chr(97) . '-' . chr(122) . "\n";