def encode_resistor_colors(ohms_string)
  value = ohms_string.split(' ').first
  if value[-1] == 'M'
    value = value.chop.to_f * 1000000
  elsif value[-1] == 'k'
    value = value.chop.to_f * 1000
  else
    value = value.to_f
  end
  value = value.to_i

  colors = "black brown red orange yellow green blue violet gray white".split(' ')

  bands = []
  bands[0] = colors[value.to_s[0].to_i]
  bands[1] = colors[value.to_s[1].to_i]
  bands[2] = colors[value.to_s.length - 2]
  bands[3] = "gold"

  return bands.join(' ')
end
