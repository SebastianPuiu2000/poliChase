import { JwtPayload } from "jsonwebtoken";
import { WebSocketServer, WebSocket } from "ws";
import { getToken, verify } from "../jwt";
import User from "../models/user";
import { circleCircle } from "../collision";

interface Coord {
  lat: number;
  lon: number;
}

const defaultCoord: Coord = {
  lat: 0.0,
  lon: 0.0
}

interface Player {
  socket: WebSocket;
  coords: Coord;
  color: string;
  cooldown: EpochTimeStamp;
}

const listen = (server: any) => {
  const wss = new WebSocketServer({ server });

  let sockets = new Map<string, Player>();
  let currentBomb: null | string = null;

  setInterval(() => {
    const players = Array.from(sockets)
      .filter(value => value[1].coords !== defaultCoord)
      .map(value => ({
        lat: value[1].coords.lat,
        lon: value[1].coords.lon,
        color: currentBomb === value[0] ? "bomb" : value[1].color
      }))

    console.log(`sockets: ${sockets.size}\tactive: ${players.length}`)
    console.log(`bomb: ${currentBomb}`)

    const message = "active " + JSON.stringify(players);

    for (const s of sockets.values()) {
      s.socket.send(message);
    }

    if (!currentBomb) return;

    const bombPlayer = sockets.get(currentBomb);
    if (!bombPlayer) {
      currentBomb = null;
      return;
    }

    const now = Date.now();
    for (const other of sockets.entries()) {
      if (
        other[0] != currentBomb &&
        circleCircle(
          bombPlayer.coords.lat,
          bombPlayer.coords.lon,
          other[1].coords.lat,
          other[1].coords.lon,
          0.0001
        ) && other[1].cooldown < now
      ) {
        console.log("COLISION!");
        bombPlayer.cooldown = now + 2_000;
        currentBomb = other[0];
        break;
      }
    }

  }, 500);

  setInterval(() => {
    const keys = Array.from(sockets.keys());
    if (keys.length < 2)
      return;

    if (currentBomb) return;

    currentBomb = keys[Math.floor(Math.random() * keys.length)]

    /* setTimeout(() => { */
    /*   currentBomb = null; */
    /* }, 54_000) */
  }, 6_000)

  wss.on("connection", async function connection(socket, req) {
    const token = getToken(req.url);

    if (!token)
      return closeWithMessage(socket, "unauthorized");

    let payload: JwtPayload;
    try {
      payload = verify(token);
    } catch (e) {
      return closeWithMessage(socket, "unauthorized");
    }

    if (sockets.has(payload.id))
      return closeWithMessage(socket, "unauthorized");

    const user = await User.UserModel.findOne({ _id: payload.id }).exec();

    if (!user)
      return closeWithMessage(socket, "user not found");

    sockets.set(payload.id, {
      socket: socket,
      coords: defaultCoord,
      color: user.color,
      cooldown: 0
    });

    socket.on("message", async (bytes) => {
      const msg = bytes.toString().split(" ");

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
