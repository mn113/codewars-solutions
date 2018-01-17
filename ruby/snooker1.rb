def frame(balls)
  return 'Foul' if balls =~ /W/

  colours = "W,R,Y,G,Bn,Be,P,Bk".split(",")
  score = balls
    .gsub(/(R|Y|G|Bn|Be|P|Bk)(\d*)/) { |_| $1 * ($2 == "" ? 1 : $2.to_i) }
    .gsub(/(R|Y|G|Bn|Be|P|Bk)/) { |_| colours.index($1) }
    .chars
    .map(&:to_i)
    .reduce(:+)

  (score <= 147) ? score : 'invalid data'
end
