import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
    PencilSquareIcon,
    TrashIcon,
    EyeIcon,
    EyeSlashIcon,
    PlusIcon,
    XMarkIcon,
    ChevronRightIcon,
    CircleStackIcon,
    CalendarDaysIcon,
    UserIcon,
    UsersIcon,
    ArrowDownTrayIcon,
    ShieldCheckIcon,
    CodeBracketIcon,
    ClipboardIcon,
} from "@heroicons/react/24/outline";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import RepositoryClientsTable from "./Partials/RepositoryClientsTable";
import RepositoryDatabaseTable from "./Partials/RepositoryDatabaseTable";

export default function Show({ auth, repository, database_verification_code }) {
    const [showCode, setShowCode] = useState(false);
    const codeRef = useRef(null);
    const [showClients, setShowClients] = useState(false);
    const [showDatabase, setShowDatabase] = useState(false);

    // Function to toggle the database_verification_code
    function toggleShowCode() {
        setShowCode(!showCode);
    }

    // Function to toggle the Client table
    function handleClientsToggle() {
        setShowClients(true);
        setShowDatabase(false);
    }
    // Function to toggle the Database table
    function handleDatabaseToggle() {
        setShowDatabase(true);
        setShowClients(false);
    }

    // Function to copy the code to clipboard
    const handleCopyToClipboard = () => {
        const codeElement = codeRef.current;

        if (codeElement) {
            const range = document.createRange();
            const selection = window.getSelection();

            range.selectNodeContents(codeElement);

            // Check if the selected text contains the actual key
            if (range.toString().includes(database_verification_code)) {
                alert("Cannot copy sensitive information!");
            } else {
                selection.removeAllRanges();
                selection.addRange(range);
                document.execCommand("copy");
                selection.removeAllRanges();
                alert("Code copied to clipboard!");
            }
        }
    };

    return (
        <section>
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
                            <ChevronRightIcon className="w-5 h-5" />
                        </span>

                        <Link
                            className="font-semibold text-lg leading-tight hover:text-sky-500 slower-animation"
                            href={route("repositories.index")}
                        >
                            Repozitáře
                        </Link>

                        <span>
                            <ChevronRightIcon className="w-5 h-5" />
                        </span>

                        <Link
                            className="font-semibold text-lg leading-tight text-sky-500"
                            href={route("repositories.show", repository.id)}
                        >
                            {repository.name}
                        </Link>

                        <span>
                            <ChevronRightIcon className="w-5 h-5" />
                        </span>

                        <div className="relative group">
                            <Link
                                className="font-semibold text-lg leading-tight text-sky-500"
                                href={route("repositories.show", repository.id)}
                            >
                                Zobrazit
                            </Link>

                            <div className="absolute invisible group-hover:visible flex flex-col left-0 top-full pt-6 z-30">
                                <div className="bg-zinc-900 border-2 border-zinc-700 rounded-xl p-4 grid gap-y-2 ">
                                    <Link
                                        href={route("repositories.create")}
                                        className="flex items-center justify-center space-x-4 bg-zinc-800 px-4 py-1.5 rounded-lg border border-transparent hover:border-green-500"
                                    >
                                        <span className="text-gray-200">
                                            Vytvořit
                                        </span>

                                        <PlusIcon className="w-6 h-6 text-green-500" />
                                    </Link>

                                    <Link
                                        href={route(
                                            "repositories.edit",
                                            repository.id
                                        )}
                                        className="flex items-center justify-center space-x-4 bg-zinc-800 px-4 py-1.5 rounded-lg border border-transparent hover:border-sky-500"
                                    >
                                        <span className="text-gray-200">
                                            Editovat
                                        </span>

                                        <PencilSquareIcon className="w-6 h-6 text-sky-500" />
                                    </Link>

                                    <Link
                                        as="button"
                                        method="delete"
                                        preserveScroll
                                        href={route(
                                            "repositories.destroy",
                                            repository.id
                                        )}
                                        className="flex items-center justify-center space-x-4 bg-zinc-800 px-4 py-1.5 rounded-lg border border-transparent hover:border-sky-500"
                                    >
                                        <span className="text-gray-200">
                                            Smazat
                                        </span>

                                        <TrashIcon className="w-6 h-6 text-red-500" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </header>
                }
            >
                <Head title="Dashboard" />

                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="grid grid-cols-12 gap-x-8 h-64">
                            <div className="col-span-3 grid rounded-xl overflow-hidden bg-zinc-900">
                                <div className="flex justify-center overflow-hidden">
                                    <div className="relative w-72 bg-zinc-700 h-8 flex items-center justify-center">
                                        <span className="absolute -left-10 bg-zinc-900 w-20 h-10 px-6 skew-x-[40deg]" />

                                        <span className="text-zinc-100 text-xl font-bold tracking-wider">
                                            Kód
                                        </span>

                                        <span className="absolute -right-10 bg-zinc-900 w-20 h-10 px-6 skew-x-[-40deg]" />
                                    </div>
                                </div>

                                <ShieldCheckIcon className="w-14 h-28 stroke-1 m-auto text-sky-500" />

                                <div className="text-center space-x-4">
                                    <span
                                        className="text-gray-200 font-bold text-xs"
                                        ref={codeRef}
                                    >
                                        {showCode === true
                                            ? repository.database_verification_code
                                            : "***************************************"}
                                    </span>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={toggleShowCode}
                                        className="bg-zinc-800 text-white p-2"
                                    >
                                        {showCode === true ? (
                                            <EyeIcon className="w-6 h-6" />
                                        ) : (
                                            <EyeSlashIcon className="w-6 h-6" />
                                        )}
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={handleCopyToClipboard}
                                        className="bg-zinc-800 text-white p-2"
                                    >
                                        <ClipboardIcon className="w-6 h-6" />
                                    </motion.button>
                                </div>
                            </div>

                            <div
                                className={`col-span-3 grid rounded-xl overflow-hidden bg-zinc-900 ${
                                    showDatabase
                                        ? "border-2 border-sky-500"
                                        : ""
                                }`}
                                onClick={handleDatabaseToggle}
                            >
                                <div className="flex justify-center overflow-hidden">
                                    <div className="relative w-72 bg-zinc-700 h-8 flex items-center justify-center">
                                        <span className="absolute -left-10 bg-zinc-900 w-20 h-10 px-6 skew-x-[40deg]" />

                                        <span className="text-zinc-100 text-xl font-bold tracking-wider">
                                            Databáze
                                        </span>

                                        <span className="absolute -right-10 bg-zinc-900 w-20 h-10 px-6 skew-x-[-40deg]" />
                                    </div>
                                </div>

                                <CircleStackIcon className="w-14 h-28 stroke-1 m-auto text-sky-500" />

                                <div className="text-center space-x-4">
                                    <span className="text-gray-200 font-bold text-xl">
                                        {
                                            repository.relationships
                                                .database_backups.length
                                        }
                                    </span>

                                    <span className="text-gray-400 text-xs">
                                        Databáze
                                    </span>
                                </div>
                            </div>

                            <div className="col-span-3 grid rounded-xl overflow-hidden bg-zinc-900">
                                <div className="flex justify-center overflow-hidden">
                                    <div className="relative w-72 bg-zinc-700 h-8 flex items-center justify-center">
                                        <span className="absolute -left-10 bg-zinc-900 w-20 h-10 px-6 skew-x-[40deg]" />

                                        <span className="text-zinc-100 text-xl font-bold tracking-wider">
                                            Poslední commit
                                        </span>

                                        <span className="absolute -right-10 bg-zinc-900 w-20 h-10 px-6 skew-x-[-40deg]" />
                                    </div>
                                </div>

                                <CalendarDaysIcon className="w-14 h-28 stroke-1 m-auto text-sky-500" />

                                <div className="text-center space-x-4">
                                    <div className="text-gray-500 text-xs">
                                        {repository.last_activity_at}
                                    </div>

                                    <div className="text-gray-200 mt-2">
                                        <h2 className="font-bold text-2xl">
                                            {repository.last_activity_at_human}
                                        </h2>

                                        <h3 className="text-gray-400 text-xs">
                                            Nejnovější commit
                                        </h3>
                                    </div>
                                </div>
                            </div>

                            <div
                                className={`col-span-3 grid rounded-xl overflow-hidden bg-zinc-900 ${
                                    showClients ? "border-2 border-sky-500" : ""
                                }`}
                                onClick={handleClientsToggle}
                            >
                                <div className="flex justify-center overflow-hidden">
                                    <div className="relative w-72 bg-zinc-700 h-8 flex items-center justify-center">
                                        <span className="absolute -left-10 bg-zinc-900 w-20 h-10 px-6 skew-x-[40deg]" />

                                        <span className="text-zinc-100 text-xl font-bold tracking-wider">
                                            Klienti
                                        </span>

                                        <span className="absolute -right-10 bg-zinc-900 w-20 h-10 px-6 skew-x-[-40deg]" />
                                    </div>
                                </div>

                                <UsersIcon className="w-14 h-28 stroke-1 m-auto text-sky-500" />

                                <div className="text-center space-x-4">
                                    <span className="text-gray-200 font-bold text-xl">
                                        {repository.relationships.clients_count}
                                    </span>

                                    <span className="text-gray-400 text-xs">
                                        klienti
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {showDatabase === true ? (
                    <RepositoryDatabaseTable repository={repository} />
                ) : null}
                {showClients === true ? (
                    <RepositoryClientsTable repository={repository} />
                ) : null}
            </AuthenticatedLayout>
        </section>
    );
}
