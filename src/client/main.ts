import Phaser, { Game } from "phaser";
// import BootstrapScene from "./scenes/BootstrapScene";
// import HelloWorldScene from "./scenes/HelloWorldScene";
// import GameScene from "./scenes/GameScene";
import Bootstrap from "./scenes/Bootstrap";
import GameScene from "./scenes/GameScene";
import GameOver from "./scenes/GameOver";
const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: "arcade",
		arcade: {
			gravity: { y: 1000 }
		}
	},
	scene: [Bootstrap,GameScene,GameOver]
}

export default new Phaser.Game(config)
