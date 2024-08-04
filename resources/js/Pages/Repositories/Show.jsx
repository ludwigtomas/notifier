import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
    PencilSquareIcon,
    ChevronRightIcon,
    CircleStackIcon,
    CalendarDaysIcon,
    UsersIcon,
    ServerIcon,
    CommandLineIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import RepositoryClientsTable from "@/Pages/Repositories/Partials/RepositoryClientsTable";
import RepositoryNotificationsTable from "@/Pages/Repositories/Partials/RepositoryNotificationsTable";
import RepositoryDatabaseTable from "@/Pages/Repositories/Partials/RepositoryDatabaseTable";
import RepositoryHostingTable from "@/Pages/Repositories/Partials/RepositoryHostingTable";
import RepositorySettingForApi from "@/Components/RepositorySettingForApi";

export default function Show({ auth, repository, database_backups, clients }) {
    const [showRelationship, setShowRelationship] = useState("databases");

    const handleShowRepositoryRelation = (relation) => {
        return () => {
            setShowRelationship(relation);
        };
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
                            href={route("repositories.show", repository.repository_id)}
                        >
                            {repository.name}
                        </Link>

                        <span>
                            <ChevronRightIcon className="size-5" />
                        </span>

                        <div className="relative group">
                            <Link
                                className="font-semibold text-lg leading-tight text-sky-500"
                                href={route("repositories.show", repository.repository_id)}
                            >
                                Zobrazit
                            </Link>

                            <div className="absolute invisible group-hover:visible flex flex-col left-0 top-full pt-6 z-30">
                                <div className="bg-zinc-900 border-2 border-zinc-700 rounded-xl p-2 grid gap-y-2 shadow-xl shadow-black">
                                    <Link
                                        className="flex items-center justify-center space-x-4 bg-zinc-800 px-4 py-2 rounded-md border border-transparent hover:border-green-500"
                                        href={route("repositories.edit", repository.repository_id)}
                                    >
                                        <span className="text-gray-200">
                                            Editovat
                                        </span>

                                        <PencilSquareIcon className="w-6 h-6 text-green-500" />
                                    </Link>

                                    { repository.relationships.hosting_repository && repository.relationships.hosting_repository.id && (
                                        <Link
                                            className="flex items-center justify-center space-x-4 bg-zinc-800 px-4 py-2 rounded-md border border-transparent hover:border-orange-500"
                                            href={route("hosting-repository.vps-connect", repository.relationships.hosting_repository.id)}
                                        >
                                            <span className="text-gray-200">
                                                Hosting
                                            </span>

                                            <CommandLineIcon className="size-6 text-orange-500" />
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </header>
                }
            >
                <Head title={repository.name + " - Show"} />

                <div className="py-12">
                    <div className="max-w-[100rem] mx-auto sm:px-6 lg:px-8">

                        <div className="w-9/12 mx-auto">
                            <RepositorySettingForApi repository={repository}/>
                        </div>

                        <div className="grid grid-cols-5 gap-x-8 relative">

                            {/* Last commit */}
                            <div className="grid rounded-xl overflow-hidden bg-zinc-900 pb-5">
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
                                        {new Date( repository.last_commit_at).toLocaleDateString("cs-CZ", {
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
                                onClick={handleShowRepositoryRelation("databases")}
                                className={
                                    "grid rounded-xl overflow-hidden bg-zinc-900 pb-5 border-2 hover:border-sky-500 cursor-pointer" +
                                    (showRelationship === "databases"
                                        ? " border-sky-500"
                                        : " border-transparent")
                                }
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
                                        { repository.relationships.database_backups_count }
                                    </span>

                                    <span className="text-gray-400 text-xs">
                                        Databáze
                                    </span>
                                </div>
                            </div>

                            {/* Clients */}
                            <div
                                onClick={handleShowRepositoryRelation("clients")}
                                className={
                                    "grid rounded-xl overflow-hidden bg-zinc-900 pb-5 border-2 hover:border-sky-500 cursor-pointer" +
                                    (showRelationship === "clients"
                                        ? " border-sky-500"
                                        : " border-transparent")
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

                            {/* Notifications */}
                            <div
                                onClick={handleShowRepositoryRelation("notifications")}
                                className={
                                    "grid rounded-xl overflow-hidden bg-zinc-900 pb-5 border-2 hover:border-sky-500 cursor-pointer" +
                                    (showRelationship === "notifications"
                                        ? " border-sky-500"
                                        : " border-transparent")
                                }
                            >
                                <div className="flex justify-center overflow-hidden">
                                    <div className="relative w-72 bg-zinc-700 h-8 flex items-center justify-center">
                                        <span className="absolute -left-10 bg-zinc-900 w-20 h-10 px-6 skew-x-[40deg]" />

                                        <span className="text-zinc-100 text-xl font-bold tracking-wider">
                                            Notifikace
                                        </span>

                                        <span className="absolute -right-10 bg-zinc-900 w-20 h-10 px-6 skew-x-[-40deg]" />
                                    </div>
                                </div>

                                <ServerIcon className="w-14 h-28 stroke-1 m-auto text-sky-500" />

                                <div className="text-center space-x-4">
                                    <span className="text-gray-200 font-bold text-xl">
                                        {repository.relationships.notifications.length}
                                    </span>

                                    <span className="text-gray-400 text-xs">
                                        notifikací
                                    </span>
                                </div>

                            </div>

                            {/* Hosting */}
                            <div
                                onClick={handleShowRepositoryRelation("hosting")}
                                className={
                                    "grid rounded-xl overflow-hidden bg-zinc-900 pb-5 border-2 hover:border-sky-500 cursor-pointer" +
                                    (showRelationship === "hosting"
                                        ? " border-sky-500"
                                        : " border-transparent")
                                }
                            >
                                <div className="flex justify-center overflow-hidden">
                                    <div className="relative w-72 bg-zinc-700 h-8 flex items-center justify-center">
                                        <span className="absolute -left-10 bg-zinc-900 w-20 h-10 px-6 skew-x-[40deg]" />

                                        <span className="text-zinc-100 text-xl font-bold tracking-wider">
                                            Hosting
                                        </span>

                                        <span className="absolute -right-10 bg-zinc-900 w-20 h-10 px-6 skew-x-[-40deg]" />
                                    </div>
                                </div>

                                <ServerIcon className="w-14 h-28 stroke-1 m-auto text-sky-500" />

                                <div className="text-center space-x-4 flex items-center justify-center ">
                                    {repository.relationships.hosting ? (
                                        <span className="bg-green-500 animate-pulse p-3 rounded-full" />
                                    ) : (
                                        <span className="bg-red-500 animate-pulse p-3 rounded-full" />
                                    )}
                                </div>
                            </div>
                        </div>

                        <div>
                            {showRelationship === "databases" ? (
                                <RepositoryDatabaseTable
                                    repository={repository}
                                    database_backups={database_backups}
                                />
                            ) : showRelationship === "clients" ? (
                                <RepositoryClientsTable clients={clients} />
                            ) : showRelationship === "notifications" ? (
                                <RepositoryNotificationsTable notifications={repository.relationships.notifications} />
                            ) : showRelationship === "hosting" && repository.relationships.hosting && (
                                <RepositoryHostingTable hosting={repository.relationships.hosting}/>
                            )}
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </section>
    );
}
