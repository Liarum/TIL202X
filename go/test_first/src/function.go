package main

func main() {

	// anonymous function
	sum := func(n ...int) int {
		s := 0
		for _, i := range n {
			s += i
		}
		return s
	}
	result := sum(1, 2, 3, 4, 5)
	println(result)

	// first-class function
	add := func(i int, j int) int {
		return i + j
	}

	r1 := calc(add, 10, 20)
	println(r1)

	r2 := calc(func(x int, y int) int { return x - y }, 10, 20)
	println(r2)
}

func calc(f func(int, int) int, a int, b int) int {
	result := f(a, b)
	return result
}
