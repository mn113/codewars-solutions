def hashy_string_to_hash(str)
  h = Hash.new

  # Take curly braces off
  if inner = /^{(.+)}$/.match(str)
    # Extract pairs
    pairs = inner[0].split(", ")
    pairs.each do |pair|
      # Extract key => value
      if /:?(?<k>[a-z0-9]+)=>(?<v>[a-z0-9]+)/ =~ pair
        k = (k =~ /[0-9]+/) ? k.to_i : k.intern
        h[k] = v.to_i
      end
    end
  end

  h
end
