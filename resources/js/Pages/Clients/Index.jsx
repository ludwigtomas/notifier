import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import {
    PencilSquareIcon,
    TrashIcon,
    EyeIcon,
    PlusIcon,
    CheckIcon,
    XMarkIcon,
    ChevronRightIcon,
    LinkIcon,
    ArchiveBoxArrowDownIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import Modal from "@/Components/Modal";
import DangerButton from "@/Components/DangerButton";
import TextInput from "@/Components/TextInput";
import SecondaryButton from "@/Components/SecondaryButton";
import Pagination from "@/Components/Pagination";
import debounce from 'lodash/debounce';
import Dropdown from "@/Components/Dropdown";

export default function Index({ auth, clients, filters }) {
    const [toggleDeleteModal, setToggleDeleteModal] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const [search, setSearch] = useState(filters.search ?? "");

    // catch client into variable
    const toggleModal = (client) => {
        setSelectedClient(client);

        setToggleDeleteModal(true);
    };

    const closeModal = () => {
        setToggleDeleteModal(false);
    };

    const deleteClient = () => {
        let url = route("clients.destroy", selectedClient.id);

        router.delete(url, {
            preserveScroll: true,
            onSuccess: () => closeModal(),
        })
    }

    const debouncedSearch = debounce((value) => {

        setSearch(value);

        router.get(route("clients.index"),{
                search: value,
            },
            {
                preserveScroll: true,
                preserveState: true,
            }
        );
    }, 500);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <header className="flex items-center justify-start flex-row space-x-4 text-zinc-500">
                    <Link
                        className="font-semibold text-lg leading-tight hover:text-sky-500 slower-animation"
                        href={route('dashboard.index')}
                    >
                        Dashboard
                    </Link>

                    <span>
                        <ChevronRightIcon className="size-5"/>
                    </span>

                    <Link
                        className="font-semibold text-lg leading-tight text-sky-500"
                        href={route('clients.index')}
                    >
                        Klienti
                    </Link>

                </header>
            }
        >
            <Head title="Clients" />

            <div className="py-12">
                <div className="max-w-[100rem] mx-auto sm:px-6 lg:px-8">

                    <div className="mb-2">
                        <TextInput
                            label="Hledat"
                            name="search"
                            placeholder="Hledat klienta"
                            type="text"
                            className="w-72"
                            onChange={(e) => debouncedSearch(e.target.value)}
                        />
                    </div>

                    <div className="bg-zinc-900 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="border-4 border-zinc-900 divide-y divide-zinc-800 ">
                            <table className="min-w-full divide-y divide-zinc-700 rounded-md overflow-hidden">
                                <thead className="bg-zinc-950">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400"
                                        >
                                            Klient
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-12 py-3.5 text-sm font-normal text-left text-zinc-400"
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
                                            Repozitáře
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400"
                                        >
                                            Repozitáře
                                        </th>

                                        <th
                                            scope="col"
                                            className="relative py-3.5 px-4"
                                        >
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-zinc-700 bg-zinc-900">
                                    {clients.data.map((client) => (
                                        <tr
                                            key={client.id}
                                            className="group hover:bg-zinc-800"
                                        >
                                            <td className="px-4 py-4 ">
                                                <span className="text-sm font-medium text-zinc-400">
                                                    {client.name}
                                                </span>
                                            </td>
                                            <td className="px-12 py-4 text-sm font-medium text-zinc-400">
                                                {client.email ?? <XMarkIcon className="size-6 text-red-500"/>}
                                            </td>

                                            <td className="px-4 py-4 text-sm text-zinc-300 whitespace-nowrap">
                                                {client.phone ?? <XMarkIcon className="size-6 text-red-500"/>}
                                            </td>

                                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                <div className="flex items-center gap-x-2 ">
                                                    {client.relationships.repositories.slice(0,2).map((repository) => (
                                                        <p
                                                            key={repository.id}
                                                            className="px-3 py-1 text-xs text-zinc-400 rounded-full bg-zinc-800 group-hover:bg-zinc-900 faster-animation"
                                                        >
                                                            {repository.name}
                                                        </p>
                                                    ))}

                                                    <span className="px-3 py-1 text-xs text-zinc-400 rounded-full bg-zinc-800 group-hover:bg-zinc-700 faster-animation">
                                                        { client.relationships.repositories.length > 2 ? (
                                                                <span>
                                                                    + {" "} {client.relationships.repositories.length - 2}
                                                                </span>
                                                            ):(
                                                                <span>
                                                                    <XMarkIcon className="size-6 text-zinc-600 group-hover:text-zinc-900 faster-animation"/>
                                                                </span>
                                                            )
                                                        }
                                                    </span>
                                                </div>
                                            </td>

                                            <td className="px-4 py-4 text-sm text-zinc-300 whitespace-nowrap">
                                                <span className="px-3 py-1 text-xs text-zinc-400 rounded-full bg-zinc-800 group-hover:bg-zinc-700 faster-animation">
                                                    {client.relationships.repositories
                                                        ? client.relationships.repositories.length
                                                        : <XMarkIcon className="size-6 text-red-500"/>
                                                    }
                                                </span>
                                            </td>

                                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                <div className="flex items-center space-x-2">
                                                    <Link
                                                        href={route("clients.edit", client.id)}
                                                        className="bg-zinc-800 group-hover:bg-zinc-900 p-1 rounded-lg border border-transparent hover:border-green-500 faster-animation"
                                                    >
                                                        <PencilSquareIcon className="size-6 text-green-500" />
                                                    </Link>

                                                    {/* <Link
                                                        href={route("clients.show",client.id)}
                                                        className="bg-zinc-800 group-hover:bg-zinc-900 p-1 rounded-lg border border-transparent hover:border-sky-500 faster-animation"
                                                    >
                                                        <EyeIcon className="size-6 text-sky-500" />
                                                    </Link> */}

                                                    <Link
                                                        as="button"
                                                        method="delete"
                                                        preserveScroll
                                                        href={route("clients.destroy", client.id)}
                                                        className="bg-zinc-800 group-hover:bg-zinc-900 p-1 rounded-lg border border-transparent hover:border-red-500 faster-animation"
                                                    >
                                                        <TrashIcon className="size-6 text-red-500" />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Another options */}
            <div className="fixed right-10 bottom-10">
                <Dropdown>
                    <Dropdown.Trigger>
                        <div className="flex items-center space-x-2">
                            <div className="group inline-flex rounded-xl bg-sky-500 ">
                                <button
                                    type="button"
                                    className="px-6 py-3 rounded-md focus:outline-none"
                                >
                                    <span className="leading-4 font-medium text-white text-lg group-hover:text-sky-100 transition ease-in-out duration-150">
                                        Další možnosti
                                    </span>
                                </button>
                            </div>
                        </div>
                    </Dropdown.Trigger>

                    <Dropdown.Content direction="up">
                        <h3 className="text-center text-white font-bold uppercase py-2 mb-2 border-b border-zinc-800">
                            Možnosti
                        </h3>

                        <Dropdown.Link
                            href={route('clients.create')}
                            className="flex items-center justify-center py-2 text-center text-sm leading-5 text-zinc-400 focus:outline-none focus:bg-zinc-600 transition duration-150 ease-in-out hover:bg-zinc-800 border-l-4 border-transparent hover:border-sky-500 hover:text-sky-500"
                        >
                            <code className="p-1 w-full">Vytvořit klienta</code>
                        </Dropdown.Link>
                    </Dropdown.Content>
                </Dropdown>
            </div>

        </AuthenticatedLayout>
    );
}
