import {Schema,type} from '@colyseus/schema'
import {IGameState, RoomState} from "../../types/IGameState";

export default  class GameState extends Schema implements IGameState{
    @type ('number')
    roomstate=RoomState.MATCHING
    @type('number')
    activePlayerNumber:number=0

    constructor() {
        super();
    }
}