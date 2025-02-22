import { PencilSquareIcon, TrashIcon, EyeIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, router } from '@inertiajs/react'
import Modal from '@/Components/Modal'
import DangerButton from '@/Components/DangerButton'
import SecondaryButton from '@/Components/SecondaryButton'
import { useState } from 'react'
import Pagination from '@/Components/Pagination'

export default function ClientsTable({ clients }) {
    const [toggleDeleteModal, setToggleDeleteModal] = useState(false)
    const [selectedClient, setSelectedClient] = useState(null)

    const toggleModal = (client) => {
        setSelectedClient(client)

        setToggleDeleteModal(true)
    }

    const closeModal = () => {
        setToggleDeleteModal(false)
    }

    const deleteClient = () => {
        let url = route('clients.destroy', selectedClient.id)

        router.delete(url, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                setToggleDeleteModal(false)
            },
        })
    }

    return (
        <>
            <section className="card">
                <table className="min-w-full divide-y divide-zinc-700 overflow-hidden rounded-lg">
                    <thead className="text-nowrap bg-zinc-800">
                        <tr>
                            <th
                                scope="col"
                                className="px-4 py-3.5 text-left text-sm font-normal text-zinc-400"
                            >
                                #
                            </th>

                            <th
                                scope="col"
                                className="px-4 py-3.5 text-left text-sm font-normal text-zinc-400"
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
                                Repozitáře
                            </th>

                            <th
                                scope="col"
                                className="relative px-4 py-3.5"
                            >
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800 bg-zinc-700">
                        {clients.data.map((client) => {
                            return (
                                <tr
                                    key={client.id}
                                    className="group text-white transition-colors duration-200 hover:bg-zinc-800"
                                >
                                    <td className="px-4 py-4">
                                        <span className="text-sm font-medium text-zinc-400">{client.id}</span>
                                    </td>

                                    <td className="px-4 py-4">
                                        <span className="text-sm font-medium text-zinc-400">{client.name}</span>
                                    </td>

                                    <td className="px-12 py-4 text-sm font-medium text-zinc-400">
                                        {client.email ?? <XMarkIcon className="size-6 text-red-500" />}
                                    </td>

                                    <td className="whitespace-nowrap px-4 py-4 text-sm text-zinc-300">
                                        {client.phone ?? <XMarkIcon className="size-6 text-red-500" />}
                                    </td>

                                    <td className="whitespace-nowrap px-4 py-4 text-sm">
                                        <div className="flex items-center gap-x-2">
                                            {client.relationships.repositories.slice(0, 2).map((repository) => (
                                                <p
                                                    key={repository.repository_id}
                                                    className="faster-animation rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-400 group-hover:bg-zinc-900"
                                                >
                                                    {repository.name}
                                                </p>
                                            ))}

                                            <span className="faster-animation rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-400 group-hover:bg-zinc-700">
                                                {client.relationships.repositories.length > 2 ? (
                                                    <span>+ {client.relationships.repositories.length - 2}</span>
                                                ) : (
                                                    <span>
                                                        <XMarkIcon className="faster-animation size-6 text-zinc-600 group-hover:text-zinc-900" />
                                                    </span>
                                                )}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="whitespace-nowrap px-4 py-4 text-sm">
                                        <div className="flex items-center space-x-2">
                                            <Link
                                                href={route('clients.show', client.id)}
                                                className="faster-animation rounded-lg border border-transparent bg-zinc-800 p-1 hover:border-sky-500 group-hover:bg-zinc-900"
                                            >
                                                <EyeIcon className="size-6 text-sky-500" />
                                            </Link>

                                            <Link
                                                href={route('clients.edit', client.id)}
                                                className="faster-animation rounded-lg border border-transparent bg-zinc-800 p-1 hover:border-green-500 group-hover:bg-zinc-900"
                                            >
                                                <PencilSquareIcon className="size-6 text-green-500" />
                                            </Link>

                                            <button
                                                className="faster-animation rounded-lg border border-transparent bg-zinc-800 p-1 hover:border-red-500 group-hover:bg-zinc-900"
                                                onClick={() => toggleModal(client)}
                                            >
                                                <TrashIcon className="size-6 text-red-500" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <div className="mt-5">
                    <Pagination links={clients.meta} />
                </div>
            </section>

            <Modal
                maxWidth="md"
                show={toggleDeleteModal}
                onClose={closeModal}
                className="p-10"
            >
                {selectedClient && (
                    <div className="flex flex-col space-y-4 p-4">
                        <h2 className="text-center text-2xl font-medium text-gray-200">{selectedClient.name}</h2>

                        <p className="mt-1 text-center text-sm text-gray-400">Chystáš se smazat klienta. Opravdu chceš pokračovat?</p>

                        <div className="flex justify-center space-x-4">
                            <div>
                                <DangerButton
                                    type="submit"
                                    onClick={deleteClient}
                                >
                                    <TrashIcon className="mr-2 size-6" />

                                    {selectedClient.name}
                                </DangerButton>
                            </div>

                            <SecondaryButton onClick={closeModal}>Zavřít</SecondaryButton>
                        </div>
                    </div>
                )}
            </Modal>
        </>
    )
}
