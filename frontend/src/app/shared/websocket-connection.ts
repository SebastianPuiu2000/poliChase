import { WEBSOCK_URL } from "./constants";
import { Player } from "./player.model";

export class WebsocketConnection {
  static connection: WebSocket;
  static handler = (_: Player[]) => console.warn('no handler registered');

  private constructor() {
  }

  static initialize(token: string): void {
    this.connection = new WebSocket(WEBSOCK_URL + `?token=${token}`);
    this.connection.onmessage = ({ data }) => {
      const msg = data.toString().split(' ');
      if (msg[0] === 'active') {
        const players = JSON.parse(msg[1]);
        this.handler(players);
      }
    }
  }

  static setActivePlayersHandler(f: (players: Player[]) => void) {
    this.handler = f;
  }

  static sendLocation(lat: number, lon: number): void {
    if (this.connection)
      this.connection.send(`move ${lat} ${lon}`);
  }

  static sendColor(color: string): void {
    if (this.connection)
      this.connection.send(`color ${color}`);
  }

  static disconnect(): void {
    if (this.connection)
      this.connection.close();
  }
}
