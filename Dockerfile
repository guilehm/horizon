FROM node:8.11.4-alpine
WORKDIR /
COPY . .
CMD NODE_URLS=http://*:$PORT npm start