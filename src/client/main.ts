import Phaser, { Game } from "phaser";
import BootstrapScene from "./scenes/BootstrapScene";

// import HelloWorldScene from "./scenes/HelloWorldScene";
import Bootstrap from "./scenes/BootstrapScene";
import GameScene from "./scenes/GameScene";

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: "arcade",
		arcade: {
			gravity: { y: 0 }
		}
	},
	scene: [BootstrapScene, GameScene]
}

export default new Phaser.Game(config)
