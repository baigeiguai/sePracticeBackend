import Phaser from "phaser"
import * as Colyseus from "colyseus.js"

export default class HelloWorldScene extends Phaser.Scene {
    private client: Colyseus.Client = new Colyseus.Client();
    private room!: Colyseus.Room;
    constructor() {
        super("hello-world");
    }

    init() {
        // this.client = new Colyseus.Client("ws://localhost:2567");
        this.client = new Colyseus.Client("ws://f-jason.site:2567");
    }
    preload() {
    }

    async create() {
        this.room = await this.client.joinOrCreate("chat");
        console.log("joined", this.room.sessionId);

        this.input.keyboard.on("keydown", (evnt: KeyboardEvent) => {
            console.log("keyboard:", evnt);
            this.room.send('keydown', evnt.key);
        });
        this.room.onMessage('keydown', (message) => {
            console.log(message);
        });
    }
}
