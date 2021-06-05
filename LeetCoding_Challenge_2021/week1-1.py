# Max Area of Island
class Solution(object):
    def maxAreaOfIsland(self, grid):
        """
        :type grid: List[List[int]]
        :rtype: int
        """
        maxArea = 0
        queue = []
        for y in range(len(grid)):
            for x in range(len(grid[y])):
                if grid[y][x] < 1:
                    continue
                curArea = 1
                queue.append((y, x))
                grid[y][x] = -1
                while queue:
                    y, x = queue.pop()
                    for dir in ((0,1),(1,0),(0,-1),(-1,0)):
                        if y+dir[0] >= 0 and y+dir[0] < len(grid) and x+dir[1] >=0 and x+dir[1] < len(grid[y]):
                            if grid[y+dir[0]][x+dir[1]] < 1:
                                continue
                            curArea += 1
                            queue.append((y+dir[0], x+dir[1]))
                            grid[y+dir[0]][x+dir[1]] = -1
                if maxArea < curArea:
                    maxArea = curArea
        return maxArea


if __name__ == '__main__':
	s = Solution()
	grid = [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]
	print(s.maxAreaOfIsland(grid))
