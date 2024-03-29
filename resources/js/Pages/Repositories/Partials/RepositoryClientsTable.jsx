import React from "react";

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
    PlayPauseIcon,
} from "@heroicons/react/24/outline";
export default function RepositoryClientsTable({ clients }) {
    return (
        <>
            <div className="mt-10 border-4 border-zinc-900 divide-y rounded-lg divide-zinc-800 ">
                <table className="min-w-full divide-y divide-zinc-700 rounded-md overflow-hidden">
                    <thead className="bg-zinc-950">
                        <tr>
                            <th
                                scope="col"
                                className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400"
                            >
                                #
                            </th>

                            <th
                                scope="col"
                                className="px-12 py-3.5 text-sm font-normal text-left text-zinc-400"
                            >
                                Klient
                            </th>

                            <th
                                scope="col"
                                className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400"
                            >
                                Email
                            </th>

                            <th
                                scope="col"
                                className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400"
                            >
                                Telefon
                            </th>

                            <th
                                scope="col"
                                className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400"
                            >
                                IČO
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
                        {clients && clients.data.map((client) => (
                            <tr key={client.id}>
                                <td className="px-4 py-4 whitespace-nowrap">
                                    <span className="text-sm text-zinc-400">
                                        {client.id}
                                    </span>
                                </td>

                                <td className="px-4 py-4 whitespace-nowrap">
                                    <span className="text-sm text-zinc-400">
                                        {client.name}
                                    </span>
                                </td>

                                <td className="px-4 py-4 whitespace-nowrap">
                                    <span className="text-sm text-zinc-400">
                                        {client.client_email}
                                    </span>
                                </td>

                                <td className="px-4 py-4 whitespace-nowrap">
                                    <span className="text-sm text-zinc-400">
                                        {client.phone}
                                    </span>
                                </td>

                                <td className="px-4 py-4 whitespace-nowrap">
                                    <span className="text-sm text-zinc-400">
                                        {client.ico}
                                    </span>
                                </td>

                                <td className="px-4 py-4 whitespace-nowrap">
                                    <span className="text-sm text-zinc-400">
                                        {client.created_at_human}
                                    </span>
                                </td>

                                <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <Link
                                        href={route("clients.show", client.id)}
                                        className="text-sky-500 hover:text-sky-600"
                                    >
                                        <EyeIcon className="w-5 h-5" />
                                    </Link>
                                </td>
                            </tr>
                        ))}

                    </tbody>

                </table>
            </div>
        </>
    );
}
