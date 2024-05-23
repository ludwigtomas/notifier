import React, { useEffect } from "react";
import { usePage } from "@inertiajs/react";
import io from "socket.io-client";
import { Terminal } from "@xterm/xterm";
import "@xterm/xterm/css/xterm.css";

const SshClient = () => {
    const { props } = usePage(); // Get props from Laravel
    const { host, port, username, password } = props;

    let param = 'host=' + host + '&port=' + port + '&username=' + username + '&password=' + password;

    let url = "https://ssh-connector.notifier.ludwigtomas.cz?" + param;

    useEffect(() => {
        const socket = io(url);

        // Send SSH connection details to the server
        socket.emit("sshDetails", { host, port, username, password });

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
    }, [host, port, username, password]);

    return (
        <div className="text-white">

            {host}
            <br />
            {port}
            <br />
            {username}
            <br />
            {password}

            <h1 className="mt-20">SSH Client</h1>

            <div
                id="terminal"
                style={{ width: "100%", height: "500px", background: "black" }}
            />
        </div>
    );
};

export default SshClient;
