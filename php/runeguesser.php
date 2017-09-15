<?php
function solve_expression(string $expr): int {
    # Fix formatting for eval:
    $expr = str_replace("--", "- -", $expr);
    $expr = str_replace("=", "==", $expr);

    # Try all non-present digits:
    foreach (eliminate_digits($expr) as $r) {
        if ($r == '0' && has_dodgy_leading_zeros($expr)) continue;
        if (eval_with_digit($expr, $r)) return $r;
    }
    # No solution:
    return -1;
}

function eliminate_digits(string $expr): array {
    $digits = str_split("0123456789");
    return array_filter($digits, function($d) use ($expr) {
        return !strstr($expr, $d);
    });
}

function has_dodgy_leading_zeros(string $expr): bool {
    $expr = str_replace("?", "0", $expr);
    if (preg_match("/(^0\d)|([=\+\-\*]0\d)/", $expr)) {
        return TRUE;
    }
    return FALSE;
}

function eval_with_digit(string $expr, string $d): int {
    $expr = str_replace("?", $d, $expr);
    return eval("return " . $expr . ";");
}
