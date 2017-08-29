defmodule Collatz do

  def collatz(n, store \\ [])

  # While n !== 1, keep collatzing and appending to store list:
  def collatz(n, store) when n !== 1 do
    next =
      case rem(n, 2) == 0 do
        true  -> div(n, 2)
        false -> 3*n + 1
      end
    collatz(next, store ++ [n])
  end

  def collatz(n, store) when n === 1, do: store ++ [1] |> format_chain

  defp format_chain(list), do: list |> Enum.join("->")

end
