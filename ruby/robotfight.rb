def fight(robot1, robot2, tactics)
  first = robot1["speed"] >= robot2["speed"] ? robot1 : robot2
  second = (first == robot1) ? robot2 : robot1

  # Fight:
  0.upto([robot1["tactics"].length, robot2["tactics"].length].max) do |round|
    attack(first, second, round, tactics)
    return winner(first) if second["health"] <= 0
    attack(second, first, round, tactics)
    return winner(second) if first["health"] <= 0
  end

  # Survivors:
  victor = (robot1["health"] > robot2["health"]) ? winner(robot1) : (robot2["health"] > robot1["health"]) ? winner(robot2) : "The fight was a draw."
end

def winner(robot)
  return "#{robot['name']} has won the fight."
end

def attack(aggressor, victim, round, tactics)
  if aggressor["tactics"].length > round
    mode = aggressor["tactics"][round]
    victim["health"] -= tactics[mode]
  end
end
