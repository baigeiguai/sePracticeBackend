import {Command} from "@colyseus/command";
import GameRoom from "~/server/rooms/GameRoom";
import {Client} from "colyseus";

type Payload ={
    client:Client
    playerIndex:number
    downKey:string
}
export default class MoveCommand extends Command<GameRoom,Payload>{
    execute(data:Payload) {
        this.room.clients.forEach(client=>{
            if (client.sessionId !== data.client.sessionId){
                client.send("move-command",{
                    playIndex:data.playerIndex,
                    downKey:data.downKey
                })
            }
        })
    }
}