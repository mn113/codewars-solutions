defmodule DuplicateCount do

  def count(str) do
    str
      |> String.downcase
      |> String.codepoints
      |> nullify_singles
      |> Enum.reject(&is_nil/1)
      |> Enum.uniq
      |> Enum.count
  end

  defp nullify_singles(list) do
    list |> Enum.map(fn c ->
      count_c = list |> Enum.count(fn d -> d == c end)
      if count_c > 1 do
        c
      else
        nil
      end
    end)
  end

end
