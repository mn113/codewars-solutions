const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const ALPH = UPPERCASE + LOWERCASE + "0123456789.,:;-?! '()$%&" + "\"";

function swapCase(char) {
    if (UPPERCASE.indexOf(char) !== -1) return char.toLowerCase();
    if (LOWERCASE.indexOf(char) !== -1) return char.toUpperCase();
    return char;
}

function diff(b,c) {
    return ALPH[(ALPH.length + ALPH.indexOf(b) - ALPH.indexOf(c)) % ALPH.length];
}

function undiff(b,c) {
    return ALPH[(ALPH.length + ALPH.indexOf(b) - ALPH.indexOf(c)) % ALPH.length];
}

console.log(undiff('B','6'));   // U

function mirror(char) {
    return ALPH[ALPH.length - 1 - ALPH.indexOf(char)];
}

function encrypt(text) {
    var pre = precheck(text);
    if (pre === '' || pre === null) return pre;

    // 1. Switch case:
    var step1 = [];
    for (var i = 0; i < text.length; i++) {
        var c = text[i];
        c = (i % 2 === 0) ? c : swapCase(c);
        step1.push(c);
    }

    // 2. Difference between indexes:
    var step2 = [step1[0]];
    for (var j = 1; j < step1.length; j++) {
        step2.push(diff(step1[j-1], step1[j]));
    }

    // 3. Mirrored index:
    step2[0] = mirror(step2[0]);

    return step2.join('');
}

function decrypt(encryptedText) {
    var pre = precheck(encryptedText);
    if (pre === '' || pre === null) return pre;

    // 1. Unmirror first letter
    var step1 = encryptedText.split('');
    step1[0] = mirror(step1[0]);

    // 2. Undiff pairs
    var step2 = step1;
    for (var j = 1; j < step2.length; j++) {
        step2[j] = undiff(step2[j-1], step2[j]);
    }

    // 3. Switch case
    var step3 = [];
    for (var i = 0; i < step2.length; i++) {
        var c = step2[i];
        c = (i % 2 === 0) ? c : swapCase(c);
        step3.push(c);
    }

    return step3.join('');
}

function precheck(string) {
    if (string === '' || string === null) return string;
    // Valid characters?
    for (var i = 0; i < string.length; i++) {
        if (ALPH.indexOf(string[i]) === -1) throw Error;
    }
    return 1;
}

// Basic Encrypt Tests
console.log(decrypt(encrypt("Kobayashi")));
console.log(encrypt("Do the kata \"Kobayashi-Maru-Test!\" Endless fun and excitement when finding a solution!"), "$-Wy,dM79H'i'o$n0C&I.ZTcMJw5vPlZc Hn!krhlaa:khV mkL;gvtP-S7Rt1Vp2RV:wV9VuhO Iz3dqb.U0w");
console.log(encrypt("This is a test!"), "5MyQa9p0riYplZc");
