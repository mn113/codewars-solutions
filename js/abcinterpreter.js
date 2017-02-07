class Interpreter {
    constructor() {
        this.reset();
    }

    reset() {
        this.acc = 0;
        this.output = '';
        this.asciimode = false;
        this.debug = [];
    }

    read(input) {
        this.reset();
        var cmd;
        var i = 0;
        while (i < input.length) {
            cmd = input[i];
            switch (cmd) {
                case 'a': this.acc++; break;
                case 'b': this.acc--; break;
                case 'c': this.output += (this.asciimode) ? String.fromCharCode(this.acc) : String(this.acc); break;
                case 'd': this.acc *= -1; break;
                case 'r': this.acc *= Math.random(); break;
                case 'n': this.acc = 0; break;
                case '$': this.asciimode = !this.asciimode; break;
                case 'l': input = input.slice(0,i) + input.slice(i+1); i = -1; break;
                case ';': this.debug.push(`${this.acc}->${String.fromCharCode(this.acc)}`); break;
            }
            i++;
        }
        return this;
    }
}
