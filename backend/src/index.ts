import express from "express";
import bodyParser from "body-parser";
import user from "./models/user";

import { WebSocketServer } from "ws";

import { connectMongo } from "./mongo";
import { register } from "./handlers/register";
import { login } from "./handlers/login";
import { parse } from "url";
import jwt from "jsonwebtoken";

const secret = "123456";

function collisionFunc(p1_X: number, p1_Y: number, p2_X: number, p2_Y: number) {
  let r = 2.0;

  if ((r + r) ** 2 > (p1_X - p2_X) ** 2 + (p1_Y - p2_Y) ** 2) return true;
  else return false;
}

interface Coord {
  lat: number;
  lon: number;
}

function getToken(url: string | undefined): string | null {
  const token = parse(url || "", true).query.token;

  if (!token) return null;

  return token.toString();
}

const main = async () => {
  await connectMongo();

  const app = express();

  app.use(bodyParser.json());

  // TESTING ZONE START //
  // const persons = [
  //   { name: "Mihnea2", email: "mihnea2@yahoo.com", password: "parola", coordinates: [125.4, 15.4], bomb: false, cooldown: 0, score: 0 },
  //   { name: "Sebastian2", email: "sebi2@yahoo.com", password: "password", coordinates: [1.3, 3.6], bomb: false, cooldown: 0, score: 0 }
  // ];

  // for (const person of persons) {
  //   user.methods.createUser(person.name, person.email, person.password, person.coordinates, person.bomb, person.cooldown, person.score);
  //   console.log(`Created user ${person.name} ${person.email}`);
  // }
  // TESTING ZONE END //

  app.post("/register", register);
  app.post("/login", login);

  app.listen(3000, () => console.log("server started"));

  const wss = new WebSocketServer({ port: 8080 });

  let coord: Coord[] = [];
  let sockets = new Map();

  wss.on("connection", function connection(socket, req) {
    const token = getToken(req.url);

    if (!token) return socket.close();

    var payload: any;

    try {
      payload = jwt.verify(token, secret);
    } catch (e) {
      return socket.close();
    }

    sockets.set(payload.id, socket);

    socket.on("message", async (bytes) => {
      const msg = bytes.toString().split(" ");

      if (msg[0] === "move")
        coord[payload.id] = {
          lat: parseFloat(msg[1]),
          lon: parseFloat(msg[2]),
        };
    });

    socket.on("close", async (_) => {
      delete sockets[payload.id];
      delete coord[payload.id];
    });
  });
};

main();
