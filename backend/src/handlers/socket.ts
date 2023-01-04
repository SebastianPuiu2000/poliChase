import { WebSocketServer } from "ws";
import { getToken, verify } from "../jwt";

interface Coord {
  lat: number,
  lon: number
}

interface Player {
    socket: any,
    coords: Coord
}

export const listen = (socketPort: number) => {
  const wss = new WebSocketServer({ port: socketPort });

  let sockets = new Map <string, Player> ();

  wss.on("connection", function connection(socket, req) {
    const token = getToken(req.url);

    if (!token) return socket.close();

    var payload: any;

    try {
      payload = verify(token);
    } catch (e) {
      return socket.close();
    }

    if (sockets.has(payload.id)) return socket.close();

    sockets.set(payload.id, { socket: socket, coords: {lat: 0.0, lon: 0.0} });

    socket.on("message", async (bytes) => {
      const msg = bytes.toString().split(" ");

      console.log(msg[0]);

      if (msg[0] === "move")
        sockets.set(payload.id, {
          socket: socket,
          coords: { lat: parseFloat(msg[1]), lon: parseFloat(msg[2]) },
        });
    });

    socket.on("close", async (_) => {
      sockets.delete(payload.id);
    });
  });
};
