def total_kilometers(consumption, petrol)  # litres/100km, litres
  (100.0 * petrol / consumption).round(2)
end

def check_distance(distance, consumption, petrol)
  return "You will need to refuel" if distance > total_kilometers(consumption, petrol)

  d = 0
  output = []
  while d <= distance do
    km_left = distance - d
    petrol_left = petrol - (consumption * d / 100)
    if petrol_left - petrol_left.to_i != 0 then petrol_left = petrol_left.round(2) end

    output.push([d, km_left, petrol_left])
    d += 100
  end

  output

end
