import Modal from '@/Components/Modal'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { router } from '@inertiajs/react'
import { EditButton, ShowButton } from '@/Components/Buttons/ActionButtons'
import { PencilSquareIcon, EyeIcon, TrashIcon } from '@heroicons/react/24/outline'

export default function ({ className = '', git_groups, repositories }) {
    const [toggleUpdateModal, setToggleUpdateModal] = useState(false)
    const [selectedGroup, setSelectedGroup] = useState(null)
    const [gitInformations, setGitInformations] = useState(null)

    const [subgroups, setSubgroups] = useState([])

    const handleToggle = (group, modal_status) => {
        setSelectedGroup(group)
        setToggleUpdateModal(modal_status)
    }

    useEffect(() => {
        if (!selectedGroup) {
            return
        }

        // Get group details
        axios
            .get(route('api.gitlab.groups.detail', selectedGroup.group_id))
            .then((response) => {
                setGitInformations(response.data.data)
            })
            .catch((error) => {
                alert('Error: ' + error)
            })

        // Get subgroups
        axios
            .get(route('api.gitlab.subgroups', selectedGroup.group_id))
            .then((response) => {
                setSubgroups(response.data.data)
            })
            .catch((error) => {
                alert('Error: ' + error)
            })
    }, [selectedGroup])

    const storeProject = (group_id, repository_id) => {
        let url = route('repositories.store')

        router.post(
            url,
            {
                group_id: group_id,
                repository_id: repository_id,
            },
            {
                preserveScroll: true,

                onError: () => {
                    alert('Error')
                },
            }
        )
    }

    const storeSubgroup = (group_id, subgroup) => {
        let url = route('git-groups.attach')

        router.post(
            url,
            {
                type: 'child',
                group_id: group_id,
                subgroup: subgroup,
            },
            {
                preserveScroll: true,

                onError: () => {
                    alert('Error')
                },
            }
        )
    }

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-zinc-100">Update Git Groups</h2>

                <p className="mt-1 text-sm text-zinc-400">Update your git groups.</p>
            </header>

            <div className="pt-5">
                <div className="mx-auto max-w-[100rem]">
                    <div className="overflow-hidden bg-zinc-900 shadow-sm sm:rounded-lg">
                        <div className="divide-y divide-zinc-800">
                            {git_groups ? (
                                <table className="min-w-full divide-y divide-zinc-700 overflow-hidden rounded-md">
                                    <thead className="text-nowrap bg-zinc-950">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-left text-sm font-normal text-zinc-400"
                                            >
                                                #
                                            </th>

                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-left text-sm font-normal text-zinc-400"
                                            >
                                                Název
                                            </th>

                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-left text-sm font-normal text-zinc-400"
                                            >
                                                Url
                                            </th>

                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-center text-sm font-normal text-zinc-400"
                                            >
                                                Hlavní skupina
                                            </th>

                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-left text-sm font-normal text-zinc-400"
                                            >
                                                <span className="sr-only">Edit</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-zinc-700 bg-zinc-800">
                                        {git_groups.map((group) => (
                                            <tr
                                                key={group.group_id}
                                                className="hover:bg-zinc-700"
                                            >
                                                <td className="px-4 py-4">
                                                    <span className="text-sm font-medium text-zinc-200">{group.group_id}</span>
                                                </td>

                                                <td className="px-4 py-4">
                                                    <span className="text-sm font-medium text-zinc-200">{group.name}</span>
                                                </td>

                                                <td className="px-4 py-4">
                                                    <a
                                                        href={group.web_url}
                                                        target="_blank"
                                                        className="text-sm font-medium text-zinc-200 hover:underline"
                                                        rel="noreferrer"
                                                    >
                                                        {group.web_url}
                                                    </a>
                                                </td>

                                                <td className="px-4 py-4">
                                                    <span
                                                        className={`mx-auto flex w-20 justify-center rounded-xl py-1 text-xs font-bold uppercase ${group.parent_id ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}
                                                    >
                                                        {group.parent_id ? 'children' : 'parent'}
                                                    </span>
                                                </td>

                                                <td className="px-4 py-4">
                                                    <div className="space-x-2">
                                                        <button
                                                            className="inline-flex items-center rounded-md border border-transparent bg-blue-100 p-1.5 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-blue-200"
                                                            onClick={() => handleToggle(group, true)}
                                                        >
                                                            <EyeIcon className="size-6 text-blue-500" />
                                                        </button>

                                                        <EditButton href={route('git-groups.edit', group.group_id)} />

                                                        <button className="inline-flex cursor-not-allowed items-center rounded-md border border-transparent bg-red-100 p-1.5 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-red-200">
                                                            <TrashIcon className="size-6 text-red-500" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="p-6">
                                    <p className="text-center text-zinc-400">No git groups found.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                show={toggleUpdateModal}
                onClose={() => setToggleUpdateModal(false)}
                maxWidth="7xl"
            >
                {selectedGroup && (
                    <div className="p-4">
                        <h2 className="text-center text-lg font-medium text-zinc-100">{selectedGroup.name}</h2>

                        {gitInformations && (
                            <div className="mt-4 grid grid-cols-12 gap-2">
                                <div className="col-span-4 h-full rounded-xl border border-stone-800 bg-stone-700 p-2">
                                    <div className="grid grid-cols-1 gap-4 text-center">
                                        <div className="col-span-1 border-b border-zinc-900">
                                            <p className="text-sm text-zinc-400">ID</p>
                                            <p className="text-xl font-medium text-zinc-100">{gitInformations.id}</p>
                                        </div>

                                        <div>
                                            <p className="text-sm text-zinc-400">Name</p>
                                            <p className="text-md font-bold uppercase text-zinc-200">{gitInformations.name}</p>
                                        </div>

                                        <div>
                                            <p className="text-sm text-zinc-400">Path</p>
                                            <p className="text-md font-bold uppercase text-zinc-200">{gitInformations.path}</p>
                                        </div>

                                        <div>
                                            <p className="text-sm text-zinc-400">Full Path</p>
                                            <p className="text-md font-bold uppercase text-zinc-200">{gitInformations.full_path}</p>
                                        </div>

                                        <div>
                                            <p className="text-sm text-zinc-400">Web Url</p>
                                            <p className="text-md font-bold uppercase text-zinc-200">
                                                <a
                                                    href={gitInformations.web_url}
                                                    target="_blank"
                                                    className="hover:underline"
                                                    rel="noreferrer"
                                                >
                                                    {gitInformations.web_url}
                                                </a>
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-sm text-zinc-400">Parent Id</p>
                                            <p className="text-md font-bold uppercase text-zinc-200">
                                                {gitInformations.parent_id ? gitInformations.parent_id : 'N/A'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-8 grid gap-y-2">
                                    <div className="grid h-[20rem] overflow-y-auto">
                                        <div className="rounded-xl border border-stone-800 bg-stone-700 p-2">
                                            <div className="flex items-center justify-center">
                                                <p className="pb-2 text-xl text-zinc-200">Projekty</p>
                                            </div>

                                            {gitInformations.projects && gitInformations.projects.length > 0 ? (
                                                <table className="min-w-full divide-y divide-zinc-700 overflow-hidden rounded-md">
                                                    <thead className="text-nowrap bg-stone-800">
                                                        <tr>
                                                            <th
                                                                scope="col"
                                                                className="px-4 py-3.5 text-left text-sm font-normal text-zinc-400"
                                                            >
                                                                #
                                                            </th>

                                                            <th
                                                                scope="col"
                                                                className="px-4 py-3.5 text-left text-sm font-normal text-zinc-400"
                                                            >
                                                                ID
                                                            </th>

                                                            <th
                                                                scope="col"
                                                                className="px-4 py-3.5 text-left text-sm font-normal text-zinc-400"
                                                            >
                                                                Name
                                                            </th>

                                                            <th
                                                                scope="col"
                                                                className="px-4 py-3.5 text-left text-sm font-normal text-zinc-400"
                                                            >
                                                                URL
                                                            </th>

                                                            <th
                                                                scope="col"
                                                                className="px-4 py-3.5 text-left text-sm font-normal text-zinc-400"
                                                            >
                                                                <span className="sr-only">Edit</span>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-zinc-700 bg-zinc-800">
                                                        {gitInformations.projects.map((project, index) => (
                                                            <tr
                                                                key={project.id}
                                                                className="rounded-md bg-stone-700 p-4"
                                                            >
                                                                <td className="px-4 py-4">
                                                                    <span className="text-sm font-medium text-zinc-200">{index + 1}</span>
                                                                </td>

                                                                <td className="px-4 py-4">
                                                                    <span className="text-sm font-medium text-zinc-200">{project.id}</span>
                                                                </td>

                                                                <td className="px-4 py-4">
                                                                    <span className="text-sm font-medium text-zinc-200">
                                                                        {project.name}
                                                                    </span>
                                                                </td>

                                                                <td className="px-4 py-4">
                                                                    <a
                                                                        href={project.web_url}
                                                                        target="_blank"
                                                                        className="text-sm font-medium text-zinc-200 hover:underline"
                                                                        rel="noreferrer"
                                                                    >
                                                                        {project.web_url}
                                                                    </a>
                                                                </td>

                                                                <td className="px-4 py-4">
                                                                    <button
                                                                        className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                                                                        onClick={() => storeProject(gitInformations.id, project.id)}
                                                                    >
                                                                        Přidat
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            ) : (
                                                <div className="py-2 text-center">
                                                    <p className="text-sm text-red-500">
                                                        No <b>projects</b> found.
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid h-[20rem] overflow-y-auto">
                                        <div className="rounded-xl border border-stone-800 bg-stone-700 p-2">
                                            <div className="flex items-center justify-center">
                                                <p className="pb-2 text-xl text-zinc-200">Sub Groups</p>
                                            </div>

                                            {subgroups && subgroups.length > 0 ? (
                                                <table className="min-w-full divide-y divide-zinc-700 overflow-hidden rounded-md">
                                                    <thead className="text-nowrap bg-stone-800">
                                                        <tr>
                                                            <th
                                                                scope="col"
                                                                className="px-4 py-3.5 text-left text-sm font-normal text-zinc-400"
                                                            >
                                                                #
                                                            </th>

                                                            <th
                                                                scope="col"
                                                                className="px-4 py-3.5 text-left text-sm font-normal text-zinc-400"
                                                            >
                                                                ID
                                                            </th>

                                                            <th
                                                                scope="col"
                                                                className="px-4 py-3.5 text-left text-sm font-normal text-zinc-400"
                                                            >
                                                                Name
                                                            </th>

                                                            <th
                                                                scope="col"
                                                                className="px-4 py-3.5 text-left text-sm font-normal text-zinc-400"
                                                            >
                                                                URL
                                                            </th>

                                                            <th
                                                                scope="col"
                                                                className="px-4 py-3.5 text-left text-sm font-normal text-zinc-400"
                                                            >
                                                                <span className="sr-only">Edit</span>
                                                            </th>
                                                        </tr>
                                                    </thead>

                                                    <tbody className="divide-y divide-zinc-700 bg-zinc-800">
                                                        {subgroups.map((subgroup, index) => (
                                                            <tr
                                                                key={subgroup.id}
                                                                className="group rounded-md bg-stone-700 p-4 hover:bg-stone-800"
                                                            >
                                                                <td className="px-4 py-4">
                                                                    <span className="text-sm font-medium text-zinc-200">{index + 1}</span>
                                                                </td>

                                                                <td className="px-4 py-4">
                                                                    <span className="text-sm font-medium text-zinc-200">{subgroup.id}</span>
                                                                </td>

                                                                <td className="px-4 py-4">
                                                                    <span className="text-sm font-medium text-zinc-200">
                                                                        {subgroup.name}
                                                                    </span>
                                                                </td>

                                                                <td className="px-4 py-4">
                                                                    <span className="text-sm font-medium text-zinc-200">
                                                                        {subgroup.web_url}
                                                                    </span>
                                                                </td>

                                                                <td className="px-4 py-4">
                                                                    {git_groups.find((git_group) => git_group.group_id === subgroup.id) ? (
                                                                        <button
                                                                            className="rounded-md bg-stone-800 px-4 py-2 text-zinc-100 group-hover:bg-stone-700"
                                                                            disabled
                                                                        >
                                                                            Already attached
                                                                        </button>
                                                                    ) : (
                                                                        <button
                                                                            className="rounded-md bg-green-500 px-4 py-2 text-zinc-100 hover:bg-green-600"
                                                                            onClick={() => {
                                                                                storeSubgroup(selectedGroup.group_id, subgroup)
                                                                            }}
                                                                        >
                                                                            Attach
                                                                        </button>
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            ) : (
                                                <div className="py-2 text-center">
                                                    <p className="text-sm text-red-500">
                                                        No <b>subgroups</b> found.
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="mt-4 flex justify-end space-x-4">
                            <button
                                className="rounded-md bg-stone-700 px-4 py-2 text-zinc-100 hover:bg-stone-600"
                                onClick={() => setToggleUpdateModal(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </section>
    )
}
