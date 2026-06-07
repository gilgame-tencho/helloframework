const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const HelloController = require("./controllers/HelloController");

const app = express();
const server = http.createServer(app);

const io = new Server(server);

app.use(express.json());

app.get("/hello", HelloController.hello);

io.on("connection", (socket) => {
    console.log("client connected");

    socket.emit("message", "hello socket");
});

server.listen(3000, () => {
    console.log("server start");
});
