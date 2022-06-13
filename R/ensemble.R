# Ensemble Models

working_directory = "./data"
setwd(working_directory)

install.packages("caret")
install.packages("adabag")

wine = read.csv("winequalityCLASS.csv", header=TRUE)

wine$quality = factor(wine$quality)


# 1. Bagging
library(rpart)
library(adabag)

set.seed(1234)
my.control = rpart.control(xval=0, cp=0, minsplit=5)
bag.wine = bagging(quality~ ., data=wine, mfinal=100, control=my.control)

# Variable importance
print(bag.wine$importance)
importanceplot(bag.wine)

# Error vs. number of trres
evol.wine = errorevol(bag.wine, newdata=wine)
plot.errorevol(evol.wine)

# Making predictions
prob.bag.wine = predict.bagging(bag.wine, newdata=wine)$prob
head(prob.bag.wine, 5)
cutoff = 0.5
yhat.bag.wine = ifelse(prob.bag.wine[,2] > cutoff, 1, 0)

# Evaluation
tab = table(wine$quality, yhat.bag.wine, dnn=c("Observed", "Predicted"))
print(tab)
sum(diag(tab))/sum(tab) # accuracy
tab[2,2]/sum(tab[2,]) # sensitivity
tab[1,1]/sum(tab[1,]) # specificity
