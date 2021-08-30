FROM node:12.19.0-alpine3.10

COPY . /opt/podcast-server

RUN cd /opt/podcast-server && npm install

EXPOSE 8000
EXPOSE 8443

CMD node /opt/podcast-server/main.js
