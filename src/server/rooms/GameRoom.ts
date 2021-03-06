import {Client,Room} from "colyseus";
import GameState from "../../server/mySchema/GameState";
import {Dispatcher} from "@colyseus/command";
import KeydownCommand from "../../server/commands/KeydownCommand";
import MouseMoveCommand from "../../server/commands/MouseMoveCommand";
import SpawnCommand from "../../server/commands/SpawnCommand";
import KillCommand from "../../server/commands/KillCommand";
import {CommandNode, CommandType} from "../../types/Common";
const ROOMMAXNUMBER = 3
class GameRoom extends  Room<GameState>{
    private  keydownDispatcher = new Dispatcher(this)
    private  mouseMoveDispatcher = new Dispatcher(this)
    private  spawnDispatcher = new Dispatcher(this)
    private  killDispatcher = new Dispatcher( this )
    onCreate() {
        this.setState(new GameState())
        this.onMessage(CommandType.KEYEVENT,(client:Client,message:CommandNode)=>{
            this.keydownDispatcher.dispatch(new KeydownCommand(),{
                client:client,
                commandNode:message
            })
        })
        this.onMessage(CommandType.PTREVENT,(client :Client,message:CommandNode)=>{
            this.mouseMoveDispatcher.dispatch(new MouseMoveCommand(),{
                client:client,
                commandNode:message
            })
        })
        this.onMessage(CommandType.SPWAN,(client :Client,message:CommandNode)=>{
            this.spawnDispatcher.dispatch(new SpawnCommand(),{
                client:client,
                commandNode:message
            })
        })
        this.onMessage(CommandType.KILL,(client :Client,message:CommandNode)=>{
            this.killDispatcher.dispatch(new KillCommand(),{
                client:client,
                commandNode:message
            })
        })
    }
    onJoin(client: Client, options?: any, auth?: any): void | Promise<any> {
        this.state.activePlayerNumber++
        /*
        *
        *   here is to be ensured...
        * */
        if(this.state.activePlayerNumber>=2){
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
    onLeave(client: Client, consented?: boolean): void | Promise<any> {
        for(let i=0;i<this.state.players.size;i++){
            if (this.state.players[i].sessionId===client.sessionId){
                let ct:CommandNode=new CommandNode()
                ct.playerIf.name=this.state.players[i].name
                this.broadcast(CommandType.KILL,ct,{
                    except:client
                })
                break
            }
        }
    }
}

export  default  GameRoom;
