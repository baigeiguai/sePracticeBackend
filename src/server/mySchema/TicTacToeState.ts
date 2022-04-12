import {Schema,type} from '@colyseus/schema';


class TicTacTocState{
    @type('string')
    name = "ttt-state";
};

export  default TicTacTocState;