def count_pal(digits)
    counts = (1..digits).map{ |d| count_fixed_length_palins(d) }
    [counts.last, counts.reduce(:+)]
end

def count_fixed_length_palins(digits)
    places = (digits / 2.0).ceil
    9 * 10.pow(places - 1);
end
