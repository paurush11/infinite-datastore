import express from "express";
const http = require("http");
const app = express();
const server = http.createServer(app);

import { Server } from "socket.io";

const io = new Server(server, {
    cors: {
        origin: "*"
    }
})

io.on("connection", (socket) => {
    socket.on("client-ready", () => socket.broadcast.emit("get-canvas-state"))

    socket.on("canvas-state", (state) => {
        socket.broadcast.emit("canvas-state-from-server", state);
    })

    socket.on("draw-line", ({ prevPoint, currentPoint, color, paintWidth }) => {
        socket.broadcast.emit("draw-line", { prevPoint, currentPoint, color, paintWidth })
    })
    socket.on("clear", () => io.emit("clear"))
})


server.listen("3001", () => {
    console.log("working on port 3001")
})