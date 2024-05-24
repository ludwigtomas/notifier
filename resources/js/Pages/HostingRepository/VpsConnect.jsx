import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useEffect } from "react";
import { usePage } from "@inertiajs/react";
import io from "socket.io-client";
import { Terminal } from "@xterm/xterm";
import "@xterm/xterm/css/xterm.css";
import { Head, Link, router } from "@inertiajs/react";
import {
    PencilSquareIcon,
    TrashIcon,
    EyeIcon,
    CheckIcon,
    XMarkIcon,
    ChevronRightIcon,
    LinkIcon,
    BackspaceIcon,
    CommandLineIcon,
    ClipboardIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";


export default function SshClient({auth, hosting_repository}) {

    let param = 'host=' + hosting_repository.ip_address + '&port=' + hosting_repository.ip_port + '&username=' + hosting_repository.login_user + '&password=' + hosting_repository.login_password;

    let url = import.meta.env.VITE_NODE_SERVER_URL + '?' + param;

    useEffect(() => {
        const socket = io(url);

        // Send SSH connection details to the server
        socket.emit("sshDetails");

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
    }, [url]);


    return (

        <AuthenticatedLayout
            user={auth.user}
            header={
                <header className="flex items-center justify-start flex-row space-x-4 text-zinc-500">
                    <Link
                        className="font-semibold text-lg leading-tight hover:text-sky-500 slower-animation"
                        href={route("dashboard.index")}
                    >
                        Dashboard
                    </Link>

                    <span>
                        <ChevronRightIcon className="size-5" />
                    </span>

                    <Link
                        className="font-semibold text-lg leading-tight hover:text-sky-500 slower-animation"
                        href={route("repositories.index")}
                    >
                        Repozitáře
                    </Link>

                    <span>
                        <ChevronRightIcon className="size-5" />
                    </span>

                    <Link
                        className="font-semibold text-lg leading-tight text-sky-500"
                        href={route("repositories.edit", hosting_repository.relationships.repository.repository_id)}
                    >
                        {hosting_repository.relationships.repository.name}
                    </Link>


                    <span>
                        <ChevronRightIcon className="size-5" />
                    </span>

                    <div className="relative group">
                        <Link
                            className="font-semibold text-lg leading-tight text-sky-500"
                            href={route("repositories.show", hosting_repository.relationships.repository.repository_id)}
                        >
                            Edit
                        </Link>

                        <div className="absolute invisible group-hover:visible flex flex-col left-0 top-full pt-6 z-30">
                            <div className="bg-zinc-900 border-2 border-zinc-700 rounded-xl p-2 grid gap-y-2 shadow-xl shadow-black">
                                <Link
                                    className="flex items-center justify-center space-x-4 bg-zinc-800 px-4 py-2 rounded-md border border-transparent hover:border-sky-500"
                                    href={route("repositories.show", hosting_repository.relationships.repository.repository_id)}
                                >
                                    <span className="text-gray-200">
                                        Zobrazit
                                    </span>

                                    <EyeIcon className="size-6 text-sky-500" />
                                </Link>

                                <Link
                                    className="flex items-center justify-center space-x-4 bg-zinc-800 px-4 py-2 rounded-md border border-transparent hover:border-green-500"
                                    href={route("repositories.edit", hosting_repository.relationships.repository.repository_id)}
                                >
                                    <span className="text-gray-200">
                                        Editovat
                                    </span>

                                    <PencilSquareIcon className="w-6 h-6 text-green-500" />
                                </Link>

                            </div>
                        </div>
                    </div>

                </header>
            }
        >
            <div className="grid gap-5">
                <div className="grid grid-cols-1 gap-8 xl:gap-4 md:grid-cols-2 xl:grid-cols-3">
                    <div className="group relative p-4 grid border-2 bg-stone-900 hover:border-stone-600 border-stone-700 rounded-3xl">
                        <div className="bg-white/5 rounded-xl py-2 overflow-hidden grid">
                            <div className="flex items-center justify-center flex-col">
                                <p className="text-lg font-bold text-zinc-200">
                                    {hosting_repository.ip_address + ':' + hosting_repository.ip_port}
                                </p>

                                <p className="text-xs text-zinc-400">
                                    IP adresa
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="group relative p-4 grid border-2 bg-stone-900 hover:border-stone-600 border-stone-700 rounded-3xl">

                        { hosting_repository.relationships.repository.website_url && (
                            <>
                                <div className="bg-white/5 rounded-xl py-2 overflow-hidden grid">
                                    <div className="flex items-center justify-center flex-col">
                                        <LinkIcon className="size-12 text-zinc-200"/>
                                    </div>
                                </div>

                                <a
                                    href={hosting_repository.relationships.repository.website_url}
                                    target="_blank"
                                    className="absolute inset-0"
                                />
                            </>
                        )}
                    </div>

                    <div className="group relative p-4 grid border-2 bg-stone-900 hover:border-stone-600 border-stone-700 rounded-3xl">
                        <div className="bg-white/5 rounded-xl py-2 overflow-hidden grid">
                            <div className="flex items-center justify-center flex-col">
                                <p className="text-lg font-bold text-zinc-200">
                                    {hosting_repository.login_user}
                                </p>

                                <p className="text-xs text-zinc-400">
                                    user
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full bg-stone-900 p-2 drop-shadow-2xl rounded-2xl overflow-hidden">
                    <div className="flex justify-between items-center relative">
                        <div className="absolute left-1/2 -translate-x-1/2">
                            <span className="text-gray-400 mr-4">
                                vps
                            </span>
                            <span className="text-white text-xl font-bold uppercase">
                                {hosting_repository.relationships.repository.name }
                            </span>
                        </div>

                        <div className="p-4 flex space-x-2">
                            <div className="rounded-full w-3 h-3 bg-red-500"></div>
                            <div className="rounded-full w-3 h-3 bg-yellow-500"></div>
                            <div className="rounded-full w-3 h-3 bg-green-500"></div>
                        </div>
                    </div>

                    <div className="bg-black border border-stone-700 rounded-xl overflow-hidden p-5">
                        <div
                            id="terminal"
                            style={{ overflow: "!hidden" }}
                            className="w-full h-[410px] overflow-y-hidden"
                        />
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
};
