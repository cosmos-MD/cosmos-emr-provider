    FROM node:alpine
    WORKDIR /workspace
    RUN apk add git
    COPY package.json .
    RUN npm install
    COPY . .
