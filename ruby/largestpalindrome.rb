def numeric_palindrome(*args)
  max_pal = 0
  2.upto(args.length) do |n|
    args.combination(n).each do |combo|
      max_pal = [largest_palindrome(combo.reduce(:*)), max_pal].max
    end
  end
  max_pal
end

def largest_palindrome(n)
  pal_start = ''
  digits = n.to_s.chars.sort.reverse
  digits.uniq.each do |d|
    break if d == '0' && pal_start == ''  # don't let 0 be first digit
    num = digits.count(d)
    (num/2).floor.times do
      pal_start += d
      2.times { digits.delete_at(digits.index(d)) }
    end
  end
  middle = digits.length > 0 ? digits[0] : ''
  (pal_start + middle + pal_start.reverse).to_i
end
