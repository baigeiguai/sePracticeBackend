import {ArraySchema, Schema, type} from '@colyseus/schema';
import ITicTacToeState, {GameState} from "../../types/ITicTacToeState";

class TicTacToeState extends Schema implements ITicTacToeState{
    @type('number')
    gameState= GameState.WaitingForPlayers ;
    @type(['number'])
    board:ArraySchema<number>;
    @type( 'number')
    activePlayer :number = 0;
    @type('number')
    winningPlayer:number =-1;
    constructor() {
        super();
        this.board =new ArraySchema(
            0,0,0,
            0,0,0,
            0,0,0
        );
        this.winningPlayer=-1;
        this.activePlayer=0;
        this.gameState=GameState.WaitingForPlayers;
    }
};

export  default TicTacToeState;