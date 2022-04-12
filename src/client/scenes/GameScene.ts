import Phaser from "phaser";
import type Server from "../services/Server";
import ITicTacToeState, {Cell, GameState} from "../../types/ITicTacToeState";
import {IGameOverSceneData, IGameSceneData} from "../../types/scenes";

class GameScene extends  Phaser.Scene{
    private  server?:Server;
    private onGameOver?:(data:IGameOverSceneData)=>void;
    private gameStateText?:Phaser.GameObjects.Text;
    private cells: {display:Phaser.GameObjects.Rectangle,value:Cell}[]=[];
    constructor() {
        super("gamescene");
    }
    init(){
        this.cells=[];
    }
    async create(data:IGameSceneData) {
        const {server,onGameOver} = data;
        this.server=server;
        this.onGameOver = onGameOver;
        if(!this.server) {
            throw new Error("Server instance missing");
        }
        await this.server.join();
        this.server.onceStateChanged(this.createBoard, this);//一旦房间状态改变，就执行该函数
    }

    private createBoard(state:ITicTacToeState){
        const {width,height}=this.scale;
        let interval= 5;
        let  size=64;
        let x=width*0.5-size;
        let y=height*0.5-size;
        state.board.forEach((cellele,idx)=> {
            const cell=this.add.rectangle(x,y,size,size,0xffffff)
                .setInteractive()
                .on(
                    Phaser.Input.Events.GAMEOBJECT_POINTER_UP,()=>{
                        this.server?.makeSelection(idx);
                    });
            this.cells.push({
                display:cell,
                value:cellele
            })
            switch (cellele){
                case Cell.X:
                {
                    this.add.star(cell.x,cell.y,4,4,40,0xff0000).setAngle(45);
                    break;
                }
                case (Cell.O):
                {
                    this.add.circle(cell.x,cell.y,30,0x0000ff);
                }
            }
            x+=interval+size;
            if(idx%3==2){
                x=width*0.5-size;
                y+=interval+size;
            }
        });
        if(this.server?.gameState==GameState.WaitingForPlayers){
            const width=this.scale.width;
            this.gameStateText=this.add.text(width*0.5,50,"Waiting for opponent...").setOrigin(0.5);
        }
        this.server?.onBoardChanged(this.handleBoardChanged,this);
        this.server?.onPlayerTurnChanged(this.handlePlayerTurnChanged,this);
        this.server?.onPlayerWin(this.handlePlayerWin,this);
        this.server?.onGameStateChanged(this.handleGameStateChanged,this);
    }
    private handleBoardChanged(newval:Cell,idx:number){
        if(newval === this.cells[idx].value )return ;
        let cell=this.cells[idx];
            switch (newval){
                case Cell.X:
                {
                    this.add.star(cell.display.x,cell.display.y,4,4,40,0xff0000).setAngle(45);
                    break;
                }
                case (Cell.O):
                {
                    this.add.circle(cell.display.x,cell.display.y,30,0x0000ff);
                    break;
                }
            }
        this.cells[idx].value=newval;
    }
    private  handlePlayerTurnChanged(playerIndex:number){
        //todo: show a message to player that it's their turn to do;
    }
    private handlePlayerWin(playerIndex:number){
        if(playerIndex===-1){
            return ;
        }
        this.time.delayedCall(500,()=>{
            if(!this.onGameOver){
                return;
            }
            console.log("winner:"+playerIndex);
            this.onGameOver({
                winner: this.server?.playerIndex===playerIndex,
            });
        })
        // if(this.server?.playerIndex===playerIndex){
        //     console.log("you win!");
        // }
        // else{
        //     console.log("you lost!");
        // }
    }
    private handleGameStateChanged(gameState:GameState){
        if(gameState==GameState.Playing && this.gameStateText){
            this.gameStateText.destroy();
            this.gameStateText=undefined;
        }
    }
};

export  default  GameScene;