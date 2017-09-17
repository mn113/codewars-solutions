def bishop_diagonal(b1, b2)
    delta = [b2[0].ord - b1[0].ord, b2[1].to_i - b1[1].to_i]

    if delta[0].abs != delta[1].abs
        [b1, b2]
    else
        vector = delta.map{|x| x > 0 ? 1 : -1}
        [move_bishop(b2,vector), move_bishop(b1,vector.map!{|x| -x})]
    end.sort!
end

def move_bishop(startpos, vector)
    x = startpos[0].ord - 97  #a
    y = startpos[1].to_i

    while (x > 0 and x < 7 and y > 1 and y < 8) do
        x += vector[0]
        y += vector[1]
    end
    "abcdefgh".chars[x] << y.to_s
end
