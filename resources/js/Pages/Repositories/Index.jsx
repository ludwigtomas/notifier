import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import {
    PencilSquareIcon,
    TrashIcon,
    EyeIcon,
    CheckIcon,
    XMarkIcon,
    ChevronRightIcon,
    LinkIcon,
    BackspaceIcon,
    CommandLineIcon,
} from "@heroicons/react/24/outline";
import Modal from "@/Components/Modal";
import DangerButton from "@/Components/DangerButton";
import TextInput from "@/Components/TextInput";
import SecondaryButton from "@/Components/SecondaryButton";
import Pagination from "@/Components/Pagination";
import debounce from "lodash/debounce";
import { useState, useEffect } from "react";
import Dropdown from "@/Components/Dropdown";

export default function Index({ auth, repositories, filters }) {
    const [toggleDeleteModal, setToggleDeleteModal] = useState(false);
    const [selectedRepository, setSelectedRepository] = useState(null);
    const [search, setSearch] = useState(filters.search || "");
    const [trashed, setTrashed] = useState(filters.trashed || false);

    // catch repository into variable
    const toggleModal = (repository) => {
        setSelectedRepository(repository);

        setToggleDeleteModal(true);
    };

    const closeModal = () => {
        setToggleDeleteModal(false);
    };

    const deleteRepository = () => {
        let url = route("repositories.destroy", selectedRepository.repository_id);

        router.delete(url, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                setToggleDeleteModal(false);
            },
        })
    };

    const debouncedSearch = debounce((value) => {
        setSearch(value);

        router.get(route("repositories.index"),{
                search: value,
                trashed: trashed,
            },
            {
                preserveScroll: true,
                preserveState: true,
            }
        );
    }, 500);

    const handleSetTrashed = (value) => {
        setTrashed(value);

        router.get(route("repositories.index"), {
                search: search,
                trashed: value,
            },
            {
                preserveScroll: true,
                preserveState: true,
            }
        );
    }

    return (
        <AuthenticatedLayout
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
                        href={route("repositories.index")}
                    >
                        Repozitáře
                    </Link>
                </header>
            }
        >
            <Head title="Repozitáče" />

            {/* TABLE */}
            <div className="py-12">
                <div className="max-w-[100rem] mx-auto sm:px-6 lg:px-8">
                    <div className="mb-2 flex items-center space-x-10">
                        <TextInput
                            label="Hledat"
                            name="search"
                            placeholder="Hledat repozitář"
                            type="text"
                            className="w-72"
                            onChange={(e) => debouncedSearch(e.target.value)}
                        />

                        <div>
                            <label className="flex items-center justify-center cursor-pointer bg-zinc-900 px-6 py-4 rounded-xl">
                                <input
                                    label="Smazané"
                                    name="trashed"
                                    type="checkbox"
                                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-sky-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-sky-500 before:opacity-0 before:transition-opacity checked:border-sky-900 checked:bg-sky-900 checked:before:bg-sky-900 hover:before:opacity-10"
                                    checked={ trashed === "true" || trashed === true
                                            ? true
                                            : false
                                    }
                                    onChange={(e) => { handleSetTrashed(e.target.checked) }}
                                />

                                <span className="ml-4 text-base text-gray-300">
                                    Smazané
                                </span>
                            </label>
                        </div>
                    </div>

                    <div className="bg-zinc-900 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="border-4 border-zinc-900 divide-y divide-zinc-800 ">
                            <table className="min-w-full divide-y divide-zinc-700 rounded-md overflow-hidden">
                                <thead className="bg-zinc-950 text-nowrap">
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
                                            Logo
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400"
                                        >
                                            Repozitář
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400"
                                        >
                                            Slug
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400"
                                        >
                                            Počet klientů
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400"
                                        >
                                            Počet databází
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-4 py-3.5 text-sm font-normal"
                                        >
                                            <div className="text-white">
                                                Nastavení
                                            </div>

                                            <ul className="grid grid-cols-4 mt-2 w-full">
                                                <li
                                                    className="text-sm font-normal text-center text-zinc-400"
                                                >
                                                    Gitlab
                                                </li>

                                                <li
                                                    className="text-sm font-normal text-center text-zinc-400"
                                                >
                                                    Web
                                                </li>

                                                <li
                                                    className="text-sm font-normal text-center text-zinc-400"
                                                >
                                                    Hosting
                                                </li>

                                                <li
                                                    className="text-sm font-normal text-center text-zinc-400"
                                                >
                                                    Analytics
                                                </li>
                                            </ul>
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400"
                                        >
                                            Nejnovější commit
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400"
                                        >
                                            <span className="sr-only">
                                                Edit
                                            </span>
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-zinc-700 bg-zinc-900">
                                    {repositories.data.map((repository) => {
                                        return (
                                            <tr
                                                key={repository.repository_id}
                                                className="group hover:bg-zinc-800"
                                            >
                                                <td className="px-4 py-4 ">
                                                    <span className="text-sm font-medium text-zinc-400">
                                                        {repository.repository_id}
                                                    </span>
                                                </td>

                                                <td className="px-4 py-2 w-20">
                                                    <img
                                                        src={repository.avatar ? "/storage/avatars/" + repository.avatar : "https://ui-avatars.com/api/?name=" + repository.name + "&background=0D8ABC&color=fff"}
                                                        alt="test"
                                                        className="size-12 object-contain p-1 bg-zinc-800 rounded-xl"
                                                    />
                                                </td>

                                                <td className="px-4 py-4 ">
                                                    <span className="text-sm font-medium text-zinc-400 text-nowrap">
                                                        {repository.name}
                                                    </span>
                                                </td>

                                                <td className="px-4 py-4 ">
                                                    <span className="text-sm font-medium text-zinc-400 text-nowrap">
                                                        {repository.slug}
                                                    </span>
                                                </td>

                                                <td className="px-4 py-4 ">
                                                    <div className="flex items-center gap-x-2 text-nowrap ">
                                                        { repository.relationships.clients_count > 0 ? (
                                                            <div className="pl-3 py-1 pr-1 flex items-center justify-between space-x-2 rounded-full bg-zinc-800 group-hover:bg-zinc-900 faster-animation">
                                                                {repository.relationships.clients.slice(0, 2).map((client) => (
                                                                    <p
                                                                        key={client.id}
                                                                        className="text-xs text-zinc-400 pr-2"
                                                                    >
                                                                        {client.name}
                                                                    </p>
                                                                ))}

                                                                {repository.relationships.clients_count > 2 && (
                                                                    <span className="p-1.5 text-xs text-zinc-400 rounded-full bg-zinc-900 group-hover:bg-zinc-700 faster-animation">
                                                                        +{" "}{repository.relationships.clients_count - 2}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        ): (
                                                            <span className="px-3 py-1 text-xs text-zinc-400 rounded-full bg-zinc-800 group-hover:bg-zinc-900 faster-animation">
                                                                0
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>

                                                <td className="px-4 py-4 text-center ">
                                                    <span className="px-3 py-1 text-xs text-zinc-400 rounded-full bg-zinc-800 group-hover:bg-zinc-900 faster-animation">
                                                        {   repository.relationships.database_backups_count }
                                                    </span>
                                                </td>

                                                <td className="grid grid-cols-4 py-3.5">
                                                    <div className="flex items-center justify-center">
                                                        {repository.repository_url ? (
                                                            <a
                                                                className="group bg-green-950 p-2 rounded-xl"
                                                                href={repository.repository_url}
                                                                target="_blank"
                                                                rel="noreferrer noopener"
                                                            >
                                                                <LinkIcon className="text-green-500 w-6 h-6" />
                                                            </a>
                                                        ) : (
                                                            <div className="bg-red-950 p-2 rounded-xl">
                                                                <XMarkIcon className="text-red-500 w-6 h-6" />
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="flex items-center justify-center">
                                                        {repository.website_url ? (
                                                            <a
                                                                className="bg-green-950 p-2 rounded-xl"
                                                                href={ repository.website_url }
                                                                target="_blank"
                                                            >
                                                                <LinkIcon className="text-green-500 w-6 h-6" />
                                                            </a>
                                                        ) : (
                                                            <div className="bg-red-950 p-2 rounded-xl">
                                                                <XMarkIcon className="text-red-500 w-6 h-6" />
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="flex items-center justify-center">
                                                        <div
                                                            className={ "p-2 rounded-xl " + (repository.relationships?.hosting_repository?.hosting_id
                                                                ? "bg-green-950"
                                                                : "bg-red-950")
                                                        }>
                                                            {repository.relationships?.hosting_repository?.hosting_id >= 1 ? (
                                                                <CheckIcon className="w-6 h-6 text-green-500" />
                                                            ) : (
                                                                <XMarkIcon className="text-red-500 w-6 h-6" />
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-center">
                                                        <div
                                                            className={"p-2 rounded-xl " + (repository.analytics_property_id
                                                                ? "bg-green-950"
                                                                : "bg-red-950")
                                                            }
                                                        >
                                                            {repository.analytics_property_id ? (
                                                                <CheckIcon className="w-6 h-6 text-green-500" />
                                                            ) : (
                                                                <XMarkIcon className="text-red-500 w-6 h-6" />
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-4 py-4">
                                                    <span className="text-sm font-medium text-zinc-400">
                                                        { repository.last_commit_at_human ?? '-' }
                                                    </span>
                                                </td>

                                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                    <div className="grid grid-cols-4 place-items-center">

                                                        {repository.relationships.hosting_repository ? (
                                                            <Link
                                                                href={route("hosting-repository.vps-connect", repository.relationships.hosting_repository.id)}
                                                                className="bg-zinc-800 group-hover:bg-zinc-900 p-1 rounded-lg border border-transparent hover:border-orange-500 faster-animation"
                                                            >
                                                                <CommandLineIcon className="size-6 text-orange-400" />
                                                            </Link>
                                                        ): (
                                                            <span className=""/>
                                                        )}

                                                        <Link
                                                            href={route("repositories.edit", repository.repository_id)}
                                                            className="bg-zinc-800 group-hover:bg-zinc-900 p-1 rounded-lg border border-transparent hover:border-green-500 faster-animation"
                                                        >
                                                            <PencilSquareIcon className="size-6 text-green-500" />
                                                        </Link>

                                                        {repository.deleted_at ? (
                                                            <>
                                                                <Link
                                                                    href={route("repositories.show", repository.repository_id)}
                                                                    className="bg-zinc-800 group-hover:bg-zinc-900 p-1 rounded-lg border border-transparent hover:border-sky-500 faster-animation"
                                                                >
                                                                    <EyeIcon className="size-6 text-sky-500" />
                                                                </Link>

                                                                <button
                                                                    className="bg-zinc-800 group-hover:bg-zinc-900 p-1 rounded-lg border border-transparent hover:border-red-500 faster-animation"
                                                                    onClick={() => toggleModal(repository)}
                                                                >
                                                                    <BackspaceIcon className="size-6 text-red-500" />
                                                                </button>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Link
                                                                    href={route("repositories.show",repository.repository_id)}
                                                                    className="bg-zinc-800 group-hover:bg-zinc-900 p-1 rounded-lg border border-transparent hover:border-sky-500 faster-animation"
                                                                >
                                                                    <EyeIcon className="size-6 text-sky-500" />
                                                                </Link>

                                                                <button
                                                                    className="bg-zinc-800 group-hover:bg-zinc-900 p-1 rounded-lg border border-transparent hover:border-red-500 faster-animation"
                                                                    onClick={() => toggleModal(repository)}
                                                                >
                                                                    <TrashIcon className="size-6 text-red-500" />
                                                                </button>
                                                            </>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div>
                        <Pagination class="mt-6" links={repositories.meta} />
                    </div>
                </div>

                {/* Another options */}
                <div className="fixed right-10 bottom-10">
                    <Dropdown
                        maxWidth="md"
                    >
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

                        <Dropdown.Content
                            direction="up"
                            width="72"
                        >
                            <h3 className="text-center text-white font-bold uppercase py-2 mb-2 border-b border-zinc-800">
                                Settings
                            </h3>

                            <Link
                                // href={route("repositories.sync")}
                                preserveScroll
                                className="flex items-center justify-center py-2 pl-1 text-sm leading-5 text-zinc-400 focus:outline-none focus:bg-zinc-600 transition duration-150 ease-in-out hover:bg-zinc-800 border-l-4 border-transparent hover:border-green-500 hover:text-green-500"
                            >
                                <code className="p-1 w-full">Repositories - update last commit</code>
                            </Link>

                            <Link
                                // href={route("repositories.sync")}
                                preserveScroll
                                className="flex items-center justify-center py-2 pl-1 text-sm leading-5 text-zinc-400 focus:outline-none focus:bg-zinc-600 transition duration-150 ease-in-out hover:bg-zinc-800 border-l-4 border-transparent hover:border-green-500 hover:text-green-500"
                            >
                                <code className="p-1 w-full">Repositories - update avatar</code>
                            </Link>


                            <Link
                                href={route("repositories.sync")}
                                preserveScroll
                                className="flex items-center justify-center py-2 pl-1 text-sm leading-5 text-zinc-400 focus:outline-none focus:bg-zinc-600 transition duration-150 ease-in-out hover:bg-zinc-800 border-l-4 border-transparent hover:border-green-500 hover:text-green-500"
                            >
                                <code className="p-1 w-full">Repositories - sync everything</code>
                            </Link>

                        </Dropdown.Content>

                    </Dropdown>
                </div>
            </div>

            <Modal
                maxWidth="md"
                show={toggleDeleteModal}
                onClose={closeModal}
                className="p-10"
            >
                {selectedRepository && (
                    <div className="p-4 flex flex-col space-y-4">
                        <h2 className="text-2xl font-medium text-gray-200 text-center">
                            {selectedRepository.name}
                        </h2>

                        <p className="mt-1 text-sm text-gray-400">
                            Chystáš se smazat repozitář společně se všemi
                            databázemi a klienty. Tato akce je nevratná.
                        </p>

                        <div className="flex justify-center space-x-4">
                            <DangerButton
                                type="submit"
                                onClick={deleteRepository}
                            >
                                <TrashIcon className="size-6 mr-2" />

                                {selectedRepository.name}
                            </DangerButton>

                            <SecondaryButton onClick={closeModal}>
                                Zavřít
                            </SecondaryButton>
                        </div>
                    </div>
                )}
            </Modal>
        </AuthenticatedLayout>
    );
}
