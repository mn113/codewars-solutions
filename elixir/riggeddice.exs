# CodeWars kata: create dice which rolls 6 22% of the time

defmodule DiceRoller do
  def throw_rigged do
    r = Enum.random(1..100)
    cond do
      r <= 22 -> 6
      r  > 22 -> Enum.random(1..5)
    end
  end
end
