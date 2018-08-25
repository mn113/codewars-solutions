def generateHashtag(str)
  return false if str.size == 0
  tag = '#' + str.split(/\s+/).map{ |x| x.capitalize }.join
  return false if tag.size > 140 or tag.size < 2
  tag
end
