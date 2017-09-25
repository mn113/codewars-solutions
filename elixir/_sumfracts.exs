defmodule Sumfracts do

  def sum_fracts([]), do: nil

  def sum_fracts(list) do
    bot = list
        |> Enum.map(fn {_,d} -> d end)
        |> lcm
    top = list
        |> Enum.map(fn {n,d} -> round(n*bot/d) end)
        |> Enum.sum

    simplify({top,bot})
  end

  defp lcm(nums) do
    Enum.reduce(nums, 1, fn (x,acc) ->
      if(rem(acc,x) == 0, do: acc, else: acc * x)
    end)
  end

  defp simplify({n,d}) do
    {n,d} = cond do
      rem(n,2) == 0 and rem(d,2) == 0 -> {n/2,d/2}
      true -> {n,d}
    end
    |> Enum.map(fn {n,d} -> {round(n), round(d)} end)
    |> IO.inspect

    cond do
      n >= d -> if(rem(n,d) == 0, do: div(n,d), else: {n,d})
      n <  d -> if(rem(d,n) == 0, do: {1,div(d,n)}, else: {n,d})
    end
  end

end
