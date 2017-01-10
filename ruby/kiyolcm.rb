def kiyo_lcm(grid)
  if grid.flatten.uniq == []
    return 0
  end

  nums = convert_grid(grid)
  puts nums.to_s

  lcm(nums)
end

def convert_grid(grid)
  # Convert grid to sums of odd elements:
  grid.map! do |row|
    row.map!.with_index do |el, i|
      (i.even? && el.is_a?(Numeric)) ? el : 0
    end.reduce(:+)
  end
  grid
end

$primes = [2,3,5,7,11,13,17,19,23,29,31,37,41,43]  # input cannot exceed 45

def lcm(nums)
  # get prime factors of each num
  pfs = prime_factorise(nums).uniq
  baseprimes = []
  puts pfs.to_s
  if pfs.include?(0)
    return 0
  end

  # Extract all common primes, starting with 2
  primes.each do |p|
    most_p = 0
    pfs.each do |pf|
      new_most_p = pf.count { |x| x == p }
      if new_most_p > most_p
        most_p = new_most_p
      end
    end
    most_p.times do
      baseprimes.push(p)
    end
  end

  puts baseprimes.to_s

  # multiply out
  baseprimes.reduce(:*)
end

def prime_factorise(nums)
  pfs = []
  nums.each do |num|
    pf = []
    $primes.each do |p|
      while num % p == 0
        pf.push(p)
        num /= p
      end
    end
    pfs.push(pf)
  end
  pfs
end
