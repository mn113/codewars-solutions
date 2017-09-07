defmodule ParenthesesValidator do
  @moduledoc """
  Process string recursively from left to right.
  If character is '(', increase count, if ')', decrease count.
  Count cannot go negative and must end up at 0 to be valid.
  """
  # Defaults
  def valid_parentheses(string, count \\ 0)

  # End of string? Check count
  def valid_parentheses("", count), do: count == 0

  # Too many closed parentheses?
  def valid_parentheses(_, count) when count < 0, do: false

  # General case
  def valid_parentheses(string, count) do
    count = case String.first(string) do
      "(" -> count + 1
      ")" -> count - 1
      ___ -> count
    end

    valid_parentheses(String.slice(string,1..100), count)
  end

end
