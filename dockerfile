FROM node:14.5.0

WORKDIR  /usr/app

COPY package*.json ./

RUN npm install 

EXPOSE 3000

COPY . . 
