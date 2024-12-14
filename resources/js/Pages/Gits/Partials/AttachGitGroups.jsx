import Modal from "@/Components/Modal";
import React, { useState, useEffect } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import {
    EditButton,
} from '@/Components/Buttons/ActionButtons';
import { router } from "@inertiajs/react";
import GitPlaceholderTable from '@/Pages/Gits/Partials/GitPlaceholderTable';



export default function ({ git_groups, className = "" }) {
    const [toggleDeleteModal, setToggleDeleteModal] = useState(false);
    const [gitGroups, setGitGroups] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState(null);

    const gitlabGroups = () => {
        let url = route("api.gitlab.groups");

        setIsLoading(true);

        axios
            .get(url)
            .then((response) => {
                setGitGroups(response.data);

                setIsLoading(false);
            })
            .catch((error) => {
                alert("Error: " + error);
            });
    };

    useEffect(() => {
        gitlabGroups();
    }, []);


    useEffect(() => {
        if (selectedGroup) {
            let url = route("git-groups.attach");

            router.post(url, {
                type: "parent",
                data: selectedGroup
            }, {
                preserveScroll: true,
            })
        }
    }, [selectedGroup]);

    return (
        <section className={className}>
            <header className="flex justify-between items-center">
                <div>
                    <h2 className="text-lg font-medium text-zinc-100">
                        Attach Git Groups
                    </h2>

                    <p className="mt-1 text-sm text-zinc-400">
                        Update your git groups.
                    </p>
                </div>

                <div className="flex items-center space-x-2">
                    <button
                        className="px-4 py-2 rounded-md bg-sky-500 text-zinc-100 hover:bg-sky-600"
                        onClick={gitlabGroups}
                    >
                        <ArrowPathIcon className="size-6" />
                    </button>

                    <button
                        className="px-4 py-2 rounded-md bg-sky-500 text-zinc-100 hover:bg-sky-600"
                        onClick={() => setToggleDeleteModal(true)}
                    >
                        Přidat ručně
                    </button>
                </div>
            </header>

            <div className="pt-5">
                <div className="max-w-[100rem] mx-auto">
                    <div className="bg-zinc-900 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="divide-y divide-zinc-800 ">
                            { isLoading ? (
                                <div className="space-y-10">
                                    <GitPlaceholderTable/>
                                    <GitPlaceholderTable/>
                                    <GitPlaceholderTable/>
                                </div>
                            ) : gitGroups && gitGroups.data ? (
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
                                                URL
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
                                                Hlavní skupina
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
                                    <tbody className="divide-y divide-zinc-700 bg-zinc-800">
                                        {gitGroups.data.map((group) => (
                                            <tr
                                                key={group.id}
                                                className="group hover:bg-zinc-700"
                                            >
                                                <td className="px-4 py-4 ">
                                                    <span className="text-sm font-medium text-zinc-200">
                                                        {group.id}
                                                    </span>
                                                </td>

                                                <td className="px-4 py-4 ">
                                                    <span className="text-sm font-medium text-zinc-200">
                                                        {group.web_url}
                                                    </span>
                                                </td>

                                                <td className="px-4 py-4 ">
                                                    <span className="text-sm font-medium text-zinc-200">
                                                        {group.full_path}
                                                    </span>
                                                </td>

                                                <td className="px-4 py-4 ">
                                                    <span className={`flex justify-center w-20 mx-auto uppercase text-xs py-1 rounded-xl font-bold ${group.parent_id ? "text-red-800 bg-red-100" : "text-green-800 bg-green-100"}`}>
                                                        {group.parent_id ? 'children' : "parent"}
                                                    </span>
                                                </td>

                                                <td className="px-4 py-4 ">
                                                    <div className="flex items-center justify-center space-x-2 text-sm font-medium text-zinc-200">
                                                        {git_groups.find(git_group => git_group.group_id === group.id) ? (
                                                            <>
                                                                <button
                                                                    className="px-4 py-2 rounded-md bg-stone-700 text-zinc-100 group-hover:bg-stone-800"
                                                                    disabled
                                                                >
                                                                    Already attached
                                                                </button>

                                                                <EditButton href={route("git-groups.edit", group.id)} />
                                                            </>
                                                        ) : (
                                                            <button
                                                                className="px-4 py-2 rounded-md bg-green-500 text-zinc-100 hover:bg-green-600"
                                                                onClick={() => {setSelectedGroup(group)}}
                                                            >
                                                                Attach
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="p-4 text-center text-zinc-400">
                                    No data available
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                show={toggleDeleteModal}
                onClose={() => setToggleDeleteModal(false)}
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
                            onClick={() => setToggleDeleteModal(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>
        </section>
    );
}
