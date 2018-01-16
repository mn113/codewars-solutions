# String, Int ->  Int
def count_patterns_from(first_dot, length)
  # consider all permutations valid initially
  # then reject illegal jumps:
  bad = [
    /^[^B]*(AC|CA)/,
    /^[^D]*(AG|GA)/,
    /^[^H]*(GI|IG)/,
    /^[^F]*(CI|IC)/,
    /^[^E]*(AI|IA|CG|GC|BH|HB|DF|FD)/
  ]

  perms = ('A'..'I').to_a
  .permutation(length).to_a
  .map(&:join)
  .reject{ |perm| !perm.start_with? first_dot }
  .reject{ |perm| bad.any?{ |reg| reg =~ perm } }
  .size
end
