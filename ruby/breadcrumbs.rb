require 'uri'

def generate_bc(url, sep)
  parts = URI.split(url)[5].split('/')

  # build words:
  breadwords = ['home']
  for i in 1..parts.size-2 do
    breadwords.push(parts[i])
  end
  # add final word if not index.file:
  if parts.size > 1 and !/^index\.[\w]+$/.match(parts[-1])
    breadwords.push(parts[-1])
  end

  # build link chains:
  breadlinks = ['']
  for i in 1..breadwords.size-1 do
    breadlinks.push(breadwords.slice(1..i).join('/'))
  end

  breadwords.map!.with_index { |word,i|
    if word.size > 30 then word = shorten(word) end
    word.gsub!(/-/, ' ')
    i < breadwords.size - 1 ? linkify(word, breadlinks[i]) : spannify(word)
  }.join(sep)
end

def linkify(term, href)
  href = term.match(/^home$/i) ? "/" : "/#{href}/"
  "<a href=\"#{href}\">#{term.upcase}</a>"
end

def spannify(term)
  termbody = term.match(/^([^\.]+)\.[^\.]/)
  if termbody then term = termbody[1] end
  "<span class=\"active\">#{term.upcase}</span>"
end

def shorten(stupidstring)
  ignore = ["the","of","in","from","by","with","and", "or", "for", "to", "at", "a"]
  stupidstring.split('-')
              .reject{ |w| ignore.member?(w) }
              .map{ |w| w[0].upcase }
              .join
end
