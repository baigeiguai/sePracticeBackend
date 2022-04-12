import { Room } from "colyseus";

export class DefaultRoom extends Room {
    maxClients: number = 2;

    onCreate() {
        // this.onMessage("message", (client, message) => {
        //     console.log("DefaultRoom::message from", client.sessionId, message);
        //     this.broadcast("message", `(${client.sessionId}) ${message}`);
        // });
        // this.onMessage("keydown", (client, message) => {
        //     console.log("DefaultRoom::keydown from", client.sessionId, message);
        //     this.broadcast("keydown", message, {
        //         except: client,
        //     });
        // });
        this.onMessage("keydown",(client ,message)=>{
            this.broadcast('keydown',message,{
                except:client,
            });
        });
    }
    onJoin(client) {
        // this.broadcast("message", `${client.sessionId} joined`);
        console.log(client.sessionId, "joined");
    }
    onLeave(client) {
        // this.broadcast("message", `${client.sessionId} leaved`);
        console.log(client.sessionId, "left");
    }
    onDispose() {
        console.log("DefaultRoom::disposeed");
    }
}
