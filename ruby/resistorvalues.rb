def decode_resistor_colors(bandstr)
	band_key = ['black','brown','red','orange','yellow','green','blue','violet','gray','white']

	# Process input:
	bands = bandstr.split(' ')
	values = bands.map do |x|
		band_key.find_index(x)
	end

	# Combine numbers into total resistance:
	onetwo = (values[0].to_s + values[1].to_s).to_i
	exponent = (10**values[2]).to_i
	if onetwo >= 10
		onetwo /= 10.0
		exponent *= 10
	end

	# Make thousands a multiplier:
	if exponent >= 1000000
		exponent /= 1000000
		unit = 'M'
	elsif exponent >= 1000
		exponent /= 1000
		unit = 'k'
	else
		unit = ''
	end

	# Compose & format unitless value:
	ohms = onetwo * exponent.round().to_i
	# Remove unwanted .0:
	if (ohms - ohms.to_i).abs.round(1).zero?
		ohms = ohms.to_i
	end

	# Add tolerance:
	if values.length == 4
		tolerance = bands[3] == 'gold' ? 5 : (bands[3] == 'silver' ? 10 : 20)
	else
		tolerance = 20
	end

	return "#{ohms}#{unit} ohms, #{tolerance}%"
end
