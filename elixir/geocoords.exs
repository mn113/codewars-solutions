defmodule Solution do
  def isValidCoordinates(coordStr) do
    validFormat?(coordStr) && valuesInRange?(coordStr)
  end

  def validFormat?(coordStr) do
    coordStr =~ ~r/^\-?[\d]+\.?[\d]*,\s?\-?[\d]+\.?[\d]*$/
  end

  def valuesInRange?(coordStr) do
    pt = Regex.named_captures(~r/^(?<lat>\-?[\d\.]+),\s?(?<long>\-?[\d\.]+)$/, coordStr)
    lat = Float.parse(pt["lat"]) |> elem(0)
    long = Float.parse(pt["long"]) |> elem(0)

    lat >= -90 && lat <= 90 && long >= -180 && long <= 180
  end
end
