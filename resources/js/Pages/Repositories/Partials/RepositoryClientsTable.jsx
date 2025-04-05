import React from 'react'
import { Link } from '@inertiajs/react'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import Pagination from '@/Components/Pagination'

export default function RepositoryClientsTable({ clients }) {
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
                                Klient
                            </th>

                            <th
                                scope="col"
                                className="px-4 py-3.5 text-left text-sm font-normal text-zinc-400"
                            >
                                Email
                            </th>

                            <th
                                scope="col"
                                className="px-4 py-3.5 text-left text-sm font-normal text-zinc-400"
                            >
                                Telefon
                            </th>

                            <th
                                scope="col"
                                className="px-4 py-3.5 text-left text-sm font-normal text-zinc-400"
                            >
                                IČO
                            </th>

                            <th
                                scope="col"
                                className="px-4 py-3.5 text-left text-sm font-normal text-zinc-400"
                            >
                                Vytvořeno
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
                        {clients &&
                            clients.data.map((client) => (
                                <tr key={client.id}>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <span className="text-sm text-zinc-400">{client.id}</span>
                                    </td>

                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <span className="text-sm text-zinc-400">{client.name}</span>
                                    </td>

                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <span className="text-sm text-zinc-400">{client.email}</span>
                                    </td>

                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <span className="text-sm text-zinc-400">{client.phone}</span>
                                    </td>

                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <span className="text-sm text-zinc-400">{client.ico}</span>
                                    </td>

                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <span className="text-sm text-zinc-400">{client.created_at_human}</span>
                                    </td>

                                    <td className="px-4 py-4 text-right text-sm font-medium whitespace-nowrap">
                                        <Link
                                            href={route('clients.show', client.id)}
                                            className="text-sky-500 hover:text-sky-600"
                                        >
                                            <PencilSquareIcon className="size-5" />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            {clients && clients.data.length !== 0 && <Pagination links={clients} />}
        </>
    )
}
