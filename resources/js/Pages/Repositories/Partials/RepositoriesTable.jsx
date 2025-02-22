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
    Cog8ToothIcon,
} from '@heroicons/react/24/outline'
import { Link, router } from '@inertiajs/react'
import Modal from '@/Components/Modal'
import DangerButton from '@/Components/DangerButton'
import SecondaryButton from '@/Components/SecondaryButton'
import { useState, useCallback } from 'react'
import Pagination from '@/Components/Pagination'
import { isImages } from '@/Utils/IsImage'

export default function RepositoriesTable({ repositories }) {
    const [toggleDeleteModal, setToggleDeleteModal] = useState(false)
    const [selectedRepository, setSelectedRepository] = useState(null)

    const toggleModal = (repository) => {
        setSelectedRepository(repository)

        setToggleDeleteModal(true)
    }

    const closeModal = () => {
        setToggleDeleteModal(false)
    }

    const deleteRepository = () => {
        let url = route('repositories.destroy', selectedRepository.repository_id)

        router.delete(url, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                setToggleDeleteModal(false)
            },
        })
    }

    const deployToHosting = useCallback((repository) => {
        console.log('Deploying to hosting...', repository)
        axios
            .post(route('repositories.deploy', repository.repository_id))
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    console.log(repositories)
    return (
        <>
            <section className="card">
                <table className="min-w-full divide-y divide-zinc-700 overflow-hidden rounded-lg">
                    <thead className="text-nowrap bg-zinc-800">
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
                                Logo
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
                                className="border-x border-zinc-700 px-4 py-3.5 text-sm font-normal"
                            >
                                <div className="text-white">Počty</div>

                                <ul className="mt-2 grid w-full grid-cols-4">
                                    <li className="text-center text-sm font-normal text-zinc-400">Klienti</li>

                                    <li className="text-center text-sm font-normal text-zinc-400">Databáze</li>

                                    <li className="text-center text-sm font-normal text-zinc-400">Storage</li>

                                    <li className="text-center text-sm font-normal text-zinc-400">Settings</li>
                                </ul>
                            </th>

                            <th
                                scope="col"
                                className="border-x border-zinc-700 px-4 py-3.5 text-sm font-normal"
                            >
                                <div className="text-white">Nastavení</div>

                                <ul className="mt-2 grid grid-cols-4">
                                    <li className="text-center text-sm font-normal text-zinc-400">Gitlab</li>

                                    <li className="text-center text-sm font-normal text-zinc-400">Web</li>

                                    <li className="text-center text-sm font-normal text-zinc-400">Hosting</li>

                                    <li className="text-center text-sm font-normal text-zinc-400">Analytics</li>
                                </ul>
                            </th>

                            <th
                                scope="col"
                                className="border-r border-zinc-700 px-4 py-3.5 text-left text-sm font-normal text-zinc-400"
                            >
                                Nejnovější commit
                            </th>

                            <th
                                scope="col"
                                className="px-4 py-3.5 text-left text-sm font-normal text-zinc-400"
                            >
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-zinc-800 bg-zinc-700">
                        {repositories.data.map((repository) => {
                            return (
                                <tr
                                    key={repository.repository_id}
                                    className="group text-white transition-colors duration-200 hover:bg-zinc-800"
                                >
                                    <td className="px-4 py-4">
                                        <span className="text-sm font-medium text-zinc-400">{repository.repository_id}</span>
                                    </td>

                                    <td className="w-20 px-4 py-2">
                                        <img
                                            src={
                                                repository.avatar
                                                    ? '/storage/avatars/' + repository.avatar
                                                    : 'https://ui-avatars.com/api/?name=' + repository.name + '&background=0D8ABC&color=fff'
                                            }
                                            alt={repository.name}
                                            className="size-12 rounded-xl bg-zinc-800 object-contain p-1"
                                        />
                                    </td>

                                    <td className="px-4 py-4">
                                        <span className="text-nowrap text-sm font-medium text-zinc-400">{repository.name}</span>
                                    </td>

                                    <td className="px-4 py-4">
                                        <span className="text-nowrap text-sm font-medium text-zinc-400">{repository.slug}</span>
                                    </td>

                                    <td className="-mr-[1px] border-x border-zinc-800 py-3.5 group-hover:border-zinc-700">
                                        <div className="grid grid-cols-4 place-items-center">
                                            <div>
                                                <span className="faster-animation rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-400 group-hover:bg-zinc-900">
                                                    {repository.relationships.clients_count}
                                                </span>
                                            </div>

                                            <div>
                                                <span className="faster-animation rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-400 group-hover:bg-zinc-900">
                                                    {repository.relationships.repository_database_backups_count}
                                                </span>
                                            </div>

                                            <div>
                                                <span className="faster-animation rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-400 group-hover:bg-zinc-900">
                                                    {repository.relationships.repository_storage_backups_count}
                                                </span>
                                            </div>

                                            <div>
                                                <span className="faster-animation rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-400 group-hover:bg-zinc-900">
                                                    {repository.relationships.repository_settings_count}
                                                </span>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="-mr-[1px] border-x border-zinc-800 py-3.5 group-hover:border-zinc-700">
                                        <div className="grid grid-cols-4">
                                            <div className="flex items-center justify-center">
                                                {repository.repository_url ? (
                                                    <a
                                                        className="group rounded-xl bg-green-950 p-2"
                                                        href={repository.repository_url}
                                                        target="_blank"
                                                        rel="noreferrer noopener"
                                                    >
                                                        <LinkIcon className="size-6 text-green-500" />
                                                    </a>
                                                ) : (
                                                    <div className="rounded-xl bg-red-950 p-2">
                                                        <XMarkIcon className="size-6 text-red-500" />
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex items-center justify-center">
                                                {repository.website_url ? (
                                                    <a
                                                        className="rounded-xl bg-green-950 p-2"
                                                        href={repository.website_url}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                    >
                                                        <LinkIcon className="size-6 text-green-500" />
                                                    </a>
                                                ) : (
                                                    <div className="rounded-xl bg-red-950 p-2">
                                                        <XMarkIcon className="size-6 text-red-500" />
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex items-center justify-center">
                                                <div
                                                    className={
                                                        'rounded-xl p-2 ' +
                                                        (repository.relationships?.hosting_repository?.hosting_id
                                                            ? 'bg-green-950'
                                                            : 'bg-red-950')
                                                    }
                                                >
                                                    {repository.relationships?.hosting_repository?.hosting_id >= 1 ? (
                                                        <CheckIcon className="size-6 text-green-500" />
                                                    ) : (
                                                        <XMarkIcon className="size-6 text-red-500" />
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-center">
                                                <div
                                                    className={
                                                        'rounded-xl p-2 ' +
                                                        (repository.analytics_property_id ? 'bg-green-950' : 'bg-red-950')
                                                    }
                                                >
                                                    {repository.analytics_property_id ? (
                                                        <CheckIcon className="size-6 text-green-500" />
                                                    ) : (
                                                        <XMarkIcon className="size-6 text-red-500" />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="border-r border-zinc-800 px-4 py-4 text-center group-hover:border-zinc-700">
                                        <span className="text-sm font-medium text-zinc-400">{repository.last_commit_at_human ?? '-'}</span>
                                    </td>

                                    <td className="whitespace-nowrap px-4 py-4 text-sm">
                                        <div className="flex items-center justify-end space-x-2">
                                            {repository.relationships.hosting?.relationships.worker && (
                                                <button
                                                    className="faster-animation rounded-lg border border-transparent bg-zinc-800 p-1 hover:border-orange-500 group-hover:bg-zinc-900"
                                                    onClick={() => deployToHosting(repository)}
                                                >
                                                    <RocketLaunchIcon className="size-6 text-orange-400" />
                                                </button>
                                            )}
                                            {repository.relationships.hosting_repository && !repository.deleted_at && (
                                                <Link
                                                    href={route(
                                                        'hosting-repository.vps-connect',
                                                        repository.relationships.hosting_repository.id
                                                    )}
                                                    className="faster-animation rounded-lg border border-transparent bg-zinc-800 p-1 hover:border-orange-500 group-hover:bg-zinc-900"
                                                >
                                                    <CommandLineIcon className="size-6 text-orange-400" />
                                                </Link>
                                            )}

                                            {repository.deleted_at ? (
                                                <>
                                                    <Link
                                                        method="PATCH"
                                                        as="button"
                                                        href={route('repositories.restore', repository.repository_id)}
                                                        className="faster-animation rounded-lg border border-transparent bg-zinc-800 p-1 hover:border-sky-500 group-hover:bg-zinc-900"
                                                    >
                                                        <ArrowPathIcon className="size-6 text-sky-500" />
                                                    </Link>

                                                    <button
                                                        className="faster-animation rounded-lg border border-transparent bg-zinc-800 p-1 hover:border-red-500 group-hover:bg-zinc-900"
                                                        onClick={() => toggleModal(repository)}
                                                    >
                                                        <BackspaceIcon className="size-6 text-red-500" />
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    {/* <Link
                                                        href={route("repository-settings.edit", repository: repository.repository_id)}
                                                        className="group/custom bg-zinc-800 group-hover:bg-zinc-900 p-1 rounded-lg border border-transparent hover:border-pink-500 faster-animation"
                                                    >
                                                        <Cog8ToothIcon className="size-6 text-pink-500 group-hover/custom:animate-spin" />
                                                    </Link> */}

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

                                                    <button
                                                        className="faster-animation rounded-lg border border-transparent bg-zinc-800 p-1 hover:border-red-500 group-hover:bg-zinc-900"
                                                        onClick={() => toggleModal(repository)}
                                                    >
                                                        <TrashIcon className="size-6 text-red-500" />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

                <div className="mt-5">
                    <Pagination links={repositories.meta} />
                </div>
            </section>

            <Modal
                maxWidth="md"
                show={toggleDeleteModal}
                onClose={closeModal}
                className="p-10"
            >
                {selectedRepository && (
                    <div className="flex flex-col space-y-4 p-4">
                        <h2 className="text-center text-2xl font-medium text-gray-200">{selectedRepository.name}</h2>

                        <p className="mt-1 text-center text-sm text-gray-400">
                            Chystáš se smazat repozitář společně se všemi databázemi a klienty. Tato akce je nevratná.
                        </p>

                        <div className="flex justify-center space-x-4">
                            {selectedRepository.deleted_at ? (
                                <div>
                                    <Link
                                        onClick={closeModal}
                                        as="button"
                                        method="DELETE"
                                        href={route('repositories.force-delete', selectedRepository.repository_id)}
                                        className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 active:bg-red-700"
                                    >
                                        <TrashIcon className="mr-2 size-6" />
                                        Smazat trvale
                                    </Link>
                                </div>
                            ) : (
                                <div>
                                    <DangerButton
                                        type="submit"
                                        onClick={deleteRepository}
                                    >
                                        <TrashIcon className="mr-2 size-6" />

                                        {selectedRepository.name}
                                    </DangerButton>
                                </div>
                            )}

                            <SecondaryButton onClick={closeModal}>Zavřít</SecondaryButton>
                        </div>
                    </div>
                )}
            </Modal>
        </>
    )
}
