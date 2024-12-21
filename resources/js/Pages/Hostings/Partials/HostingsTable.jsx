import {
    PencilSquareIcon,
    TrashIcon,
    EyeIcon,
    XMarkIcon,
    LinkIcon,
} from "@heroicons/react/24/outline";
import { Link, router } from "@inertiajs/react";
import Modal from "@/Components/Modal";
import DangerButton from "@/Components/DangerButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { useState } from "react";
import Pagination from "@/Components/Pagination";

export default function HostingsTable({ hostings }) {
    const [toggleDeleteModal, setToggleDeleteModal] = useState(false);
    const [selectedHosting, setSelectedHosting] = useState(null);

    const toggleModal = (client) => {
        setSelectedHosting(client);

        setToggleDeleteModal(true);
    };

    const closeModal = () => {
        setToggleDeleteModal(false);
    };

    const deleteHosting = () => {
        let url = route("hostings.destroy", selectedHosting.id);

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
                                Název
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
                                Počet projektů
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
                        {hostings.data.map((hosting) => {
                            return (
                                <tr
                                    key={hosting.id}
                                    className="text-sm text-zinc-400 hover:bg-zinc-800 group"
                                >
                                    <td className="px-4 py-3.5">
                                        {hosting.id}
                                    </td>

                                    <td className="px-4 py-3.5">
                                        {hosting.name}
                                    </td>

                                    <td className="px-4 py-3.5">
                                        <div className="flex">
                                            {hosting.hosting_url ? (
                                                <a
                                                    className="bg-green-950 p-2 rounded-xl"
                                                    href={
                                                        hosting.hosting_url
                                                    }
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

                                    <td className="px-4 py-3.5">
                                        <div className="flex items-center">
                                            <span className="flex items-center justify-center p-2 size-8 rounded-xl bg-zinc-800 group-hover:bg-zinc-900 faster-animation">
                                                {hosting.relationships.repositories_count}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="px-4 py-3.5">
                                        <div className="flex items-center space-x-2">
                                            <Link
                                                href={route("hostings.edit",hosting.id)}
                                                className="bg-zinc-800 group-hover:bg-zinc-900 p-1 rounded-lg border border-transparent hover:border-green-500 faster-animation"
                                            >
                                                <PencilSquareIcon className="size-6 text-green-500" />
                                            </Link>

                                            <button
                                                onClick={() =>toggleModal(hosting)}
                                                className="bg-zinc-800 group-hover:bg-zinc-900 p-1 rounded-lg border border-transparent hover:border-red-500 faster-animation"
                                            >
                                                <TrashIcon className="size-6 text-red-500" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className="mt-5">
                    <Pagination links={hostings.meta} />
                </div>
            </section>

            <Modal
                maxWidth="md"
                show={toggleDeleteModal}
                onClose={closeModal}
                className="p-10"
            >
                {selectedHosting && (
                    <div className="p-4 flex flex-col space-y-4">
                        <h2 className="text-2xl font-medium text-gray-200 text-center">
                            {selectedHosting.name}
                        </h2>

                        <p className="mt-1 text-sm text-gray-400 text-center">
                            Chystáš se smazat klienta. Opravdu chceš pokračovat?
                        </p>

                        <div className="flex justify-center space-x-4">
                            <div>
                                <DangerButton
                                    type="submit"
                                    onClick={deleteHosting}
                                >
                                    <TrashIcon className="size-6 mr-2" />

                                    {selectedHosting.name}
                                </DangerButton>
                            </div>

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
