import { TrashIcon, ArrowDownTrayIcon,  BackspaceIcon } from "@heroicons/react/24/outline";
import { Head, Link } from "@inertiajs/react";
import { useState } from 'react';
import Dropdown from "@/Components/Dropdown";

export default function RepositoryDatabaseTable({ repository, database_backups }) {

    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    // bulk actions select databases
    const [selectedDatabases, setSelectedDatabases] = useState([]);

    return (
        <div className="mt-10 border-4 border-zinc-900 divide-y rounded-lg divide-zinc-800 ">

            {selectedDatabases.length > 0 &&
                (
                    <div className="fixed right-10 bottom-40">
                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            <div className="ms-3 relative ">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <div className="flex items-center space-x-2">
                                            <div className="py-3 px-5 rounded-xl bg-zinc-900 text-white">
                                                {selectedDatabases.length}
                                            </div>
                                            <div className="group inline-flex rounded-xl bg-sky-500 ">
                                                <button
                                                    type="button"
                                                    className="px-6 py-3 rounded-md focus:outline-none"
                                                >
                                                    <span className="leading-4 font-medium text-white text-lg group-hover:text-sky-100 transition ease-in-out duration-150">
                                                        Vybráno
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            className="border-l-4 border-transparent hover:border-red-500 hover:text-red-500"
                                            href={route("profile.edit")}
                                        >
                                            <span className="mr-2">
                                                <TrashIcon className="w-6 h-6" />
                                            </span>

                                            Smazat
                                        </Dropdown.Link>

                                        <Dropdown.Link
                                            className="border-l-4 border-transparent hover:border-green-500 hover:text-green-500"
                                            href={route("databases.bulk.download", {databases: selectedDatabases})}
                                        >
                                            <span className="mr-2">
                                                <ArrowDownTrayIcon className="w-6 h-6" />
                                            </span>

                                            Stáhnout
                                        </Dropdown.Link>

                                        <button
                                            className="border-l-4 border-transparent hover:border-blue-500 hover:text-blue-500 flex items-center w-full px-4 py-2 text-start text-sm leading-5 text-zinc-500 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                                            href={route("profile.edit")}
                                            onClick={() => setSelectedDatabases([])}
                                        >
                                            <span className="mr-2">
                                                <BackspaceIcon className="w-6 h-6" />
                                            </span>

                                            Odznačit vše
                                        </button>

                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                )
            }


            <table className="min-w-full divide-y divide-zinc-700 rounded-md overflow-hidden">
                <thead className="bg-zinc-950">
                    <tr>

                        <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400"
                        >
                            Bulk actions
                        </th>

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
                    {database_backups && database_backups.data.map((backup) =>
                        (
                            <tr
                                key={backup.id}
                                className="group hover:bg-zinc-800"
                            >
                                <td className="px-4 py-4">
                                    <input
                                        type="checkbox"
                                        className="rounded-md"
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedDatabases([...selectedDatabases, repository.id]);
                                            } else {
                                                setSelectedDatabases(selectedDatabases.filter((id) => id !== repository.id));
                                            }
                                        }}
                                    />
                                </td>

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
                                            href={ "/storage/" + backup.path + "/" + backup.name}
                                            className="bg-zinc-800 group-hover:bg-zinc-900 p-1 rounded-lg border border-transparent hover:border-green-500 faster-animation"
                                        >
                                            <ArrowDownTrayIcon className="w-6 h-6 text-green-500" />
                                        </a>

                                        <Link
                                            as="button"
                                            method="delete"
                                            preserveScroll
                                            href={route("databases.destroy", backup.id)}
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
    );
}
