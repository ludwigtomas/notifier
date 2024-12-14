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
} from "@heroicons/react/24/outline";
import { Link, router } from "@inertiajs/react";
import Modal from "@/Components/Modal";
import DangerButton from "@/Components/DangerButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { useState } from "react";
import Pagination from "@/Components/Pagination";
import { isImages } from '@/Utils/IsImage';

export default function RepositoriesTable({ repositories }) {
    const [toggleDeleteModal, setToggleDeleteModal] = useState(false);
    const [selectedRepository, setSelectedRepository] = useState(null);

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

    return (
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
                                className="px-4 py-3.5 text-sm font-normal border-x border-zinc-700"
                            >
                                <div className="text-white">
                                    Nastavení
                                </div>

                                <ul className="grid grid-cols-4 mt-2 w-full">
                                    <li className="text-sm font-normal text-center text-zinc-400">
                                        Klienti
                                    </li>

                                    <li className="text-sm font-normal text-center text-zinc-400">
                                        Databáze
                                    </li>

                                    <li className="text-sm font-normal text-center text-zinc-400">
                                        Storage
                                    </li>

                                    <li className="text-sm font-normal text-center text-zinc-400">
                                        Settings
                                    </li>
                                </ul>
                            </th>


                            <th
                                scope="col"
                                className="px-4 py-3.5 text-sm font-normal border-x border-zinc-700"
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
                        {repositories.data.map((repository) => {
                            return (
                                <tr
                                    key={repository.repository_id}
                                    className="group text-white transition-colors duration-200 hover:bg-zinc-800"
                                >
                                    <td className="px-4 py-4">
                                        <span className="text-sm font-medium text-zinc-400">
                                            {repository.repository_id}
                                        </span>
                                    </td>

                                    <td className="px-4 py-2 w-20">
                                        <img
                                            src={ repository.avatar
                                                    ? "/storage/avatars/" + repository.avatar
                                                    : "https://ui-avatars.com/api/?name=" + repository.name + "&background=0D8ABC&color=fff"
                                            }
                                            alt={repository.name}
                                            className="size-12 object-contain p-1 bg-zinc-800 rounded-xl"
                                        />
                                    </td>

                                    <td className="px-4 py-4 ">
                                        <span className="text-sm font-medium text-zinc-400 text-nowrap">
                                            { repository.name }
                                        </span>
                                    </td>

                                    <td className="px-4 py-4 ">
                                        <span className="text-sm font-medium text-zinc-400 text-nowrap">
                                            { repository.slug }
                                        </span>
                                    </td>

                                    <td className="-mr-[1px] py-3.5 border-x border-zinc-800 group-hover:border-zinc-700">
                                        <div className="grid grid-cols-4 place-items-center">
                                            <div>
                                                <span className="px-3 py-1 text-xs text-zinc-400 rounded-full bg-zinc-800 group-hover:bg-zinc-900 faster-animation">
                                                    { repository.relationships.clients_count }
                                                </span>
                                            </div>

                                            <div>
                                                <span className="px-3 py-1 text-xs text-zinc-400 rounded-full bg-zinc-800 group-hover:bg-zinc-900 faster-animation">
                                                    { repository.relationships.repository_database_backups_count }
                                                </span>
                                            </div>

                                            <div>
                                                <span className="px-3 py-1 text-xs text-zinc-400 rounded-full bg-zinc-800 group-hover:bg-zinc-900 faster-animation">
                                                    { repository.relationships.repository_storage_backups_count }
                                                </span>
                                            </div>

                                            <div>
                                                <span className="px-3 py-1 text-xs text-zinc-400 rounded-full bg-zinc-800 group-hover:bg-zinc-900 faster-animation">
                                                    { repository.relationships.repository_settings_count }
                                                </span>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="-mr-[1px] py-3.5 border-x border-zinc-800 group-hover:border-zinc-700">
                                        <div className="grid grid-cols-4 ">
                                            <div className="flex items-center justify-center">
                                                {repository.repository_url ? (
                                                    <a
                                                        className="group bg-green-950 p-2 rounded-xl"
                                                        href={ repository.repository_url }
                                                        target="_blank"
                                                        rel="noreferrer noopener"
                                                    >
                                                        <LinkIcon className="text-green-500 size-6" />
                                                    </a>
                                                ) : (
                                                    <div className="bg-red-950 p-2 rounded-xl">
                                                        <XMarkIcon className="text-red-500 size-6" />
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex items-center justify-center">
                                                {repository.website_url ? (
                                                    <a
                                                        className="bg-green-950 p-2 rounded-xl"
                                                        href={ repository.website_url }
                                                        target="_blank"
                                                    >
                                                        <LinkIcon className="text-green-500 size-6" />
                                                    </a>
                                                ) : (
                                                    <div className="bg-red-950 p-2 rounded-xl">
                                                        <XMarkIcon className="text-red-500 size-6" />
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex items-center justify-center">
                                                <div
                                                    className={
                                                        "p-2 rounded-xl " +
                                                        (repository.relationships?.hosting_repository?.hosting_id ? "bg-green-950" : "bg-red-950")
                                                    }
                                                >
                                                    {repository.relationships?.hosting_repository?.hosting_id >= 1 ? (
                                                        <CheckIcon className="size-6 text-green-500" />
                                                    ) : (
                                                        <XMarkIcon className="text-red-500 size-6" />
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-center">
                                                <div
                                                    className={"p-2 rounded-xl " +
                                                        ( repository.analytics_property_id
                                                            ? "bg-green-950"
                                                            : "bg-red-950" )
                                                    }
                                                >
                                                    {repository.analytics_property_id ? (
                                                        <CheckIcon className="size-6 text-green-500" />
                                                    ) : (
                                                        <XMarkIcon className="text-red-500 size-6" />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-4 py-4">
                                        <span className="text-sm font-medium text-zinc-400">
                                            {repository.last_commit_at_human ?? "-"}
                                        </span>
                                    </td>

                                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                                        <div className="flex items-center justify-end space-x-2">
                                            {repository.relationships.hosting_repository && !repository.deleted_at && (
                                                <Link
                                                    href={route("hosting-repository.vps-connect", repository.relationships.hosting_repository.id)}
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
                                                        href={route("repositories.restore", repository.repository_id)}
                                                        className="bg-zinc-800 group-hover:bg-zinc-900 p-1 rounded-lg border border-transparent hover:border-sky-500 faster-animation"
                                                    >
                                                        <ArrowPathIcon className="size-6 text-sky-500" />
                                                    </Link>

                                                    <button
                                                        className="bg-zinc-800 group-hover:bg-zinc-900 p-1 rounded-lg border border-transparent hover:border-red-500 faster-animation"
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
                                                        href={route("repositories.edit", repository.repository_id)}
                                                        className="bg-zinc-800 group-hover:bg-zinc-900 p-1 rounded-lg border border-transparent hover:border-green-500 faster-animation"
                                                    >
                                                        <PencilSquareIcon className="size-6 text-green-500" />
                                                    </Link>

                                                    <Link
                                                        href={route("repositories.show", repository.repository_id)}
                                                        className="bg-zinc-800 group-hover:bg-zinc-900 p-1 rounded-lg border border-transparent hover:border-sky-500 faster-animation"
                                                    >
                                                        <EyeIcon className="size-6 text-sky-500" />
                                                    </Link>

                                                    <button
                                                        className="bg-zinc-800 group-hover:bg-zinc-900 p-1 rounded-lg border border-transparent hover:border-red-500 faster-animation"
                                                        onClick={() =>toggleModal(repository)}
                                                    >
                                                        <TrashIcon className="size-6 text-red-500" />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            );
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
        </>
    );
}
