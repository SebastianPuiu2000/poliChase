from node:19.3-alpine as base

RUN mkdir -p /app
WORKDIR /app

COPY . .

EXPOSE 3000
EXPOSE 3001

RUN npm install

CMD ["npm", "run", "start"]
