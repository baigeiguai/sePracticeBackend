import {Command} from "@colyseus/command";
import TicTacToe from "../../server/rooms/TicTacToe";
import NextTurnCommand from "./NextTurnCommand";
import {Cell} from "../../types/ITicTacToeState";

type PayLoad={

}
const wins=[
    [{row:0,col:0},{row:0,col:1},{row:0,col:2}],
    [{row:1,col:0},{row:1,col:1},{row:1,col:2}],
    [{row:2,col:0},{row:2,col:1},{row:2,col:2}],

    [{row:0,col:0},{row:1,col:0},{row:2,col:0}],
    [{row:0,col:1},{row:1,col:1},{row:2,col:1}],
    [{row:0,col:2},{row:1,col:2},{row:2,col:2}],

    [{row:0,col:0},{row:1,col:1},{row:2,col:2}],
    [{row:2,col:0},{row:1,col:1},{row:0,col:2}],
];
export default  class  CheckWinnerCommand extends  Command<TicTacToe,PayLoad> {
    private  determineWin():boolean{
        let canWin=false;
        wins.forEach(win=> {
                let haswin=true;
                for(let i=1;i<win.length;i++){
                    let preval=this.room.state.board[win[i].row*3+win[i].col];
                    let nowval=this.room.state.board[win[i-1].row*3+win[i-1].col];

                    if(preval !== nowval || preval === Cell.Empty){
                        haswin=false;
                        break;
                    }
                }
                if(haswin){
                    canWin=true;
                    return ;
                }
            }
        );
        return canWin;
    }
    execute(payload: this["payload"]): Array<Command> | Command | void | Promise<Array<Command>> | Promise<Command> | Promise<unknown> {
        const win:boolean=this.determineWin();
        console.log(win);
        if(win){
            this.room.state.winningPlayer=this.room.state.activePlayer;
        }
        else{
           return [
               new NextTurnCommand(),
           ] ;
        }
    }
}