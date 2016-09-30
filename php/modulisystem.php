<?php
	
function fromNb2Str($n, $sys) {	// $sys = [moduli]

	$primes = array(2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997);
	$reduced_primes = array();
	foreach ($primes as $p) {
		if ($p > max($sys)) break;
		$reduced_primes[] = $p;
	}
	
	//print "RP:\n";
	//print_r($reduced_primes);
	
	// Are the moduli co-prime as required?
	foreach ($sys as $modulus) {
		foreach ($sys as $test) {
			if ($test != $modulus) {
				foreach ($reduced_primes as $p) {
					if ($p > $modulus || $p > $test) {	// too big
						continue;
					}
					if ($test % $p == 0 && $modulus % $p == 0) {
						// Prime factor of both $modulus & $test found
						return "Not applicable";
					}
				}
			}
		}
	}	
	
	// Is the moduli product > n as required?
	if (array_product($sys) < $n) {	// too low
		return "Not applicable";
	}
	
	// Process it:
	$new_arr = array();
	foreach ($sys as $modulus) {
		$new_arr[] = ($n % $modulus);
	}
	
	// Format output:
	$output = '-' . join('--', $new_arr) . '-';
	return $output;
}

print fromNb2Str(11, [2,3,5]);	// -> '-1--2--1-'
print "\n";
print fromNb2Str(6, [2,3,4]);	// -> "Not applicable", since 2 and 4 are not coprime
print "\n";
print fromNb2Str(7, [2,3]);		// -> "Not applicable" since 2 * 3 < 7
print "\n";
print fromNb2Str(779, [8,7,5,3]); //"-3--2--4--2-"
print "\n";
print fromNb2Str(187, [8,7,5,3]); //"-3--5--2--1-"
print "\n";
