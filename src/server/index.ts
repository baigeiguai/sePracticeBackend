
import express from 'express'
import cors from 'cors'
import http  from "http";
import {Server} from "colyseus";
import GameRoom from "../server/rooms/GameRoom";
import {monitor} from "@colyseus/monitor";
const app = express()
const port =2567
app.use(cors())
app.use(express.json())
const server = http.createServer(app)
const gameServer = new Server ({
    server:server
})
gameServer.define("game-server",GameRoom)
app.use('/colyseus',monitor())
gameServer.listen(port)