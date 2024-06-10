FROM node:20-alpine

WORKDIR /usr/app

COPY ../package*.json ./
COPY ../tsconfig.json ./
COPY .. .

RUN npm install


EXPOSE 3333

CMD [ "npm", "run", "dev" ]