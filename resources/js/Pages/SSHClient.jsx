import React, { useEffect } from "react";
import io from "socket.io-client";
import { Terminal } from "@xterm/xterm";
import "@xterm/xterm/css/xterm.css";

const SshClient = () => {
    useEffect(() => {
        const socket = io("http://127.0.0.1:3000");
        const terminal = new Terminal();

        terminal.open(document.getElementById("terminal"));

        terminal.onData((data) => {
            socket.emit("data", data);
        });

        socket.on("data", (data) => {
            terminal.write(data);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div>
            <h1>SSH Client</h1>
            <div
                id="terminal"
                style={{ width: "100%", height: "500px", background: "black" }}
            ></div>
        </div>
    );
};

export default SshClient;
