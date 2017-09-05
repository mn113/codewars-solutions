defmodule People do
  def list(people) when length(people) >= 3 do
    [head | tail] = people
    head.name <> ", " <> list(tail)
  end

  def list(people) when length(people) == 2 do
    [head | tail] = people
    head.name <> " & " <> list(tail)
  end

  def list([person]), do: person.name

  def list([]), do: ""
end
