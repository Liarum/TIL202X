class Solution(object):
	def __init__(self):
		self.min_flips = 0
	def minFlipsMonoIncr(self, s):
		for i in range(len(s)):
			if s[i] == '1':
				for j in range(i, len(s)):
					if s[j] == '0':
						self.min_flips += 1
				s_len = len(s)
				self.recursive_solution(s, s_len, i+1, True)
				self.recursive_solution(s, s_len, i+1, False, 1)
				break

		return self.min_flips
	
	def recursive_solution(self, s, s_len, cur_idx, is_inc, flip_cnt=0):
		if cur_idx >= s_len-1:
			if is_inc and s[cur_idx]=='0':
				flip_cnt += 1
			if flip_cnt < self.min_flips:
				self.min_flips = flip_cnt
			return
		# 가지치기
		if flip_cnt >= self.min_flips:
			return
		
		if is_inc:
			if s[cur_idx] == '0':
				self.recursive_solution(s, s_len, cur_idx+1, True, flip_cnt+1)
			else:
				self.recursive_solution(s, s_len, cur_idx+1, True, flip_cnt)
		else:
			if s[cur_idx] == '0':
				self.recursive_solution(s, s_len, cur_idx+1, False, flip_cnt)
			else:
				self.recursive_solution(s, s_len, cur_idx+1, True, flip_cnt)
				self.recursive_solution(s, s_len, cur_idx+1, False, flip_cnt+1)


sol = Solution()
s = "00110" # 1
print(sol.minFlipsMonoIncr(s))
s = "010110" # 2
print(sol.minFlipsMonoIncr(s))
s = "00011000" # 2
print(sol.minFlipsMonoIncr(s))
s = "00011010" # 2
print(sol.minFlipsMonoIncr(s))
s = "0001101000000" # 3
print(sol.minFlipsMonoIncr(s))
s = "000001000010" # 2
print(sol.minFlipsMonoIncr(s))
