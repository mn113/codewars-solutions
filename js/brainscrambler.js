class Interpreter {
    constructor() {
        this.stacks = [[0],[0],[0]];
        this.sid = 0;
        this.output = [];
    }

    getCurrentNum() {
        var stackLen = this.stacks[this.sid].length;
        return this.stacks[this.sid][stackLen-1];
    }

    incr(num) {
        var newNum = this.stacks[this.sid].pop() + num;
        if (!Number.isNaN(newNum)) {
            this.stacks[this.sid].push(newNum);
        }
        else {
            this.pushZero();
        }
    }

    rotate() {
        // Move to next stack, wrapping round:
        this.sid = (this.sid + 1) % 3;
    }

    shiftL() {
        var num = this.stacks[this.sid].pop();
        // Rotate 3 times so we keep the same spot:
        this.rotate();
        this.rotate();
        // Only shift if defined:
        if (typeof num !== 'undefined') this.input(num);
        this.rotate();
    }

    shiftR() {
        var num = this.stacks[this.sid].pop();
        // Rotate 3 times so we keep the same spot:
        this.rotate();
        // Only shift if defined:
        if (typeof num !== 'undefined') this.input(num);
        this.rotate();
        this.rotate();
    }

    pushZero() {
        this.stacks[this.sid].push(0);
    }

    discardEnd() {
        this.stacks[this.sid].pop();
    }

    copyToOutput() {
        var num = this.getCurrentNum();
        // Only push if defined:
        if (typeof num !== 'undefined') this.output.push(num);
    }

    input(num) {
        this.stacks[this.sid].push(num);
    }

    read(input, looping) {
        if (typeof looping === 'undefined') {
            // Reset output when in standard mode:
            //console.log(input);
            looping = false;
            this.output = [];
        }
        while (input.length > 0) {
            // Take off first character:
            var char = input[0];
            input = input.slice(1);
            switch(char) {
                case '+': this.incr(1); break;
                case '-': this.incr(-1); break;
                case '#': this.rotate(); break;
                case '<': this.shiftL(); break;
                case '>': this.shiftR(); break;
                case '*': this.pushZero(); break;
                case '^': this.discardLast(); break;
                case '.': this.copyToOutput(); break;
                case ',':
                    // Take next input chars as digits to input:
                    var digits = parseInt(input, 10);
                    var len = digits.toString().length;
                    input = input.slice(len);
                    this.input(digits);
                    break;
                case '[':
                    // Find commands within brackets:
                    var loopCmds = input.slice(0, input.indexOf(']'));
                    do {
                        this.read(loopCmds, true);  // read, in looping mode
                    } while (this.getCurrentNum() > 0);
                    // Now skip bracketed section:
                    input = input.slice(input.indexOf(']'));
                    break;
                case ']':
                    break;
                default:
                    break;
            }
            //console.log(char, this.stacks, this.sid, this.output);
        }
        // Return output string when done reading commands:
        if (!looping) {
            //console.log(this.output.join(""));
            return this.output.join("");
        }
    }
}

var inter = new Interpreter();
inter.read('++.>.,721#+<#<.<*<++<+*>++.#'); // '22'
//inter.read(',10>*#[-##.+#]');   //,'0123456789'
//inter.read(',9[.--]');  //,'97531'
//inter.read('+++,9[.-]+++');   //,'987654321'
