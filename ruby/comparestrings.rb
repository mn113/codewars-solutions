def mix(s1, s2)
    hash1 = count_letters(s1)
    hash2 = count_letters(s2)
    output = []
    keys = hash1.keys.concat(hash2.keys).uniq
    keys.each { |k| output.push(compare_values(hash1, hash2, k)) }
    output.sort{ |a,b| b.size == a.size ? a <=> b : b.size - a.size }.join('/')
end

def compare_values(h1,h2,k)
    if !h1.key?(k)
        '2:'+ k*h2[k]
    elsif !h2.key?(k)
        '1:'+ k*h1[k]
    elsif h1[k] > h2[k]
        '1:'+ k*h1[k]
    elsif h1[k] < h2[k]
        '2:'+ k*h2[k]
    else
        '=:'+ k*h1[k]
    end
end

def count_letters(s)
    letters = ('a'..'z').to_a
    letters.map!{ |x| s.count(x) > 1 ? [x, s.count(x)] : nil }.compact!
    Hash[letters]
end
