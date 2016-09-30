<?php

function neat_r($arr, $return = false) {
	$out = array();
	$oldtab = "    ";
	$newtab = "  ";
	
	$lines = explode("\n", print_r($arr, true));
	
	foreach ($lines as $line) {
		//remove numeric indexes like "[0] =>" unless the value is an array
		if (substr($line, -5) != "Array") {	$line = preg_replace("/^(\s*)\[[0-9]+\] => /", "$1", $line, 1); }
		
		//garbage symbols
		foreach (array(
			"Array" => "",
			"["     => "",
			"]"     => "",
			" =>"   => ":",
		) as $old => $new) {
			$out = str_replace($old, $new, $out);
		}
		//garbage lines
		if (in_array(trim($line), array("Array", "(", ")", ""))) continue;
		//indents
		$indent = "";
		$indents = floor((substr_count($line, $oldtab) - 1) / 2);
		if ($indents > 0) { for ($i = 0; $i < $indents; $i++) { $indent .= $newtab; } }
		$out[] = $indent . trim($line);
	}
	$out = implode("\n", $out) . "\n";
	if ($return == true) return $out;
	echo $out;
}