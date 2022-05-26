# Learn Scatter Plot

setwd("C:\\Users\\AhrumLee\\workspace\\TIL202X\\R\\data");

exam<-read.table("exam_scores_2012.txt", header=T);

attach(exam)

windows(height=5.5, width=5)

plot(mid, final) # draw scatter plot

summary(exam)

mid[is.na(mid)] <- 0 # NA to 0

final[is.na(final)] <- 0

windows(height=5.5, width=5)

plot(mid, final, pch=20,
     xlim=c(-5, 40), ylim=c(-5, 40),
     col="blue",
     xlab="중간시험", ylab="기말시험",
     main="통계적 사고")
