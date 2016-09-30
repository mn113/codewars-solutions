function findAB(numbers,c) {		// Looking for a * b == c		// a <= b
	c = parseInt(c,10);
	console.log(numbers,c);

	// Trivial solution first:
	if (c === 0 && numbers.indexOf(0) > 0) { return [numbers[0], c]; }

	// Split the input list, discarding zeros:	
	neglist = numbers.filter(function(x) { return parseInt(x,10) < 0; });
	poslist = numbers.filter(function(x) { return parseInt(x,10) > 0; });
	// Rejoin:	
	newnumbers = neglist.concat(poslist);
		
	for (i = 0; i < newnumbers.length; i++) {		// newnumbers will get shorter as we go...
		l = newnumbers.length;
		console.log(i, l);
		a = parseInt(newnumbers[i],10);
		
		// Preliminaries:
		if (Math.abs(a) > Math.abs(c)) { continue; }		// skip big'uns
		if (i < l-1 && a == parseInt(newnumbers[i+1],10)) { continue; }	// skip to last of adjacent equal numbers

		// Main bit:
		if (Math.abs(c) % Math.abs(a) === 0) {	// Handle negative divisors of c
			b = c / a;							// Divisor b is valid
			bindex = newnumbers.indexOf(b);
			if (bindex > -1) {					// And b exists in numbers
				if (a == b) {				// Same number!
					// Same number must exist on one side or other:
					if (!(newnumbers[bindex-1] == a || newnumbers[bindex+1] == a)) {
						continue;	// Number only exists once, abandon this loop pass
					}
				}
				// a & b different numbers, or same but co-existing
				return [a, b];				
			}
			else {	// bindex == -1
				// Shorten numbers list at left AND right ends
				// Cut list higher than b (if b positive):
				if ((c > 0 && a > 0) || (c < 0 && a < 0)) {
					newnumbers = newnumbers.filter(function(x) { return x < b; });
				}
			}
		}
	}
	return null;	// nothing found
}

// code passes all tests but takes too long

document.write("<br>");
document.write(findAB([1,2,3],3));//, [1,3]);
document.write("<br>");
document.write(findAB([1,2,3],6));//, [2,3]);
document.write("<br>");
document.write(findAB([1,2,3],7));//, null);
document.write("<br>");
document.write(findAB([1,2,3,6],6));//, [1,6]);
document.write("<br>");
document.write(findAB([1,2,3,4,5,6],15));//, [3,5]);
document.write("<br>");
document.write(findAB([0,0,2],4));//, null);
document.write("<br>");
document.write(findAB([0,0,2,2],4));//, [2,2]);
document.write("<br>");
document.write(findAB([-3,-2,-2,-1,0,1,2,3,4],4));//, [-2,-2]);
document.write("<br>");
document.write(findAB([-3,-2,-2,-1,0,1,2,3,4],0));//, [-3,0]);
document.write("<br>");
document.write(findAB([-3,-2,-1,0,1,2,3,4],4));//, [1,4]);