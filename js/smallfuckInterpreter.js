function interpreter(code, tape) {
    // Initialise tape:
    tape = tape.split('');
    code = code.split('');
    var ptr = 0;

    // Loop through code:
    for (var i = 0; i < code.length; i++) {
        var c = code[i];
        if (c === '<') {
            if (!movePtr(-1)) return output();
        }
        else if (c === '>') {
            if (!movePtr(1)) return output();
        }
        else if (c === '*') flipBit();
        else if (c === '[') i = jumpFwd(i);
        else if (c === ']') i = jumpBack(i);
    }
    // When all commands read, end program:
    return output();

    // Move pointer left or right:
    function movePtr(dist) {
        ptr += dist;
        // Check if tape exceeded:
        if (ptr < 0 || ptr >= tape.length) {
            // End program:
            return false;
        }
        return true;
    }

    // Flip current bit:
    function flipBit() {
        tape[ptr] = (tape[ptr] == 1) ? 0 : 1;
    }

    // Move to a future command:
    function jumpFwd(i) {
        if (tape[ptr] == 0) {
            do {
                i++;
            } while (code[i] !== ']' && i < code.length - 1);   // Stop when ] or end of code reached
        }
        return i;
    }

    // Move to a previous command:
    function jumpBack(i) {
        if (tape[ptr] != 0) {
            do {
                i--;
            } while (code[i] !== '[' && i > 0);    // Stop when [ or start of code reached
        }
        return i;
    }

    function output() {
        return tape.join('');
    }
}

console.log(interpreter(">>*>>*>[*<*<*<*]>*", "0000000"));   // "0010101"
