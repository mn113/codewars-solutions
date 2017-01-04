function superStreetFighterSelection(fighters, position, moves){
    var pos = position,
        characterHistory = [];

    // Check if square contains a fighter:
    function isValid(pos) {
        // Mustn't go out of top or bottom:
        if (pos[0] < 0 || pos[0] >= fighters.length) return false;
        // Test name length in square:
        return fighters[pos[0]][pos[1]].length > 0;
    }

    // Move across the grid in the specified direction:
    function makeMove(move) {
        var height = fighters.length;
        var width = fighters[0].length;
        // Process move:
        switch (move) {
            case "up":
                // Try to go up once:
                if (isValid([pos[0]-1, pos[1]])) {
                    pos[0] -= 1;
                }
                break;

            case "down":
                // Try to go down once:
                if (isValid([pos[0]+1, pos[1]])) {
                    pos[0] += 1;
                }
                break;

            case "left":
                // Go left, skipping blanks, loop around:
                do {
                    pos[1] = (width + pos[1] - 1) % width;
                } while (!isValid(pos));
                break;

            case "right":
                // Go right, skipping blanks, loop around:
                do {
                    pos[1] = (pos[1] + 1) % width;
                } while (!isValid(pos));
                break;
        }
        // Output:
        characterHistory.push(fighters[pos[0]][pos[1]]);
    }

    // Chain the moves together:
    for (var i=0; i < moves.length; i++) {
        makeMove(moves[i]);
    }
    return characterHistory;
}


fighters4 = [
	[        "",     "Ryu",  "E.Honda",  "Cammy" ],
	[  "Balrog",     "Ken",  "Chun Li",       "" ],
	[    "Vega",        "", "Fei Long", "Balrog",],
    [  "Blanka",   "Guile",         "", "Chun Li"],
    [ "M.Bison", "Zangief",  "Dhalsim", "Sagat"  ],
    [  "Deejay",   "Cammy",         "", "T.Hawk" ]
];
position = [0,3];
moves =  ["left","left","down","right","right","right","right","down","left","left","left","left","down","right","right", "down","right","right","right","down","left","left","left","down","left","left","left"];
solution4 = ['E.Honda', 'Ryu', 'Ken', 'Chun Li', 'Balrog', 'Ken', 'Chun Li', 'Fei Long', 'Vega', 'Balrog', 'Fei Long', 'Vega', 'Blanka', 'Guile', 'Chun Li', 'Sagat', 'M.Bison', 'Zangief', 'Dhalsim', 'Dhalsim', 'Zangief', 'M.Bison', 'Sagat', 'T.Hawk', 'Cammy', 'Deejay', 'T.Hawk'];
chars4 = superStreetFighterSelection(fighters4, position, moves);
if (chars4 == solution4) {
    console.log("OK");
}
else {
    console.log(chars4);
}
