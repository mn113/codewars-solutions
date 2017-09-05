defmodule GuessIt do
  def guess(num, mass) do

    # Build all possible combinations of balls
    # This ain't real efficient :)
    for greens <- 0..num,
        reds <- 0..num,
        blues <- 0..num do

        # Test current combination against targets:
        total = blues + reds + greens
        if total == num do
          weight = (3 * blues) + (4 * reds) + (5 * greens)
          if weight == mass do
            {greens, reds, blues}
          end
        end
    end
    |> Enum.reject(&is_nil/1)
  end
end
