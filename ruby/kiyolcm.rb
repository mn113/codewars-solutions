def kiyo_lcm(grid)
  if grid.flatten.uniq == []
    return 0
  end

  lcm(convert_grid(grid))
end

def convert_grid(grid)
  # Convert grid to sums of odd elements:
  grid.map! do |row|
    row.map! do |el|
      ([1,3,5,7,9].include?(el)) ? el : 0
    end.reduce(:+)
  end
  grid
end

$primes = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79]  # input cannot exceed 81

def lcm(nums)
  # get prime factors of each num
  if nums.include?(0)
    return 0
  end

  pfs = prime_factorise(nums).uniq
  baseprimes = []

  # Extract all common primes, starting with 2
  $primes.each do |p|
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
