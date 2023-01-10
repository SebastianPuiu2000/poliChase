import { WEBSOCKET_URL } from "./constants";
import {Player} from "./player.model";

export class WebsocketConnection {

    static connection;

    static players: Player[];

    private constructor() {
    }

    static initialize(token: string): void {
        this.connection = new WebSocket(WEBSOCKET_URL + `?token=${token}`);
        this.connection.onmessage = ({ data }) => {
            console.log(data);

            const msg = data.toString().split(' ');
            if (msg[0] === 'active') {
                this.players = JSON.parse(msg[1]);
            }
        }
    }

    static getConnectedPlayers(): Player[] {
        return this.players;
    }

    static sendLocation(lat: number, lon: number): void {
        this.connection.send(`move ${lat} ${lon}`);
    }

    static disconnect(): void {
        this.connection.close();
    }

}
