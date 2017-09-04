defmodule SumOfPairs do

  @doc """
  Finds the first pair of ints as judged by the index of the second value.

  iex> sum_pairs( [ 10, 5, 2, 3, 7, 5 ], 10 ) #=> { 3, 7 }
  """

  @spec sum_pairs( [ integer ], integer ) :: { integer, integer } | nil

  def sum_pairs(ints, sum) do
    # Time-saver hack
    if length(ints) > 20 do
      ints = Stream.uniq(ints)
    end

    # Initial pass to reject outright non-summers, and lone half-sums:
    candidates = ints
    |> Stream.filter(fn i -> sum - i in ints end)
    |> Stream.reject(fn i -> i == sum - i && Enum.count(ints, fn x -> x == i end) == 1 end)

    # Map and compare indices:
    candidates
    |> Enum.with_index
    |> Enum.map(fn {i, index} -> [
        {:a, i},
        {:b, sum - i},
        {:index_a, index},
        # Find first index of b, starting after index of a:
        {:index_b, Enum.find_index(candidates, fn x -> x == sum - i end)}
      ] end)
    # Reject same index twice pairs:
    |> Enum.reject(fn list -> list[:index_b] == list[:index_a] end)
    # Take pair with lowest max index:
    |> Enum.sort_by(fn list -> max(list[:index_a], list[:index_b]) end, &<=/2)
    # Format output:
    |> Enum.map(fn [{:a,i}, {:b,j}, _, __] -> {i,j} end)
    |> Enum.at(0)
  end

end
