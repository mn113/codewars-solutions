def decodeBits(bits)
  # Trim whitespace:
  bits.sub!(/^0*/, '').sub!(/0*$/, '')

  # Find shortest 1 or 0 sequence:
  t = 0
  1.upto(10) do |i|
    if /10{#{i}}1/.match(bits) || /01{#{i}}0/.match('0'+bits+'0')
      t = i; break
    end
  end

  # Substitute all binary sequences for Morse:
  morse = bits.gsub(/1{#{3*t}}/, '-')
              .gsub(/1{#{t}}/, '.')
              .gsub(/0{#{7*t}}/, '   ')
              .gsub(/0{#{3*t}}/, ' ')
              .gsub(/0{#{t}}/, '')
  morse
end

def decodeMorse(morseCode)
  morseCode.split('  ').map do |word|
    word.split(' ').map { |seq| MORSE_CODE[seq] }.join()
  end.join(' ').strip
end
