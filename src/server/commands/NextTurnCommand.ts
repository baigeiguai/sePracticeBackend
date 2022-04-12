import {Command} from "@colyseus/command";
// import ITicTacToeState from "../../types/ITicTacToeState";
import TicTacToe from "../../server/rooms/TicTacToe";

export default class NextTurnCommand extends Command<TicTacToe>{
    execute(payload: this["payload"]): Array<Command> | Command | void | Promise<Array<Command>> | Promise<Command> | Promise<unknown> {
        this.room.state.activePlayer^=1;
    }
};