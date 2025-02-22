import AdminLayout from '@/Layouts/AdminLayout'
import { Head, Link, router } from '@inertiajs/react'
import {
    PencilSquareIcon,
    TrashIcon,
    EyeIcon,
    PlusIcon,
    CheckIcon,
    XMarkIcon,
    ChevronRightIcon,
    LinkIcon,
    ServerStackIcon,
    ArchiveBoxArrowDownIcon,
} from '@heroicons/react/24/outline'
import { useState } from 'react'
import Modal from '@/Components/Modal'
import DangerButton from '@/Components/DangerButton'
import TextInput from '@/Components/TextInput'
import InputLabel from '@/Components/InputLabel'
import SecondaryButton from '@/Components/SecondaryButton'
import Pagination from '@/Components/Pagination'
import debounce from 'lodash/debounce'
import Dropdown from '@/Components/Dropdown'
import ResetFilters from '@/Components/ResetFilters'

export default function Index({ auth, workers, filters }) {
    const [toggleDeleteModal, setToggleDeleteModal] = useState(false)
    const [selectedClient, setSelectedClient] = useState(null)
    const [search, setSearch] = useState(filters.search ?? '')

    // catch client into variable
    const toggleModal = (client) => {
        setSelectedClient(client)

        setToggleDeleteModal(true)
    }

    const closeModal = () => {
        setToggleDeleteModal(false)
    }

    const deleteHosting = () => {
        let url = route('workers.destroy', selectedClient.id)

        router.delete(url, {
            preserveScroll: true,
            onSuccess: () => closeModal(),
        })
    }

    const debouncedSearch = debounce((value) => {
        router.get(
            route('workers.index'),
            {
                search: value,
            },
            {
                preserveScroll: true,
                preserveState: true,
            }
        )
    }, 100)

    return (
        <AdminLayout
            user={auth.user}
            header={
                <header className="flex flex-row items-center justify-start space-x-4 text-zinc-500">
                    <Link
                        className="slower-animation text-lg font-semibold leading-tight hover:text-sky-500"
                        href={route('dashboard.index')}
                    >
                        Dashboard
                    </Link>

                    <span>
                        <ChevronRightIcon className="size-5" />
                    </span>

                    <Link
                        className="text-lg font-semibold leading-tight text-sky-500"
                        href={route('workers.index')}
                    >
                        Workers
                    </Link>
                </header>
            }
        >
            <Head title="Workers" />

            <div className="mx-auto max-w-[100rem] sm:px-6 lg:px-8">
                <div className="grid grid-cols-1">
                    <section className="card mb-10">
                        <div className="grid grid-cols-5 items-center gap-2">
                            <div>
                                <InputLabel
                                    className="mb-1"
                                    htmlFor="search"
                                    value="Vyhledat"
                                />

                                <TextInput
                                    label="Hledat"
                                    name="search"
                                    placeholder="Vyhledat hosting ..."
                                    type="text"
                                    className="w-full !border-zinc-600"
                                    onChange={(e) => debouncedSearch(e.target.value)}
                                />
                            </div>
                        </div>
                    </section>

                    <section className="card">
                        <div className="flex space-x-4">
                            <div className="flex items-center justify-center">
                                <Link
                                    href={route('hostings.index')}
                                    className="faster-animation rounded-md border border-zinc-700 bg-zinc-800 p-2 hover:border-zinc-600"
                                >
                                    <ServerStackIcon className="size-10 text-sky-500" />
                                </Link>
                            </div>

                            <div>
                                <h1 className="text-2xl font-semibold capitalize lg:text-3xl dark:text-white">Workers</h1>

                                <p className="text-zinc-400">Seznam všech workers.</p>
                            </div>
                        </div>
                    </section>

                    <main className="mt-2">
                        {workers && workers.length >= 1 ? (
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

                                            {/* <th
                                                scope="col"
                                                className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400"
                                            >
                                                Počet projektů
                                            </th> */}

                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-left text-sm font-normal text-zinc-400"
                                            >
                                                <span className="sr-only">Edit</span>
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-zinc-800 bg-zinc-700">
                                        {workers.map((worker) => {
                                            return (
                                                <tr
                                                    key={worker.id}
                                                    className="group text-sm text-zinc-400 hover:bg-zinc-800"
                                                >
                                                    <td className="px-4 py-3.5">{worker.id}</td>

                                                    <td className="px-4 py-3.5">{worker.name}</td>

                                                    <td className="px-4 py-3.5">
                                                        <div className="flex">
                                                            {/* {worker.url ? (
                                                                <a
                                                                    className="bg-green-950 p-2 rounded-xl"
                                                                    href={
                                                                        worker.url
                                                                    }
                                                                    target="_blank"
                                                                >
                                                                    <LinkIcon className="text-green-500 w-6 h-6" />
                                                                </a>
                                                            ) : (
                                                                <div className="bg-red-950 p-2 rounded-xl">
                                                                    <XMarkIcon className="text-red-500 w-6 h-6" />
                                                                </div>
                                                            )} */}
                                                            {worker.url}
                                                        </div>
                                                    </td>

                                                    {/* <td className="px-4 py-3.5">
                                                        <div className="flex">
                                                            <span className="text-center p-2 size-8 rounded-xl bg-zinc-800 group-hover:bg-zinc-900 faster-animation">
                                                                {
                                                                    worker
                                                                        .relationships
                                                                        .repositories_count
                                                                }
                                                            </span>
                                                        </div>
                                                    </td> */}

                                                    <td className="px-4 py-3.5">
                                                        <div className="flex items-center space-x-2">
                                                            <Link
                                                                href={route('workers.edit', worker.id)}
                                                                className="faster-animation rounded-lg border border-transparent bg-zinc-800 p-1 hover:border-green-500 group-hover:bg-zinc-900"
                                                            >
                                                                <PencilSquareIcon className="size-6 text-green-500" />
                                                            </Link>

                                                            <button
                                                                onClick={() => toggleModal(worker)}
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
                            </section>
                        ) : (
                            <ResetFilters href={route('workers.index')}>Nebyly nalezeny žádné workers.</ResetFilters>
                        )}
                    </main>
                </div>
            </div>

            {/* Another options */}
            <div className="fixed bottom-10 right-10">
                <Dropdown width="72">
                    <Dropdown.Trigger>
                        <div className="flex items-center space-x-2">
                            <div className="group inline-flex rounded-xl bg-sky-500">
                                <button
                                    type="button"
                                    className="rounded-md px-6 py-3 focus:outline-none"
                                >
                                    <span className="text-lg font-medium leading-4 text-white transition duration-150 ease-in-out group-hover:text-sky-100">
                                        Další možnosti
                                    </span>
                                </button>
                            </div>
                        </div>
                    </Dropdown.Trigger>

                    <Dropdown.Content
                        direction="up"
                        width="64"
                    >
                        <h3 className="mb-2 border-b border-zinc-800 py-2 text-center font-bold uppercase text-white">Možnosti</h3>

                        <Dropdown.Link
                            href={route('workers.create')}
                            className="flex items-center justify-center border-l-4 border-transparent py-2 text-center text-sm leading-5 text-zinc-400 transition duration-150 ease-in-out hover:border-sky-500 hover:bg-zinc-800 hover:text-sky-500 focus:bg-zinc-600 focus:outline-none"
                        >
                            <code className="w-full p-1">Vytvořit workera</code>
                        </Dropdown.Link>
                    </Dropdown.Content>
                </Dropdown>
            </div>
        </AdminLayout>
    )
}
