import {
    TrashIcon,
    ArrowDownTrayIcon,
    BackspaceIcon,
} from "@heroicons/react/24/outline";
import { Head, Link, router } from "@inertiajs/react";
import Dropdown from "@/Components/Dropdown";
import Pagination from "@/Components/Pagination";
import Modal from "@/Components/Modal";
import DangerButton from "@/Components/DangerButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { useState } from "react";

export default function RepositoryDatabaseTable({ database_backups }) {
    const [selectedDatabases, setSelectedDatabases] = useState([]);
    const [selectedDatabase, setSelectedDatabase] = useState(null);
    const [toggleDeleteModal, setToggleDeleteModal] = useState(false);
    const [toggleBulkDeleteModal, setToggleBulkDeleteModal] = useState(false);

    const toggleModal = (database) => {
        setSelectedDatabase(database);

        setToggleDeleteModal(true);
    };

    const closeModal = () => {
        setToggleDeleteModal(false);
        setToggleBulkDeleteModal(false);
        setSelectedDatabase(null);
    };

    const deleteDatabase = () => {
        let url = route("databases.destroy", selectedDatabase.id);

        router.delete(url, {
            preserveScroll: true,
            onSuccess: () => closeModal(),
        });
    };

    const bulkDeleteRepositories = () => {
        let url = route("databases.bulk.destroy", {
            databases: selectedDatabases,
        });

        router.delete(url, {
            preserveScroll: true,
            onSuccess: () => {
                closeModal();
                setSelectedDatabases([]);
            },
        });
    };

    return (
        <>
            <div className="mt-10 mb-5 border-4 border-zinc-900 divide-y rounded-lg divide-zinc-800 ">
                {selectedDatabases.length > 0 && (
                    <div className="fixed right-10 bottom-10">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <div className="flex items-center space-x-2">
                                    <div className="py-3 px-5 rounded-xl bg-zinc-900 text-white">
                                        {selectedDatabases.length}
                                    </div>
                                    <div className="group inline-flex rounded-xl bg-sky-500 ">
                                        <button
                                            type="button"
                                            className="px-6 py-3 rounded-md focus:outline-none"
                                        >
                                            <span className="leading-4 font-medium text-white text-lg group-hover:text-sky-100 transition ease-in-out duration-150">
                                                Vybráno
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </Dropdown.Trigger>

                            <Dropdown.Content direction="up">
                                <button
                                    className="flex items-center w-full px-4 py-2 text-start text-sm leading-5 text-zinc-400 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out hover:bg-zinc-800 border-l-4 border-transparent hover:border-red-500 hover:text-red-500"
                                    onClick={() => setToggleBulkDeleteModal(true)}
                                >
                                    <span className="mr-2">
                                        <TrashIcon className="w-6 h-6" />
                                    </span>
                                    Smazat
                                </button>

                                <a
                                    className="flex items-center w-full px-4 py-2 text-start text-sm leading-5 text-zinc-400 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out hover:bg-zinc-800 border-l-4 border-transparent hover:border-green-500 hover:text-green-500"
                                    href={route("databases.download", {
                                        databases: selectedDatabases,
                                    })}
                                >
                                    <span className="mr-2 ">
                                        <ArrowDownTrayIcon className="w-6 h-6" />
                                    </span>
                                    Stáhnout
                                </a>

                                <button
                                    className="border-l-4 border-transparent hover:border-blue-500 hover:text-blue-500 flex items-center w-full px-4 py-2 text-start text-sm leading-5 text-zinc-500 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                                    href={route("profile.edit")}
                                    onClick={() => setSelectedDatabases([])}
                                >
                                    <span className="mr-2">
                                        <BackspaceIcon className="w-6 h-6" />
                                    </span>
                                    Odznačit vše
                                </button>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                )}

                <table className="min-w-full divide-y divide-zinc-700 rounded-md overflow-hidden">
                    <thead className="bg-zinc-950">
                        <tr>
                            <th
                                scope="col"
                                className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400"
                            >
                                Bulk actions
                            </th>

                            <th
                                scope="col"
                                className="px-12 py-3.5 text-sm font-normal text-left text-zinc-400"
                            >
                                Název
                            </th>

                            <th
                                scope="col"
                                className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400"
                            >
                                Velikost
                            </th>

                            <th
                                scope="col"
                                className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400"
                            >
                                Cesta
                            </th>

                            <th
                                scope="col"
                                className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400"
                            >
                                Vytvořeno
                            </th>

                            <th scope="col" className="relative py-3.5 px-4">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-zinc-700 bg-zinc-900">
                        {database_backups &&
                            database_backups.data.map((database) => (
                                <tr
                                    key={database.id}
                                    className="group hover:bg-zinc-800"
                                >
                                    <td className="px-4 py-4">
                                        <input
                                            type="checkbox"
                                            className="rounded-md p-3"
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSelectedDatabases([
                                                        ...selectedDatabases,
                                                        database.id,
                                                    ]);
                                                } else {
                                                    setSelectedDatabases(
                                                        selectedDatabases.filter(
                                                            (id) =>
                                                                id !==
                                                                database.id
                                                        )
                                                    );
                                                }
                                            }}
                                        />
                                    </td>

                                    <td className="px-4 py-4 ">
                                        <span className="text-sm font-medium text-zinc-400">
                                            {database.name}
                                        </span>
                                    </td>

                                    <td className="px-4 py-4 ">
                                        <span className="text-sm font-medium text-zinc-400">
                                            {database.size} KB
                                        </span>
                                    </td>

                                    <td className="px-4 py-4 ">
                                        <span className="text-sm font-medium text-zinc-400">
                                            {database.path}
                                        </span>
                                    </td>

                                    <td className="px-4 py-4 ">
                                        <span className="text-sm font-medium text-zinc-400">
                                            {database.created_at_human}
                                        </span>
                                    </td>

                                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                                        <div className="flex items-center space-x-2">
                                            <a
                                                className="bg-zinc-800 group-hover:bg-zinc-900 p-1 rounded-lg border border-transparent hover:border-green-500 faster-animation"
                                                href={route("databases.download", {
                                                        databases: [database.id],
                                                })}
                                            >
                                                <ArrowDownTrayIcon className="w-6 h-6 text-green-500" />
                                            </a>

                                            <button
                                                className="bg-zinc-800 group-hover:bg-zinc-900 p-1 rounded-lg border border-transparent hover:border-red-500 faster-animation"
                                                onClick={() => toggleModal(database)}
                                            >
                                                <TrashIcon className="w-6 h-6 text-red-500" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            <Pagination links={database_backups.meta} />

            {/* toggleDeleteModal */}
            <Modal
                maxWidth="md"
                show={toggleDeleteModal}
                onClose={closeModal}
                className="p-10"
            >
                {selectedDatabase && (
                    <div className="p-4 flex flex-col space-y-4">
                        <h2 className="text-2xl font-medium text-gray-200 text-center">
                            Smazat databázi
                        </h2>

                        <p className="mt-1 text-sm text-gray-400 text-center">
                            Chystáš se smazat databázi. Tato akce je nevratná.
                        </p>

                        <div className="flex justify-center space-x-4">
                            <SecondaryButton onClick={closeModal}>
                                Zavřít
                            </SecondaryButton>

                            <DangerButton
                                type="submit"
                                onClick={deleteDatabase}
                            >
                                <TrashIcon className="w-6 h-6 mr-2" />

                                {selectedDatabase.name}
                            </DangerButton>
                        </div>
                    </div>
                )}
            </Modal>

            {/* toggleBulkDeleteModal */}
            <Modal
                maxWidth="md"
                show={toggleBulkDeleteModal}
                onClose={closeModal}
                className="p-10"
            >
                <div className="p-4 flex flex-col space-y-4">
                    <h2 className="text-2xl font-medium text-gray-200 text-center">
                        Smazat vybrané databáze
                    </h2>

                    <div className="my-4 space-y-0.5 text-center">
                        <p className="text-sm text-gray-400">
                            Chystáš se smazat vybrané databáze. Tato akce je
                            nevratná.
                        </p>

                        <p className="text-sm text-gray-400">
                            Celkem se smaže{" "}
                            <span className="font-bold text-lg mx-1">
                                {selectedDatabases.length}
                            </span>{" "}
                            databází.
                        </p>
                    </div>

                    <div className="flex justify-center space-x-4">
                        <SecondaryButton onClick={closeModal}>
                            Zavřít
                        </SecondaryButton>

                        <DangerButton
                            type="submit"
                            onClick={bulkDeleteRepositories}
                        >
                            <TrashIcon className="w-6 h-6 mr-2" />
                            Smazat
                        </DangerButton>
                    </div>
                </div>
            </Modal>
        </>
    );
}
