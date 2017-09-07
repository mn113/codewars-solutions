defmodule Revrot do
  require Integer

  def revrot(_, size) when size <= 0, do: ""
  def revrot(str, _) when str == "", do: ""
  def revrot(str, size) when length(str) < size, do: ""

  def revrot(str, size) do
    str
    |> String.codepoints
    |> Enum.chunk(size)
    |> Enum.map(fn list -> Enum.join(list) end)
    |> Enum.map(fn s -> if(Integer.is_even(cubesum(s)), do: rev(s), else: rot(s)) end)
    |> Enum.join()
  end

  defp cubesum(str) do
    str
    |> String.graphemes
    |> Enum.map(&String.to_integer/1)
    |> Enum.map(fn x -> x*x*x end)
    |> Enum.sum
  end

  defp rev(str) do
    str
    |> String.graphemes
    |> Enum.reverse
    |> Enum.join
  end

  defp rot(str) do
    [head | tail] = String.graphemes(str)

    tail ++ [head] |> Enum.join
  end

end
