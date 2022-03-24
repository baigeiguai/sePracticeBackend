import { Room } from "colyseus";

export class ChatRoom extends Room {
    // this room supports only 4 clients connected
    maxClients = 4;

    onCreate(options) {
        console.log("ChatRoom created!", options);

        this.onMessage("message", (client, message) => {
            console.log("ChatRoom received message from", client.sessionId, ":", message);
            this.broadcast("messages", `(${client.sessionId}) ${message}`);
        });
        this.onMessage("keydown", (client, message) => {
            console.log("reveived keydown", message, "from client", client.sessionId);
            this.broadcast("keydown", message, {
                except: client,
            });
        });
    }

    onJoin(client) {
        this.broadcast("messages", `${client.sessionId} joined.`);
    }

    onLeave(client) {
        this.broadcast("messages", `${client.sessionId} left.`);
    }

    onDispose() {
        console.log("Dispose ChatRoom");
    }

}
