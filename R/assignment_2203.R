##########################################
# R컴퓨팅 출석수업 과제물(인천지역대학)
# 202034-365440 이아름
#########################################

#1.
x <- c(2,0,2,0,3,4,3,6,5,4,4,0)
mean(x) # x의 평균
var(x) # x의 분산
median(x) # x의 중앙값

y <- x
y[12] <- NA
mean(y, na.rm=TRUE) # 결측치를 제외한 y의 평균
var(y, na.rm=TRUE) # 결측치를 제외한 y의 분산
median(y, na.rm=TRUE) # 결측치를 제외한 y의 중앙값


#2.
USArrests["Indiana", "UrbanPop"]
USArrests[1:4,  1:3]
mean(USArrests[USArrests$Assault > 159, "Murder"])

#3
x <- c(82, 65,  73, 72, 91, 83,  66, 71, 80, 55, 79, 96)
grade <- rep(NA, times=12)
for (i in 1:12) {
  if (x[i] >= 90) {
    grade[i] <- 'A';
    next;
  }
  if (x[i] >= 80) {
    grade[i] <- 'B';
    next;
  }
  if (x[i] >= 70) {
    grade[i] <- 'C';
    next;
  }
  if (x[i] >= 60) {
    grade[i] <- 'D';
    next;
  }
  if (x[i] < 60) {
    grade[i] <- 'F';
  }
}
cbind(x, grade)


#4.
for (i in 1:5) {
  print(rep(i*2 + 1, i))
}

i <- 1
while (i <= 5) {
  print(rep(i*2 + 1, i));
  i <- i+1;
}

i <- 1
repeat {
  if (i > 5) break;
  print(rep(i*2 + 1, i));
  i <- i+1;
}
