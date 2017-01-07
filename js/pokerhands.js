class PokerHand {

    constructor(hand) {
        console.log(hand);
        this.values = [];
        this.suits = [];
        // Make sense of the input string:
        hand.split(' ').forEach(function(card) {
            // Split value from suit:
            var value = card.split('')[0];
            var suit = card.split('')[1];
            // Convert pictures to numbers:
            var pictures = {'T': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14};
            if (pictures.hasOwnProperty(value)) { value = pictures[value]; }
            else { value = parseInt(value, 10); }
            // Store them:
            this.values.push(value);
            this.suits.push(suit);
        }.bind(this));
        // Sort high-low:
        this.values.sort(function(a, b) {
            return b - a;
        });
        console.log(this.values);
    }

    is4ofakind() {
        // Look for 4 matching cards in sequence:
        if (this.matchingCards(this.values.slice(0,4))) {
            this.goodcards = [this.values[0]];
            this.kickers = [this.values[4]];
            return true;
        }
        else if (this.matchingCards(this.values.slice(1,5))) {
            this.goodcards = [this.values[1]];
            this.kickers = [this.values[0]];
            return true;
        }
        return false;
    }

    isStraight() {
        for (var i = 0; i < 4; i++) {
            // Look for adjacent cards not differing by 1:
            if (this.values[i] !== this.values[i+1] + 1) return false;
        }
        this.goodcards = [this.values[0]];
        return true;
    }

    isFlush() {
        // All the same suit?
        if (this.matchingCards(this.suits)) {
            this.kickers = this.values;
            return true;
        }
        return false;
    }

    isFullHouse() {
        // Look for 3 matching + 2 matching:
        if (this.matchingCards(this.values.slice(0,3)) && this.matchingCards(this.values.slice(3,4))) {
            this.goodcards = [this.values[0], this.values[3]];
            return true;
        }
        else if (this.matchingCards(this.values.slice(0,2)) && this.matchingCards(this.values.slice(2,4))) {
            this.goodcards = [this.values[0], this.values[2]];
            return true;
        }
        return false;
    }

    is3ofakind() {
        // Check for a trio in 3 possible positions:
        for (var i = 0; i < 3; i++) {
            if (this.matchingCards(this.values.slice(i,i+3))) {
                this.goodcards = [this.values[i]];
                this.kickers = this.values.splice(i,3);
                return true;
            }
        }
        return false;
    }

    is2pairs() {
        if (this.matchingCards(this.values.slice(0,2)) && this.matchingCards(this.values.slice(2,4))) {
            this.goodcards = [this.values[0], this.values[2]];
            this.kickers = [this.values[4]];
            return true;
        }
        else if (this.matchingCards(this.values.slice(0,2)) && this.matchingCards(this.values.slice(3,5))) {
            this.goodcards = [this.values[0], this.values[3]];
            this.kickers = [this.values[2]];
            return true;
        }
        else if (this.matchingCards(this.values.slice(1,3)) && this.matchingCards(this.values.slice(3,5))) {
            this.goodcards = [this.values[1], this.values[3]];
            this.kickers = [this.values[0]];
            return true;
        }
        return false;
    }

    is1pair() {
        // Check for a pair in 4 possible positions:
        for (var i = 0; i < 4; i++) {
            if (this.matchingCards(this.values.slice(i,i+2))) {
                this.goodcards = [this.values[i]];
                console.log("match @", i);
                this.kickers = this.values.splice(i,2);
                return true;
            }
        }
        return false;
    }

    // Check if a series of cards have the same value:
    matchingCards(values) {
        var s = new Set(values);
        return s.size === 1;
    }

    // Build a rating value comparable against other hands:
    rateHand() {
        var rate = 0;
        if (this.isFlush() && this.isStraight()) rate = 80; // ok
        else if (this.is4ofakind()) rate = 70;  // ok
        else if (this.isFullHouse()) rate = 60; // ok
        else if (this.isFlush()) rate = 50;     // ok
        else if (this.isStraight()) rate = 40;  // ok
        else if (this.is3ofakind()) rate = 30;  // ok
        else if (this.is2pairs()) rate = 20;    // ok
        else if (this.is1pair()) rate = 10;

        return [rate, 'G:'].concat(this.goodcards).concat('K:').concat(this.kickers);
    }

    compareWith(hand2) {
        var a = this.rateHand();
        var b = hand2.rateHand();
        console.log(a, b);

        // Compare rank, then goodcards, then kickers:
        while (a.length > 0) {
            if (a[0] > b[0]) return 1;      // a wins
            else if (a[0] < b[0]) return 3; // a loses
            a.unshift();
            b.unshift();
        }
        // Unresolved - a tie
        return 2;
    }
}

//var Result = { "win": 1, "loss": 2, "tie": 3 };

var p = new PokerHand("2H 1e Kc 1s 3H");
console.log(p.rateHand());
//var q = new PokerHand("KS AS AS QS KS");
//console.log(Result.win, "==", p.compareWith(q));
