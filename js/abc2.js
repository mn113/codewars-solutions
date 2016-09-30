function findAB(numbers,c) {		// Looking for a * b == c		// a <= b
	c = parseInt(c,10);
	console.log(numbers.length, numbers[0], numbers[numbers.length-1], c);

	// Trivial solution first:
	if (c === 0 && numbers.indexOf(0) > 0) { return [numbers[0], c]; }
	
	// Split the input list, discarding zeros:	
	neglist = numbers.filter(function(x) { return parseInt(x,10) < 0; });
	poslist = numbers.filter(function(x) { return parseInt(x,10) > 0; });
	neglen = neglist.length;
	poslen = poslist.length;
	
	if (c < 0) {
		// Neg a and pos b needed
		for (i = 0; i < neglen; i++) {
			a = parseInt(neglist[i],10);
			if (a < c) { continue; }	// skip big'uns
			if (i < neglen-1 && a == parseInt(neglist[i+1],10)) { continue; }	// skip to last of adjacent equal numbers
			b = c / a;				// Positive divisor b
			if ((b | 0) === b) {	// Integer test
				bindex = poslist.indexOf(b);
				if (bindex > -1) {		// If b exists in poslist
					return [a, b];
				}
				else {	// bindex == -1
					// Discard poslist higher than b:
					poslist = poslist.filter(function(x) { return x < b; });
				}
			}
		}
	}

	else {	// c > 0	// must try neg*neg and pos*pos cases
		// Neg*neg case
		// Reverse neglist:
		neglist = neglist.reverse();
		for (i = 0; i < neglist.length; i++) {
			a = parseInt(neglist[i],10);
			if (a < -1*c) { continue; }	// skip big'uns
			if (i < neglist.length-1 && a == parseInt(neglist[i+1],10)) { continue; }	// skip to last of adjacent equal numbers
			b = c / a;				// Negative divisor b	
			if ((b | 0) === b) {	// Integer test
				bindex = neglist.indexOf(b);
				if (bindex > -1) {				// If b exists in numbers
					if (a == b) {				// Same number!
						// Same number must exist on one side or other:
						if (!(neglist[bindex-1] == a || neglist[bindex+1] == a)) {
							continue;	// Number only exists once, abandon this loop pass
						}
					}
					// a & b different numbers, or same but co-existing
					return [b, a];	// (reversed because list was reversed)
				}
				else {	// bindex == -1
					// Discard neglist higher than b:
					neglist = neglist.filter(function(x) { return x > b; });
				}
			}
		}
		
		// Pos*pos case (almost identical, but different list)
		for (i = 0; i < poslist.length; i++) {
			a = parseInt(poslist[i],10);
			if (a > c) { continue; }	// skip big'uns
			if (i < poslist.length-1 && a == parseInt(poslist[i+1],10)) { continue; }	// skip to last of adjacent equal numbers
			b = c / a;				// Positive divisor b	
			if ((b | 0) === b) {	// Integer test
				bindex = poslist.indexOf(b);
				if (bindex > -1) {				// If b exists in numbers
					if (a == b) {				// Same number!
						// Same number must exist on one side or other:
						if (!(poslist[bindex-1] == a || poslist[bindex+1] == a)) {
							continue;	// Number only exists once, abandon this loop pass
						}
					}
					// a & b different numbers, or same but co-existing
					return [a, b];
				}
				else {	// bindex == -1
					// Discard poslist higher than b:
					poslist = poslist.filter(function(x) { return x < b; });
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