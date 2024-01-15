import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
    PencilSquareIcon,
    TrashIcon,
    EyeIcon,
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
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Show({ auth, repository }) {
    const [showCode, setShowCode] = useState(false);

    function toggleShowCode() {
        setShowCode(!showCode);
    }

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
                                <span className="text-gray-200 font-bold text-xs">
                                    {showCode === true
                                        ? repository.database_verification_code
                                        : "***************************************"}
                                </span>

                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onMouseDown={toggleShowCode}
                                    className="bg-zinc-800 text-white p-2"
                                >
                                    <CodeBracketIcon className="w-6 h-6" />
                                </motion.button>
                            </div>
                        </div>

                        <div className="col-span-3 grid rounded-xl overflow-hidden bg-zinc-900">
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

                        <div className="col-span-3 grid rounded-xl overflow-hidden bg-zinc-900">
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

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="mt-10 border-4 border-zinc-900 divide-y rounded-lg divide-zinc-800 ">
                        <table className="min-w-full divide-y divide-zinc-700 rounded-md overflow-hidden">
                            <thead className="bg-zinc-950">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400"
                                    >
                                        Repozitář
                                    </th>

                                    <th
                                        scope="col"
                                        className="px-12 py-3.5 text-sm font-normal text-left text-zinc-400"
                                    >
                                        Název
                                    </th>

                                    <th
                                        scope="col"
                                        className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400"
                                    >
                                        Velikost
                                    </th>

                                    <th
                                        scope="col"
                                        className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400"
                                    >
                                        Vytvořeno
                                    </th>

                                    <th
                                        scope="col"
                                        className="relative py-3.5 px-4"
                                    >
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-zinc-700 bg-zinc-900">
                                {repository.relationships.database_backups.map(
                                    (backup) => (
                                        <tr
                                            key={backup.id}
                                            className="group hover:bg-zinc-800"
                                        >
                                            <td className="px-4 py-4 ">
                                                <span className="text-sm font-medium text-zinc-400">
                                                    {repository.name}
                                                </span>
                                            </td>

                                            <td className="px-4 py-4 ">
                                                <span className="text-sm font-medium text-zinc-400">
                                                    {backup.name}
                                                </span>
                                            </td>

                                            <td className="px-4 py-4 ">
                                                <span className="text-sm font-medium text-zinc-400">
                                                    {backup.size} KB
                                                </span>
                                            </td>

                                            <td className="px-4 py-4 ">
                                                <span className="text-sm font-medium text-zinc-400">
                                                    {backup.created_at_human}
                                                </span>
                                            </td>

                                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                <div className="flex items-center space-x-2">
                                                    <a
                                                        download
                                                        href={
                                                            "/storage/" +
                                                            backup.path +
                                                            "/" +
                                                            backup.name
                                                        }
                                                        className="bg-zinc-800 group-hover:bg-zinc-900 p-1 rounded-lg border border-transparent hover:border-green-500 faster-animation"
                                                    >
                                                        <ArrowDownTrayIcon className="w-6 h-6 text-green-500" />
                                                    </a>

                                                    <Link
                                                        as="button"
                                                        method="delete"
                                                        preserveScroll
                                                        href={route(
                                                            "backups.destroy",
                                                            backup.id
                                                        )}
                                                        className="bg-zinc-800 group-hover:bg-zinc-900 p-1 rounded-lg border border-transparent hover:border-red-500 faster-animation"
                                                    >
                                                        <TrashIcon className="w-6 h-6 text-red-500" />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
