<?php

function validBraces($braces) {
    $opened = array();

    // Take one char at a time:
    foreach (str_split($braces) as $char) {
        // An opening brace/bracket/paren is always valid:
        if (in_array($char, str_split('([{'))) {
            // Add new opened brace:
            $opened[] = $char;
        }
        // A closing brace/bracket/paren must match last opened:
        else if ($char == ')') {
            // Remove last opened brace for check:
            if (array_pop($opened) !== '(') {
                return false;
            }
        }
        else if ($char == ']') {
            // Remove last opened brace for check:
            if (array_pop($opened) !== '[') {
                return false;
            }
        }
        else if ($char == '}') {
            // Remove last opened brace for check:
            if (array_pop($opened) !== '{') {
                return false;
            }
        }
    }

    // No error found
    // No opened braces left over?
    return count($opened) == 0;
}

print validBraces("(){}[]") ? 'true' : 'false';
print validBraces("(}") ? 'true' : 'false';
print validBraces("[(])") ? 'true' : 'false';
print validBraces("([{}])") ? 'true' : 'false';
