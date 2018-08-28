$special_lengths = [2,4,10,28,82,244,730,2188,6562,19684,59050] # next = multiply by 3, subtract 2

$lookups = { # advances 1 row
    'RR' => 'R', 'GG' => 'G', 'BB' => 'B',
    'GB' => 'R', 'BR' => 'G', 'RG' => 'B',
    'BG' => 'R', 'RB' => 'G', 'GR' => 'B'
}

def skip_n_rows(inrow, n)
    (0...inrow.length + 1 - n).map do |i|
        $lookups[inrow[i] + inrow[i+n-1]]
    end.join
end

def triangle(row)
    return row if row.length == 1
    return $lookups[row] if row.length == 2
    # jump many rows:
    $special_lengths.reverse.each do |s|
        while row.length > s do
            row = skip_n_rows(row, s)
        end
    end
    return triangle(row)
