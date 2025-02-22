import { PencilSquareIcon, TrashIcon, EyeIcon, XMarkIcon, LinkIcon } from '@heroicons/react/24/outline'
import { Link, router } from '@inertiajs/react'
import Modal from '@/Components/Modal'
import DangerButton from '@/Components/DangerButton'
import SecondaryButton from '@/Components/SecondaryButton'
import { useState } from 'react'
import Pagination from '@/Components/Pagination'

export default function HostingsTable({ hostings }) {
    const [toggleDeleteModal, setToggleDeleteModal] = useState(false)
    const [selectedHosting, setSelectedHosting] = useState(null)

    const toggleModal = (client) => {
        setSelectedHosting(client)

        setToggleDeleteModal(true)
    }

    const closeModal = () => {
        setToggleDeleteModal(false)
    }

    const deleteHosting = () => {
        let url = route('hostings.destroy', selectedHosting.id)

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
                                Název
                            </th>

                            <th
                                scope="col"
                                className="px-4 py-3.5 text-left text-sm font-normal text-zinc-400"
                            >
                                URL
                            </th>

                            <th
                                scope="col"
                                className="px-4 py-3.5 text-left text-sm font-normal text-zinc-400"
                            >
                                Počet projektů
                            </th>

                            <th
                                scope="col"
                                className="px-4 py-3.5 text-left text-sm font-normal text-zinc-400"
                            >
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800 bg-zinc-700">
                        {hostings.data.map((hosting) => {
                            return (
                                <tr
                                    key={hosting.id}
                                    className="group text-sm text-zinc-400 hover:bg-zinc-800"
                                >
                                    <td className="px-4 py-3.5">{hosting.id}</td>

                                    <td className="px-4 py-3.5">{hosting.name}</td>

                                    <td className="px-4 py-3.5">
                                        <div className="flex">
                                            {hosting.hosting_url ? (
                                                <a
                                                    className="rounded-xl bg-green-950 p-2"
                                                    href={hosting.hosting_url}
                                                    target="_blank"
                                                >
                                                    <LinkIcon className="h-6 w-6 text-green-500" />
                                                </a>
                                            ) : (
                                                <div className="rounded-xl bg-red-950 p-2">
                                                    <XMarkIcon className="h-6 w-6 text-red-500" />
                                                </div>
                                            )}
                                        </div>
                                    </td>

                                    <td className="px-4 py-3.5">
                                        <div className="flex items-center">
                                            <span className="faster-animation flex size-8 items-center justify-center rounded-xl bg-zinc-800 p-2 group-hover:bg-zinc-900">
                                                {hosting.relationships.repositories_count}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="px-4 py-3.5">
                                        <div className="flex items-center space-x-2">
                                            <Link
                                                href={route('hostings.edit', hosting.id)}
                                                className="faster-animation rounded-lg border border-transparent bg-zinc-800 p-1 hover:border-green-500 group-hover:bg-zinc-900"
                                            >
                                                <PencilSquareIcon className="size-6 text-green-500" />
                                            </Link>

                                            <button
                                                onClick={() => toggleModal(hosting)}
                                                className="faster-animation rounded-lg border border-transparent bg-zinc-800 p-1 hover:border-red-500 group-hover:bg-zinc-900"
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
                    <Pagination links={hostings.meta} />
                </div>
            </section>

            <Modal
                maxWidth="md"
                show={toggleDeleteModal}
                onClose={closeModal}
                className="p-10"
            >
                {selectedHosting && (
                    <div className="flex flex-col space-y-4 p-4">
                        <h2 className="text-center text-2xl font-medium text-gray-200">{selectedHosting.name}</h2>

                        <p className="mt-1 text-center text-sm text-gray-400">Chystáš se smazat klienta. Opravdu chceš pokračovat?</p>

                        <div className="flex justify-center space-x-4">
                            <div>
                                <DangerButton
                                    type="submit"
                                    onClick={deleteHosting}
                                >
                                    <TrashIcon className="mr-2 size-6" />

                                    {selectedHosting.name}
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
