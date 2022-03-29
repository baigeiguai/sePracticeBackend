/**
 * game scene
 */
import Phaser from "phaser";
import Server from "../services/Server";

export default class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");
    }
    create(data: { server: Server }) {
        const {server} = data;
        server.join();
    }
}
