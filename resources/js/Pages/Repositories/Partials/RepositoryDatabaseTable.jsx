import { TrashIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { Head, Link } from "@inertiajs/react";

export default function RepositoryDatabaseTable({ repository }) {
    return (
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

                            <th scope="col" className="relative py-3.5 px-4">
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
    );
}
