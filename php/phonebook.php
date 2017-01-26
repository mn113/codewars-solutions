<?php

function phone($strng, $phone_num) {
    $cdir = clean_directory($strng);
    $matches = array_values(array_filter(array_map(function($entry, $needle) {
        return ($entry[0] == '+'.$needle) ? $entry : false;
    }, $cdir, array_fill(0, count($cdir)-1, $phone_num))));  # I hate this...

    $n = count($matches);
    if ($n >= 2) return "Error => Too many people: $phone_num";
    elseif ($n == 0) return "Error => Not found: $phone_num";
    else return "Phone => {$phone_num}, Name => {$matches[0][1]}, Address => {$matches[0][2]}";
}

function clean_directory($mess) {
    $directory = [];
    $lines = explode("\n", $mess);
    foreach ($lines as $line) {
        // Extract tel & name:
        $tf = preg_match('/\+\d{1,2}-\d{3}-\d{3}-\d{4}/', $line, $tel);
        $nf = preg_match('/<(.*)>/', $line, $name);
        // Strip tel & name from line:
        if ($tf) $line = str_replace($tel[0], '', $line);
        else $tel = [''];
        if ($nf) $line = str_replace('<'.$name[1].'>', '', $line);
        else $name = ['',''];
        // The address (junk-wrapped) remains
        // Store:
        $directory[] = [$tel[0], $name[1], clean_address($line)];
    }
    return $directory;
}

function clean_address($addr) {
    $whitespace = " \t\n\r\0\x0B";
    $junk = "/!:;<>_-?*";
    $middle_junk = ",;_$";
    $addr = trim($addr, $whitespace.$junk);
    $addr = str_replace(str_split($middle_junk), ' ', $addr);
    # Make all whitespace one space:
    $addr = preg_replace('/\s+/', ' ', $addr);
    return $addr;
}

$dr = "/+1-541-754-3010 156 Alphand_St. <J Steeve>\n
133, Green, Rd. <E Kustur> NY-56423 ;+1-541-914-3010\n"
."+1-541-984-3012 <P Reed> /PO Box 530; Pollocksville, NC-28573\n
 :+1-321-512-2222 <Paul Dive> Sequoia Alley PQ-67209\n"
."+1-741-984-3090 <Peter Reedgrave> _Chicago\n
 :+1-921-333-2222 <Anna Stevens> Haramburu_Street AA-67209\n"
."+1-111-544-8973 <Peter Pan> LA\n
 +1-921-512-2222 <Wilfrid Stevens> Wild Street AA-67209\n"
."<Peter Gone> LA ?+1-121-544-8974 \n
 <R Steell> Quora Street AB-47209 +1-481-512-2222\n"
."<Arthur Clarke> San Antonio $+1-121-504-8974 TT-45120\n
 <Ray Chandler> Teliman Pk. !+1-681-512-2222! AB-47209,\n"
."<Sophia Loren> +1-421-674-8974 Bern TP-46017\n
 <Peter O'Brien> High Street +1-908-512-2222; CC-47209\n"
."<Anastasia> +48-421-674-8974 Via Quirinal Roma\n
 <P Salinger> Main Street, +1-098-512-2222, Denver\n"
."<C Powel> *+19-421-674-8974 Chateau des Fosses Strasbourg F-68000\n
 <Bernard Deltheil> +1-498-512-2222; Mount Av.  Eldorado\n"
."+1-099-500-8000 <Peter Crush> Labrador Bd.\n
 +1-931-512-4855 <William Saurin> Bison Street CQ-23071\n"
."<P Salinge> Main Street, +1-098-512-2222, Denve\n"
."/+5-541-754-3010 156 Alphandria_Street. <Jr Part>\n
 1333, Green, Road <F Fulgur> NW-46423 ;+6-541-914-3010!\n"
."+5-541-984-3012 <Peter Reeves> /PO Box 5300; Albertville, SC-28573\n
 :+5-321-512-2222 <Paulo Divino> Boulder Alley ZQ-87209\n"
."+3-741-984-3090 <F Flanaghan> _Chicago Av.\n
 :+3-921-333-2222 <Roland Scorsini> Bellevue_Street DA-67209\n"
."+8-111-544-8973 <Laurence Pantow> SA\n
 +8-921-512-2222 <Raymond Stevenson> Joly Street EE-67209\n"
."<John Freeland> Mantow ?+2-121-544-8974 \n
 <Robert Mitch> Eleonore Street QB-87209 +2-481-512-2222?\n"
."<Arthur Paternos> San Antonio $+7-121-504-8974 TT-45121\n
 <Ray Charles> Stevenson Pk. !+7-681-512-2222! CB-47209,\n"
."<JP Gorce> +9-421-674-8974 New-Bern TP-16017\n
 <P McDon> Revolution Street +2-908-512-2222; PP-47209\n"
."<Elizabeth Corber> +8-421-674-8974 Via Papa Roma\n
 <C Saborn> Main Street, +15-098-512-2222, Boulder\n"
."<Colin Marshall> *+9-421-674-8974 Edinburgh UK\n
 <Bernard Povit> +3-498-512-2222; Hill Av.  Cameron\n"
."+12-099-500-8000 <Pete Highman> Ontario Bd.\n
 +8-931-512-4855 <W Mount> Oxford Street CQ-23071\n"
."<Donald Drinkaw> Moon Street, +3-098-512-2222, Peterville\n";

print_r(phone($dr, "48-421-674-8974"));//, "Phone => 48-421-674-8974, Name => Anastasia, Address => Via Quirinal Roma");
print_r(phone($dr, "19-421-674-8974"));//, "Phone => 19-421-674-8974, Name => C Powel, Address => Chateau des Fosses Strasbourg F-68000");
print_r(phone($dr, "1-921-512-2222"));//, "Phone => 1-921-512-2222, Name => Wilfrid Stevens, Address => Wild Street AA-67209");
print_r(phone($dr, "1-908-512-2222"));//, "Phone => 1-908-512-2222, Name => Peter O'Brien, Address => High Street CC-47209");
print_r(phone($dr, "1-541-754-3010"));//, "Phone => 1-541-754-3010, Name => J Steeve, Address => 156 Alphand St.");
