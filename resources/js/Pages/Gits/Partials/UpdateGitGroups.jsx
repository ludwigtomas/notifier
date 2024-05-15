import Modal from "@/Components/Modal";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    ArrowPathIcon
} from "@heroicons/react/24/solid";
import { router } from "@inertiajs/react";

export default function ({ git, className = "" }) {
    const [toggleUpdateModal, setToggleUpdateModal] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [gitInformations, setGitInformations] = useState(null);

    const [subgroups, setSubgroups] = useState([]);

    const handleToggle = (group, modal_status) => {
        setSelectedGroup(group);
        setToggleUpdateModal(modal_status);
    }

    useEffect(() => {
        if (!selectedGroup) {
            return;
        }

        let url_groups = route('api.gitlab.groups.detail', selectedGroup.group_id)

        axios
            .get(url_groups)
            .then((response) => {
                setGitInformations(response.data.data);
            })
            .catch((error) => {
                alert('Error: ' + error);
            })

        let url_subgroups = route('api.gitlab.subgroups', selectedGroup.group_id)

        axios
            .get(url_subgroups)
            .then((response) => {
                setSubgroups(response.data.data);
            })
            .catch((error) => {
                alert('Error: ' + error);
            })

    }, [selectedGroup]);

    const storeProject = (group_id, repository_id) => {
        let url = route('repositories.store');

        router.post(url, {
            group_id: group_id,
            repository_id: repository_id
        }, {
            preserveScroll: true,

            onSuccess: () => {
                setToggleUpdateModal(false);
            },

            onError: () => {
                alert('Error');
            }
        })
    }

    const storeSubgroup = (group_id, subgroup) => {
        let url = route('git-groups.attach');

        router.post(url, {
            type: 'child',
            group_id: group_id,
            subgroup: subgroup
        }, {
            preserveScroll: true,

            onSuccess: () => {
                setToggleUpdateModal(false);
            },

            onError: () => {
                alert('Error');
            }
        })
    }

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-zinc-100">
                    Update Git Groups
                </h2>

                <p className="mt-1 text-sm text-zinc-400">
                    Update your git groups.
                </p>
            </header>

            <div className="pt-5">
                <div className="max-w-[100rem] mx-auto">
                    <div className="bg-zinc-900 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="divide-y divide-zinc-800">
                            { git.relationships.git_groups ? (
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
                                                Název
                                            </th>

                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400"
                                            >
                                                Url
                                            </th>

                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-sm font-normal text-center text-zinc-400"
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
                                        {git.relationships.git_groups.map((group) => (
                                            <tr
                                                key={group.group_id}
                                                className="hover:bg-zinc-700"
                                            >
                                                <td className="px-4 py-4 ">
                                                    <span className="text-sm font-medium text-zinc-200">
                                                        {group.group_id}
                                                    </span>
                                                </td>

                                                <td className="px-4 py-4 ">
                                                    <span className="text-sm font-medium text-zinc-200">
                                                        {group.name}
                                                    </span>
                                                </td>

                                                <td className="px-4 py-4 ">
                                                    <a
                                                        href={group.web_url}
                                                        target="_blank"
                                                        className="text-sm font-medium text-zinc-200 hover:underline"
                                                    >
                                                        {group.web_url}
                                                    </a>
                                                </td>

                                                <td className="px-4 py-4 ">
                                                    <span className={`flex justify-center w-20 mx-auto uppercase text-xs py-1 rounded-xl font-bold ${group.parent_id ? "text-red-800 bg-red-100" : "text-green-800 bg-green-100"}`}>
                                                        {group.parent_id ? 'children' : "parent"}
                                                    </span>
                                                </td>

                                                <td className="px-4 py-4 ">
                                                    <div>
                                                        <button
                                                            className="px-4 py-2 rounded-md bg-sky-500 text-zinc-100 hover:bg-sky-600"
                                                            onClick={() => handleToggle(group, true)}
                                                        >
                                                            Details
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="p-6">
                                    <p className="text-center text-zinc-400">
                                        No git groups found.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                show={toggleUpdateModal}
                onClose={() => setToggleUpdateModal(false)}
                maxWidth="6xl"
            >
                { selectedGroup && (
                    <div className="p-4">
                        <h2 className="text-lg font-medium text-zinc-100 text-center">
                            {selectedGroup.name}
                        </h2>

                        { gitInformations && (
                            <div className="mt-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2 text-center bg-stone-700 py-2">
                                        <p className="text-xs text-zinc-200">
                                            ID
                                        </p>
                                        <p className="text-xl  font-medium text-zinc-100">
                                            {gitInformations.id}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs font-medium text-zinc-200">
                                            Name
                                        </p>
                                        <p className="text-sm text-zinc-400">
                                            {gitInformations.name}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs font-medium text-zinc-200">
                                            Path
                                        </p>
                                        <p className="text-sm text-zinc-400">
                                            {gitInformations.path}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs font-medium text-zinc-200">
                                            Full Path
                                        </p>
                                        <p className="text-sm text-zinc-400">
                                            {gitInformations.full_path}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs font-medium text-zinc-200">
                                            Web Url
                                        </p>
                                        <p className="text-sm text-zinc-400">
                                            <a
                                                href={gitInformations.web_url}
                                                target="_blank"
                                                className="hover:underline"
                                            >
                                                {gitInformations.web_url}
                                            </a>
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs font-medium text-zinc-200">
                                            Parent Id
                                        </p>
                                        <p className="text-sm text-zinc-400">
                                            {gitInformations.parent_id ? gitInformations.parent_id : 'N/A'}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-5 grid h-72 overflow-y-auto">
                                    <div className="text-center bg-stone-700 py-2">
                                        <p className="text-xl text-zinc-200">
                                            Projekty
                                        </p>
                                    </div>

                                    {gitInformations.projects && gitInformations.projects.length > 0 ? (
                                        <table className="min-w-full divide-y divide-zinc-700 rounded-md overflow-hidden">
                                            <thead className="bg-stone-800 text-nowrap">
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
                                                        ID
                                                    </th>

                                                    <th
                                                        scope="col"
                                                        className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400"
                                                    >
                                                        Name
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
                                                        <span className="sr-only">
                                                            Edit
                                                        </span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-zinc-700 bg-zinc-800">
                                                {gitInformations.projects.map((project, index) => (
                                                    <tr
                                                        key={project.id}
                                                        className="bg-stone-700 p-4 rounded-md"
                                                    >
                                                        <td className="px-4 py-4 ">
                                                            <span className="text-sm font-medium text-zinc-200">
                                                                {index + 1}
                                                            </span>
                                                        </td>

                                                        <td className="px-4 py-4 ">
                                                            <span className="text-sm font-medium text-zinc-200">
                                                                {project.id}
                                                            </span>
                                                        </td>

                                                        <td className="px-4 py-4 ">
                                                            <span className="text-sm font-medium text-zinc-200">
                                                                {project.name}
                                                            </span>
                                                        </td>

                                                        <td className="px-4 py-4 ">
                                                            <a
                                                                href={project.web_url}
                                                                target="_blank"
                                                                className="text-sm font-medium text-zinc-200 hover:underline"
                                                            >
                                                                {project.web_url}
                                                            </a>
                                                        </td>

                                                        <td className="px-4 py-4">
                                                        {/* {git_groups.find(git_group => git_group.group_id === group.id) ? (
                                                                <button
                                                                    className="px-4 py-2 rounded-md bg-stone-700 text-zinc-100 group-hover:bg-stone-800"
                                                                    disabled
                                                                >
                                                                    Already attached
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    className="px-4 py-2 rounded-md bg-green-500 text-zinc-100 hover:bg-green-600"
                                                                    onClick={() => {setSelectedGroup(group)}}
                                                                >
                                                                    Attach
                                                                </button>
                                                            )} */}
                                                            <button
                                                                className="px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600"
                                                                onClick={() => storeProject(gitInformations.id, project.id)}
                                                            >
                                                                Přidat
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    ): (
                                        <div className="text-center py-2">
                                            <p className="text-sm text-red-500">
                                                No <b>projects</b> found.
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-5 grid">
                                    <div className="text-center bg-stone-700 py-2">
                                        <p className="text-xl text-zinc-200">
                                            Sub Groups
                                        </p>
                                    </div>

                                    {subgroups && subgroups.length > 0 ? (
                                        <table className="min-w-full divide-y divide-zinc-700 rounded-md overflow-hidden">
                                            <thead className="bg-stone-800 text-nowrap">
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
                                                        ID
                                                    </th>

                                                    <th
                                                        scope="col"
                                                        className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400"
                                                    >
                                                        Name
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
                                                        <span className="sr-only">
                                                            Edit
                                                        </span>
                                                    </th>
                                                </tr>
                                            </thead>

                                            <tbody className="divide-y divide-zinc-700 bg-zinc-800">
                                                {subgroups.map((subgroup, index) => (
                                                    <tr
                                                        key={subgroup.id}
                                                        className="bg-stone-700 p-4 rounded-md"
                                                    >
                                                        <td className="px-4 py-4 ">
                                                            <span className="text-sm font-medium text-zinc-200">
                                                                {index + 1}
                                                            </span>
                                                        </td>

                                                        <td className="px-4 py-4 ">
                                                            <span className="text-sm font-medium text-zinc-200">
                                                                {subgroup.id}
                                                            </span>
                                                        </td>

                                                        <td className="px-4 py-4 ">
                                                            <span className="text-sm font-medium text-zinc-200">
                                                                {subgroup.name}
                                                            </span>
                                                        </td>

                                                        <td className="px-4 py-4 ">
                                                            <span className="text-sm font-medium text-zinc-200">
                                                                {subgroup.web_url}
                                                            </span>
                                                        </td>

                                                        <td className="px-4 py-4">
                                                            <button
                                                                className="px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600"
                                                                onClick={() => {storeSubgroup(selectedGroup.group_id, subgroup)}}
                                                            >
                                                                Attach
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    ): (
                                        <div className="text-center py-2">
                                            <p className="text-sm text-red-500">
                                                No <b>subgroups</b> found.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        <div className="mt-4 flex justify-end space-x-4">
                            <button
                                className="px-4 py-2 rounded-md bg-sky-500 text-zinc-100 hover:bg-sky-600"
                                onClick={() => setToggleUpdateModal(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </Modal>

        </section>
    );
}
