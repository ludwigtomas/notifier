import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
    PencilSquareIcon,
    TrashIcon,
    EyeIcon,
    EyeSlashIcon,
    PlusIcon,
    ChevronRightIcon,
    CircleStackIcon,
    CalendarDaysIcon,
    UsersIcon,
    ShieldCheckIcon,
    ClipboardIcon,
} from "@heroicons/react/24/outline";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import RepositoryClientsTable from "@/Pages/Repositories/Partials/RepositoryClientsTable";
import RepositoryDatabaseTable from "@/Pages/Repositories/Partials/RepositoryDatabaseTable";
import Pagination from "@/Components/Pagination";

export default function Show({ auth, repository, database_backups, clients }) {
    const [showCode, setShowCode] = useState(false);
    const codeRef = useRef(null);

    console.log(database_backups);
    const [showClients, setShowClients] = useState(false);
    const [showDatabase, setShowDatabase] = useState(true);

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
            if (range.toString().includes(codeElement.current)) {
                alert("Cannot copy sensitive information!");
            } else {
                selection.removeAllRanges();
                selection.addRange(range);
                document.execCommand("copy");
                selection.removeAllRanges();
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
                                        href={route("repositories.edit", repository.id)}
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
                                        href={route( "repositories.destroy", repository.id)}
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
                <Head title={repository.name + ' repozitář'} />

                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="grid grid-cols-12 gap-x-8 h-64">

                            {/* Last commit */}
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
                                        {new Date(repository.last_commit_at).toLocaleDateString("cs-CZ", {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric",
                                        })}
                                    </div>

                                    <div className="text-gray-200 mt-2">
                                        <h2 className="font-bold text-2xl">
                                            {repository.last_commit_at_human}
                                        </h2>

                                        <h3 className="text-gray-400 text-xs">
                                            Nejnovější commit
                                        </h3>
                                    </div>
                                </div>
                            </div>

                            {/* Code */}
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

                                <div className="flex flex-col items-center ">
                                    <span
                                        className="text-gray-200 font-bold text-[8px] text-center"
                                        ref={codeRef}
                                        
                                    >
                                        {showCode
                                            ? `BACKUP_CODE="${repository.database_verification_code} BACKUP_URL="https://notifier.ludwigtomas.cz/api/repository/${repository.slug}"`
                                            : "xxxxx - xxxxx - xxxxx - xxxxx - xxxxx - xxxxx "}
                                    </span>

                                   

                                    <div className="space-x-2 mt-2">
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={toggleShowCode}
                                            className="bg-zinc-800 text-white p-2 rounded-lg border border-zinc-600"
                                        >
                                            { showCode ? (
                                                <EyeIcon className="w-6 h-6" />
                                            ) : (
                                                <EyeSlashIcon className="w-6 h-6" />
                                            )}
                                        </motion.button>

                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={
                                                showCode ? handleCopyToClipboard : null
                                            }
                                            className={'bg-zinc-800 text-white p-2 rounded-lg border border-zinc-600' + (
                                                showCode ? '' : ' cursor-not-allowed'
                                            )}
                                        >
                                            <ClipboardIcon className="w-6 h-6" />
                                        </motion.button>
                                    </div>
                                </div>
                            </div>

                            {/* Database */}
                            <div
                                className={'col-span-3 grid rounded-xl overflow-hidden bg-zinc-900 border-2 hover:border-sky-500 ' +
                                    (showDatabase
                                        ? 'border-sky-500'
                                        : 'border-transparent cursor-pointer'
                                    )
                                }
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
                                        { repository.relationships.database_backups_count}
                                    </span>

                                    <span className="text-gray-400 text-xs">
                                        Databáze
                                    </span>
                                </div>
                            </div>

                            {/* Clients */}
                            <div
                                onClick={handleClientsToggle}
                                className={'col-span-3 grid rounded-xl overflow-hidden bg-zinc-900 border-2 hover:border-sky-500 ' +
                                    (showClients
                                        ? 'border-sky-500'
                                        : 'border-transparent cursor-pointer'
                                    )
                                }
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
                    <Pagination links={database_backups.meta} />
                </div>
                {/* {showDatabase === true ? (
                    <RepositoryDatabaseTable repository={repository} />
                ) : null}

                {showClients === true ? (
                    <RepositoryClientsTable repository={repository} />
                ) : null} */}
            </AuthenticatedLayout>
        </section>
    );
}
