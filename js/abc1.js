function findAB(numbers,c) {		// Looking for a * b == c
	
	if (c == 0) { return [numbers[0], c]; }
	
	l = numbers.length;
	
	for (i = 0; i < l; i++) {
		a = parseInt(numbers[i]);
		if (Math.abs(a) > Math.abs(c)) { continue; }		// skip big'uns
		if (i < l-1 && a == parseInt(numbers[i+1])) { continue; }	// skip to last of adjacent equal numbers
		if (a == 0) { continue; }				// skip zeros

		if (Math.abs(c) % Math.abs(a) == 0) {	// Handle negative divisors of c
			b = c / a;							// Divisor b is valid
			bpos = numbers.indexOf(b);
			if (bpos > 0) {					// And b exists in numbers
				if (a == b) {				// Same number!
					// Same number must exist on one side or other:
					if (!(numbers[bpos-1] == a || numbers[bpos+1] == a)) {
						continue;	// Number only exists once, abandon this loop pass
					}
				}
				// a & b different numbers, or same but co-existing
				return [a, b];				
			}
		}
	}
	return null;	// nothing found
}

// code passes all tests but takes too long

var input = [-3,-2,-2,-1,0,1,2,3,4];
document.write("<br>");
document.write(findAB(input, -9));
document.write("<br>");
document.write(findAB(input, 4));
document.write("<br>");
document.write(findAB([0,0,2,2],4));