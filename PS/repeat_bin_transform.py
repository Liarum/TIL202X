# https://school.programmers.co.kr/learn/courses/30/lessons/70129


def digit_counter(s):
	zero_cnt = one_cnt = 0

	for digit in s:
		if digit == '0':
			zero_cnt += 1
		else:
			one_cnt += 1
	return (zero_cnt, one_cnt)


def decimal_to_bin_str(num):
	bin_arr = []

	while num > 0:
		if num % 2 > 0:
			bin_arr.append("1")
		else:
			bin_arr.append('0')
		num = num // 2
	
	bin_str = ''
	for i in range(len(bin_arr)-1, -1, -1):
		bin_str += bin_arr[i]

	return bin_str


def solution(s):
	answer = [0, 0]

	while s != '1':
		zero_cnt, one_cnt = digit_counter(s)
		if zero_cnt > 0:
			answer[1] += zero_cnt
		s = decimal_to_bin_str(one_cnt)
		answer[0] += 1

	return answer


if __name__ == '__main__':
	input_example = [
		"110010101001",
		"01110",
		"1111111"
	]
	for s in input_example:
		print(solution(s))