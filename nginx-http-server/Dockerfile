# syntax=docker/dockerfile:1
FROM ubuntu:latest

# dependencies
RUN apt-get update
RUN apt-get install -y build-essential libpcre3 libpcre3-dev zlib1g zlib1g-dev openssl libssl-dev wget

# nginx download
RUN mkdir -p ~/src && cd ~/src \
&& wget https://nginx.org/download/nginx-1.22.0.tar.gz \
&& tar zxf nginx-1.22.0.tar.gz

# complie nginx
RUN cd ~/src/nginx-1.22.0 \
&& ./configure --user=www-data --group=www-data --with-http_ssl_module  --with-http_realip_module \
&& make && make install

# nginx script 
COPY ./etc/init.d/nginx /etc/init.d/nginx
RUN chmod +x /etc/init.d/nginx
RUN update-rc.d -f nginx defaults
