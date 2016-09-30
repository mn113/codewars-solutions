<?php
	
function mxdiflg($a1, $a2) {
    if (empty($a1) || empty($a2)) {
      return -1;
    }
    
    $a1lens = array();
    $a2lens = array();
    
    // Extract lengths:
    foreach($a1 as $a1str) array_push($a1lens, strlen($a1str));
    foreach($a2 as $a2str) array_push($a2lens, strlen($a2str));
        
    // Compare:
    return max((max($a2lens) - min($a1lens)), (max($a1lens) - min($a2lens)));
}