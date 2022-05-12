
/*
*  it's three states to describe the  player
* */
import Player from "./Player";
import Barrier from "./Barrier";

export  enum  RoomState{
    MATCHING,
    GAMING,
    GAMEOVER
}

/*
*
*  it's an interface for the game schema
*
* */
export interface IGameState{
    gamestate: RoomState;
    activePlayerNumber: number;
    // it's not equal to the browser size ,it's relative.
    // just to say, it maybe can be set to const value ,like 100,
    // then converted to browser size in proportion
    // mapHeight :number;
    // mapWidth : number;
    // discribe the all players in the map
    // playerList: Player[];
    // barrierList : Barrier [];
}