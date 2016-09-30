<?php
	
class CaesarCipher {
	
	const KEY = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	private $hash;
	private $shift;
	
	public function __construct($shift) {
		$this->shift = $shift;
		$this->buildhash();
	}
	
	private function buildhash() {
		$top = str_split(self::KEY);
		$bot1 = substr(self::KEY, $this->shift, strlen(self::KEY) - $this->shift);
		$bot2 = substr(self::KEY, 0, $this->shift);
		$bottom = str_split($bot1 . $bot2);
		$this->hash = array_combine($top, $bottom);
		//print_r($this->hash);		// OK
	}
	
	public function encode($plaintext, $hash = NULL) {
		if (is_null($hash)) { $hash = $this->hash; }	// use property hash by default

		$pt = strtoupper($plaintext);
		//print "$pt\n";
		$output = array();
		// Process character-by-character:
		foreach (str_split($pt) as $c) {
			// Lookup:
			if (array_key_exists($c, $hash)) {
				$output[] = $hash[$c];
			}
			else {
				$output[] = $c;
			}
		}
		return join('', $output);
	}
	
	public function decode($ciphertext) {
		// Invert hash for decoding:
		$invhash = array_flip($this->hash);
		return $this->encode($ciphertext, $invhash);	// encode using inverted hash
	}
}

$c = new CaesarCipher(5);
print $c->encode('Codewars'); // 'HTIJBFWX'
print "\n";