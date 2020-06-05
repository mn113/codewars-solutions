// https://www.codewars.com/kata/57eb8fcdf670e99d9b000272
// Given a string of words, you need to find the highest scoring word.
// Each letter of a word scores points according to its position in the alphabet: a = 1, b = 2, c = 3 etc.
// You need to return the highest scoring word as a string.

package kata

import "strings"

func getScore(word string) int32 {
  sum := int32(0)
	for _, value := range []rune(word) {
		sum += value - 96 // 'a' == 97
	}
  return sum
}

type ScoredWord struct {
	word string
	score int32
}

func High(s string) string {
  var highest = ScoredWord{"", 0}

  for _, word := range strings.Split(s, " ") {
    score := getScore(word)
    if score > highest.score {
      highest.score = score
      highest.word = word
    }
  }
  return highest.word
}
