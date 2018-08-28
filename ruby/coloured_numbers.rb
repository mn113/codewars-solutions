def same_col_seq(val, k, col)
    cval = ['blue','red','yellow'].index(col)
    triangular_nums(val).select{ |t| t % 3 == cval and t > val }.take(k)
end

def triangular_nums(high)
    seq = [1]
    i = 1
    while seq.last + i + 1 < high * 10 do
        i += 1
        seq << seq.last + i
    end
    seq
end
