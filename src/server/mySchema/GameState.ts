import {Schema,type ,SetSchema} from '@colyseus/schema'
import {IGameState, RoomState} from "../../types/IGameState";
import {PlayerMessage, RoleType} from "../../types/Common";

export class PlayerInfo extends  Schema{
    @type("string")
    public name: string = "";
    @type("number")
    public team: number = -1;
    @type("number")
    public role: RoleType = RoleType.NULL;
    constructor(playerif :PlayerMessage) {
        super();
        this.name = playerif.name
        this.team = playerif.team;
        this.role = playerif.role
    }
}

export default  class GameState extends Schema implements IGameState{
    @type ('number')
    roomstate=RoomState.MATCHING
    @type('number')
    activePlayerNumber:number=0
    @ type({ set: PlayerInfo }) players = new SetSchema<PlayerInfo>() ;
    constructor() {
        super();
    }
}