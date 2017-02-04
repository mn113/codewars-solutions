def calc expression
  p expression
  p parts = (expression.instance_of? Array) ? expression : split(expression)

  p parts = handle_neg_brackets(parts)
  p parts = resolve_brackets(parts) if parts.include?('(')
  p parts = cancel_negatives(parts)
  p parts = do_division(parts)
  p parts = do_multiplication(parts)
  p parts = do_addition(parts)
  p parts = do_subtraction(parts)

  parts.first.round(3)
end

def split(expression)
  number_re = /^\s?(\-?[\d\.]+)/        # dig.its
  operator_re = /^\s?([+\-*\/\(\)])/    # single +-*/()  parts = []

  # Extract parts using regexes:
  parts = []
  while expression.length > 0
    #p expression
    if number_re =~ expression
      parts.push($1.to_f)
      expression = $'
    elsif operator_re =~ expression
      parts.push($1)
      expression = $'
    end
  end
  parts
end

def handle_neg_brackets(parts)
  # Negative brackets
  parts.each_cons(2).with_index do |pair,i|
    if pair == ['-', '(']
      parts.insert(i, -1, 'neg', '(')  # add 3 elements
      parts.slice!(i+3..i+4)           # remove 2
    end
  end
  parts
end

def resolve_brackets(parts)
  brackets = []
  opener = parts.index("(")
  brackets.push(opener)
  i = opener + 1

  while brackets.length> 0 && i < parts.length
    brackets.push(i) if parts[i] == '('
    brackets.pop() if parts[i] == ')'
    i += 1
  end
  closer = i

  innards = parts.slice(opener+1...closer-1)
  # Replace brackets with recursion-evaluated expansion:
  parts.insert(opener, calc(innards))
  parts.slice!(opener+1, closer-opener)
  p "Brackets done"
  parts
end

def cancel_negatives(parts)
  parts.each_cons(3).with_index do |trio,i|
    if trio[1] == 'neg'
      parts.insert(i, -1*trio[2])
      parts.slice!(i+1..i+3)
    end
  end
  parts
end

def do_division(parts)
  parts.each_cons(3).with_index do |trio,i|
    if trio[1] == '/'
      parts.insert(i, trio[0]/trio[2])
      parts.slice!(i+1..i+3)
    end
  end
  parts
end

def do_multiplication(parts)
  parts.each_cons(3).with_index do |trio,i|
    if trio[1] == '*'
      parts.insert(i, trio[0]*trio[2])
      parts.slice!(i+1..i+3)
    end
  end
  parts
end

def do_addition(parts)
  parts.each_cons(3).with_index do |trio,i|
    if trio[1] == '+'
      parts.insert(i, trio[0]+trio[2])
      parts.slice!(i+1..i+3)
    end
  end
  parts
end

def do_subtraction(parts)
  parts.each_cons(3).with_index do |trio,i|
    if trio[1] == '-'
      parts.insert(i, trio[0]-trio[2])
      parts.slice!(i+1..i+3)
    end
  end
  parts
end
