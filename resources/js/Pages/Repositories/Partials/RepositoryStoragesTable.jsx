import { TrashIcon, ArrowDownTrayIcon, BackspaceIcon, ArrowPathIcon } from '@heroicons/react/24/outline'
import { Head, Link, router } from '@inertiajs/react'
import Dropdown from '@/Components/Dropdown'
import Modal from '@/Components/Modal'
import DangerButton from '@/Components/DangerButton'
import SecondaryButton from '@/Components/SecondaryButton'
import { useState } from 'react'

export default function RepositoryStoragesTable({ repository, backups }) {
    const [selectedDatabases, setSelectedDatabases] = useState([])
    const [selectedDatabase, setSelectedDatabase] = useState(null)
    const [toggleDeleteModal, setToggleDeleteModal] = useState(false)
    const [toggleBulkDeleteModal, setToggleBulkDeleteModal] = useState(false)

    const toggleModal = (database) => {
        setSelectedDatabase(database)

        setToggleDeleteModal(true)
    }

    const closeModal = () => {
        setToggleDeleteModal(false)
        setToggleBulkDeleteModal(false)
        setSelectedDatabase(null)
    }

    const deleteStorage = () => {
        let url = route('repository-files.destroy', {
            repository_files: [selectedDatabase.id],
        })

        router.delete(url, {
            preserveScroll: true,
            onSuccess: () => closeModal(),
        })
    }

    const bulkDeleteRepositories = () => {
        let url = route('repository-files.destroy', {
            repository_files: selectedDatabases,
        })

        router.delete(url, {
            preserveScroll: true,
            onSuccess: () => {
                closeModal()
                setSelectedDatabases([])
            },
        })
    }

    const getNewStorage = () => {
        if (!repository.website_url) {
            return
        }

        let url = repository.website_url + 'api/backup'

        // send axios get with params
        axios
            .get(url + '?param=backup_storage')
            .then((response) => {
                console.log(response)
                if (response.status === 200) {
                    router.visit(route('repositories.show', repository.repository_id), {
                        only: ['repository_storages'],
                        preserveScroll: true,
                        preserveState: true,
                    })
                }
            })
            .catch((error) => {
                alert(error)
            })
            .finally(() => {
                console.log('finally')
            })
    }

    return (
        <>
            <div className="mb-5 mt-10 grid grid-cols-12 gap-2">
                <div className="col-span-1 flex items-center justify-center rounded-xl bg-sky-500 text-center">
                    <Link
                        className="flex h-full w-full items-center justify-center p-2"
                        href={route('repositories.show', repository.repository_id)}
                        only={['repository_storages']}
                        preserveScroll
                        preserveState
                    >
                        <ArrowPathIcon className="size-6 text-white" />
                    </Link>
                </div>

                <div className="col-span-11 rounded-xl bg-sky-500">
                    <button
                        className="w-full space-x-2 p-2 text-center text-2xl font-bold text-white"
                        onClick={() => getNewStorage()}
                    >
                        Get new <u>Storage</u> backup
                    </button>
                </div>
            </div>

            <div className="mb-5 mt-10 divide-y divide-zinc-800 rounded-lg border-4 border-zinc-900">
                {selectedDatabases.length > 0 && (
                    <div className="fixed bottom-10 right-10">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <div className="flex items-center space-x-2">
                                    <div className="rounded-xl bg-zinc-900 px-5 py-3 text-white">{selectedDatabases.length}</div>
                                    <div className="group inline-flex rounded-xl bg-sky-500">
                                        <button
                                            type="button"
                                            className="rounded-md px-6 py-3 focus:outline-none"
                                        >
                                            <span className="text-lg font-medium leading-4 text-white transition duration-150 ease-in-out group-hover:text-sky-100">
                                                Vybráno
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </Dropdown.Trigger>

                            <Dropdown.Content direction="up">
                                <button
                                    className="flex w-full items-center border-l-4 border-transparent px-4 py-2 text-start text-sm leading-5 text-zinc-400 transition duration-150 ease-in-out hover:border-red-500 hover:bg-zinc-800 hover:text-red-500 focus:bg-gray-100 focus:outline-none"
                                    onClick={() => setToggleBulkDeleteModal(true)}
                                >
                                    <span className="mr-2">
                                        <TrashIcon className="h-6 w-6" />
                                    </span>
                                    Smazat
                                </button>

                                <a
                                    className="flex w-full items-center border-l-4 border-transparent px-4 py-2 text-start text-sm leading-5 text-zinc-400 transition duration-150 ease-in-out hover:border-green-500 hover:bg-zinc-800 hover:text-green-500 focus:bg-gray-100 focus:outline-none"
                                    href={route('repository-files.download', {
                                        repository_file: selectedDatabases,
                                    })}
                                >
                                    <span className="mr-2">
                                        <ArrowDownTrayIcon className="h-6 w-6" />
                                    </span>
                                    Stáhnout
                                </a>

                                <button
                                    className="flex w-full items-center border-l-4 border-transparent px-4 py-2 text-start text-sm leading-5 text-zinc-500 transition duration-150 ease-in-out hover:border-blue-500 hover:text-blue-500 focus:bg-gray-100 focus:outline-none"
                                    onClick={() => setSelectedDatabases([])}
                                >
                                    <span className="mr-2">
                                        <BackspaceIcon className="h-6 w-6" />
                                    </span>
                                    Odznačit vše
                                </button>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                )}

                <table className="min-w-full divide-y divide-zinc-700 overflow-hidden rounded-md">
                    <thead className="bg-zinc-950">
                        <tr>
                            <th
                                scope="col"
                                className="px-4 py-3.5 text-left text-sm font-normal text-zinc-400"
                            >
                                Bulk actions
                            </th>

                            <th
                                scope="col"
                                className="px-12 py-3.5 text-left text-sm font-normal text-zinc-400"
                            >
                                Název
                            </th>

                            <th
                                scope="col"
                                className="px-4 py-3.5 text-left text-sm font-normal text-zinc-400"
                            >
                                Velikost
                            </th>

                            <th
                                scope="col"
                                className="px-4 py-3.5 text-left text-sm font-normal text-zinc-400"
                            >
                                Cesta
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
                        {backups &&
                            backups.data.map((database) => (
                                <tr
                                    key={database.id}
                                    className="group hover:bg-zinc-800"
                                >
                                    <td className="px-4 py-4">
                                        <input
                                            type="checkbox"
                                            className="rounded-md p-3"
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSelectedDatabases([...selectedDatabases, database.id])
                                                } else {
                                                    setSelectedDatabases(selectedDatabases.filter((id) => id !== database.id))
                                                }
                                            }}
                                        />
                                    </td>

                                    <td className="px-4 py-4">
                                        <span className="text-sm font-medium text-zinc-400">{database.name}</span>
                                    </td>

                                    <td className="px-4 py-4">
                                        <span className="text-sm font-medium text-zinc-400">{database.size} KB</span>
                                    </td>

                                    <td className="px-4 py-4">
                                        <span className="text-sm font-medium text-zinc-400">{database.path}</span>
                                    </td>

                                    <td className="px-4 py-4">
                                        <span className="text-sm font-medium text-zinc-400">{database.created_at_human}</span>
                                    </td>

                                    <td className="whitespace-nowrap px-4 py-4 text-sm">
                                        <div className="flex items-center space-x-2">
                                            <a
                                                className="faster-animation rounded-lg border border-transparent bg-zinc-800 p-1 hover:border-green-500 group-hover:bg-zinc-900"
                                                href={route('repository-files.download', {
                                                    repository_file: [database.id],
                                                })}
                                            >
                                                <ArrowDownTrayIcon className="h-6 w-6 text-green-500" />
                                            </a>

                                            <button
                                                className="faster-animation rounded-lg border border-transparent bg-zinc-800 p-1 hover:border-red-500 group-hover:bg-zinc-900"
                                                onClick={() => toggleModal(database)}
                                            >
                                                <TrashIcon className="h-6 w-6 text-red-500" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            {/* <Pagination links={backups.meta} /> */}

            {/* toggleDeleteModal */}
            <Modal
                maxWidth="md"
                show={toggleDeleteModal}
                onClose={closeModal}
                className="p-10"
            >
                {selectedDatabase && (
                    <div className="flex flex-col space-y-4 p-4">
                        <h2 className="text-center text-2xl font-medium text-gray-200">Smazat databázi</h2>

                        <p className="mt-1 text-center text-sm text-gray-400">Chystáš se smazat databázi. Tato akce je nevratná.</p>

                        <div className="flex justify-center space-x-4">
                            <SecondaryButton onClick={closeModal}>Zavřít</SecondaryButton>

                            <DangerButton
                                type="submit"
                                onClick={deleteStorage}
                                zIndex={999}
                            >
                                <TrashIcon className="mr-2 h-6 w-6" />

                                {selectedDatabase.name}
                            </DangerButton>
                        </div>
                    </div>
                )}
            </Modal>

            <Modal
                maxWidth="md"
                show={toggleBulkDeleteModal}
                onClose={closeModal}
                className="p-10"
            >
                <div className="flex flex-col space-y-4 p-4">
                    <h2 className="text-center text-2xl font-medium text-gray-200">Smazat vybrané databáze</h2>

                    <div className="my-4 space-y-0.5 text-center">
                        <p className="text-sm text-gray-400">Chystáš se smazat vybrané databáze. Tato akce je nevratná.</p>

                        <p className="text-sm text-gray-400">
                            Celkem se smaže <span className="mx-1 text-lg font-bold">{selectedDatabases.length}</span> databází.
                        </p>
                    </div>

                    <div className="flex justify-center space-x-4">
                        <SecondaryButton onClick={closeModal}>Zavřít</SecondaryButton>

                        <DangerButton
                            type="submit"
                            onClick={bulkDeleteRepositories}
                        >
                            <TrashIcon className="mr-2 h-6 w-6" />
                            Smazat
                        </DangerButton>
                    </div>
                </div>
            </Modal>
        </>
    )
}
