ARG NODE_VERSION=22-alpine

FROM node:${NODE_VERSION}

ARG NODE_VERSION

RUN apk add --no-cache curl

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]