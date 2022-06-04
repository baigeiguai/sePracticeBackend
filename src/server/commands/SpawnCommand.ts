import {Command} from "@colyseus/command";
import gameRoom from "../../server/rooms/GameRoom";
import {Payload} from "../../types/Payload";
import {CommandType} from "../../types/Common";
import {PlayerInfo} from "../../server/mySchema/GameState";


export  default  class  SpawnCommand extends Command<gameRoom,Payload>{
    execute(data:Payload){
        if (data.commandNode.playerIf) {
            this.state.players.add(new PlayerInfo(data.commandNode.playerIf))
        }
        this.room.broadcast(CommandType.SPWAN,data.commandNode,{
            except:data.client
        })
    }
}