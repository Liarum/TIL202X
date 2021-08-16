import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

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

server.listen(3000, handleListen);

// app.listen(3000, handleListen);