class Solution(object):
    def __init__(self):
        self.str_to_num_dict = {
            '0':0, '1':1, '2':2, '3':3, '4':4, 
			'5':5, '6':6, '7':7, '8':8, '9':9
        }
        self.num_to_str_dict = {
			0:'0', 1:'1', 2:'2', 3:'3', 4:'4', 
			5:'5', 6:'6', 7:'7', 8:'8', 9:'9'
		}
        
    def addStrings(self, num1, num2):
        """
        :type num1: str
        :type num2: str
        :rtype: str
        """
        if num1 == num2:
            deci_sum = self.cvt_str_to_decimal(num1) * 2
        else:
            deci_sum = self.cvt_str_to_decimal(num1) + self.cvt_str_to_decimal(num2)
        return self.cvt_decimal_to_str(deci_sum)
        
    
    def cvt_str_to_decimal(self, string):
        n_digits = 1
        result = 0
        
        for i in range(len(string)-1, -1, -1):
            result += (self.str_to_num_dict.get(string[i]) * n_digits)
            n_digits *= 10
            
        return result
    
    def cvt_decimal_to_str(self, num):
        if num == 0:
            return '0'
        result = []
        while num > 0:
            result.append(self.num_to_str_dict[num % 10])
            num = num // 10
        return ''.join(result[::-1])
        
        
  
sol = Solution()
print(sol.addStrings('11', '123'))
print(sol.addStrings('456', '77'))
print(sol.addStrings('0', '0'))