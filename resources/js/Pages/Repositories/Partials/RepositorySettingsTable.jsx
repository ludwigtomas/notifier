import React from "react";
import { Link } from "@inertiajs/react";
import {
    PencilSquareIcon
} from "@heroicons/react/24/outline";
export default function RepositorySettingsTable({
    repository,
    settings,
}) {
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
                                Klíč
                            </th>

                            <th
                                scope="col"
                                className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400"
                            >
                                Hodnota
                            </th>

                            <th
                                scope="col"
                                className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400"
                            >
                                Is active
                            </th>

                            <th
                                scope="col"
                                className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400"
                            >
                                Last attempt at
                            </th>

                            <th
                                scope="col"
                                className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400"
                            >
                                Attemps
                            </th>

                            <th
                                scope="col"
                                className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400"
                            >
                                Was successful
                            </th>

                            <th scope="col" className="relative py-3.5 px-4">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-zinc-700 bg-zinc-900">
                        {settings && settings.map((client) => (
                            <tr key={client.id}>
                                <td className="px-4 py-4 whitespace-nowrap">
                                    <span className="text-sm text-zinc-400">
                                        {client.id}
                                    </span>
                                </td>

                                <td className="px-4 py-4 whitespace-nowrap">
                                    <span className="text-sm text-zinc-400">
                                        {client.key}
                                    </span>
                                </td>

                                <td className="px-4 py-4 whitespace-nowrap">
                                    <span className="text-sm text-zinc-400">
                                        {client.value}
                                    </span>
                                </td>

                                <td className="px-4 py-4 whitespace-nowrap">
                                    <span className="text-sm text-zinc-400">
                                        {client.is_active ? "Ano" : "Ne"}
                                    </span>
                                </td>

                                <td className="px-4 py-4 whitespace-nowrap">
                                    <span className="text-sm text-zinc-400">
                                        {client.last_attempt_at}
                                    </span>
                                </td>

                                <td className="px-4 py-4 whitespace-nowrap">
                                    <span className="text-sm text-zinc-400">
                                        {client.attemps ?? 0}
                                    </span>
                                </td>

                                <td className="px-4 py-4 whitespace-nowrap">
                                    <span className="text-sm text-zinc-400">
                                        {client.was_successful ? "Ano" : "Ne"}
                                    </span>
                                </td>

                                <td className="px-4 py-4">
                                    <div className="flex justify-center space-x-2">
                                        <Link
                                            href={route("repository-settings.edit", {
                                                repository: repository.repository_id,
                                                repository_setting: client.id,
                                            })}
                                            className="group bg-zinc-800 group-hover:bg-zinc-900 p-1 rounded-lg border border-transparent hover:border-green-500 faster-animation"
                                        >
                                            <PencilSquareIcon className="size-6 text-green-500" />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
