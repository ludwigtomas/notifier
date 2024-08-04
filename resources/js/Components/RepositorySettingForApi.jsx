import React from "react";
import {
    EyeIcon,
    EyeSlashIcon,
    ClipboardIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { motion } from "framer-motion";

const RepositorySettingForApi = ({repository}) => {

    const [showCode, setShowCode] = useState(false);
    const [selectFile, setSelectFile] = useState('ssh');

    // Function to toggle the database_verification_code
    function toggleShowCode() {
        setShowCode(!showCode);
    }


    const handleSelectTab = (file) => {
        return () => {
            setSelectFile(file);
        };
    }
        // Function to copy the code to clipboard
        const copyEnvToClipboard = () => {
            let backup_code = repository.database_verification_code;

            let backup_url = import.meta.env.VITE_APP_URL + "/api/v1/repositories/" + repository.slug;
            let env_code = "BACKUP_CODE=" + backup_code + "\n" + "BACKUP_URL=" + backup_url;

            navigator.clipboard.writeText(env_code);
        };

        const copySSHToClipboard = () => {
            if (!repository.relationships.hosting_repository) {
                return;
            }

            let ssh_code = "ssh " + repository.relationships.hosting_repository.login_user + "@" + repository.relationships.hosting_repository.ip_address + " -p " + repository.relationships.hosting_repository.ip_port ?? 22;

            navigator.clipboard.writeText(ssh_code);
        }

    return (
        <div className="col-span-12 h-56">
            <div className="flex justify-center items-center">
                <div className="bg-stone-900 p-1 drop-shadow-2xl lg:w-8/12 rounded-xl overflow-hidden">
                    <div className="flex justify-between items-center relative">
                        <div className="p-2 flex space-x-2">
                            <div className="space-x-2">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleSelectTab("ssh")}
                                    className={
                                        "inline-flex bg-zinc-800 text-white p-2 rounded-lg border border-zinc-600 + (showCode === false && 'cursor-not-allowed')"
                                    }
                                >
                                    SSH Connection
                                    <ClipboardIcon className="ml-2 size-6" />
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleSelectTab("env")}
                                    className={
                                        "inline-flex bg-zinc-800 text-white p-2 rounded-lg border border-zinc-600"
                                    }
                                >
                                    .ENV
                                    <ClipboardIcon className="ml-2 size-6" />
                                </motion.button>
                            </div>
                        </div>

                        <div className="p-4 flex space-x-2">
                            <div className="rounded-full w-3 h-3 bg-red-500"></div>
                            <div className="rounded-full w-3 h-3 bg-yellow-500"></div>
                            <div className="rounded-full w-3 h-3 bg-green-500"></div>
                        </div>
                    </div>

                    {selectFile === "ssh" ? (
                        <div className="col-span-12 w-full grid p-1 relative">
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 z-50 ">
                                <div className="p-2 flex space-x-2">
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={copySSHToClipboard}
                                        className="bg-zinc-700 text-zinc-200 p-2 rounded-lg border border-zinc-400"
                                    >
                                        <ClipboardIcon className="w-6 h-6" />
                                    </motion.button>
                                </div>
                            </div>

                            <div className="bg-stone-800 p-1 drop-shadow-2xl rounded-lg overflow-hidden flex items-center">
                                <div className="w-full flex items-center justify-center">
                                    <div className="bg-stone-800 rounded-lg w-full">
                                        <div
                                            id="code-area"
                                            className="p-5 space-y-3"
                                        >
                                            {repository.relationships.hosting_repository && (
                                                <div className="text-base text-center">
                                                    <span className="text-yellow-300">
                                                        ssh
                                                    </span>

                                                    {" "}

                                                    <span className="text-purple-400">
                                                        { repository.relationships.hosting_repository?.login_user}
                                                    </span>

                                                    <span className="text-green-300">
                                                        @
                                                    </span>

                                                    <span className="text-purple-400">
                                                        { repository.relationships.hosting_repository?.ip_address}
                                                    </span>
                                                    {" "}
                                                    {repository.relationships.hosting_repository?.ip_port && (
                                                        <span>
                                                            <span className="text-green-300">
                                                                -p
                                                            </span>

                                                            {" "}

                                                            <span className="text-purple-400">
                                                                { repository.relationships.hosting_repository.ip_port }
                                                            </span>
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="col-span-12 w-full grid p-1 relative">
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 z-50 ">
                                <div className="p-2 flex space-x-2">
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={toggleShowCode}
                                        className="bg-zinc-800 text-white p-2 rounded-lg border border-zinc-600"
                                    >
                                        {showCode ? (
                                            <EyeIcon className="w-6 h-6" />
                                        ) : (
                                            <EyeSlashIcon className="w-6 h-6" />
                                        )}
                                    </motion.button>

                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={copyEnvToClipboard}
                                        className={
                                            "bg-zinc-700 text-zinc-200 p-2 rounded-lg border border-zinc-400 " +
                                            (!showCode && "cursor-not-allowed")
                                        }
                                    >
                                        <ClipboardIcon className="w-6 h-6" />
                                    </motion.button>
                                </div>
                            </div>

                            <div className="bg-stone-800 p-1 drop-shadow-2xl rounded-lg overflow-hidden">
                                <div className="w-full flex items-center justify-center">
                                    <div className="bg-stone-800 rounded-lg w-full">
                                        <div
                                            id="code-area"
                                            className="p-5 space-y-3"
                                        >
                                            <div className="text-base">
                                                <span className="text-yellow-300">
                                                    BACKUP_CODE
                                                </span>

                                                <span className="text-green-400">
                                                    =
                                                </span>

                                                <span className="text-blue-400">
                                                    "
                                                </span>

                                                <span className="text-purple-400">
                                                    {showCode
                                                        ? repository.database_verification_code
                                                        : "xxxxx - xxxxx - xxxxx - xxxxx - xxxxx - xxxxx"}
                                                </span>

                                                <span className="text-blue-400">
                                                    "
                                                </span>
                                            </div>

                                            <div className="text-base">
                                                <span className="text-yellow-300">
                                                    BACKUP_URL
                                                </span>
                                                <span className="text-green-400">
                                                    =
                                                </span>
                                                <span className="text-blue-400">
                                                    "
                                                </span>

                                                <span className="text-purple-400">
                                                    {showCode
                                                        ? import.meta.env
                                                              .VITE_APP_URL +
                                                          "/api/v1/repositories/" +
                                                          repository.slug
                                                        : import.meta.env
                                                              .VITE_APP_URL +
                                                          "/api/v1/repositories/xxxxx-xxxxx"}
                                                </span>

                                                <span className="text-blue-400">
                                                    "
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RepositorySettingForApi;
