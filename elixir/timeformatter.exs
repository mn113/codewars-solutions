defmodule DurationFormatter do
  @aminute 60
  @anhour  @aminute*60
  @aday    @anhour*24
  @ayear   @aday*365

  def format_duration(0), do: "now"

  def format_duration(seconds) do
    {years, seconds} = extract_years(seconds)
    {days, seconds}  = extract_days(seconds)
    {hours, seconds} = extract_hours(seconds)
    {minutes, seconds} = extract_minutes(seconds)

    [{:year, years}, {:day, days}, {:hour, hours}, {:minute, minutes}, {:second, seconds}]
      |> Enum.filter(fn {_, x} -> x > 0 end)
      |> Enum.map(&pluralise/1)
      |> join_words
  end

  defp extract_years(seconds), do: { div(seconds, @ayear), rem(seconds, @ayear) }
  defp extract_days(seconds), do: { div(seconds, @aday), rem(seconds, @aday) }
  defp extract_hours(seconds), do: { div(seconds, @anhour), rem(seconds, @anhour) }
  defp extract_minutes(seconds), do: { div(seconds, @aminute), rem(seconds, @aminute) }

  defp pluralise({unit, 1}), do: "1 #{to_string(unit)}"
  defp pluralise({unit, amount}) when amount > 1, do: "#{amount} #{to_string(unit)}s"

  defp join_words([term1]), do: term1
  defp join_words([term1 | [term2]]), do: "#{term1} and #{term2}"
  defp join_words([term1 | tail]) when length(tail) > 1, do: "#{term1}, #{join_words(tail)}"

end
