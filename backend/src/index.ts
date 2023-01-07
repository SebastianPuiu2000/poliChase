import express from "express";
import bodyParser from "body-parser";

import { connectMongo } from "./mongo";
import { register } from "./handlers/register";
import { login } from "./handlers/login";
import { info } from "./handlers/info";
import { color } from "./handlers/color";
import websocket from "./handlers/socket";

function collisionFunc(p1_X: number, p1_Y: number, p2_X: number, p2_Y: number) {
  let r = 2.0;

  if ((r + r) ** 2 > (p1_X - p2_X) ** 2 + (p1_Y - p2_Y) ** 2) return true;
  else return false;
}

const main = async () => {
  await connectMongo();

  const app = express();

  app.use(bodyParser.json());
  app.use((_, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.post("/register", register);
  app.post("/login", login);

  app.get("/info", info);
  app.post("/color", color);

  app.listen(3000, () => console.log("server started"));

  websocket.listen(3001);
};

main();
