function findAB(numbers,c) {		// Looking for a * b == c		// a <= b
	c = parseInt(c,10);
	console.log('length:', numbers.length, 'start:', numbers[0], 'end:', numbers[numbers.length-1], 'target:', c);

	// Trivial (0) solution first:
	if (c === 0 && numbers.indexOf(0) > 0) { return [numbers[0], c]; }

	// Split the input list, discarding zeros:	
	neglist = numbers.filter(function(x) { return parseInt(x,10) < 0; });
	poslist = numbers.filter(function(x) { return parseInt(x,10) > 0; });
	
	// Trivial (1/-1) solutions:
	if (neglist.indexOf(-1) > -1) {
		if (numbers.indexOf(-1*c) > -1) {
			return [-1,c];
		}		
	}
	if (poslist.indexOf(1) > -1) {
		if (numbers.indexOf(c) > -1) {
			return [-1,c];
		}		
	}
	
	// Chop down lists to c/2:
	
	// Factorise positive c:
	cfactors = [];
	csqrt = Math.sqrt(Math.abs(c));
	for (i = 1; i <= csqrt; i++) {
		if (c % i === 0) {
			cfactors.push([i,c/i]);
		}		
	}
	cfl = cfactors.length;
	console.log('cfl:', cfl);
	if (cfl === 0) { return null; }

	// Test factors:
	if (c < 0) {

		// Neg*pos case:
		for (var i = 0; i < cfl; i++) {
			var a = -1*f[0], b = f[1];

			if (neglist.indexOf(a) > -1 && poslist.indexOf(b) > -1) {
				return [a,b];
			}
		}
	}

	else {	// c > 0	// must try neg*neg and pos*pos cases

		// Neg*neg case:
		for (var i = 0; i < cfl; i++) {
			fac = cfactors[i];
			var a = -1*fac[0], b = -1*fac[1];

			if (neglist.indexOf(a) > -1 && neglist.indexOf(b) > -1) {
				if (a < b) { return [a,b]; }
				else if (b < a) { return [b,a]; }
				else {	// a == b
					apos = neglist.indexOf(a);
					if (neglist[apos+1] == a) {		// exists consecutively
						return [a,b];
					}
				}
			}
		}
		
		// Pos*pos case (almost identical, but different list):
		for (var i = 0; i < cfl; i++) {
			fac = cfactors[i];
			var a = fac[0], b = fac[1];

			if (poslist.indexOf(a) > -1 && poslist.indexOf(b) > -1) {
				if (a < b) { return [a,b]; }
				else if (b < a) { return [b,a]; }
				else {	// a == b
					apos = poslist.indexOf(a);
					if (poslist[apos+1] == a) {		// exists consecutively
						return [a,b];
					}
				}
			}			
		}
	}
	
	return null;	// nothing found
}


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