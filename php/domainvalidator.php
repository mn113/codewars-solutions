<?php

function validate($domain) {
    $domain = strtolower($domain);
    if (strlen($domain) > 253) return FALSE;
    if (!preg_match('/^[a-z\d][a-z\d\.\-]*\.[a-z\d\-]+$/', $domain)) return FALSE;

    // Break it down:
    $levels = explode('.', $domain);
    if (count($levels) > 127) return FALSE;
    foreach ($levels as $level) {
        if (!preg_match('/^[a-z\d\-]{0,62}[a-z\d]$/', $level)) return FALSE;
        if ($level[0] == '-') return FALSE;
    }
    // TLD:
    if (preg_match('/^[\d]*$/', $levels[count($levels)-1])) return FALSE;
    return TRUE;
}
