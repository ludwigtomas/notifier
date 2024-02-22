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
import Modal from "@/Components/Modal";
import DangerButton from "@/Components/DangerButton";
import TextInput from "@/Components/TextInput";
import SecondaryButton from "@/Components/SecondaryButton";
import Pagination from "@/Components/Pagination";
import debounce from 'lodash/debounce';

import { useState } from "react";

export default function Index({ auth, repositories, filters }) {
    const [toggleDeleteModal, setToggleDeleteModal] = useState(false);
    const [selectedRepository, setSelectedRepository] = useState(null);
    const [search, setSearch] = useState(filters.search || "");

    // catch repository into variable
    const toggleModal = (repository) => {
        setSelectedRepository(repository);

        setToggleDeleteModal(true);
    };

    const closeModal = () => {
        setToggleDeleteModal(false);
    };

    const deleteRepository = () => {
        let url = route("repositories.destroy", selectedRepository.id);

        router.delete(url, {
            preserveScroll: true,
            onSuccess: () => closeModal(),
        })
    }

    const debouncedSearch = debounce((value) => {
        router.get(route('repositories.index'), {
            search: value
        }, {
            preserveScroll: true,
            preserveState: true,
        })
    }, 100);

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
                        <ChevronRightIcon className="w-5 h-5" />
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
            <Head title="Dashboard" />

            {/* TABLE */}
            <div className="py-12">
                <div className="max-w-[90rem] mx-auto sm:px-6 lg:px-8">

                    <div className="mb-2">
                        <TextInput
                            label="Hledat"
                            name="search"
                            placeholder="Hledat repozitář"
                            type="text"
                            className="w-72"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                debouncedSearch(e.target.value);
                            }}
                        />
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
                                            ID
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-4 py-3.5 text-sm font-normal text-center text-zinc-400"
                                        >
                                            Gitlab
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-4 py-3.5 text-sm font-normal text-center text-zinc-400"
                                        >
                                            Web
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-4 py-3.5 text-sm font-normal text-center text-zinc-400"
                                        >
                                            Analytics
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
                                            className="px-12 py-3.5 text-sm font-normal text-left text-zinc-400"
                                        >
                                            Počet klientů
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-12 py-3.5 text-sm font-normal text-left text-zinc-400"
                                        >
                                            Počet databází
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400"
                                        >
                                            Nejnovější commit
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

                                <tbody className="divide-y divide-zinc-700 bg-zinc-900">
                                    {repositories.data.map((repository) => {
                                        return (
                                            <tr
                                                key={repository.id}
                                                className="group hover:bg-zinc-800"
                                            >
                                                <td className="px-4 py-4 ">
                                                    <span className="text-sm font-medium text-zinc-400">
                                                        {repository.id}
                                                    </span>
                                                </td>

                                                <td className="px-4 py-4">
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
                                                </td>

                                                <td className="px-4 py-4 ">
                                                    <div className="flex items-center justify-center">
                                                        {repository.website_url ? (
                                                            <a
                                                                className="bg-green-950 p-2 rounded-xl"
                                                                href={repository.repository_url}
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
                                                </td>

                                                <td className="px-4 py-4">
                                                    <div className="flex items-center justify-center">
                                                        <div className={'p-2 rounded-xl ' + (
                                                            repository.analytics_property_id ? 'bg-green-950' : 'bg-red-950'
                                                        )}>
                                                            {repository.analytics_property_id ? <CheckIcon className="w-6 h-6 text-green-500"/> : <XMarkIcon className="text-red-500 w-6 h-6" />}
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-4 py-4 ">
                                                    <span className="text-sm font-medium text-zinc-400">
                                                        {repository.name}
                                                    </span>
                                                </td>

                                                <td className="px-4 py-4 ">
                                                    <span className="text-sm font-medium text-zinc-400">
                                                        {repository.slug}
                                                    </span>
                                                </td>

                                                <td className="px-4 py-4 ">
                                                    <div className="flex items-center gap-x-2 text-nowrap ">
                                                        {repository.relationships.clients.slice(0, 2).map((client) => (
                                                            <p
                                                                key={client.id}
                                                                className="px-3 py-1 text-xs text-zinc-400 rounded-full bg-zinc-800 group-hover:bg-zinc-900 faster-animation"
                                                            >
                                                                { client.name}
                                                            </p>
                                                        ))}

                                                        {repository.relationships.clients_count > 2 && (
                                                            <span className="px-3 py-1 text-xs text-zinc-400 rounded-full bg-zinc-800 group-hover:bg-zinc-700 faster-animation">
                                                                +{" "}
                                                                {repository.relationships.clients_count - 2}
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>

                                                <td className="px-4 py-4 text-center ">
                                                    <span className="px-3 py-1 text-xs text-zinc-400 rounded-full bg-zinc-800 group-hover:bg-zinc-900 faster-animation">
                                                        { repository.relationships.database_backups_count}
                                                    </span>
                                                </td>

                                                <td className="px-4 py-4">
                                                    <span className="text-sm font-medium text-zinc-400">
                                                        { repository.last_commit_at_human}
                                                    </span>
                                                </td>

                                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                    <div className="flex items-center space-x-2">
                                                        <Link
                                                            href={route("repositories.edit", repository.id)}
                                                            className="bg-zinc-800 group-hover:bg-zinc-900 p-1 rounded-lg border border-transparent hover:border-green-500 faster-animation"
                                                        >
                                                            <PencilSquareIcon className="w-6 h-6 text-green-500" />
                                                        </Link>

                                                        <Link
                                                            href={route("repositories.show", repository.id)}
                                                            className="bg-zinc-800 group-hover:bg-zinc-900 p-1 rounded-lg border border-transparent hover:border-sky-500 faster-animation"
                                                        >
                                                            <EyeIcon className="w-6 h-6 text-sky-500" />
                                                        </Link>

                                                        <button
                                                            className="bg-zinc-800 group-hover:bg-zinc-900 p-1 rounded-lg border border-transparent hover:border-red-500 faster-animation"
                                                            onClick={() => toggleModal(repository)}
                                                        >
                                                            <TrashIcon className="w-6 h-6 text-red-500" />
                                                        </button>
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
            </div>

            <Modal
                maxWidth="md"
                show={toggleDeleteModal}
                onClose={closeModal}
                className="p-10"
            >
                {selectedRepository && (
                    <form
                        className="p-4 flex flex-col space-y-4"
                        onSubmit={deleteRepository}
                    >
                        <h2 className="text-2xl font-medium text-gray-800 text-center">
                            {selectedRepository.name}
                        </h2>

                        <p className="mt-1 text-sm text-gray-600">
                            Chystáš se smazat repozitář společně se všemi databázemi a klienty. Tato akce je nevratná.
                        </p>

                        <div className="flex justify-center space-x-4">
                            <DangerButton type="submit">
                                <TrashIcon className="w-6 h-6 mr-2"/>

                                {selectedRepository.name}
                            </DangerButton>

                            <SecondaryButton
                                onClick={closeModal}
                            >
                                Zavřít
                            </SecondaryButton>
                        </div>
                    </form>
                )}
            </Modal>
        </AuthenticatedLayout>
    );
}
