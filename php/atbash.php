<?php
class AtbashCipher {
		
	private $alphabet = '';
	private $hash = array();
	
	function __construct($alphabet) {
		$this->alphabet = $alphabet;	// 'abcdefghijklmnopqrstuvwxyz'
		$alph_arr = str_split($this->alphabet);
		$this->hash = array_combine($alph_arr, array_reverse($alph_arr));
	}
	
	public function encode($s) {
		$output = array();
		foreach (str_split($s) as $c) {
			if (array_key_exists($c, $this->hash)) {
				$output[] = $this->hash[$c];					
			}
			else {
				$output[] = $c;
			}
		}
		return join('', $output);
	}
	
	public function decode($s) {
		return $this->encode($s);			
	}
}


$c = new AtbashCipher('abcdefghijklmnopqrstuvwxyz');
print $c->encode('Martin');
print "\n";
print $c->decode('Mzigrm');
print "\n";