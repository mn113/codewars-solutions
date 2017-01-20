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
        try {
            var newNum = this.stacks[this.sid].pop() + num;
            this.stacks[this.sid].push(newNum);
        }
        catch (e) {
            console.log(e);
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
        this.input(num);
        this.rotate();
    }

    shiftR() {
        var num = this.stacks[this.sid].pop();
        // Rotate 3 times so we keep the same spot:
        this.rotate();
        this.input(num);
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
        this.output.push(this.getCurrentNum());
    }

    input(num) {
        this.stacks[this.sid].push(num);
    }

    read(input) {
        this.output = [];
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
                    // Take next input char as a digit to input:
                    this.input(parseInt(input[0], 10));
                    input = input.slice(1);
                    break;
                case '[':
                    var looptimes = this.getCurrentNum();
                    // Replace bracketed section n times:
                    input = input.replace(/(.+)\]/, '$1'.repeat(looptimes));     // captures commands up to ]
                    // Continue reading:
                    break;
                case ']':
                    break;
                default:
                    break;
            }
            console.log(char, this.stacks, this.sid, this.output);
        }
        // Return output string when done reading commands:
        console.log(this.output.join(""));
        return this.output.join("");
    }
}

var inter = new Interpreter();
inter.read('+++,9[.-]+++');   //,'987654321'
