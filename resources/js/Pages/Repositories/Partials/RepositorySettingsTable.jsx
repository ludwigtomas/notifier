import React from 'react'
import { Link } from '@inertiajs/react'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import Pagination from '@/Components/Pagination'

export default function RepositorySettingsTable({ repository, settings }) {
    return (
        <>
            <div className="mt-10 mb-5 divide-y divide-zinc-800 rounded-lg border-4 border-zinc-900">
                <table className="min-w-full divide-y divide-zinc-700 overflow-hidden rounded-md">
                    <thead className="bg-zinc-950">
                        <tr>
                            <th
                                scope="col"
                                className="px-4 py-3.5 text-left text-sm font-normal text-zinc-400"
                            >
                                #
                            </th>

                            <th
                                scope="col"
                                className="px-12 py-3.5 text-left text-sm font-normal text-zinc-400"
                            >
                                Klíč
                            </th>

                            <th
                                scope="col"
                                className="px-4 py-3.5 text-left text-sm font-normal text-zinc-400"
                            >
                                Hodnota
                            </th>

                            <th
                                scope="col"
                                className="px-4 py-3.5 text-left text-sm font-normal text-zinc-400"
                            >
                                Is active
                            </th>

                            <th
                                scope="col"
                                className="px-4 py-3.5 text-left text-sm font-normal text-zinc-400"
                            >
                                Last attempt at
                            </th>

                            <th
                                scope="col"
                                className="px-4 py-3.5 text-left text-sm font-normal text-zinc-400"
                            >
                                Attemps
                            </th>

                            <th
                                scope="col"
                                className="px-4 py-3.5 text-left text-sm font-normal text-zinc-400"
                            >
                                Was successful
                            </th>

                            <th
                                scope="col"
                                className="relative px-4 py-3.5"
                            >
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-zinc-700 bg-zinc-900">
                        {settings &&
                            settings.data.map((client) => (
                                <tr key={client.id}>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <span className="text-sm text-zinc-400">{client.id}</span>
                                    </td>

                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <span className="text-sm text-zinc-400">{client.key}</span>
                                    </td>

                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <span className="text-sm text-zinc-400">{client.value}</span>
                                    </td>

                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <span className="text-sm text-zinc-400">{client.is_active ? 'Ano' : 'Ne'}</span>
                                    </td>

                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <span className="text-sm text-zinc-400">{client.last_attempt_at}</span>
                                    </td>

                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <span className="text-sm text-zinc-400">{client.attemps ?? 0}</span>
                                    </td>

                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <span className="text-sm text-zinc-400">{client.was_successful ? 'Ano' : 'Ne'}</span>
                                    </td>

                                    <td className="px-4 py-4">
                                        <div className="flex justify-center space-x-2">
                                            <Link
                                                href={route('repository-settings.edit', {
                                                    repository: repository.repository_id,
                                                    repository_setting: client.id,
                                                })}
                                                className="faster-animation group rounded-lg border border-transparent bg-zinc-800 p-1 group-hover:bg-zinc-900 hover:border-green-500"
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

            {settings && settings.data.length !== 0 && <Pagination links={settings} />}
        </>
    )
}
