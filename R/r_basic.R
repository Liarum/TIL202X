a <- 1
b <- 1
c <- a+b
c

# how to create vectors
height <- c(100, 130, 150)
d <- 1:9
e <- seq(1, 9, 2)
f <- rep (10, 5)
g <- c(d, f)
h <- c(4:1, seq(0, 9, 3))

i <- 1:4
j <- as.factor(1:4) # 범주형 벡터
l <- as.character(1:4) # 문자형 벡터
m <- i > 2 # 논리형 벡터

# matrix
n <- rep(10, 5)
o <- 1:5
p <- cbind(n, o)
q <- rbind(n, o)
r <- matrix(1:4, 2, 2)
s <- matrix(c(1, 4, 2, 7), 2, 2)

# matrix operations
r + s # 행렬의 덧셈
r %*% s # 행렬의 곱셈
solve(s) # 역행렬
s[1, 2]
s[1,]
s[, 2]

# data frame
name <- c("Kim", "Lee", "Park", "Cho")
age <- c(20, 32, 17, 51)
sex <- as.factor(c("M", "F", "F", "F"))
dat <- data.frame(name, age, sex)
dat$name
dat$age
dat$sex