import {Command} from "@colyseus/command";
import gameRoom from "../../server/rooms/GameRoom";
import {Payload} from "../../types/Payload";
import {CommandType} from "../../types/Common";


export  default  class  MouseMoveCommand extends Command<gameRoom,Payload>{
    execute(data:Payload){
        this.room.broadcast(CommandType.PTREVENT,data.commandNode,{
            except:data.client
        })
    }
}