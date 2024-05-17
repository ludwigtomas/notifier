import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
    FireIcon,
    ArrowRightCircleIcon,
    ChevronRightIcon,
    LinkIcon,
    PencilSquareIcon,
    ArrowPathIcon,
} from "@heroicons/react/24/outline";
import UpdateGitGroups from "@/Pages/Gits/Partials/UpdateGitGroups";
import AttachGitGroups from "@/Pages/Gits/Partials/AttachGitGroups";
import React, { useState, useEffect } from "react";
import Modal from "@/Components/Modal";

export default function ({
    auth,
    git_group,
}) {
    const [isLoading, setIsLoading] = useState(false);
    const [toggleStoreModal, setToggleStoreModal] = useState(false);
    const [repositories, setRepositories] = useState([]);

    const groupRepositories = () => {
        let url = route("api.gitlab.groups");

        setIsLoading(true);

        axios
            .get(url)
            .then((response) => {

                setToggleStoreModal(true);

                setRepositories(response.data);

                setIsLoading(false);
            })
            .catch((error) => {
                alert("Error: " + error);
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
                        <ChevronRightIcon className="size-5" />
                    </span>

                    <Link
                        className="font-semibold text-lg leading-tight hover:text-sky-500 slower-animation"
                        href={route("git-groups.index")}
                    >
                        Git groups
                    </Link>

                    <span>
                        <ChevronRightIcon className="size-5" />
                    </span>

                    <Link
                        className="font-semibold text-lg leading-tight text-sky-500"
                        href={route("git-groups.edit", git_group.group_id)}
                    >
                        {git_group.name}
                    </Link>

                </header>
            }
        >
            <Head title="Dashboard" />

            <div className="sm:px-6 lg:px-8">
                <div className="container mx-auto space-y-6 ">

                    <div className={"p-8 sm:rounded-3xl bg-zinc-900 border-l-8 border-y border-r " + (git_group.parent_id ? "border-red-500" : "border-green-500")}>
                        {git_group.parent_id ? (
                            <section className="relative gap-x-8">
                                <div className="absolute top-1/2 -translate-y-1/2 col-span-4">
                                    <h2 className="text-lg font-medium text-red-800 mb-2">
                                        <span className="bg-red-100 px-2 py-1 rounded-lg">
                                            Children of
                                        </span>
                                    </h2>

                                    <p className="text-gray-300">
                                        This is the children group of <b>{git_group.relationships.parent.name}</b>.
                                    </p>
                                </div>

                                <div className="text-center space-y-2">
                                    <h2 className="text-lg font-medium text-gray-100">
                                        {git_group.relationships.parent.name}
                                    </h2>

                                    <div className="flex items-center justify-center">
                                        <a
                                            className="inline-flex px-4 py-2 rounded-xl text-sm text-gray-200 bg-stone-800 hover:bg-stone-700"
                                            href={git_group.relationships.parent.web_url}
                                            target="_blank"
                                        >
                                            <LinkIcon className="size-5 mr-2"/>

                                            { git_group.relationships.parent.web_url }
                                        </a>
                                    </div>
                                </div>
                            </section>
                        ) : (
                            <section className="relative gap-x-8">
                                <div className="absolute top-1/2 -translate-y-1/2 col-span-4">
                                    <h2 className="text-lg font-medium text-green-800 mb-2">
                                        <span className="bg-green-100 px-2 py-1 rounded-lg">
                                            Parent
                                        </span>
                                    </h2>

                                    <p className="text-gray-300">
                                        This is the parent group.
                                    </p>
                                </div>

                                <div className="text-center space-y-2">
                                    <h2 className="text-lg font-medium text-gray-100">
                                        {git_group.name}
                                    </h2>

                                    <div className="flex items-center justify-center">
                                        <a
                                            className="inline-flex px-4 py-2 rounded-xl text-sm text-gray-200 bg-stone-800 hover:bg-stone-700"
                                            href={git_group.web_url}
                                            target="_blank"
                                        >
                                            <LinkIcon className="size-5 mr-2"/>

                                            { git_group.web_url }
                                        </a>
                                    </div>
                                </div>
                            </section>
                        )}
                    </div>

                    <div className="p-4 sm:rounded-3xl bg-zinc-900">
                        <section className="grid grid-cols-12">
                            <div className="col-span-4 my-auto">
                                <h2 className="text-lg font-medium text-zinc-200 mb-2">
                                    Repositories
                                </h2>

                                <p className="text-zinc-400">
                                    {git_group.relationships.repositories.length} repositories.
                                </p>
                            </div>

                            <div className="col-span-8">
                                <div className="mb-5 col-span-12">
                                    <div className="flex justify-end items-center space-x-2">
                                        <button
                                            className="px-4 py-2 rounded-xl bg-sky-500 text-zinc-100 hover:bg-sky-600"
                                            onClick={groupRepositories}
                                        >
                                            <ArrowPathIcon className="size-6" />
                                        </button>
                                    </div>
                                </div>

                                <div className="p-4 bg-zinc-800 rounded-xl">
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
                                                    Repository URL
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
                                            { git_group.relationships.repositories.map((repository) => {
                                                return (
                                                    <tr
                                                        key={repository.repository_id}
                                                    >
                                                        <td className="px-4 py-3.5 text-sm text-zinc-400 text-left">
                                                            {repository.repository_id}
                                                        </td>

                                                        <td className="px-4 py-3.5 text-sm text-zinc-400 text-left">
                                                            {repository.name}
                                                        </td>

                                                        <td className="px-4 py-3.5 text-sm text-zinc-400 text-left">
                                                            {repository.slug}
                                                        </td>

                                                        <td className="px-4 py-3.5 text-sm text-zinc-400">
                                                            <a
                                                                href={repository.web_url}
                                                                target="_blank"
                                                                className="inline-flex items-center space-x-2 text-gray-200 hover:text-gray-100"
                                                            >
                                                                <LinkIcon className="w-4 h-4" />

                                                                {repository.web_url}
                                                            </a>
                                                        </td>

                                                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                            <div className="flex items-center space-x-2">
                                                                <Link
                                                                    href={route("repositories.edit", repository.repository_id)}
                                                                    className="bg-zinc-800 group-hover:bg-zinc-900 p-1 rounded-lg border border-transparent hover:border-green-500 faster-animation"
                                                                >
                                                                    <PencilSquareIcon className="w-6 h-6 text-green-500" />
                                                                </Link>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </section>
                    </div>

                </div>
            </div>


            <Modal
                show={toggleStoreModal}
                onClose={() => setToggleStoreModal(false)}
            >
                <div className="p-4">
                    <h2 className="text-lg font-medium text-zinc-100">
                        Not working
                    </h2>

                    <p className="mt-1 text-sm text-zinc-400">
                        This feature is not working yet.
                    </p>

                    <div className="mt-4 flex justify-end space-x-4">
                        <button
                            className="px-4 py-2 rounded-md bg-sky-500 text-zinc-100 hover:bg-sky-600"
                            onClick={() => setToggleStoreModal(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>


        </AuthenticatedLayout>
    );
}
