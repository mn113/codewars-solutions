// https://www.codewars.com/kata/515f51d438015969f7000013
// Write a function that when given a number >= 0, returns an Array of ascending length subarrays. The subarrays should be filled with 1s

package kata

func makeArrayOfOnes(n int) []int {
    arr := make([]int, n)
    for j, _ := range arr {
        arr[j] = 1
    }
    return arr
}

func Pyramid(n int) [][]int {
    pyr := make([][]int, n)
    for i := 1; i <= n; i++ {
        pyr[i-1] = makeArrayOfOnes(i)
    }
    return pyr
}
