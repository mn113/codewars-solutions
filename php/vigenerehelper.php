<?php

class VigenèreCipher {

    var $key;
    var $alpha_arr;

    function __construct($key, $alphabet) {
        $this->key = $key;
        $this->alpha_arr = str_split($alphabet);
    }

    public function encode($s) {
        $s = str_split($s);
        for ($i = 0; $i < count($s); $i++) {
            // Leave non-alphabet characters untouched:
            if (!in_array($s[$i], $this->alpha_arr)) continue;
            // Get key character:
            $k = $this->key[$i % strlen($this->key)];
            // Add 2 alphabet indices:
            $char = array_search($s[$i], $this->alpha_arr) + array_search($k, $this->alpha_arr);
            // Replace plain char with ciphered char:
            $alphalen = count($this->alpha_arr);
            $s[$i] = $this->alpha_arr[($char + $alphalen) % $alphalen];
        }
        // Rejoin array:
        return implode('', $s);
    }

    public function decode($s) {
        $s = str_split($s);
        for ($i = 0; $i < count($s); $i++) {
            // Leave non-alphabet characters untouched:
            if (!in_array($s[$i], $this->alpha_arr)) continue;
            // Get key character:
            $k = $this->key[$i % strlen($this->key)];
            // Subtract alphabet indices:
            $char = array_search($s[$i], $this->alpha_arr) - array_search($k, $this->alpha_arr);
            // Replace plain char with ciphered char:
            $alphalen = count($this->alpha_arr);
            $s[$i] = $this->alpha_arr[($char + $alphalen) % $alphalen];
        }
        // Rejoin array:
        return implode('', $s);
    }

}

// creates a cipher helper with each letter substituted
// by the corresponding character in the key
$c = new VigenèreCipher('password', 'abcdefghijklmnopqrstuvwxyz');

print $c->encode('codewars') . "\n"; // returns 'rovwsoiv'
print $c->decode('rovwsoiv') . "\n"; // returns 'codewars'
