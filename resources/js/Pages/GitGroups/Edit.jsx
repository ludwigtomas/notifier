import AdminLayout from '@/Layouts/AdminLayout'
import { Head, Link } from '@inertiajs/react'
import { ChevronRightIcon, LinkIcon, PencilSquareIcon, ArrowPathIcon, EyeIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'
import Modal from '@/Components/Modal'
import { router } from '@inertiajs/react'

export default function ({ auth, git_group }) {
    const [isLoading, setIsLoading] = useState(false)
    const [toggleRepositoriesModal, setToggleRepositoriesModal] = useState(false)
    const [toggleSubgroupsModal, setToggleSubgroupsModal] = useState(false)
    const [repositories, setRepositories] = useState([])
    const [subgroups, setSubgroups] = useState([])

    const groupRepositories = () => {
        let url = route('api.gitlab.group.repositories', git_group.group_id)

        setIsLoading(true)

        axios
            .get(url)
            .then((response) => {
                setToggleRepositoriesModal(true)

                setRepositories(response.data.data)

                setIsLoading(false)
            })
            .catch((error) => {
                alert('Error: ' + error)
            })
    }

    const groupSubgroups = () => {
        let url = route('api.gitlab.subgroups', git_group.group_id)

        setIsLoading(true)

        axios
            .get(url)
            .then((response) => {
                setToggleSubgroupsModal(true)

                setSubgroups(response.data.data)

                setIsLoading(false)
            })
            .catch((error) => {
                alert('Error: ' + error)
            })
    }

    const storeRepository = (repository_id) => {
        let url = route('repositories.store')

        router.post(
            url,
            {
                group_id: git_group.group_id,
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

    const storeSubgroup = (group) => {
        let url = route('git-groups.store')

        router.post(
            url,
            { group },
            {
                preserveScroll: true,

                onError: () => {
                    alert('Error')
                },
            }
        )
    }

    return (
        <AdminLayout
            user={auth.user}
            header={
                <header className="flex flex-row items-center justify-start space-x-4 text-zinc-500">
                    <Link
                        className="slower-animation text-lg font-semibold leading-tight hover:text-sky-500"
                        href={route('dashboard.index')}
                    >
                        Dashboard
                    </Link>

                    <span>
                        <ChevronRightIcon className="size-5" />
                    </span>

                    <Link
                        className="slower-animation text-lg font-semibold leading-tight hover:text-sky-500"
                        href={route('git-groups.index')}
                    >
                        Git groups
                    </Link>

                    <span>
                        <ChevronRightIcon className="size-5" />
                    </span>

                    <Link
                        className="text-lg font-semibold leading-tight text-sky-500"
                        href={route('git-groups.edit', git_group.group_id)}
                    >
                        {git_group.name}
                    </Link>
                </header>
            }
        >
            <Head title="Dashboard" />

            <div className="sm:px-6 lg:px-8">
                <div className="container mx-auto space-y-6">
                    <div
                        className={
                            'border-y border-l-8 border-r bg-zinc-900 p-8 sm:rounded-3xl ' +
                            (git_group.parent_id ? 'border-red-500' : 'border-green-500')
                        }
                    >
                        {git_group.parent_id ? (
                            <section className="relative gap-x-8">
                                <div className="absolute top-1/2 col-span-4 -translate-y-1/2 text-center">
                                    <p className="mb-2 text-lg font-bold text-gray-300">Parent is</p>

                                    <Link
                                        href={route('git-groups.edit', git_group.relationships.parent.group_id)}
                                        className="rounded-lg bg-red-100 px-2 py-1 hover:bg-red-200"
                                    >
                                        <span className="text-lg font-medium text-red-800">{git_group.relationships.parent.name}</span>
                                    </Link>
                                </div>

                                <div className="space-y-2 text-center">
                                    <h2 className="text-lg font-medium text-gray-100">{git_group.name}</h2>

                                    <div className="flex items-center justify-center">
                                        <a
                                            className="inline-flex rounded-xl bg-stone-800 px-4 py-2 text-sm text-gray-200 hover:bg-stone-700"
                                            href={git_group.web_url}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <LinkIcon className="mr-2 size-5" />

                                            {git_group.web_url}
                                        </a>
                                    </div>
                                </div>
                            </section>
                        ) : (
                            <section className="relative gap-x-8">
                                <div className="absolute top-1/2 col-span-4 -translate-y-1/2">
                                    <h2 className="mb-2 text-lg font-medium text-green-800">
                                        <span className="rounded-lg bg-green-100 px-2 py-1">Parent</span>
                                    </h2>

                                    <p className="text-gray-300">This is the parent group.</p>
                                </div>

                                <div className="space-y-2 text-center">
                                    <h2 className="text-lg font-medium text-gray-100">{git_group.name}</h2>

                                    <div className="flex items-center justify-center">
                                        <a
                                            className="inline-flex rounded-xl bg-stone-800 px-4 py-2 text-sm text-gray-200 hover:bg-stone-700"
                                            href={git_group.web_url}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <LinkIcon className="mr-2 size-5" />

                                            {git_group.web_url}
                                        </a>
                                    </div>
                                </div>
                            </section>
                        )}
                    </div>

                    <div className="bg-zinc-900 p-4 sm:rounded-3xl">
                        <section className="grid grid-cols-12">
                            <div className="col-span-4 my-auto">
                                <h2 className="mb-2 text-lg font-medium text-zinc-200">Children groups</h2>

                                <p className="text-zinc-400">{git_group.relationships.childrens.length} children groups.</p>
                            </div>

                            <div className="col-span-8">
                                <div className="col-span-12 mb-5">
                                    <div className="flex items-center justify-end space-x-2">
                                        <button
                                            className="rounded-xl bg-sky-500 px-4 py-2 text-zinc-100 hover:bg-sky-600"
                                            onClick={groupSubgroups}
                                        >
                                            <ArrowPathIcon className="size-6" />
                                        </button>
                                    </div>
                                </div>

                                <div className="rounded-xl bg-zinc-800 p-4">
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
                                                    Group name
                                                </th>

                                                <th
                                                    scope="col"
                                                    className="px-4 py-3.5 text-left text-sm font-normal text-zinc-400"
                                                >
                                                    Group URL
                                                </th>

                                                <th
                                                    scope="col"
                                                    className="px-4 py-3.5 text-left text-sm font-normal text-zinc-400"
                                                >
                                                    <span className="sr-only">Edit</span>
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody className="divide-y divide-zinc-700 bg-zinc-900">
                                            {git_group.relationships.childrens.map((group) => {
                                                return (
                                                    <tr key={group.group_id}>
                                                        <td className="px-4 py-3.5 text-left text-sm text-zinc-400">{group.group_id}</td>

                                                        <td className="px-4 py-3.5 text-left text-sm text-zinc-400">{group.name}</td>

                                                        <td className="px-4 py-3.5 text-sm text-zinc-400">
                                                            <a
                                                                href={group.web_url}
                                                                target="_blank"
                                                                className="inline-flex items-center space-x-2 text-gray-200 hover:text-gray-100"
                                                                rel="noreferrer"
                                                            >
                                                                <LinkIcon className="mr-2 h-4 w-4" />

                                                                {group.web_url}
                                                            </a>
                                                        </td>

                                                        <td className="whitespace-nowrap px-4 py-4 text-sm">
                                                            <div className="flex items-center space-x-2">
                                                                <Link
                                                                    href={route('git-groups.edit', group.group_id)}
                                                                    className="faster-animation rounded-lg border border-transparent bg-zinc-800 p-1 hover:border-green-500 group-hover:bg-zinc-900"
                                                                >
                                                                    <PencilSquareIcon className="h-6 w-6 text-green-500" />
                                                                </Link>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="bg-zinc-900 p-4 sm:rounded-3xl">
                        <section className="grid grid-cols-12">
                            <div className="col-span-4 my-auto">
                                <h2 className="mb-2 space-x-2 text-lg font-medium text-zinc-200">
                                    <span className="underline underline-offset-8">Repositories</span>
                                    <span>attached to</span>
                                    <span className="underline underline-offset-8">{git_group.name}</span>
                                </h2>

                                <div className="mt-5 space-y-2 text-zinc-400">
                                    <p>Repositories attached to this group.</p>

                                    <p>{git_group.relationships.repositories.length} repositories.</p>
                                </div>
                            </div>

                            <div className="col-span-8">
                                <div className="col-span-12 mb-5">
                                    <div className="flex items-center justify-end space-x-2">
                                        <button
                                            className="rounded-xl bg-sky-500 px-4 py-2 text-zinc-100 hover:bg-sky-600"
                                            onClick={groupRepositories}
                                        >
                                            <ArrowPathIcon className="size-6" />
                                        </button>
                                    </div>
                                </div>

                                <div className="rounded-xl bg-zinc-800 p-4">
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
                                                    Repozitář
                                                </th>

                                                <th
                                                    scope="col"
                                                    className="px-4 py-3.5 text-left text-sm font-normal text-zinc-400"
                                                >
                                                    Slug
                                                </th>

                                                <th
                                                    scope="col"
                                                    className="px-4 py-3.5 text-center text-sm font-normal text-zinc-400"
                                                >
                                                    Repository URL
                                                </th>

                                                <th
                                                    scope="col"
                                                    className="px-4 py-3.5 text-left text-sm font-normal text-zinc-400"
                                                >
                                                    <span className="sr-only">Edit</span>
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody className="divide-y divide-zinc-700 bg-zinc-900">
                                            {git_group.relationships.repositories.map((repository) => {
                                                return (
                                                    <tr key={repository.repository_id}>
                                                        <td className="px-4 py-3.5 text-left text-sm text-zinc-400">
                                                            {repository.repository_id}
                                                        </td>

                                                        <td className="px-4 py-3.5 text-left text-sm text-zinc-400">{repository.name}</td>

                                                        <td className="px-4 py-3.5 text-left text-sm text-zinc-400">{repository.slug}</td>

                                                        <td className="px-4 py-3.5 text-sm text-zinc-400">
                                                            <div className="flex items-start justify-start">
                                                                <a
                                                                    className="inline-flex rounded-xl bg-stone-800 px-4 py-2 text-sm text-gray-200 hover:bg-stone-700"
                                                                    href={repository.repository_url}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                >
                                                                    <LinkIcon className="mr-2 size-5" />

                                                                    {repository.repository_url}
                                                                </a>
                                                            </div>
                                                        </td>

                                                        <td className="whitespace-nowrap px-4 py-4 text-sm">
                                                            <div className="flex items-center space-x-2">
                                                                <Link
                                                                    href={route('repositories.edit', repository.repository_id)}
                                                                    className="faster-animation rounded-lg border border-transparent bg-zinc-800 p-1 hover:border-green-500 group-hover:bg-zinc-900"
                                                                >
                                                                    <PencilSquareIcon className="size-6 text-green-500" />
                                                                </Link>

                                                                <Link
                                                                    href={route('repositories.show', repository.repository_id)}
                                                                    className="faster-animation rounded-lg border border-transparent bg-zinc-800 p-1 hover:border-sky-500 group-hover:bg-zinc-900"
                                                                >
                                                                    <EyeIcon className="size-6 text-sky-500" />
                                                                </Link>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
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
                show={toggleRepositoriesModal}
                onClose={() => setToggleRepositoriesModal(false)}
                maxWidth="7xl"
            >
                <div className="p-4">
                    <div className="grid px-2">
                        <div className="rounded-xl border border-stone-800 bg-stone-700 p-2">
                            <div className="flex items-center justify-center rounded-xl bg-stone-900">
                                <p className="py-2 text-xl text-zinc-200">Repozitáře</p>
                            </div>

                            <div className="mt-5 max-h-[40rem] overflow-y-scroll">
                                {repositories && repositories.length > 0 ? (
                                    <table className="min-w-full divide-y divide-zinc-700 rounded-md">
                                        <thead className="text-nowrap bg-stone-900/50">
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
                                                    className="px-4 py-3.5 text-center text-sm font-normal text-zinc-400"
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
                                            {repositories.map((repository, index) => (
                                                <tr
                                                    key={repository.id}
                                                    className="rounded-md bg-stone-700 p-4"
                                                >
                                                    <td className="px-4 py-4">
                                                        <span className="text-sm font-medium text-zinc-200">{index + 1}</span>
                                                    </td>

                                                    <td className="px-4 py-4">
                                                        <span className="text-sm font-medium text-zinc-200">{repository.id}</span>
                                                    </td>

                                                    <td className="px-4 py-4">
                                                        <span className="text-sm font-medium text-zinc-200">{repository.name}</span>
                                                    </td>

                                                    <td className="px-4 py-4">
                                                        <div className="flex items-start justify-start">
                                                            <a
                                                                className="inline-flex rounded-xl bg-stone-800 px-4 py-2 text-sm text-gray-200 hover:bg-stone-900"
                                                                href={repository.web_url}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                            >
                                                                <LinkIcon className="mr-2 size-5" />

                                                                {repository.web_url}
                                                            </a>
                                                        </div>
                                                    </td>

                                                    <td className="grid px-4 py-4">
                                                        {git_group.relationships.repositories.find(
                                                            (repo) => repo.repository_id === repository.id
                                                        ) ? (
                                                            <button
                                                                className="rounded-md bg-red-950 px-4 py-2 text-zinc-100"
                                                                disabled
                                                            >
                                                                Already attached
                                                            </button>
                                                        ) : (
                                                            <button
                                                                className="rounded-md bg-green-500 px-4 py-2 text-zinc-100 hover:bg-green-600"
                                                                onClick={() => storeRepository(repository.id)}
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
                                            No <b>projects</b> found.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 flex justify-end space-x-4">
                        <button
                            className="rounded-md bg-sky-500 px-4 py-2 text-zinc-100 hover:bg-sky-600"
                            onClick={() => setToggleRepositoriesModal(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>

            <Modal
                show={toggleSubgroupsModal}
                onClose={() => setToggleSubgroupsModal(false)}
                maxWidth="7xl"
            >
                <div className="p-4">
                    <div className="grid overflow-y-auto px-2">
                        <div className="rounded-xl border border-stone-800 bg-stone-700 p-2">
                            <div className="flex items-center justify-center">
                                <p className="pb-2 text-xl text-zinc-200">Pod skupiny</p>
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
                                        {subgroups.map((repository, index) => (
                                            <tr
                                                key={repository.id}
                                                className="rounded-md bg-stone-700 p-4"
                                            >
                                                <td className="px-4 py-4">
                                                    <span className="text-sm font-medium text-zinc-200">{index + 1}</span>
                                                </td>

                                                <td className="px-4 py-4">
                                                    <span className="text-sm font-medium text-zinc-200">{repository.id}</span>
                                                </td>

                                                <td className="px-4 py-4">
                                                    <span className="text-sm font-medium text-zinc-200">{repository.name}</span>
                                                </td>

                                                <td className="px-4 py-4">
                                                    <a
                                                        href={repository.web_url}
                                                        target="_blank"
                                                        className="text-sm font-medium text-zinc-200 hover:underline"
                                                        rel="noreferrer"
                                                    >
                                                        {repository.web_url}
                                                    </a>
                                                </td>

                                                <td className="px-4 py-4">
                                                    {git_group.relationships.childrens.find(
                                                        (children) => children.group_id === repository.id
                                                    ) ? (
                                                        <button
                                                            className="rounded-md bg-red-950 px-4 py-2 text-zinc-100"
                                                            disabled
                                                        >
                                                            Already attached
                                                        </button>
                                                    ) : (
                                                        <button
                                                            className="rounded-md bg-green-500 px-4 py-2 text-zinc-100 hover:bg-green-600"
                                                            onClick={() => storeSubgroup(repository)}
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

                    <div className="mt-4 flex justify-end space-x-4">
                        <button
                            className="rounded-md bg-sky-500 px-4 py-2 text-zinc-100 hover:bg-sky-600"
                            onClick={() => setToggleSubgroupsModal(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>
        </AdminLayout>
    )
}
