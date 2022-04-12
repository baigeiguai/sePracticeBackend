/**
 * IMPORTANT: 
 * ---------
 * Do not manually edit this file if you'd like to use Colyseus Arena
 * 
 * If you're self-hosting (without Arena), you can manually instantiate a
 * Colyseus Server as documented here: 👉 https://docs.colyseus.io/server/api/#constructor-options 
 */
// import { listen } from "@colyseus/arena";

// // Import arena config
// import arenaConfig from "./arena.config";

// // Create and listen on 2567 (or PORT environment variable.)
// listen(arenaConfig);
import  http from "http";
import  express from 'express';
import  cors from  'cors';
import { Server } from "colyseus"
import { DefaultRoom } from "./rooms/DefaultRoom";
import {monitor} from "@colyseus/monitor";
import TicTacToe from "./rooms/Tictactoe";
const port = 2567 

const app=express();
app.use(cors());
app.use(express.json());
const server = http.createServer(app);
const gameServer = new Server({
    server,
})
gameServer.define("tic-tac-toe",TicTacToe);
// gameServer.define("DefaultRoom", DefaultRoom);
app.use('/colyseus',monitor());
gameServer.listen(port)
console.log(`[GameServer] Listening on Port: ${port}`)

