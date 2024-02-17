import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import {
    PencilSquareIcon,
    TrashIcon,
    EyeIcon,
    PlusIcon,
    XMarkIcon,
    ChevronRightIcon,
    LinkIcon,
} from "@heroicons/react/24/outline";
import Modal from "@/Components/Modal";
import DangerButton from "@/Components/DangerButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Pagination from "@/Components/Pagination";

import { useState } from "react";

export default function Index({ auth, repositories }) {
    const [toggleDeleteModal, setToggleDeleteModal] = useState(false);
    const [selectedRepository, setSelectedRepository] = useState(null);

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
            onSuccess: () => {
                closeModal();
            },
        });
    };

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
                    <div className="bg-zinc-900 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="border-4 border-zinc-900 divide-y divide-zinc-800 ">
                            <table className="min-w-full divide-y divide-zinc-700 rounded-md overflow-hidden">
                                <thead className="bg-zinc-950">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400"
                                        >
                                            Gitlab
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400"
                                        >
                                            Web
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400"
                                        >
                                            ID
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
                                            last_commit_at
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
                                                                <LinkIcon className="text-green-500 group-hover:text-green-400 w-6 h-6 slower-animation" />
                                                            </a>
                                                        ) : (
                                                            <div className="bg-red-950 p-2 rounded-xl">
                                                                <LinkIcon className="text-red-500 w-6 h-6" />
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>

                                                <td className="px-4 py-4 ">
                                                    <div className="flex items-center justify-center">
                                                        {repository.website_url ? (
                                                            <a
                                                                className="bg-green-950 p-2 rounded-xl"
                                                                href={
                                                                    repository.repository_url
                                                                }
                                                                target="_blank"
                                                                rel="noreferrer noopener"
                                                            >
                                                                <LinkIcon className="text-green-500 group-hover:text-green-400 w-6 h-6 slower-animation" />
                                                            </a>
                                                        ) : (
                                                            <div className="bg-red-950 p-2 rounded-xl">
                                                                <LinkIcon className="text-red-500 w-6 h-6" />
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>

                                                <td className="px-4 py-4 ">
                                                    <span className="text-sm font-medium text-zinc-400">
                                                        {repository.id}
                                                    </span>
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
                                                    {/* <span className="text-sm font-medium text-zinc-400">
                                                    {repository.relationships.clients_count}
                                                </span> */}
                                                    <div className="flex items-center gap-x-2 ">
                                                        {repository.relationships.clients
                                                            .slice(0, 2)
                                                            .map((client) => (
                                                                <p
                                                                    key={
                                                                        client.id
                                                                    }
                                                                    className="px-3 py-1 text-xs text-zinc-400 rounded-full bg-zinc-800 group-hover:bg-zinc-900 faster-animation"
                                                                >
                                                                    {
                                                                        client.name
                                                                    }
                                                                </p>
                                                            ))}

                                                        {repository
                                                            .relationships
                                                            .clients_count >
                                                            2 && (
                                                            <span className="px-3 py-1 text-xs text-zinc-400 rounded-full bg-zinc-800 group-hover:bg-zinc-700 faster-animation">
                                                                +{" "}
                                                                {repository
                                                                    .relationships
                                                                    .clients_count -
                                                                    2}
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>

                                                <td className="px-4 py-4 ">
                                                    <span className="px-3 py-1 text-xs text-zinc-400 rounded-full bg-zinc-800 group-hover:bg-zinc-900 faster-animation">
                                                        {
                                                            repository
                                                                .relationships
                                                                .database_backups_count
                                                        }
                                                    </span>
                                                </td>

                                                <td className="px-4 py-4">
                                                    <span className="text-sm font-medium text-zinc-400">
                                                        {
                                                            repository.last_commit_at_human
                                                        }
                                                    </span>
                                                </td>

                                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                    <div className="flex items-center space-x-2">
                                                        <Link
                                                            href={route(
                                                                "repositories.edit",
                                                                repository.id
                                                            )}
                                                            className="bg-zinc-800 group-hover:bg-zinc-900 p-1 rounded-lg border border-transparent hover:border-green-500 faster-animation"
                                                        >
                                                            <PencilSquareIcon className="w-6 h-6 text-green-500" />
                                                        </Link>

                                                        <Link
                                                            href={route(
                                                                "repositories.show",
                                                                repository.id
                                                            )}
                                                            className="bg-zinc-800 group-hover:bg-zinc-900 p-1 rounded-lg border border-transparent hover:border-sky-500 faster-animation"
                                                        >
                                                            <EyeIcon className="w-6 h-6 text-sky-500" />
                                                        </Link>

                                                        <button
                                                            className="bg-zinc-800 group-hover:bg-zinc-900 p-1 rounded-lg border border-transparent hover:border-red-500 faster-animation"
                                                            onClick={() =>
                                                                toggleModal(
                                                                    repository
                                                                )
                                                            }
                                                        >
                                                            <TrashIcon className="w-6 h-6 text-red-500" />
                                                        </button>

                                                        {/* <Link
                                                        as="button"
                                                        method="delete"
                                                        preserveScroll
                                                        href={route("repositories.destroy", repository.id)}
                                                        className="bg-zinc-800 group-hover:bg-zinc-900 p-1 rounded-lg border border-transparent hover:border-red-500 faster-animation"
                                                    >
                                                        <TrashIcon className="w-6 h-6 text-red-500" />
                                                    </Link> */}
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
                show={toggleDeleteModal}
                onClose={closeModal}
                className="p-10"
            >
                {selectedRepository && (
                    <>
                        <DangerButton onClick={deleteRepository}>
                            {selectedRepository.name}
                        </DangerButton>

                        <SecondaryButton onClick={closeModal}>
                            Zavřít
                        </SecondaryButton>
                    </>
                )}
            </Modal>
        </AuthenticatedLayout>
    );
}
