// https://www.codewars.com/kata/55031bba8cba40ada90011c4
// We search non-negative integer numbers, with at most 3 digits, such as the sum of the cubes of their digits is the number itself; we will call them "cubic" numbers.

package kata

import (
    "strings"
    "math"
    "strconv"
    "regexp"
)

func testSumOfCubes(str string) bool {
    digits := strings.Split(str, "")
    strNum, _ := strconv.ParseFloat(str,10)
    var sumOfCubes float64
    for _, d := range digits {
        d, _ := strconv.ParseFloat(d,10)
        sumOfCubes += math.Pow(d, 3)
    }
    return sumOfCubes == strNum
}

func IsSumOfCubes(str string) string {
    // find numeric strings
    re := regexp.MustCompile(`\d+`)
      numStrings := re.FindAllStringSubmatch(str, -1)

    // split long numeric strings to triple
    var shortenedNumStrings []string
    for _, numStrSlice := range numStrings {
        numStr := numStrSlice[0]
        for len(numStr) > 3 {
            shortenedNumStrings = append(shortenedNumStrings, numStr[0:3])
            numStr = numStr[3:len(numStr)]
        }
        shortenedNumStrings = append(shortenedNumStrings, numStr)
    }

    // test shortened numeric strings
    var cubics []string
    sumOfCubics := 0
    for _, c := range shortenedNumStrings {
        sumIsEqual := testSumOfCubes(c)
        if sumIsEqual {
            if n, err := strconv.ParseInt(c,10,32); err == nil {
                sumOfCubics += int(n)
                cubics = append(cubics, c)
            }
        }
    }

    // generate output
    if len(cubics) > 0 {
        cubicsStr := ""
        for _, c := range cubics {
            cInt, _ := strconv.Atoi(c)
            cubicsStr += strconv.Itoa(cInt) // turns 000 -> 0
            cubicsStr += " "
        }
        cubicsStr = strings.TrimRight(cubicsStr, " ")
        return strings.Join([]string{cubicsStr, strconv.Itoa(sumOfCubics), "Lucky"}, " ")
    } else {
      return "Unlucky"
    }
}
