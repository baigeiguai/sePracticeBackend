import { Room } from "colyseus";

export class DefaultRoom extends Room {
    maxClients: number = 6;

    onCreate(options) {
        console.log("DefaultRoom created", options);
        this.onMessage("message", (client, message) => {
            console.log("DefaultRoom::message from", client.sessionId, message);
            this.broadcast("message", `(${client.sessionId}) ${message}`);
        });
        this.onMessage("keydown", (client, message) => {
            console.log("DefaultRoom::keydown from", client.sessionId, message);
            this.broadcast("keydown", message, {
                except: client,
            });
        });
    }
    onJoin(client) {
        this.broadcast("message", `${client.sessionId} joined`);
    }
    onLeave(client) {
        this.broadcast("message", `${client.sessionId} leaved`);
    }
    onDispose() {
        console.log("DefaultRoom::disposeed");
    }
}
