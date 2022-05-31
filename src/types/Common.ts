
export enum RoleType {
    NULL,
    ADC,
    SUP,
    TNK
}
export enum BuffType {
    NULL,
    RECOVER,
    SHIELD
}
export class Buff {
    public buff_tpye: BuffType = BuffType.NULL;
    public base_val: number = 10;
    constructor(tp: BuffType, val: number) {
        this.buff_tpye = tp;
        this.base_val = val;
    }
}

export class CommandNode {
    playerId: string="-1";
    key: string="";
    isDown: boolean=false;
    playerPositionX: number = 0;
    playerPositionY: number =0 ;
    MousePositionX: number =0 ;
    MousePositionY: number =0 ;
}
export enum CommandType {
    KEYEVENT= "keyevent",
    PTREVENT= "pointerevent",
    SPWAN = "spawn",
    KILL = "kill"
}
