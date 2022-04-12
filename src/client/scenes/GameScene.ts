import Phaser from "phaser";

class Game extends  Phaser.Scene{
    constructor() {
        super("game");
    }
    create(){
        console.log('game');
        // this.scene.launch('game');
    }
};

export  default  Game;