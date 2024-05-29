import express from "express";
import http from "http";
import { Server as SocketIoServer } from "socket.io";
import { Client } from "ssh2";
import { readFileSync } from "fs";

const app = express();
const server = http.createServer(app);
const dotenv = require("dotenv");



const origin = process.env.VITE_NODE_ENV

const io = new SocketIoServer(server, {
    cors: {
        origin: origin,
        methods: ["GET", "POST"],
    },
    allowEIO3: true,
});

app.use((res, next) => {
    res.header(
        "Access-Control-Allow-Origin",
        origin
    );
    res.header("Access-Control-Allow-Methods", "GET, POST");
    next();
});

io.on("connection", (socket) => {
    const conn = new Client();

    const { host, port, username } = socket.handshake.query;

    conn.on("ready", () => {
        socket.emit("data", "\r\n*** SSH CONNECTION ESTABLISHED ***\r\n");
        conn.shell((err, stream) => {
            if (err) {
                socket.emit(
                    "data",
                    "\r\n*** SSH SHELL ERROR: " + err.message + " ***\r\n"
                );
                return;
            }
            socket.on("data", (data) => {
                stream.write(data);
            });
            stream
                .on("data", (data) => {
                    socket.emit("data", data.toString("binary"));
                })
                .on("close", () => {
                    conn.end();
                });
        });
    }).connect({
        host,
        port,
        username,
        privateKey: readFileSync("privatekey.txt"),
    });

    socket.on("disconnect", () => {
        conn.end();
    });
});

server.listen(3000, () => {
    console.log("Listening on port 3000");
});
