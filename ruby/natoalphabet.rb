def to_nato(words)
  alphabet = ['Alfa','Bravo','Charlie','Delta','Echo','Foxtrot','Golf','Hotel','India','Juliett','Kilo','Lima','Mike','November','Oscar','Papa','Quebec','Romeo','Sierra','Tango','Uniform','Victor','Whiskey','X-Ray','Yankee','Zulu']
  output = []

  words.split(' ').each do |word|
    word.downcase.chars.each do |letter|
      if (letter.match(/^[[:alpha:]]$/))
        output << alphabet[letter.ord - 97]  # maps 'a' => 0 => 'Alfa'
      else
        output << letter
      end
    end
  end

  return output.join(' ')
end
