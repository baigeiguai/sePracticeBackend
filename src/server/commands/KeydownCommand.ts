import GameRoom from "../../server/rooms/GameRoom";
import {Command} from "@colyseus/command";
import {Client} from "colyseus";
import {Payload} from "../../types/Payload";

import {CommandNode, CommandType} from "../../types/Common";




export  default  class KeydownCommand extends  Command<GameRoom ,Payload>{
    execute(data:Payload) {
        this.room.broadcast(CommandType.KEYEVENT,data.commandNode,{
            except:data.client
        })
    }
}