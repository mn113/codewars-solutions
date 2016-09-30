function transpose(array, width, height) {
	var newArray = [];
	for (i = 0; i < height; i++) {	// 3 times
	    newArray[i] = [];
		for (j = 0; j < width; j++) {	// 6 times
			newArray[i][j] = array[j][i];
		}
	}
	return newArray;
}

function draw(waves) {

	const xs = "\u{25A0}\u{25A0}\u{25A0}\u{25A0}\u{25A0}\u{25A0}\u{25A0}\u{25A0}\u{25A0}\u{25A0}",
		  os = "\u{25A1}\u{25A1}\u{25A1}\u{25A1}\u{25A1}\u{25A1}\u{25A1}\u{25A1}\u{25A1}\u{25A1}";
	
	var width = waves.length,
		height = Math.max.apply(null, waves);

	// Build waveform 2D array:
	var matrix = new Array();
	for (var i = 0; i < width; i++) {
		var val = waves[i];
		// Build a string of the characters:
		var line = os.substr(0, height - val) + xs.substr(0, val);
		// Store line as an array:
		matrix.push(line.split(''));
	}

	// Transpose the matrix:
	flipped = transpose(matrix, width, height);
	
	// Output:
	output = '';
	for (l = 0; l < flipped.length; l++) {
		output += flipped[l].join('');
		// If not last...
		if (l < flipped.length - 1) {
			output += "<br>";
		}
	}
	
	document.write(output);
	return;
}

draw([1,2,3,4]);
document.write("<hr>");
draw([1,2,3,3,2,1]);
document.write("<hr>");
draw([1,2,3,3,2,1,1,2,3,4,5,6,7]);
document.write("<hr>");
draw([5,3,1,2,4,6,5,4,2,3,5,2,1]);

