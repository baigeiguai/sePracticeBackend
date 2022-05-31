import {Schema,type ,ArraySchema} from '@colyseus/schema'
import {IGameState, RoomState} from "../../types/IGameState";
import {RoleType} from "~/types/Common";

export class PlayerInfo extends  Schema{
    @type("string")
    public name: string = "";
    @type("number")
    public team: number = -1;
    @type("number")
    public role: RoleType = RoleType.NULL;
}

export default  class GameState extends Schema implements IGameState{
    @type ('number')
    roomstate=RoomState.MATCHING
    @type('number')
    activePlayerNumber:number=0
    @ type([ PlayerInfo ]) players = new ArraySchema<PlayerInfo>() ;
    constructor() {
        super();
    }
}