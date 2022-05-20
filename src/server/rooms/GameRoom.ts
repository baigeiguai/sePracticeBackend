import {Client,Room} from "colyseus";
import GameState from "../../server/mySchema/GameState";
import {Dispatcher} from "@colyseus/command";
import KeydownCommand from "../../server/commands/KeydownCommand";
import {Payload} from "../../types/Payload";
import MouseMoveCommand from "../../server/commands/MouseMoveCommand";
import SpawnCommand from "../../server/commands/SpawnCommand";
import KillCommand from "../../server/commands/KillCommand";
const ROOMMAXNUMBER = 2
class GameRoom extends  Room<GameState>{
    private  keydownDispatcher = new Dispatcher(this)
    private  mouseMoveDispatcher = new Dispatcher(this)
    private  spawnDispatcher = new Dispatcher(this)
    private  killDispatcher = new Dispatcher( this )
    onCreate() {
        this.setState(new GameState())
        this.onMessage("keydown",(client:Client,message:Payload)=>{
            this.keydownDispatcher.dispatch(new KeydownCommand(),{
                client:client,
                playerId:message.playerId,
                key:message.key,
                playerPositionX:message.playerPositionX,
                playerPositionY:message.playerPositionY,
                MousePositionX:message.MousePositionX,
                MousePositionY:message.MousePositionY
            })
        })
        this.onMessage("pointermove",(client :Client,message:Payload)=>{
            this.mouseMoveDispatcher.dispatch(new MouseMoveCommand(),{
                client:client,
                playerId:message.playerId,
                key:message.key,
                playerPositionX:message.playerPositionX,
                playerPositionY:message.playerPositionY,
                MousePositionX:message.MousePositionX,
                MousePositionY:message.MousePositionY
            })
        })
        this.onMessage("spawn",(client :Client,message:Payload)=>{
            this.spawnDispatcher.dispatch(new SpawnCommand(),{
                client:client,
                playerId:message.playerId,
                key:message.key,
                playerPositionX:message.playerPositionX,
                playerPositionY:message.playerPositionY,
                MousePositionX:message.MousePositionX,
                MousePositionY:message.MousePositionY
            })
        })
        this.onMessage("kill",(client :Client,message:Payload)=>{
            this.keydownDispatcher.dispatch(new KillCommand(),{
                client:client,
                playerId:message.playerId,
                key:message.key,
                playerPositionX:message.playerPositionX,
                playerPositionY:message.playerPositionY,
                MousePositionX:message.MousePositionX,
                MousePositionY:message.MousePositionY
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