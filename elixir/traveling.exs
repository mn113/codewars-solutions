defmodule SalesmanTravel do

  # Handle empty list case:
  def travel([], zipcode), do: zipcode <> ":/"

  # Convert a long string of addresses into a zipcode-grouped string format:
  def travel(addresses, zipcode) do
    address_regex = Regex.compile!("(?<number>\\d+)\s(?<street>.+)\s#{zipcode}", "u")

    addresses
    |> String.split(",", trim: true)
    |> Enum.map(fn address_str -> Regex.named_captures(address_regex, address_str) end)
    |> Enum.reject(&is_nil/1)
    |> format(zipcode)
  end

  # Build the output string ("zipcode:street,street/number,number")
  defp format(list, zipcode) do
    zipcode <> ":" <> concatenate(list,"street") <> "/" <> concatenate(list,"number")
  end

  # Extract a keyed value from each list item's map, and comma-join them as a string:
  defp concatenate(addr_map_list, key) do
    addr_map_list
    |> Enum.map(fn item -> item[key] end)
    |> Enum.join(",")
  end
end
