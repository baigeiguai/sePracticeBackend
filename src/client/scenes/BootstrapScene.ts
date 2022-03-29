/**
 * init scene for
 *      handle logic between scenes
 *      inject services into scenes
 */
import Phaser from "phaser";
import Server from "../services/Server";

export default class BootstrapScene extends Phaser.Scene {
    private server: Server;
    constructor() {
        super("BootstrapScene");  // scene id
        this.server = new Server();
    }
    init() {
    }
    create() {
        console.log("BootstrapScene::create");
        this.scene.launch("GameScene", {
            server: this.server,
        });
    }
}
