import { WebSocketServer } from "ws";
import { getToken, verify } from "../jwt";

interface Coord {
  lat: number;
  lon: number;
}

interface Player {
  socket: any;
  coords: Coord;
  color: string;
}

interface PlayerInfo {
  coords: Coord;
  color: string;
}

const listen = (socketPort: number) => {
  const green = "green";
  const red = "red";

  const wss = new WebSocketServer({ port: socketPort });

  let sockets = new Map<string, Player>();

  wss.on("connection", function connection(socket, req) {
    const token = getToken(req.url);

    if (!token) {
      socket.send("unauthorized");
      return socket.close();
    }

    var payload: any;

    try {
      payload = verify(token);
    } catch (e) {
      socket.send("unauthorized");
      return socket.close();
    }

    if (sockets.has(payload.id)) return socket.close();

    sockets.set(payload.id, {
      socket: socket,
      coords: { lat: 0.0, lon: 0.0 },
      color: green,
    });

    socket.on("message", async (bytes) => {
      const msg = bytes.toString().split(" ");

      console.log(msg[0]);

      if (msg[0] === "move") {
        const player = sockets.get(payload.id);
        if (player) {
          player.coords =  { lat: parseFloat(msg[1]), lon: parseFloat(msg[2]) };
        }
      }
    });

    const interval = setInterval(() => {
      let players: PlayerInfo[] = [];
      for (let value of sockets.values())
        players.push({ coords: value.coords, color: value.color });
      socket.send(players);
    }, 1000);

    socket.on("close", async (_) => {
      sockets.delete(payload.id);
      clearInterval(interval);
    });
  });
};

export default { listen }
