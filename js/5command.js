class FiveCommands {
    constructor() {
        this.reset();
    }

    reset() {
        this.tape = [0];
        this.ptr = 0;
        this.output = [];
        this.debug = [];
    }

    // Read input commands:
    read(input, debug) {
        // Reset class properties:
        this.reset();

        var input_arr = input.split('');
        // Read commands one by one:
        for (var i = 0; i < input_arr.length; i++) {
            var c = input_arr[i];
            // 5 commands:
            if (c === '+') this.movePtr(1);
            else if (c === '-') this.movePtr(-1);
            else if (c === '^') this.incrNum();
            else if (c === 'v') this.decrNum();
            else if (c === '*') this.addNumToOutput();
        }
        // All commands processed

        // Make output the correct format
        this.output = this.output.join('');
        // Debug case:
        if (debug) this.debug = this.tapeDebugger();
        return this;
    }

    // Move the pointer on the tape:
    movePtr(dist) {
        this.ptr += dist;
        // Expand tape if necessary:
        if (this.ptr < 0) {
            this.tape.unshift(0);
            this.ptr = 0;
        }
        else if (this.ptr >= this.tape.length) {
            this.tape.push(0);
            this.ptr = this.tape.length - 1;
        }
    }

    // Increment pointer number:
    incrNum() {
        this.tape[this.ptr]++;
        return this;
    }

    // Decrement pointer number:
    decrNum() {
        this.tape[this.ptr]--;
        return this;
    }

    // Append pointer number to output:
    addNumToOutput() {
        this.output.push(this.tape[this.ptr]);
        return this;
    }

    // Build tape debugger output:
    tapeDebugger() {
        var td = [];
        for (var i = 0; i < this.tape.length; i++) {
            td.push(i + '->' + this.tape[i]);
        }
        return td;
    }
}

var inter = new FiveCommands();
console.log('_', inter.read('++++++++++^^^^*^^^--^*^',false).output);//,'41','Should return the number 5 as a number');
