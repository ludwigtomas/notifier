import Modal from "@/Components/Modal";
import React, { useState, useEffect } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import axios from "axios";

export default function ({ className = "" }) {
    const [toggleDeleteModal, setToggleDeleteModal] = useState(false);
    const [gitGroups, setGitGroups] = useState([]);

    const gitlabGroups = () => {
        let url = route("api.gitlab.groups");

        axios
            .get(url)
            .then((response) => {
                setGitGroups(response.data);
            })
            .catch((error) => {
                alert(error);
            });
    };

    useEffect(() => {
        gitlabGroups();
    }, []);

    return (
        <section className={className}>
            <header className="flex justify-between items-center">
                <div>
                    <h2 className="text-lg font-medium text-zinc-100">
                        Git groups add
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

            <div className="py-12">
                <div className="max-w-[100rem] mx-auto sm:px-6 lg:px-8">
                    <div className="bg-zinc-900 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="border-4 border-zinc-900 divide-y divide-zinc-800 ">
                            { gitGroups && gitGroups.data ? (
                                <table className="min-w-full divide-y divide-zinc-700 rounded-md overflow-hidden">
                                    <thead className="bg-zinc-950 text-nowrap">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400"
                                            >
                                                #
                                            </th>

                                            <th scope="col"></th>

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
                                        {gitGroups.data.map((repository) => (
                                            <tr
                                                key={repository.id}
                                                className="group hover:bg-zinc-800"
                                            >
                                                <td className="px-4 py-4 ">
                                                    <span className="text-sm font-medium text-zinc-400">
                                                        {repository.id}
                                                    </span>
                                                </td>

                                                <td className="px-4 py-4 ">
                                                    <span className="text-sm font-medium text-zinc-400">
                                                        {repository.web_url}
                                                    </span>
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
                        Delete Git
                    </h2>

                    <p className="mt-1 text-sm text-zinc-400">
                        Are you sure you want to delete this Git?
                    </p>

                    <div className="mt-4 flex justify-end space-x-4">
                        <button
                            className="px-4 py-2 rounded-md bg-sky-500 text-zinc-100 hover:bg-sky-600"
                            onClick={() => setToggleDeleteModal(false)}
                        >
                            Cancel
                        </button>

                        <button className="px-4 py-2 rounded-md bg-red-500 text-zinc-100 hover:bg-red-600">
                            Delete
                        </button>
                    </div>
                </div>
            </Modal>
        </section>
    );
}
