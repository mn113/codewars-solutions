require 'prime'

def candies_to_buy(invites)
  return invites if invites <= 2
  # Calculate recursively:
  mult_reduce(invites, candies_to_buy(invites - 1))
end

def mult_reduce(new, previous)
  return new * previous if new.prime?
  # Get prime factors of arguments:
  main_primes = primes_in(previous)
  extra_primes = primes_in(new)
  # Add sufficient of each prime to satisfy the new number:
  extra_primes.each do |p|
    while extra_primes.count(p) > main_primes.count(p)
      main_primes.push(p)
    end
  end
  # Mulitply out factors:
  main_primes.reduce(:*)
end

def primes_in(n)
  # Find prime factorisation of n:
  factors = []
  Prime.each do |p|
    if n.prime?
      factors.push(n)
      break
    end
    while n % p == 0
      factors.push(p)
      n = n/p
    end
    break if n == 1
  end
  factors
end
