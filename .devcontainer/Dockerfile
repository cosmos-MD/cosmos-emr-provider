FROM node:alpine
RUN apk add git
RUN adduser --disabled-password devuser
RUN addgroup website
RUN addgroup node website
RUN addgroup devuser website
RUN mkdir /usr/app
RUN mkdir /usr/app/medplum-client
RUN chown -R devuser:website /usr/app
RUN chmod -R 750 /usr/app
USER devuser
WORKDIR /usr/app
COPY vite*.js . 
COPY package.json .
COPY tsconfig.json .
COPY vercel.json .
COPY jest.config.json .
COPY babel.config.json .
RUN npm install
USER root
RUN cat /etc/passwd
