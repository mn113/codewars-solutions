def rolldice_sum_prob(sum_, dice_amount)
    d = [1,2,3,4,5,6].freeze
    d.repeated_permutation(dice_amount).to_a
     .select{|comb| comb.reduce(:+) == sum_}.length
     .to_f / 6**dice_amount
end
