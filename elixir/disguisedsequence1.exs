defmodule Disguisedseqone do

  def fcn(n, known_values \\ [1,2]) do

    # Do we know the nth element yet?
    if length(known_values) - 1 < n do

      # Calculate one more element based on last 2:
      [back1 | [back2 | _]] = known_values |> Enum.reverse
      nextval = 6 * back2 * back1 / (5 * back2 - back1)

      # Try for n again with the new extended list:
      fcn(n, known_values ++ [nextval])

    else
      known_values |> Enum.at(n)
    end
  end

end
