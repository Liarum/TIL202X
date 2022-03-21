############################################
# Logisitic Regression with wine data
############################################

setwd('./data')
# Importing data
wine = read.csv("winequalityCLASS.csv", header=TRUE)

# Fitting a logistic regression model
fit.all = glm(quality ~ ., family=binomial, data=wine)
fit.step = step(fit.all, direction="both") # stepwise variable selection
fit.step$anova
summary(fit.step)

# Making predictions
p = predict(fit.step, newdata=wine, type="response") # predictioon
cutoff = 0.5 # cutoff
yhat = ifelse(p > cutoff, 1, 0)
 
# Evaluation
tab = table(wine$quality, yhat, dnn=c("Observed", "Predicted"))
print(tab) # confusion matrix
sum(diag(tab)/sum(tab)) # accuracy
tab[2,2]/sum(tab[2,]) # sensitivity
tab[1,1]/sum(tab[1,]) # specificity



