<?php

$GLOBALS['genes']  = str_split("ACGT");
$GLOBALS['rogues'] = str_split("BDEFHIJKLMNOPQRSUVWXYZ");

function build_bad_genome($length) {
    $genome = '';
    while (strlen($genome) < $length) {
        $genome .= (rand(0,100) / 100 < 0.85) ? $GLOBALS['genes'][rand(0,3)] : $GLOBALS['rogues'][rand(0,21)];
    }
    print $genome."\n";
    return $genome;
}

function only_goods(array $chain) {
    return array_filter($chain, function($c) {
        return in_array($c, $GLOBALS['genes']);
    });
}

function only_bads(array $chain) {
    return array_filter($chain, function($c) {
        return !in_array($c, $GLOBALS['genes']);
    });
}

function tag_aliens(array $genome) {
    # Copy original chain & replace all rogues:
    return array_map(function($x) {
        return in_array($x, $GLOBALS['rogues']) ? '.' : $x;
    }, $genome);
}

function get_sequence_bounds(array $xenome) {
    # Do not delete more than 20% of good genes:
    $max_good_delete = floor(0.2 * count(only_goods($xenome)));
    print "\ndelete at max ". $max_good_delete ." goods\n";
    $bad_indexes = array_walk($xenome, function($x, $idx) {     // PROBLEM
        $xenome[$idx] = ($x == '.') ? $idx : false;
    });
    print implode('', $xenome);
    $bad_indexes = array_filter($bad_indexes);
    print implode(',', $bad_indexes);

    # Commence search for deletable X-bound sequence having most X's:
    $most_bads = 0;
    $start = $end = false;
    foreach ($bad_indexes as $bi) {
        $a = $z = $bi;  # sequence end markers
        $seq = [];
        # Keep adding to seq:
        while ($z < strlen($xenome) && count(only_goods($seq)) <= $max_good_delete) {
            $z += 1;
            array_push($seq, $xenome[$z]);
        }
        # Prune any good genes from seq's tail:
        while (in_array(end($seq), $GLOBALS['genes'])) array_pop($seq);
        print $a.' '.$seq."\n";
        # Test final seq against previous:
        if (count(only_bads($seq)) > $most_bads) {
            $most_bads = count(only_bads($seq));
            $start = $a;
            $end = $start + count($seq);
        }
    }
    print $start.' '.$end."\n";
    return [$start, $end];
}

function search_genome($genome) {
    $xenome = tag_aliens(str_split($genome));
    print implode('', $xenome);

    $bounds = get_sequence_bounds($xenome);
    $start = $bounds[0];
    $end = $bounds[1];

    if (($start >= 0) && ($end > 0) && ($start < $end)) {
        return [$start, $end, array_slice($genome, $start, $end - $start)];
    }
    return "No sequence found.";
}

print "\n".search_genome(build_bad_genome(20));
