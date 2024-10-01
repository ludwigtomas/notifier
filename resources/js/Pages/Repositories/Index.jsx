import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router } from "@inertiajs/react";
import {
    PencilSquareIcon,
    TrashIcon,
    EyeIcon,
    CheckIcon,
    XMarkIcon,
    LinkIcon,
    BackspaceIcon,
    CommandLineIcon,
    ArrowPathIcon,
    RocketLaunchIcon,
    ChevronRightIcon,
} from "@heroicons/react/24/outline";
import Modal from "@/Components/Modal";
import DangerButton from "@/Components/DangerButton";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import SecondaryButton from "@/Components/SecondaryButton";
import ResetFilters from "@/Components/ResetFilters";
import Pagination from "@/Components/Pagination";
import debounce from "lodash/debounce";
import { useState } from "react";
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
        });
    };

    const debouncedSearch = debounce((value) => {
        setSearch(value);
        fetchRepositories(value, trashed);
    }, 500);

    const handleSetTrashed = (value) => {
        setTrashed(value);
        fetchRepositories(search, value);
    };

    const fetchRepositories = (searchValue, trashedValue) => {
        router.get(route("repositories.index"), {
                search: searchValue,
                trashed: trashedValue,
            },
            {
                preserveScroll: true,
                preserveState: true,
            }
        );
    };


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
                        href={route("repositories.index")}
                    >
                        Repozitáře
                    </Link>
                </header>
            }
        >
            <Head title="Repozitáře" />

            {/* TABLE */}
            <div>
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
                                        placeholder="Hledat hlavní skupinu..."
                                        type="text"
                                        className="w-full !border-zinc-600 "
                                        onChange={(e) =>
                                            debouncedSearch(e.target.value)
                                        }
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        className="mb-1"
                                        htmlFor="trashed"
                                        value="Smazané"
                                    />

                                <div className="relative group w-full bg-zinc-700 py-2 border-2 border-zinc-600 focus:border-sky-500 focus:ring-sky-500 text-zinc-200 rounded-md shadow-sm">
                                    <div className="flex items-center justify-center space-x-4 bg-zinc-700 rounded-xl">
                                        <h3 className="text-gray-300">
                                            Vybrané modely
                                        </h3>

                                        <div className="text-white font-bold">
                                            {trashed}
                                        </div>
                                    </div>

                                    <div className="hidden group-hover:block absolute right-0 top-full pt-4 ">
                                        <div className="z-40 overflow-y-auto overflow-x-hidden p-2 w-[30rem] border border-neutral-600 bg-neutral-800 rounded-xl">
                                            <div className="grid grid-cols-1 gap-4">
                                                <button
                                                    className={"w-full bg-zinc-700 py-2 border-2 border-zinc-600 hover:bg-zinc-800 text-zinc-200 rounded-md shadow-sm " + (trashed === 'with' ? 'bg-zinc-800' : '')}
                                                    onClick={(e) =>handleSetTrashed('with')}
                                                >
                                                    <span className="text-zinc-200">
                                                        Společně s mazanými
                                                    </span>
                                                </button>

                                                <button
                                                    className={"w-full bg-zinc-700 py-2 border-2 border-zinc-600 hover:bg-zinc-800 text-zinc-200 rounded-md shadow-sm " + (trashed === 'only' ? 'bg-zinc-800' : '')}
                                                    onClick={(e) =>handleSetTrashed('only')}
                                                >
                                                    <span className="text-zinc-200">
                                                        Pouze smazané
                                                    </span>
                                                </button>

                                                <button
                                                    className={"w-full bg-zinc-700 py-2 border-2 border-zinc-600 hover:bg-zinc-800 text-zinc-200 rounded-md shadow-sm " + (trashed === 'without' ? 'bg-zinc-800' : '')}
                                                    onClick={(e) =>handleSetTrashed('without')}
                                                >
                                                    <span className="text-zinc-200">
                                                        Pouze aktivní
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
{/*
                                    <button
                                        id="trashed"
                                        name="trashed"
                                        className="w-full bg-zinc-700 py-2 border-2 border-zinc-600 text-zinc-200 rounded-md shadow-sm"
                                        onClick={(e) => handleSetTrashed(!trashed)}
                                    >
                                        <span className="text-xs text-zinc-400">
                                            aktuálně: &nbsp;
                                        </span>
                                        <span className="text-zinc-200">
                                            {trashed ? "Smazané" : "Aktivní"}
                                        </span>
                                    </button>
 */}
                                </div>
                            </div>
                        </section>

                        <section className="card">
                            <div className="flex space-x-4">
                                <div className="flex items-center justify-center">
                                    <Link
                                        href={route("repositories.index")}
                                        className="p-2 rounded-md bg-zinc-800 border border-zinc-700 hover:border-zinc-600 faster-animation"
                                    >
                                        <RocketLaunchIcon className="size-10 text-sky-500" />
                                    </Link>
                                </div>

                                <div>
                                    <h1 className="text-2xl font-semibold capitalize lg:text-3xl dark:text-white">
                                        Repositories
                                    </h1>

                                    <p className="text-zinc-400">
                                        Seznam všech dostupných repozitářů.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <main className="mt-2">
                            {repositories && repositories.data.length > 0 ? (
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
                                                            <li className="text-sm font-normal text-center text-zinc-400">
                                                                Gitlab
                                                            </li>

                                                            <li className="text-sm font-normal text-center text-zinc-400">
                                                                Web
                                                            </li>

                                                            <li className="text-sm font-normal text-center text-zinc-400">
                                                                Hosting
                                                            </li>

                                                            <li className="text-sm font-normal text-center text-zinc-400">
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

                                            <tbody className="divide-y divide-zinc-800 bg-zinc-700">
                                                {repositories.data.map(
                                                    (repository) => {
                                                        return (
                                                            <tr
                                                                key={
                                                                    repository.repository_id
                                                                }
                                                                className="group text-white transition-colors duration-200 hover:bg-zinc-800"
                                                            >
                                                                <td className="px-4 py-4 ">
                                                                    <span className="text-sm font-medium text-zinc-400">
                                                                        {
                                                                            repository.repository_id
                                                                        }
                                                                    </span>
                                                                </td>

                                                                <td className="px-4 py-2 w-20">
                                                                    <img
                                                                        src={
                                                                            repository.avatar
                                                                                ? "/storage/avatars/" +
                                                                                  repository.avatar
                                                                                : "https://ui-avatars.com/api/?name=" +
                                                                                  repository.name +
                                                                                  "&background=0D8ABC&color=fff"
                                                                        }
                                                                        alt="test"
                                                                        className="size-12 object-contain p-1 bg-zinc-800 rounded-xl"
                                                                    />
                                                                </td>

                                                                <td className="px-4 py-4 ">
                                                                    <span className="text-sm font-medium text-zinc-400 text-nowrap">
                                                                        {
                                                                            repository.name
                                                                        }
                                                                    </span>
                                                                </td>

                                                                <td className="px-4 py-4 ">
                                                                    <span className="text-sm font-medium text-zinc-400 text-nowrap">
                                                                        {
                                                                            repository.slug
                                                                        }
                                                                    </span>
                                                                </td>

                                                                <td className="px-4 py-4 ">
                                                                    <div className="flex items-center gap-x-2 text-nowrap ">
                                                                        {repository
                                                                            .relationships
                                                                            .clients_count >
                                                                        0 ? (
                                                                            <div className="pl-3 py-1 pr-1 flex items-center justify-between space-x-2 rounded-full bg-zinc-800 group-hover:bg-zinc-900 faster-animation">
                                                                                {repository.relationships.clients.slice(0, 2).map((client) => (
                                                                                    <p
                                                                                        key={client.id}
                                                                                        className="text-xs text-zinc-400 pr-2"
                                                                                    >
                                                                                        { client.name }
                                                                                    </p>
                                                                                ))}

                                                                                {repository.relationships.clients_count > 2 && (
                                                                                    <span className="p-1.5 text-xs text-zinc-400 rounded-full bg-zinc-900 group-hover:bg-zinc-700 faster-animation">
                                                                                        +{" "}
                                                                                        {repository.relationships.clients_count - 2}
                                                                                    </span>
                                                                                )}
                                                                            </div>
                                                                        ) : (
                                                                            <span className="px-3 py-1 text-xs text-zinc-400 rounded-full bg-zinc-800 group-hover:bg-zinc-900 faster-animation">
                                                                                0
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                </td>

                                                                <td className="px-4 py-4 text-center ">
                                                                    <span className="px-3 py-1 text-xs text-zinc-400 rounded-full bg-zinc-800 group-hover:bg-zinc-900 faster-animation">
                                                                        { repository.relationships.database_backups_count }
                                                                    </span>
                                                                </td>

                                                                <td className="grid grid-cols-4 py-3.5">
                                                                    <div className="flex items-center justify-center">
                                                                        {repository.repository_url ? (
                                                                            <a
                                                                                className="group bg-green-950 p-2 rounded-xl"
                                                                                href={
                                                                                    repository.repository_url
                                                                                }
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
                                                                                href={
                                                                                    repository.website_url
                                                                                }
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
                                                                            className={
                                                                                "p-2 rounded-xl " +
                                                                                (repository
                                                                                    .relationships
                                                                                    ?.hosting_repository
                                                                                    ?.hosting_id
                                                                                    ? "bg-green-950"
                                                                                    : "bg-red-950")
                                                                            }
                                                                        >
                                                                            {repository
                                                                                .relationships
                                                                                ?.hosting_repository
                                                                                ?.hosting_id >=
                                                                            1 ? (
                                                                                <CheckIcon className="w-6 h-6 text-green-500" />
                                                                            ) : (
                                                                                <XMarkIcon className="text-red-500 w-6 h-6" />
                                                                            )}
                                                                        </div>
                                                                    </div>

                                                                    <div className="flex items-center justify-center">
                                                                        <div
                                                                            className={
                                                                                "p-2 rounded-xl " +
                                                                                (repository.analytics_property_id
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
                                                                        {repository.last_commit_at_human ??
                                                                            "-"}
                                                                    </span>
                                                                </td>

                                                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                                    <div className="flex items-center justify-end space-x-2">
                                                                        {repository
                                                                            .relationships
                                                                            .hosting_repository && (
                                                                            <Link
                                                                                href={route(
                                                                                    "hosting-repository.vps-connect",
                                                                                    repository
                                                                                        .relationships
                                                                                        .hosting_repository
                                                                                        .id
                                                                                )}
                                                                                className="bg-zinc-800 group-hover:bg-zinc-900 p-1 rounded-lg border border-transparent hover:border-orange-500 faster-animation"
                                                                            >
                                                                                <CommandLineIcon className="size-6 text-orange-400" />
                                                                            </Link>
                                                                        )}

                                                                        {repository.deleted_at ? (
                                                                            <>
                                                                                <Link
                                                                                    method="PATCH"
                                                                                    as="button"
                                                                                    href={route(
                                                                                        "repositories.restore",
                                                                                        repository.repository_id
                                                                                    )}
                                                                                    className="bg-zinc-800 group-hover:bg-zinc-900 p-1 rounded-lg border border-transparent hover:border-sky-500 faster-animation"
                                                                                >
                                                                                    <ArrowPathIcon className="size-6 text-sky-500" />
                                                                                </Link>

                                                                                <button
                                                                                    className="bg-zinc-800 group-hover:bg-zinc-900 p-1 rounded-lg border border-transparent hover:border-red-500 faster-animation"
                                                                                    onClick={() =>
                                                                                        toggleModal(
                                                                                            repository
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    <BackspaceIcon className="size-6 text-red-500" />
                                                                                </button>
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                <Link
                                                                                    href={route(
                                                                                        "repositories.edit",
                                                                                        repository.repository_id
                                                                                    )}
                                                                                    className="bg-zinc-800 group-hover:bg-zinc-900 p-1 rounded-lg border border-transparent hover:border-green-500 faster-animation"
                                                                                >
                                                                                    <PencilSquareIcon className="size-6 text-green-500" />
                                                                                </Link>

                                                                                <Link
                                                                                    href={route(
                                                                                        "repositories.show",
                                                                                        repository.repository_id
                                                                                    )}
                                                                                    className="bg-zinc-800 group-hover:bg-zinc-900 p-1 rounded-lg border border-transparent hover:border-sky-500 faster-animation"
                                                                                >
                                                                                    <EyeIcon className="size-6 text-sky-500" />
                                                                                </Link>

                                                                                <button
                                                                                    className="bg-zinc-800 group-hover:bg-zinc-900 p-1 rounded-lg border border-transparent hover:border-red-500 faster-animation"
                                                                                    onClick={() =>
                                                                                        toggleModal(
                                                                                            repository
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    <TrashIcon className="size-6 text-red-500" />
                                                                                </button>
                                                                            </>
                                                                        )}
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        );
                                                    }
                                                )}
                                            </tbody>
                                        </table>
                                    </section>

                                    <div className="mt-5">
                                        <Pagination links={repositories.meta} />
                                    </div>
                                </>
                            ) : (
                                <ResetFilters
                                    href={route("repositories.index")}
                                >
                                    Nebyly nalezeny žádné repozitáře.
                                </ResetFilters>
                            )}
                        </main>
                    </div>
                </div>

                {/* Another options */}
                <div className="fixed right-10 bottom-10">
                    <Dropdown maxWidth="md">
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

                        <Dropdown.Content direction="up" width="72">
                            <h3 className="text-center text-white font-bold uppercase py-2 mb-2 border-b border-zinc-800">
                                Settings
                            </h3>

                            <Link
                                // href={route("repositories.sync")}
                                preserveScroll
                                className="flex items-center justify-center py-2 pl-1 text-sm leading-5 text-zinc-400 focus:outline-none focus:bg-zinc-600 transition duration-150 ease-in-out hover:bg-zinc-800 border-l-4 border-transparent hover:border-green-500 hover:text-green-500"
                            >
                                <code className="p-1 w-full">
                                    Repositories - update last commit
                                </code>
                            </Link>

                            <Link
                                // href={route("repositories.sync")}
                                preserveScroll
                                className="flex items-center justify-center py-2 pl-1 text-sm leading-5 text-zinc-400 focus:outline-none focus:bg-zinc-600 transition duration-150 ease-in-out hover:bg-zinc-800 border-l-4 border-transparent hover:border-green-500 hover:text-green-500"
                            >
                                <code className="p-1 w-full">
                                    Repositories - update avatar
                                </code>
                            </Link>

                            <Link
                                href={route("repositories.sync")}
                                preserveScroll
                                className="flex items-center justify-center py-2 pl-1 text-sm leading-5 text-zinc-400 focus:outline-none focus:bg-zinc-600 transition duration-150 ease-in-out hover:bg-zinc-800 border-l-4 border-transparent hover:border-green-500 hover:text-green-500"
                            >
                                <code className="p-1 w-full">
                                    Repositories - sync everything
                                </code>
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

                        <p className="mt-1 text-sm text-gray-400 text-center">
                            Chystáš se smazat repozitář společně se všemi
                            databázemi a klienty. Tato akce je nevratná.
                        </p>

                        <div className="flex justify-center space-x-4">
                            {selectedRepository.deleted_at ? (
                                <div>
                                    <Link
                                        onClick={closeModal}
                                        as="button"
                                        method="DELETE"
                                        href={route(
                                            "repositories.force-delete",
                                            selectedRepository.repository_id
                                        )}
                                        className="inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                    >
                                        <TrashIcon className="size-6 mr-2" />
                                        Smazat trvale
                                    </Link>
                                </div>
                            ) : (
                                <div>
                                    <DangerButton
                                        type="submit"
                                        onClick={deleteRepository}
                                    >
                                        <TrashIcon className="size-6 mr-2" />

                                        {selectedRepository.name}
                                    </DangerButton>
                                </div>
                            )}

                            <SecondaryButton onClick={closeModal}>
                                Zavřít
                            </SecondaryButton>
                        </div>
                    </div>
                )}
            </Modal>
        </AdminLayout>
    );
}
