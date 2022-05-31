import {Client} from "colyseus";
import {CommandNode} from "../types/Common";

export   type Payload = {
    client:Client
    commandNode:CommandNode
}