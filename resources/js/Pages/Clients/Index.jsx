import AdminLayout from "@/Layouts/AdminLayout";
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
    UserGroupIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import Modal from "@/Components/Modal";
import DangerButton from "@/Components/DangerButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Pagination from "@/Components/Pagination";
import debounce from "lodash/debounce";
import Dropdown from "@/Components/Dropdown";
import ResetFilters from "@/Components/ResetFilters";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";

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
        });
    };

    const debouncedSearch = debounce((value) => {
        setSearch(value);

        router.get(
            route("clients.index"),
            {
                search: value,
            },
            {
                preserveScroll: true,
                preserveState: true,
            }
        );
    }, 500);

    return (
        <AdminLayout
            user={auth.user}
            header={
                <header className="flex items-center justify-start flex-row space-x-4 text-zinc-500">
                    <Link
                        className="font-semibold text-lg leading-tight hover:text-sky-500 slower-animation"
                        href={route("dashboard.index")}
                    >
                        Dashboard
                    </Link>

                    <span>
                        <ChevronRightIcon className="size-5" />
                    </span>

                    <Link
                        className="font-semibold text-lg leading-tight text-sky-500"
                        href={route("clients.index")}
                    >
                        Klienti
                    </Link>
                </header>
            }
        >
            <Head title="Clients" />

            <div className="max-w-[100rem] mx-auto sm:px-6 lg:px-8">
                <div className="grid grid-cols-1">
                    <section className="mb-10 card">
                        <div className="grid grid-cols-5 gap-2 items-center">
                            <div>
                                <InputLabel
                                    className="mb-1"
                                    htmlFor="search"
                                    value="Vyhledat"
                                />

                                <TextInput
                                    label="Hledat"
                                    name="search"
                                    placeholder="Vyhledat klienta ..."
                                    type="text"
                                    className="w-full !border-zinc-600 "
                                    onChange={(e) =>
                                        debouncedSearch(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </section>

                    <section className="card">
                        <div className="flex space-x-4">
                            <div className="flex items-center justify-center">
                                <Link
                                    href={route("clients.index")}
                                    className="p-2 rounded-md bg-zinc-800 border border-zinc-700 hover:border-zinc-600 faster-animation"
                                >
                                    <UserGroupIcon className="size-10 text-sky-500" />
                                </Link>
                            </div>

                            <div>
                                <h1 className="text-2xl font-semibold capitalize lg:text-3xl dark:text-white">
                                    Klienti
                                </h1>

                                <p className="text-zinc-400">
                                    Seznam všech klientů.
                                </p>
                            </div>
                        </div>
                    </section>

                    <main className="mt-2">
                        {clients && clients.data.length > 1 ? (
                            <>
                                <section className="card">
                                    <table className="min-w-full divide-y divide-zinc-700 rounded-lg overflow-hidden">
                                        <thead className="bg-zinc-800 text-nowrap">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400"
                                                >
                                                    #
                                                </th>

                                                <th
                                                    scope="col"
                                                    className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400"
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
                                                    Repozitáře
                                                </th>

                                                <th
                                                    scope="col"
                                                    className="relative py-3.5 px-4"
                                                >
                                                    <span className="sr-only">
                                                        Edit
                                                    </span>
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
                                                        <td className="px-4 py-4 ">
                                                            <span className="text-sm font-medium text-zinc-400">
                                                                {client.id}
                                                            </span>
                                                        </td>

                                                        <td className="px-4 py-4 ">
                                                            <span className="text-sm font-medium text-zinc-400">
                                                                {
                                                                    client.name
                                                                }
                                                            </span>
                                                        </td>

                                                        <td className="px-12 py-4 text-sm font-medium text-zinc-400">
                                                            {client.email ?? (
                                                                <XMarkIcon className="size-6 text-red-500" />
                                                            )}
                                                        </td>

                                                        <td className="px-4 py-4 text-sm text-zinc-300 whitespace-nowrap">
                                                            {client.phone ?? (
                                                                <XMarkIcon className="size-6 text-red-500" />
                                                            )}
                                                        </td>

                                                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                            <div className="flex items-center gap-x-2 ">
                                                                {client.relationships.repositories
                                                                    .slice(
                                                                        0,
                                                                        2
                                                                    )
                                                                    .map(
                                                                        (
                                                                            repository
                                                                        ) => (
                                                                            <p
                                                                                key={
                                                                                    repository.repository_id
                                                                                }
                                                                                className="px-3 py-1 text-xs text-zinc-400 rounded-full bg-zinc-800 group-hover:bg-zinc-900 faster-animation"
                                                                            >
                                                                                {
                                                                                    repository.name
                                                                                }
                                                                            </p>
                                                                        )
                                                                    )}

                                                                <span className="px-3 py-1 text-xs text-zinc-400 rounded-full bg-zinc-800 group-hover:bg-zinc-700 faster-animation">
                                                                    {client
                                                                        .relationships
                                                                        .repositories
                                                                        .length >
                                                                    2 ? (
                                                                        <span>
                                                                            +{" "}
                                                                            {client
                                                                                .relationships
                                                                                .repositories
                                                                                .length -
                                                                                2}
                                                                        </span>
                                                                    ) : (
                                                                        <span>
                                                                            <XMarkIcon className="size-6 text-zinc-600 group-hover:text-zinc-900 faster-animation" />
                                                                        </span>
                                                                    )}
                                                                </span>
                                                            </div>
                                                        </td>

                                                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                            <div className="flex items-center space-x-2">
                                                                <Link
                                                                    href={route(
                                                                        "clients.edit",
                                                                        client.id
                                                                    )}
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
                                                                    href={route(
                                                                        "clients.destroy",
                                                                        client.id
                                                                    )}
                                                                    className="bg-zinc-800 group-hover:bg-zinc-900 p-1 rounded-lg border border-transparent hover:border-red-500 faster-animation"
                                                                >
                                                                    <TrashIcon className="size-6 text-red-500" />
                                                                </Link>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </section>

                                <div className="mt-5">
                                    <Pagination links={clients.meta} />
                                </div>
                            </>
                        ) : (
                            <ResetFilters href={route("clients.index")}>
                                Nebyly nalezeni žádní klienti.
                            </ResetFilters>
                        )}
                    </main>
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

                    <Dropdown.Content direction="up" width="64">
                        <h3 className="text-center text-white font-bold uppercase py-2 mb-2 border-b border-zinc-800">
                            Možnosti
                        </h3>

                        <Dropdown.Link
                            href={route("clients.create")}
                            className="flex items-center justify-center py-2 text-center text-sm leading-5 text-zinc-400 focus:outline-none focus:bg-zinc-600 transition duration-150 ease-in-out hover:bg-zinc-800 border-l-4 border-transparent hover:border-sky-500 hover:text-sky-500"
                        >
                            <code className="p-1 w-full">Vytvořit klienta</code>
                        </Dropdown.Link>
                    </Dropdown.Content>
                </Dropdown>
            </div>
        </AdminLayout>
    );
}
