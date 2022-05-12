import {Client,Room} from "colyseus";
import GameState from "../../server/mySchema/GameState";
import {Dispatcher} from "@colyseus/command";
const ROOMMAXNUMBER = 4
class GameRoom extends  Room<GameState>{
    onCreate() {
        this.setState(new GameState())
    }
    /*
    *   if a room is full, the client should create a new room instead of joinning the room
    * */
    onAuth(client: Client, options: any): any {
        if(this.state.activePlayerNumber>=ROOMMAXNUMBER){
            return false
        }
        return true
    }
}

export  default  GameRoom;