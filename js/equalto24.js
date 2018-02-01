// Taking 4 playing card values (1-13) and operator +, -, *, /, (), find out if an equation can be written which evaluates to 24.

function equalTo24(a,b,c,d) {
  const deleteBrackets = [
    [0,2,4,6,8,10,12,14],  // keep no brackets
    [2,4,8,10,12,14],  // bracket first 2 terms
    [0,2,4,6,10,12],   // bracket last 2 terms
    [0,2,6,8,12,14],   // bracket middle 2 terms
    [2,4,10,12],       // bracket first 2 terms and last 2 terms
    [2,4,6,8,12,14],   // bracket first 3 terms
    [0,2,6,8,10,12]    // bracket last 3 terms
  ];
  for (var arr of perms(a,b,c,d)) {
    for (var ops of operatorCombos()) {
      for (var del of deleteBrackets) {
        // fill equation template:
        var template = ["(",arr[0],")",ops[0],"(",arr[1],")",ops[1],"(",arr[2],")",ops[2],"(",arr[3],")"];
        // remove unwanted brackets at specified indices:
        for (var i of del) {
          template[i] = " ";
        }
        var equation = template.join("");
        if (24 == eval(equation)) return equation;
      }
    }
  }
  return "It's not possible!"
}

function perms(a,b,c,d) {
  return [
    [a,b,c,d],[a,b,d,c],
    [a,c,b,d],[a,c,d,b],
    [a,d,b,c],[a,d,c,b],

    [b,a,c,d],[b,a,d,c],
    [b,c,a,d],[b,c,d,a],
    [b,d,a,c],[b,d,c,a],

    [c,a,b,d],[c,a,d,b],
    [c,b,a,d],[c,b,d,a],
    [c,d,a,b],[c,d,b,a],

    [d,a,b,c],[d,a,c,b],
    [d,b,a,c],[d,b,c,a],
    [d,c,a,b],[d,c,b,a]
  ];
}

function operatorCombos() {
  const ops = "+-*/".split("");
  var arr = [];
  for (var i of ops) {
    for (var j of ops) {
      for (var k of ops) {
        arr.push(i+j+k);
      }
    }
  }
  return arr; // 4*4*4
}
