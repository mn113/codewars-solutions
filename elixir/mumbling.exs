defmodule Mumbling do

  def accum(input_str) do
    input_str
      |> String.split("", trim: true)
      |> Enum.with_index
      |> Enum.map(fn({char, i}) -> sillyword(char, i) end)
      |> Enum.join("-")
  end

  defp sillyword(char, i) do
    String.upcase(char) <> String.duplicate(String.downcase(char), i)
  end

end
