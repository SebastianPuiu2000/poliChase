from node:19.3-alpine as base

RUN mkdir -p /app
WORKDIR /app

COPY . .

EXPOSE 4200

RUN npm install

CMD ["npm", "run", "start"]
