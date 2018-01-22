require "matrix"

def point_to_line(pt, a, b)
  # https://en.wikipedia.org/wiki/Distance_from_a_point_to_a_line
  dx = b[0] - a[0]
  dy = b[1] - a[1]
  (dy*pt[0] - dx*pt[1] + b[0]*a[1] - b[1]*a[0]).abs / Math.sqrt(dy*dy + dx*dx)
end

def wall_assess_point(wall, a, b, pt)
  a_to_pt = Vector[pt[0]-a[0], pt[1]-a[1], 0]
  x0 = [a[0],b[0]].min
  x1 = [a[0],b[0]].max
  y0 = [a[1],b[1]].min
  y1 = [a[1],b[1]].max
  # Is it on a wall?
  if !a_to_pt.independent?(wall) and pt[0] >= x0 and pt[0] <= x1 and pt[1] >= y0 and pt[1] <= y1 # on wall
    p "#{pt} on wall from #{a} to #{b}"
    return false
  else
    # possible carrot, loses 1 for lying outside, gains 1 for inside
    return wall.cross(a_to_pt)[2] > 0 ? -1 : 1
  end
end

def count_carrots(fence)
  x_vals = fence.map{ |pt| pt[0] }
  y_vals = fence.map{ |pt| pt[1] }

  # Find bounding box:
  min_x = x_vals.min
  max_x = x_vals.max
  min_y = y_vals.min
  max_y = y_vals.max
  p [min_x, min_y, max_x, max_y]
  dx = max_x - min_x
  dy = max_y - min_y
  diag_dist = Math.sqrt(dx*dx + dy*dy)

  # Instatiate points hash:
  points = Hash.new
  (min_x+1...max_x).each do |x|
    (min_y+1...max_y).each do |y|
      points[[x,y]] = 0;  # 0 = neither in nor out yet
    end
  end

  # Build vectors for all walls:
  fence.push(fence[0].dup)
  fence.each_cons(2) do |a,b|
    wall = Vector[b[0]-a[0], b[1]-a[1], 0]
    # Test all points against all walls:
    points.keys.each do |pt|
      # Do in/out assessment:
      score = wall_assess_point(wall, a, b, pt)
      if score
        # Apply score, weighted by normalised proximity to the wall:
        inv_prox = (point_to_line(pt, a, b) / diag_dist)
        p "#{pt}, #{a}, #{b}, #{inv_prox}"
        points[pt] += score / (inv_prox + 1)
      else
        # Point is wall, delete it:
        points.delete(pt)
      end
    end
  end
  fence.pop

  p points
  # plant a carrot if 71% of all walls say it looks ok:
  p points.values.select{ |pt| pt >= 0.5 * fence.size }.size
end
