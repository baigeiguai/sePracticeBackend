import {Command} from "@colyseus/command";
import gameRoom from "../../server/rooms/GameRoom";
import {Payload} from "../../types/Payload";


export  default  class  MouseMoveCommand extends Command<gameRoom,Payload>{
    execute(data:Payload){
        this.room.clients.forEach(client=>{
            if (client.sessionId != data.playerId){
                this.room.send(client,"pointermove",{
                    playerId:data.playerId,
                    key:data.key,
                    playerPositionX:data.playerPositionX,
                    playerPositionY:data.playerPositionY,
                    MousePositionX:data.MousePositionX,
                    MousePositionY:data.MousePositionY
                })
            }
        })
    }
}