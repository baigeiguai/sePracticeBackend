import {Client} from "colyseus";

export   type Payload = {
    client:Client
    playerId:string
    key:string
    playerPositionX:number
    playerPositionY:number
    MousePositionX:number
    MousePositionY:number
}