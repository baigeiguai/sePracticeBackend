import {Client, Room} from "colyseus";
import TicTacToeState from "../mySchema/TicTacToeState";
import {Message} from "../../types/Message";
import {Dispatcher} from "@colyseus/command";
import PlaySelectionCommand from "../../server/commands/PlaySelectionCommand";
import {GameState} from "../../types/ITicTacToeState";

class TicTacToe extends Room<TicTacToeState>{
    private  dispatcher = new Dispatcher(this);
    onCreate(){
        this.setState(new TicTacToeState());
        this.onMessage(Message.playerSelection,((client,message:{index:number})=>{
            this.dispatcher.dispatch(new PlaySelectionCommand(),{
               client,
               index:message.index
            });
        }))
    }
    onJoin(client: Client, options?: any, auth?: any): void | Promise<any> {
        const idx=this.clients.findIndex(c=>c.sessionId===client.sessionId)
        client.send(Message.playerIndex,{playerIndex:idx})
        if(this.clients.length>=2){
            this.state.gameState=GameState.Playing;
            this.lock();
        }
    }

    // onDispose(): void | Promise<any> {
    //     this.dispatcher.stop();
    // }
};

export default TicTacToe;