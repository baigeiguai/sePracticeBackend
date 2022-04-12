export  enum Cell{
    Empty,
    X,
    O
};
export enum GameState{
    WaitingForPlayers,
    Playing,
    Finished
}
export interface ITicTacToeState{
    gameState:GameState,
    board:Cell[];
    activePlayer:number;
};

export  default  ITicTacToeState;
