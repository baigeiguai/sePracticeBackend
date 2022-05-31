import GameRoom from "../../server/rooms/GameRoom";
import {Command} from "@colyseus/command";
import {Client} from "colyseus";
import {Payload} from "../../types/Payload";

import {CommandType} from "../../types/Common";




export  default  class KeydownCommand extends  Command<GameRoom ,Payload>{
    execute(data:Payload) {
        this.room.clients.forEach(client=>{
            if (client.sessionId != data.client.sessionId){
                this.room.send(client,CommandType.KEYEVENT,{
                    commandNode:data.commandNode
                })
            }
        })
    }
}