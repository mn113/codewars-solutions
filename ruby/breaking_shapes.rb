$shape = []
$tags = []
$adjacents = [[-1,0],[0,-1],[1,0],[0,1]]
$diagonals = [[-1,-1],[-1,1],[1,-1],[1,1]]
$all_neighbours = $adjacents.concat($diagonals)

def break_pieces(shape)
  $shape = shape.split("\n")
  flood_fill_shape("A")
  pad_shape()
  render $shape
  subshapes = $tags
    .map{ |tag| isolate_tagged_area(tag) }
    .map{ |area| area.join("\n") }
    .sort
end

def flood_fill_shape(tag)
  while true do
    s = find_first_enclosed_space()
    break if s.nil?
    p "tagging #{tag}"
    $shape[s[:y]][s[:x]] = tag
    # flood fill by propagating to neighbours:
    tag_neighbours(s[:y], s[:x], tag)
    tag = tag.succ
  end
  $tags = ('A'...tag).to_a
end

def find_first_enclosed_space
  # search grid for first space (exclude edges):
  (1...$shape.length).each do |y|
    (1...$shape[0].length).each do |x|
      pipeA = $shape[y].index("|")
      pipeZ = $shape[y].rindex("|")
      next if pipeA.nil? or x < pipeA or x > pipeZ # x outside pipes
      if $shape[y][x] == " " then return {:y => y,:x => x} end
    end
  end
  return nil
end

def tag_neighbours(y, x, tag)
  # tag any empty neighbours, then recurse:
  empty_neighbs = $all_neighbours.map{ |nb| {:y => y+nb[0], :x => x+nb[1]} }.select{ |nb| $shape[nb[:y]][nb[:x]] == " " }
  empty_neighbs.each do |nb|
    y = nb[:y]
    x = nb[:x]
    $shape[y][x] = tag
    tag_neighbours(y, x, tag) # recursion will end when all nb sets have been reduced to []
  end
end

def pad_shape
  # add a space on every side
  height = $shape.length
  width = $shape[0].length
  $shape.push(" " * width).unshift(" " * width)
  $shape.map!{ |row| " #{row} "}
end

def isolate_tagged_area(tag)
  # delete anything that's not the tagged area or is bounding it
  p "isolating #{tag}"
  height = $shape.length
  width = $shape[0].length
  subshape = [" " * width]

  # copy the good parts of $shape to a new array:
  (1...height-1).each do |y|
    subshape.push(" " * width)
    (1...width-1).each do |x|
      # fill cell if it's tagged or a neighbour matches tag:
      # (leave as a space if it's a space or another tag)
      if $shape[y][x] == tag
        subshape[y][x] = tag
      elsif $shape[y][x] =~ /[\+\-\|]/
        # line piece
        neighbs = $all_neighbours.map{ |nb| {:y => y+nb[0], :x => x+nb[1]} }
        if neighbs.any?{ |nb| $shape[nb[:y]][nb[:x]] == tag }
          subshape[y][x] = $shape[y][x]
        end
      end
    end
  end

  tidy_up(subshape, tag)
end

def tidy_up(subshape, tag)
  # uniformly trim left spaces:
  while subshape.all?{ |row| row[0] == " "}
    subshape.map!{ |row| row[1..row.length] }
  end

  # greedily trim right spaces:
  subshape.each{ |row| row.chop! until row[-1] != " " }

  # trim empty rows:
  subshape.reject!{ |row| row.length < 2 }

  # erase correct tagging:
  subshape.map!{ |row| row.gsub(tag, " ") }

  # erase unwanted '+'s:
  subshape.map!{ |row| row.gsub(/(?<=\-)(\+)(?=\-)/, "-").gsub(/^\+\s/, "| ").gsub(/\s(\+)$/, " |") }
end

def render(arr)
  for row in arr
    p row
  end
  p "ok"
end
