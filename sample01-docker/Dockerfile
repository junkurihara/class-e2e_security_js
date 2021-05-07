FROM node:16-alpine

LABEL maintainer "Jun Kurihara <kurihara@ieee.org>"

WORKDIR /root

COPY ./ /root/
RUN npm install

CMD ["/usr/local/bin/npm", "run", "start:global"]
