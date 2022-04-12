import Phaser from 'phaser';
import Server from '../services/Server';
import {IGameOverSceneData} from "../../types/scenes";

class Bootstrap extends  Phaser.Scene{
    server!:Server;
    constructor() {
        super("bootstrap");
    }
    init(){
        this.server=new Server();
    }
    create(){
        this.createNewGame();
    }
    private  handleGameOver= (data:IGameOverSceneData):void=> {
        this.server.leave();
        this.scene.stop("gamescene");
        this.scene.launch("game-over", {
            winner:data.winner,
            onRestart: this.handleRestart,
        });
    };
    private handleRestart = ()=>{
        this.scene.stop("game-over");
        this.createNewGame();
    };
    private createNewGame = ()=>{
        this.scene.launch('gamescene',{
            server:this.server,
            onGameOver:this.handleGameOver,
        });
    }

};

export  default Bootstrap;