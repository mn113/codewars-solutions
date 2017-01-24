require 'prime'

$pf_dict = {}

def candies_to_buy(invites)
  return invites if invites <= 2
  # Calculate recursively:
  mult_reduce(invites, candies_to_buy(invites - 1))
end

def mult_reduce(new, previous)
  # Quick returns:
  return previous if previous % new == 0
  return new * previous if new.prime?
  # Combine the prime factors of the two arguments:
  all_primes = (Prime.prime_division(previous) + Prime.prime_division(new)).sort
  # Remove too-low exponents:
  all_primes.each_cons(2) do |pair|
    if pair[0][0] == pair[1][0]
      min_exponent = pair[0][1] <= pair[1][1] ? pair[0] : pair[1]
      all_primes.delete(min_exponent)
    end
  end
  # Multiply out:
  all_primes.inject(1) { |prod,item| prod * item[0]**item[1] }
end

def primes_in(n)
  # Retrieve result:
  return $pf_dict[n] if $pf_dict.has_key(n)
  # Calculate:
  pd = Prime.prime_division(n)
  # Store result:
  $pf_dict[n] = pd
  pd
end
