import {Command} from "@colyseus/command";
import gameRoom from "../../server/rooms/GameRoom";
import {Payload} from "../../types/Payload";
import {CommandType} from "../../types/Common";


export  default  class  SpawnCommand extends Command<gameRoom,Payload>{
    execute(data:Payload){
        this.room.clients.forEach(client=>{
            if (client.sessionId != data.client.sessionId){
                this.room.send(client,CommandType.SPWAN,{
                    commandNode:data.commandNode
                })
            }
        })
    }
}