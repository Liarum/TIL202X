# install.packages("ggplot2")
library(ggplot2) # to load package

# raw data
transp <- c("bicycle", "bus", "bus", "walking", "bus", "bicycle", "bicycle",
            "bus", "bus", "bus", "bus", "bicycle", "bicycle", "bicycle",
            "walking",  "walking", "walking", "bus", "bicycle", "bus")
# convert vector to data frame
dat1 <- data.frame(transp)

# install.packages("forcats") # for ordering frequencies
library(forcats)
ggplot(data=dat1) + geom_bar(mapping=aes(x=fct_infreq(transp))) +
  xlab("Transportation")

# obesity data
obesity <- factor(c("underweight", "normal", "overweight", "obese"),
                  levels=c("underweight", "normal", "overweight", "obese"))
count <- c(6, 69, 27, 13)
perc <- count/sum(count) * 100
dat2 <- data.frame(obesity, count, perc)

ggplot(data=dat2) + geom_bar(mapping=aes(x=obesity, y=perc),
                             stat="identity") +
  xlab("Obesity") + ylab("Percentage(%)")


# make pie chart of transportation
table(transp)
dat3 <- data.frame(transportation=c("bus", "bicycle", "walking"),
                   count=c(15, 13, 4))

ggplot(data=dat3) + geom_bar(mapping=aes(x="", # 원그래프는 x값을 지정하지 않음
                                         y=count, fill=transportation),
                             stat="identity") +
  coord_polar("y", start=0) + # 원그래프를 그리기 위한 레이어
  xlab("") + ylab("") +
  theme(axis.text=element_blank(),
        axis.ticks=element_blank(),
        panel.grid=element_blank())
