import GameRoom from "../../server/rooms/GameRoom";
import {Command} from "@colyseus/command";
import {Client} from "colyseus";
import {Payload} from "../../types/Payload";




export  default  class KeydownCommand extends  Command<GameRoom ,Payload>{
    execute(data:Payload) {
        this.room.clients.forEach(client=>{
            if (client.sessionId != data.playerId){
                this.room.send(client,"keydown",{
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