/** 
 * handle commuication between server and client
 * from client-side, using colyseus.js
 */
import { Client } from "colyseus.js";

export default class Server {
    private client: Client;
    constructor() {
        this.client = new Client("ws://localhost:2567");
        console.log("client id", this.client);
    }
    async join() {
        const room = await this.client.joinOrCreate("DefaultRoom");
        console.log("room id", room.id);
        // this.input.keyboard.on("keydown", (evnt: KeyboardEvent) => {
        //     console.log("keyboard:", evnt);
        //     this.room.send("keydown", evnt.key);
        // });
        // this.room.onMessage("keydown", (message) => {
        //     console.log("client::received keydown", message);
        // });
        // this.room.onMessage("message", (message) => {
        //     console.log("client::received message", message);
        // })
    }
}
