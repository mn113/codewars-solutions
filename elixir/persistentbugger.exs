# Codewars Kata: calculate how many times the digits of n can be multiplied
# before the result is a single digit

defmodule PersistentBugger do
  # force 0 as the default 2nd parameter:
  def persistence(n) do persistence(n,0) end

  # recursively do product_of_digits until n is single-digit
  def persistence(n, t) do
    cond do
      n >  9 -> persistence(product_of_digits(n), t + 1)
      n <= 9 -> t
    end
  end

  defp product_of_digits(n) do
    n
    |> Integer.to_string
    |> String.codepoints
    |> Enum.map(&String.to_integer/1)
    |> Enum.reduce(1, fn(x, acc) -> x * acc end)
  end
end
