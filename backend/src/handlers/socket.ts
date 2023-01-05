import { JwtPayload } from "jsonwebtoken";
import { WebSocketServer, WebSocket } from "ws";
import { getToken, verify } from "../jwt";
import User from "../models/user";
import { FilterQuery } from "mongoose";

interface Coord {
  lat: number;
  lon: number;
}

const defaultCoord: Coord = {
  lat: 0.0,
  lon: 0.0
}

const defaultColor = "green";

interface Player {
  socket: WebSocket;
  coords: Coord;
  color: string;
}

const listen = (socketPort: number) => {
  const wss = new WebSocketServer({ port: socketPort });

  let sockets = new Map<string, Player>();

  setInterval(() => {
    const players = Array.from(sockets)
      .filter(value => value[1].coords !== defaultCoord)
      .map(value => ({
        lat: value[1].coords.lat,
        lon: value[1].coords.lon,
        color: value[1].color
      }))

    const message = "active " + JSON.stringify(players);

    for (const s of sockets.values()) {
      s.socket.send(message);
    }
  }, 500);

  wss.on("connection", async function connection(socket, req) {
    const token = getToken(req.url);

    if (!token) return closeWithMessage(socket, "unauthorized");

    let payload: JwtPayload;
    try {
      payload = verify(token);
    } catch (e) {
      return closeWithMessage(socket, "unauthorized");
    }

    if (sockets.has(payload.id)) return closeWithMessage(socket, "unauthorized");

    const user = await User.UserModel.findOne({ _id: payload.id }).exec();

    if(!user)
        return closeWithMessage(socket, "user not found");
    
    sockets.set(payload.id, {
      socket: socket,
      coords: defaultCoord,
      color: user.color,
    });

    socket.on("message", async (bytes) => {
      const msg = bytes.toString().split(" ");

      console.log(msg[0]);

      if (msg[0] === "move") {
        const player = sockets.get(payload.id);
        if (player) {
          player.coords = { lat: parseFloat(msg[1]), lon: parseFloat(msg[2]) };
        }
      }
    });

    socket.on("close", async (_) => {
      sockets.delete(payload.id);
    });
  });
};

const closeWithMessage = (socket: WebSocket, message: string) => {
  socket.send(message);
  socket.close();
}

export default { listen }
