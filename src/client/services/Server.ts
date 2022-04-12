import {Client, Room} from 'colyseus.js';
import Phaser from "phaser";
import ITicTacToeState, {Cell, GameState} from "../../types/ITicTacToeState";
import {Message} from "../../types/Message";
import TicTacToeState from "../../server/mySchema/TicTacToeState";

class Server {
    private client:Client;
    private events:Phaser.Events.EventEmitter;
    private room?:Room<TicTacToeState >;
    private _playerIndex: number=-1;
    private activePlayerListenner;
    private winningPlayerListenner;
    private gameStateListenning;
    get playerIndex(){
        return this._playerIndex;
    }
    get gameState(){
        if(!this.room){
            return GameState.WaitingForPlayers;
        }
        return this.room.state.gameState;
    }
    constructor() {
        this.client =new Client("ws://localhost:2567");
        this.events = new Phaser.Events.EventEmitter();
    }
    async  join(){
        this.room= await  this.client.joinOrCreate<TicTacToeState>('tic-tac-toe');
        this.room.state.board.forEach(x=>{
            console.log(x);
        });
        this.room.onMessage(Message.playerIndex,(message :{playerIndex:number})=>{
            this._playerIndex= message.playerIndex;
            console.log(this.playerIndex);
        });
        this.room.onStateChange.once(state => {
            this.events.emit("once-state-changed",state);
        });
        this.room.state.board.onChange=  ((val,idx)=>{
            this.events.emit("board-changed",val,idx);
        });
        this.activePlayerListenner=this.room.state.listen("activePlayer", (playerIndex)=>{
            this.events.emit("player-turn-changed",playerIndex);
        });
        this.winningPlayerListenner=this.room.state.listen("winningPlayer",(playerIndex)=>{
            this.events.emit("player-win",playerIndex);
        });
        this.gameStateListenning= this.room.state.listen("gameState",(gameStage:GameState)=>{
           this.events.emit("game-state",gameStage);
        });
    }
    onceStateChanged(cb:(state:ITicTacToeState)=>void , context?:any){
        this.events.once('once-state-changed',cb,context);  //该时间只执行一次，因为创建棋盘只需要在初始的时候去创建
    }
    makeSelection(idx:number){
        if(!this.room)return ;
        if(this.room.state.gameState!=GameState.Playing){
            return ;
        }
        console.log(`clicked ${idx}th`);

        if(this.playerIndex!==this.room.state.activePlayer){
            console.warn("not this player\'s turn!");
            return ;
        }
        this.room.send(Message.playerSelection,{index:idx});

    }
    onBoardChanged(cb:(val:Cell,index:number)=>void,context ? :any){
        this.events.on('board-changed', cb, context);  //始终监听该事件
    }
    onPlayerTurnChanged(cb:(playerIndex:number)=>void,context?:any){
        this.events.on("player-turn-changed",cb,context);
    }
    onPlayerWin(cb:(playerIndex:number)=>void,context?:any){
        this.events.on("player-win",cb,context);
    }
    onGameStateChanged(cb:(gameState:GameState)=>void,context?:any){
        this.events.on("game-state",cb,context);
    }
    leave(){
        this.room?.leave();
        this.room?.removeAllListeners();
        this.winningPlayerListenner();
        this.activePlayerListenner();
        this.gameStateListenning();
    }
};

export  default  Server;