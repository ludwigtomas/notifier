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
    ServerIcon,
    CheckIcon,
} from "@heroicons/react/24/outline";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import RepositoryClientsTable from "@/Pages/Repositories/Partials/RepositoryClientsTable";
import RepositoryDatabaseTable from "@/Pages/Repositories/Partials/RepositoryDatabaseTable";
import Pagination from "@/Components/Pagination";

export default function Show({ auth, repository, database_backups, clients }) {
    const [showCode, setShowCode] = useState(false);
    const [showRelationship, setShowRelationship] = useState('databases');

    // Function to toggle the database_verification_code
    function toggleShowCode() {
        setShowCode(!showCode);
    }

    const handleShowRepositoryRelation = (relation) => {
        return () => {
            setShowRelationship(relation);
        }
    }

    // Function to copy the code to clipboard
    const handleCopyToClipboard = () => {
        if(!showCode){
            alert('Nelze zkopírovat skrytý kód')
        }

        let backup_code = repository.database_verification_code;
        let backup_url = 'https://notifier.ludwigtomas.cz/api/v1/repositories/' + repository.slug;

        let env_code = 'BACKUP_CODE=' + backup_code + '\n' + 'BACKUP_URL=' + backup_url

        navigator.clipboard.writeText(env_code);
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
                                        href={route("repositories.edit", repository.id)}
                                        className="flex items-center justify-center space-x-4 bg-zinc-800 px-4 py-1.5 rounded-lg border border-transparent hover:border-green-500"
                                    >
                                        <span className="text-gray-200">
                                            Editovat
                                        </span>

                                        <PencilSquareIcon className="w-6 h-6 text-green-500" />
                                    </Link>

                                    {/* <Link
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
                                    </Link> */}
                                </div>
                            </div>
                        </div>
                    </header>
                }
            >
                <Head title={repository.name + ' repozitář'} />

                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="grid grid-cols-12 gap-x-8 ">

                            <div className="col-span-12 mb-20 flex justify-center items-center">
                                <div className="bg-stone-900 p-1 drop-shadow-2xl lg:w-8/12 rounded-xl overflow-hidden">

                                    <div className="flex justify-between items-center relative">

                                        <div className="absolute left-1/2 -translate-x-1/2">
                                            <span className="text-gray-400 mr-4">
                                                .env
                                            </span>
                                            <span className="text-white text-xl font-bold uppercase">
                                                {repository.name}
                                            </span>
                                        </div>

                                        <div className="p-2 flex space-x-2">
                                            <div className="space-x-2">
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
                                                    onClick={ showCode ?  handleCopyToClipboard : null}
                                                    className={'bg-zinc-800 text-white p-2 rounded-lg border border-zinc-600' + (
                                                        showCode === false && ' cursor-not-allowed'
                                                    )}
                                                >
                                                    <ClipboardIcon className="w-6 h-6" />
                                                </motion.button>
                                            </div>
                                        </div>

                                        <div className="p-4 flex space-x-2">
                                            <div className="rounded-full w-3 h-3 bg-red-500"></div>
                                            <div className="rounded-full w-3 h-3 bg-yellow-500"></div>
                                            <div className="rounded-full w-3 h-3 bg-green-500"></div>
                                        </div>
                                    </div>

                                    <div className="w-full flex items-center justify-center">
                                        <div className="bg-stone-800 rounded-lg w-full">
                                            <div id="code-area" className="p-5 space-y-3">
                                                <div className="text-base">
                                                    <span className="text-yellow-300">
                                                    BACKUP_CODE
                                                    </span>

                                                    <span className="text-green-400">
                                                        =
                                                    </span>

                                                    <span className="text-blue-400">"</span>

                                                    <span className="text-purple-400">
                                                        { showCode ? (
                                                            repository.database_verification_code
                                                        ) : (
                                                            'xxxxx - xxxxx - xxxxx - xxxxx - xxxxx - xxxxx'
                                                        )}
                                                    </span>

                                                    <span className="text-blue-400">"</span>
                                                </div>

                                                <div className="text-base">
                                                    <span className="text-yellow-300">
                                                        BACKUP_URL
                                                    </span>
                                                    <span className="text-green-400">
                                                        =
                                                    </span>
                                                    <span className="text-blue-400">"</span>

                                                    <span className="text-purple-400">
                                                        { showCode ? (
                                                            'https://notifier.ludwigtomas.cz/api/v1/repositories/' + repository.slug
                                                        ) : (
                                                            'https://notifier.ludwigtomas.cz/api/v1/repositories/xxxxx-xxxxx'
                                                        )}
                                                    </span>

                                                    <span className="text-blue-400">"</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Last commit */}
                            <div className="col-span-3 grid rounded-xl overflow-hidden bg-zinc-900 pb-5">
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

                                <div className="text-center">
                                    <h3 className="text-gray-500 text-xs text-center">
                                        {new Date(repository.last_commit_at).toLocaleDateString("cs-CZ", {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric",
                                        })}
                                    </h3>

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

                            {/* Database */}
                            <div
                                onClick={handleShowRepositoryRelation('databases')}
                                className={'col-span-3 grid rounded-xl overflow-hidden bg-zinc-900 pb-5 border-2 hover:border-sky-500 cursor-pointer' +
                                    (showRelationship === 'databases' ? ' border-sky-500' : ' border-transparent')}
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
                                onClick={handleShowRepositoryRelation('clients')}
                                className={'col-span-3 grid rounded-xl overflow-hidden bg-zinc-900 pb-5 border-2 hover:border-sky-500 cursor-pointer' +
                                    (showRelationship === 'clients' ? ' border-sky-500' : ' border-transparent' )}
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

                            <div
                                onClick={handleShowRepositoryRelation('hosting')}
                                className={'col-span-3 grid rounded-xl overflow-hidden bg-zinc-900 pb-5 border-2 hover:border-sky-500 cursor-pointer' +
                                    (showRelationship === 'hosting' ? ' border-sky-500' : ' border-transparent' )}
                            >
                                <div className="flex justify-center overflow-hidden">
                                    <div className="relative w-72 bg-zinc-700 h-8 flex items-center justify-center">
                                        <span className="absolute -left-10 bg-zinc-900 w-20 h-10 px-6 skew-x-[40deg]" />

                                        <span className="text-zinc-100 text-xl font-bold tracking-wider">
                                            hosting
                                        </span>

                                        <span className="absolute -right-10 bg-zinc-900 w-20 h-10 px-6 skew-x-[-40deg]" />
                                    </div>
                                </div>

                                <ServerIcon className="w-14 h-28 stroke-1 m-auto text-sky-500" />

                                <div className="text-center space-x-4 flex items-center justify-center ">
                                    {repository.relationships.hosting ? (
                                        <span className="bg-green-500 animate-pulse p-3 rounded-full"/>
                                    ) : (
                                        <span className="bg-red-500 animate-pulse p-3 rounded-full"/>
                                    )}
                                </div>
                            </div>
                        </div>

                        { showRelationship === 'databases' ? (
                                <RepositoryDatabaseTable repository={repository} database_backups={database_backups} />
                            ): showRelationship === 'clients' ? (
                                <RepositoryClientsTable/>
                            ) : null
                        }

                    </div>
                </div>
            </AuthenticatedLayout>
        </section>
    );
}
