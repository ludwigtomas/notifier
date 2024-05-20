import express from "express";
import http from "http";
import { Server as SocketIoServer } from "socket.io";
import { Client } from "ssh2";
import { readFileSync } from "fs";

// import dotenv from "dotenv";

// Load environment variables from .env file
// dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new SocketIoServer(server, {
    cors: {
        origin: "http://127.0.0.1:8000", // Updated to match the correct origin
        methods: ["GET", "POST"],
    },
    allowEIO3: true,
});

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:8000"); // Correct origin for the frontend
    res.header("Access-Control-Allow-Methods", "GET, POST");
    next();
});

io.on("connection", (socket) => {
    const conn = new Client();

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
        host: "178.22.117.90",
        port: 32259,
        username: "tomludwig",
        password: "ahojahoj12*",
        // privateKey: readFileSync("privatekey.txt"),
    });

    socket.on("disconnect", () => {
        conn.end();
    });
});

server.listen(3000, () => {
    console.log("Listening on port 3000");
});
