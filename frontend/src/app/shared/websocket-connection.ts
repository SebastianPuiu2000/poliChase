import { WEBSOCKET_URL } from "./constants";

export class WebsocketConnection {

    static connection;

    private constructor() {
    }

    static initialize(token: string): void {
        this.connection = new WebSocket(WEBSOCKET_URL + `?token=${token}`);
        this.connection.onmessage = ({ data }) => {
            console.log(data);
        }
        this.connection.onopen = () => this.sendLocation(0, 1);
    }

    static sendLocation(lat: number, lon: number): void {
        this.connection.send(`move ${lat} ${lon}`);
    }

    static disconnect(): void {
        this.connection.close();
    }

}
