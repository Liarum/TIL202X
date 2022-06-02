# R : package “vcd” installation error
2022.06.02
---
1. To install pacakage ‘vcd’, ‘lmtest’ has been installed before.
2. Installing ‘lmtest’, an error occured like “cannot find gfortran” 
3. After installing gcc (latest version of gfrotan), the same error re-occured.
4. Fix this error by referring to this blog post -> https://medium.com/biosyntax/following-up-library-dependency-when-compiling-r-packages-89f191b9f227
5. Sovle this problem by modifying R’s configuration file  “/Library/Frameworks/R.framework/Resources/etc/Makeconf”
---
Modifying Area
```
#CC = clang
CC = gcc-11

#CXX = clang++ -std=gnu++11
CXX = g++-11

#FLIBS =  -L/usr/local/gfortran/lib/gcc/x86_64-apple-darwin15/6.1.0 -L/usr/local/gfortran/lib -lgfortran -lquadmath -lm
FLIBS =  -L/usr/local/lib/gcc/11/gcc/x86_64-apple-darwin21/11 -L/usr/local/lib/gcc/11 -lgfortran -lquadmath -lm
```

