defmodule Divisible13 do
  # Division-by-13 remainders for 1,10,100,1000,10000,100000:
  @remainders {1, 10, 9, 12, 3, 4}

  def thirt(m) do
    n = div13_remainder(m)
    # If remainder is static, return it, otherwise recurse:
    cond do
      n == m -> n
      n != m -> thirt(n)
    end
  end

  # Multiply each base10 'column' of m by its remainder, and sum them:
  defp div13_remainder(m) do
    m |> Integer.to_string
      |> String.codepoints
      |> Enum.reverse
      |> Enum.map(&String.to_integer/1)
      |> Enum.with_index
      |> Enum.map(fn {m, index} -> m * elem(@remainders, rem(index, 6)) end)
      |> Enum.sum
  end

end
