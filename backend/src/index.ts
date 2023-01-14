import express from "express";
import bodyParser from "body-parser";
import https from 'https';
import http from 'http';
import selfsigned from 'selfsigned';
import cors from 'cors';

import { connectMongo } from "./mongo";
import { register } from "./handlers/register";
import { login } from "./handlers/login";
import { info } from "./handlers/info";
import { color } from "./handlers/color";
import { infobuild } from "./handlers/infobuild";
import websocket from "./handlers/socket";

const getSecuredServer = () => {
  const attrs = [{ name: 'commonName', value: process.env.HOST || 'localhost:3000' }];
  const keys = selfsigned.generate(attrs, { days: 365 });
  return https.createServer({ key: keys.private, cert: keys.cert });
}

const getServer = () => {
  return http.createServer();
}

const main = async () => {
  await connectMongo();

  const app = express();

  app.use(bodyParser.json());
  app.use(cors());

  app.post("/register", register);
  app.post("/login", login);

  app.get("/info", info);
  app.post("/color", color);

  app.get("/buildings", infobuild);

  const server = process.env.SECURED ? getSecuredServer() : getServer();

  server.on('request', app);

  websocket.listen(server);

  server.listen(3000, () => console.log('server started'))
};

main();
