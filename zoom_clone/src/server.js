import http from "http";

// import WebSocket from "ws";
// import SocketIO from "socket.io"
import {Server} from "socket.io"
import {instrument} from "@socket.io/admin-ui"

import express from "express";


const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const httpServer = http.createServer(app);
// const wsServer = SocketIO(httpServer);
const wsServer = new Server(httpServer, {
    cors: {
        origin: ["https://admin.socket.io"],
        credentials: true,
    },
});
instrument(wsServer, {
    auth: false
});

function publicRooms() {
    const {
        sockets: {
            adapter: {sids, rooms},
        }, 
    } = wsServer;
    
    const publicRooms = [];
    rooms.forEach((_, key) => {
        if (sids.get(key) === undefined) {
            publicRooms.push(key);
        }
    });
    return publicRooms;
}

function countRoom(roomName) {
    return wsServer.sockets.adapter.rooms.get(roomName)?.size;
}

wsServer.on("connection", socket => {
    socket["nickname"] = "Anonymous";
    socket.onAny((event) => {
        console.log(wsServer.sockets.adapter);
        console.log(`Socket event: ${event}`);
    });

    socket.on("enter_room", (roomName, showRoom) => {    
        socket.join(roomName); // join the room
        showRoom(); // executed at client side
        socket.to(roomName).emit("welcome", socket.nickname, countRoom(roomName)); // send to all except sender

        wsServer.sockets.emit("room_change", publicRooms());
    });

    socket.on("disconnecting", () => {
        socket.rooms.forEach(room => socket.to(room).emit("bye", socket.nickname, countRoom(room) -1));
    });
    
    socket.on("disconnect", () => {
        wsServer.sockets.emit("room_change", publicRooms());
    })

    socket.on("new_message", (msg, room, done) => {
        socket.to(room).emit("new_message", `${socket.nickname}: ${msg}`);
        done();
    });

    socket.on("nickname", (nickname) => {
        socket["nickname"] = nickname;
    })
    
    // console.log(socket);
})


/*
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const sockets = [];

wss.on("connection", (socket) => {
    sockets.push(socket);
    socket["nickname"] = "Anon";

    console.log("Connected to Browser");

    socket.on("close", () => {
        console.log("Disconnected from the Browser");
    });

    socket.on("message", (msg) => {
        const message = JSON.parse(msg);
        switch (message.type) {
            case "new_message":
                sockets.forEach((aSocket) => {
                    const new_msg = message.payload;
                    aSocket.send(`${socket.nickname}: ${new_msg.toString()}`);
                });
            case "nickname":
                socket["nickname"] = message.payload;
        };
        // socket.send(msg.toString());
        // console.log(msg.toString());
    });
});
*/




httpServer.listen(3000, handleListen);
// app.listen(3000, handleListen);