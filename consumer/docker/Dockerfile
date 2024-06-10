FROM node:20-alpine

WORKDIR /usr/app

COPY ../package*.json ./
COPY ../tsconfig.json ./
COPY .. .

RUN npm install


CMD [ "npm", "run", "dev" ]
