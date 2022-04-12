import {Client} from "colyseus";
import {Cell, GameState} from "../../types/ITicTacToeState";
import {Command} from "@colyseus/command";
import TicTacToe from "../../server/rooms/TicTacToe";
import CheckWinnerCommand from "../../server/commands/CheckWinnerCommand";

type Payload ={
    client:Client,
    index:number,
};
class PlaySelectionCommand extends Command<TicTacToe,Payload> {
    execute(data:Payload){
        if(this.room.state.gameState!=GameState.Playing){
            console.log("waiting someone!");
            return ;
        }
        const {client,index} =data;
        const clientIndex = this.room.clients.findIndex(c=>(c.id===client.id));
        if(clientIndex!==this.room.state.activePlayer){
            console.log("it's not your turn");
            return ;
        }
        const cellValue = clientIndex===0?Cell.X:Cell.O ;
        if(this.room.state.board[index]!=Cell.Empty){
            console.log("there is something");
            return ;
        }
        console.log("nice put");
        this.room.state.board[index]=cellValue;

        return  [
            new CheckWinnerCommand()
        ];
    }
}
export  default PlaySelectionCommand;