setwd('/Users/ialeum/Downloads/personal_lia/KNOU/베이즈데이터분석')

# 등고선 그리기 예시
x <- seq(-pi, pi, len=50)
y <- x
f <- outer(x, y, function(x, y) cos(y)/(1+x^2))
contour(x, y, f)
contour(x, y, f, nlevels=15, add=TRUE)


############################################
######## 이항모형 실습
############################################
# 사전분포와 모형의 파라미터와 관측치
alpha <- 1
beta <- 1
n <- 10
x <- 3

# 사전분포, 사후분포, 가능도를 벡터로 계산
theta = seq(from=0, to=1, length=100)
prior.den = dbeta(theta, alpha, beta)
post.den = dbeta(theta, alpha+x, beta+n-x)
likelihood = dbinom(x, size=n, prob=theta)
likelihood = 100 * likelihood / sum(likelihood)

# 위 세 항목의 그림을 따로 그려봄 
par(mfrow=c(2,2))
plot(theta, prior.den, type="l", ylab="prior density")
plot(theta, likelihood, type="l", ylab="likelihood")
plot(theta, post.den, type="l", ylab="posterior density")
par(mfrow=c(1,1))

# 위 세 항목의 그림을 한 윈도우에 그림
ymax = max(prior.den, likelihood, post.den)
plot(theta, post.den, type="l", ylab="density", ylim=c(0, ymax))
lines(theta, prior.den, col="magenta")
lines(theta, likelihood, col="cyan")
legend(0.6, 2.8, c("posterior", "prior", "likelihood"), lty=c(1,1,1), lwd=c(2.5,2.5), col=c("black","magenta","cyan"))




