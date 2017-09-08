defmodule Intriangle do

  def give_triang(perimeter) do
    # Start with all combinations of 2 lesser side lengths:
    for a <- 1..trunc(perimeter/3),
        b <- a..trunc(perimeter/2) do
        # Calculate third side:
        {a, b, third_side(a,b)}
    end
    # Reject invalid triples:
    |> Enum.reject(fn {_,_,h} -> h - trunc(h) > 0.0001 end)
    |> Enum.reject(fn {a,b,h} -> a + b + h > perimeter end)
    |> Enum.uniq
    |> length
  end

  defp third_side(a,b) do
    # Calculate height & width of complementary mini-triangle:
    h = a * :math.sin(60 * :math.pi() / 180)
    w = :math.sqrt(a*a - h*h)
    # Calculate hypotenuse of the combined triangle:
    :math.sqrt(h*h + (b+w)*(b+w))
  end

end
