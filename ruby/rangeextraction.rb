# Generate print range from a list of integers

def solution(list)
  ranged = []
  list.each_cons(3) do |trio|
    if trio[0] + 1 == trio[1] and trio[1] + 1 == trio[2] then ranged.concat(trio) end
  end
  ranged.uniq!

  list.map! do |n|
    if !ranged.include?(n)
      n
    elsif !ranged.include?(n - 1)
      n.to_s + "from"
    elsif !ranged.include?(n + 1)
      "to" + n.to_s
    end
  end
  list.reject{ |n| n.nil? }.join(",").gsub(/from,to/, "-")
end
