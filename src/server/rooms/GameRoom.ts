import {Client,Room} from "colyseus";
import GameState from "../../server/mySchema/GameState";
import MoveCommand from "../../server/commands/MoveCommand";
import {Dispatcher} from "@colyseus/command";
const ROOMMAXNUMBER = 2
class GameRoom extends  Room<GameState>{
    private  dispatcher = new Dispatcher(this)
    onCreate() {
        this.setState(new GameState())
        this.onMessage("move-command",(client:Client,message:{playerIndex:number,downKey:string})=>{
            this.dispatcher.dispatch(new MoveCommand(),{
                client:client,
                playerIndex:message.playerIndex,
                downKey:message.downKey
            })
        })
    }
    onJoin(client: Client, options?: any, auth?: any): void | Promise<any> {
        this.state.activePlayerNumber++
        if(this.state.activePlayerNumber==ROOMMAXNUMBER){
            this.broadcast("start-game")
        }
    }
    /*
    *   if a room is full, the client should create a new room instead of joinning the room
    * */
    onAuth(client: Client, options: any): any {
        if(this.state.activePlayerNumber>=ROOMMAXNUMBER){
            return false
        }
        return true
    }
}

export  default  GameRoom;