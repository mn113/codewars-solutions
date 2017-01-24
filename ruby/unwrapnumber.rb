def unwrap(gift)
  # Take off all layers:
  while !gift.instance_of? Fixnum
    gift = convert(gift)
  end
  gift
end

def convert(gift)
  if gift.instance_of? Fixnum
    gift

  elsif gift.instance_of? String
    gift.to_i

  elsif gift.instance_of? Range
    gift.to_a.empty? ? gift.first : gift.last

  elsif gift.instance_of? Hash
    convert(gift.keys + gift.values)

  elsif gift.instance_of? Array
    gift.flatten.inject(0) {|sum,n| sum + convert(n)}
  end
end
