import {Command} from "@colyseus/command";
import gameRoom from "../../server/rooms/GameRoom";
import {Payload} from "../../types/Payload";

import {CommandType} from "../../types/Common";


export  default  class  KillCommand extends Command<gameRoom,Payload>{
    execute(data:Payload){
        this.room.broadcast(CommandType.KEYEVENT,data.commandNode,{
            except:data.client
        })
    }
}