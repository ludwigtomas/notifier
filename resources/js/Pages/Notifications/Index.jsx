import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import {
    EyeIcon,
    ChevronRightIcon,
    BookmarkIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";
import Modal from "@/Components/Modal";
import DangerButton from "@/Components/DangerButton";
import TextInput from "@/Components/TextInput";
import SecondaryButton from "@/Components/SecondaryButton";
import Pagination from "@/Components/Pagination";
import { useState, useEffect } from "react";
import Dropdown from "@/Components/Dropdown";
import debounce from "lodash/debounce";

export default function Index({ auth, notifications, models, actions, filters }) {

    const [search, setSearch] = useState(filters.search || "");
    const [isRead, setIsRead] = useState(filters.read_at || false);
    const [selectedModel, setSelectedModel] = useState(filters.model || [])
    const [selectedAction, setSelectedAction] = useState(filters.action || "")

    const debouncedSearch = debounce((value) => {
        setSearch(value);

        router.get(route("notifications.index"),{
                search: value,
                read_at: isRead,
                model: selectedModel,
                action: selectedAction
            },
            {
                preserveScroll: true,
                preserveState: true,
            }
        );
    }, 500);

    const handleModel = (model) => {

        if(model === 'clear_all') {
            setSelectedModel([]);

            router.get(route('notifications.index', {
                search: search,
                read_at: isRead,
                action: selectedAction,
                model: []
            }, {
                preserveScroll: true,
                preserveState: true,
            }));
        } else {
            if (selectedModel.includes(model)) {
                setSelectedModel(selectedModel.filter((item) => item !== model));
            } else {
                setSelectedModel([...selectedModel, model]);
            }

            router.get(route('notifications.index', {
                search: search,
                read_at: isRead,
                action: selectedAction,
                model: selectedModel.includes(model) ? selectedModel.filter((item) => item !== model) : [...selectedModel, model]
            }, {
                preserveScroll: true,
                preserveState: true,
            }));
        }

    }

    const handleSetIsRead = (value) => {

        setIsRead(value);

        router.get(route("notifications.index"), {
                search: search,
                read_at: value,
                model: selectedModel,
                action: selectedAction
            },
            {
                preserveScroll: true,
                preserveState: true,
            }
        );
    }

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
                        className="font-semibold text-lg leading-tight text-sky-500"
                        href={route("notifications.index")}
                    >
                        Notifikace
                    </Link>
                </header>
            }
        >
            <Head title="Notifikace" />


            <div className="py-12">
                <div className="max-w-[100rem] mx-auto sm:px-6 lg:px-8">

                    <div className="mb-5 bg-zinc-900 border border-zinc-700 p-2 rounded-xl">
                        <div className="grid grid-cols-5 gap-2 items-center">
                            <div>
                                <TextInput
                                    label="Hledat"
                                    name="search"
                                    placeholder="Hledat notifikaci"
                                    type="text"
                                    className="w-full !border-zinc-600 "
                                    onChange={(e) => debouncedSearch(e.target.value)}
                                />
                            </div>

                            <div>
                                <div className="bg-zinc-700 py-2 border-2 border-zinc-600 focus:border-sky-500 focus:ring-sky-500 text-zinc-200 rounded-md shadow-sm">
                                    <label
                                        htmlFor="read_at"
                                        className="flex items-center justify-center cursor-pointer"
                                    >
                                        <input
                                            label="read_at"
                                            name="read_at"
                                            id="read_at"
                                            type="checkbox"
                                            className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-sky-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-sky-500 before:opacity-0 before:transition-opacity checked:border-sky-500 checked:bg-sky-500 checked:before:bg-sky-500 hover:before:opacity-10"
                                            checked={isRead}
                                            onChange={(e) => handleSetIsRead(e.target.checked)}
                                        />

                                        <span className="ml-4 text-base text-gray-300">
                                            Již Přečtené
                                        </span>
                                    </label>
                                </div>
                            </div>

                            <div>
                                <select
                                    name="action"
                                    className="w-full bg-zinc-700 border-2 border-zinc-600 focus:border-sky-500 focus:ring-sky-500 text-zinc-200 rounded-md shadow-sm"
                                    value={selectedAction}
                                    onChange={(e) => {
                                        setSelectedAction(e.target.value);
                                        router.get(route("notifications.index"), {
                                                search: search,
                                                read_at: isRead,
                                                action: e.target.value,
                                                model: selectedModel
                                            },
                                            {
                                                preserveScroll: true,
                                                preserveState: true,
                                            }
                                        );
                                    }}
                                >
                                    <option value="">Vyberte akci</option>
                                    {actions.map((action, index) => (
                                        <option
                                            key={index}
                                            value={action}
                                        >
                                            {action}
                                        </option>
                                    ))}

                                </select>
                            </div>

                            <div>
                                <div className="relative group w-full bg-zinc-700 py-2 border-2 border-zinc-600 focus:border-sky-500 focus:ring-sky-500 text-zinc-200 rounded-md shadow-sm">
                                    <div className="flex items-center justify-center space-x-4 bg-zinc-700 rounded-xl">
                                        <h3 className="text-gray-300">
                                            Vybrané Eventy
                                        </h3>

                                        <div className="text-white font-bold">
                                            {selectedModel.length}
                                        </div>
                                    </div>

                                    <div className="hidden group-hover:block absolute right-0 top-full pt-4 ">
                                        <div className="z-40 h-80 overflow-y-auto overflow-x-hidden p-2 w-[30rem] border border-neutral-600 bg-neutral-800 rounded-xl">
                                            <div className="grid grid-cols-3 gap-4">
                                                {selectedModel.length === 0 ? (
                                                    <div className="col-span-3  bg-zinc-700 rounded-lg p-4 border-2 border-zinc-600">
                                                        <div className="text-center text-gray-200 ">
                                                            <p className="text-lg font-semibold">
                                                                Nejsou vybrané žádné modely
                                                            </p>
                                                        </div>
                                                    </div>
                                                ):(
                                                    <div
                                                        onClick={() => handleModel('clear_all')}
                                                        className="col-span-3 bg-red-500 rounded-lg p-4 border-2 border-red-600 cursor-pointer"
                                                    >
                                                        <div className="text-center text-white">
                                                            <p className="text-lg font-semibold">
                                                                Vyčistit vše
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}

                                                {models.map((model, index) => {
                                                    return (
                                                        <div
                                                            key={index}
                                                            onClick={() => handleModel(model)}
                                                            className={'text-xs text-gray-200 flex flex-col items-center justify-center rounded-lg p-4 border-2 cursor-pointer bg-zinc-700 ' +
                                                            (selectedModel.includes(model) ? ' border-green-500' : ' border-zinc-600')}
                                                        >
                                                            <BookmarkIcon
                                                                className={"size-10 text-neutral-400 mb-3 " +
                                                                    (selectedModel.includes(model) ? ' fill-neutral-400' : ' border-zinc-600 bg-zinc-700')
                                                                }
                                                            />

                                                            { model }
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="relative group w-full bg-zinc-700 py-2 border-2 border-zinc-600 focus:border-sky-500 focus:ring-sky-500 text-zinc-200 rounded-md shadow-sm">
                                    <div className="flex items-center justify-center space-x-4 bg-zinc-700 rounded-xl">
                                        <h3 className="text-gray-300">
                                            Vybrané modely
                                        </h3>

                                        <div className="text-white font-bold">
                                            {selectedModel.length}
                                        </div>
                                    </div>

                                    <div className="hidden group-hover:block absolute right-0 top-full pt-4 ">
                                        <div className="z-40 h-80 overflow-y-auto overflow-x-hidden p-2 w-[30rem] border border-neutral-600 bg-neutral-800 rounded-xl">
                                            <div className="grid grid-cols-3 gap-4">
                                                {selectedModel.length === 0 ? (
                                                    <div className="col-span-3  bg-zinc-700 rounded-lg p-4 border-2 border-zinc-600">
                                                        <div className="text-center text-gray-200 ">
                                                            <p className="text-lg font-semibold">
                                                                Nejsou vybrané žádné modely
                                                            </p>
                                                        </div>
                                                    </div>
                                                ):(
                                                    <div
                                                        onClick={() => handleModel('clear_all')}
                                                        className="col-span-3 bg-red-500 rounded-lg p-4 border-2 border-red-600 cursor-pointer"
                                                    >
                                                        <div className="text-center text-white">
                                                            <p className="text-lg font-semibold">
                                                                Vyčistit vše
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}

                                                {models.map((model, index) => {
                                                    return (
                                                        <div
                                                            key={index}
                                                            onClick={() => handleModel(model)}
                                                            className={'text-xs text-gray-200 flex flex-col items-center justify-center rounded-lg p-4 border-2 cursor-pointer bg-zinc-700 ' +
                                                            (selectedModel.includes(model) ? ' border-green-500' : ' border-zinc-600')}
                                                        >
                                                            <BookmarkIcon
                                                                className={"size-10 text-neutral-400 mb-3 " +
                                                                    (selectedModel.includes(model) ? ' fill-neutral-400' : ' border-zinc-600 bg-zinc-700')
                                                                }
                                                            />

                                                            { model }
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-zinc-900 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="border-4 border-zinc-900 divide-y divide-zinc-800 ">
                            {notifications && notifications.length > 0 ? (
                                <table className="min-w-full divide-y divide-zinc-700 rounded-lg overflow-hidden">
                                    <thead className="bg-zinc-800 text-nowrap">
                                        <tr>
                                            <th className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400">
                                                Metoda
                                            </th>

                                            <th className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400">
                                                Event
                                            </th>

                                            <th className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400">
                                                Model
                                            </th>

                                            <th className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400">
                                                Model_id
                                            </th>

                                            <th className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400">
                                                Vytvořeno dne
                                            </th>

                                            <th className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400">
                                                Stav notifikace
                                            </th>


                                            <th className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400">
                                                Akce
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-zinc-800 bg-zinc-700">
                                        {notifications.map((notification) => (
                                            <tr
                                                key={notification.id}
                                                className={"text-white " +
                                                    (notification.data.action === 'created' ? 'bg-green-500/5 hover:bg-green-500/15' : '') + ' ' +
                                                    (notification.data.action === 'updated' ? 'bg-yellow-500/5 hover:bg-yellow-500/15' : '') + ' ' +
                                                    (notification.data.action === 'deleted' ? 'bg-purple-500/5 hover:bg-purple-500/15' : '') + ' ' +
                                                    (notification.data.action === 'restored' ? 'bg-blue-500/5 hover:bg-blue-500/15' : '') + ' ' +
                                                    (notification.data.action === 'forceDeleted' ? 'bg-red-500/5 hover:bg-red-500/15' : '')
                                                }
                                            >
                                                <td className="px-4 py-4 ">
                                                    <span
                                                        className={"group px-3 py-1 rounded-full font-extrabold text-md uppercase shadow-inner border-b-4 " +
                                                            (notification.data.action === 'created' ? 'bg-green-500 shadow-green-50 border-b-green-900' : '') + ' ' +
                                                            (notification.data.action === 'updated' ? 'bg-yellow-500 shadow-yellow-50 border-b-yellow-900' : '') + ' ' +
                                                            (notification.data.action === 'deleted' ? 'bg-purple-500 shadow-purple-50 border-b-purple-900' : '') + ' ' +
                                                            (notification.data.action === 'restored' ? 'bg-blue-500 shadow-blue-50 border-b-blue-900' : '') + ' ' +
                                                            (notification.data.action === 'forceDeleted' ? 'bg-red-500 shadow-red-50 border-b-red-900' : '')
                                                        }
                                                    >
                                                        {notification.data.action}
                                                    </span>
                                                </td>

                                                <td className="px-4 py-4 ">
                                                    <span className="text-sm font-medium">
                                                        {notification.type_formatted}
                                                    </span>
                                                </td>

                                                <td className="px-4 py-4 ">
                                                    <span className="text-sm font-medium">
                                                        {notification.notifiable_type_formatted}
                                                    </span>
                                                </td>

                                                <td className="px-4 py-4 ">
                                                    <span className="text-sm font-medium">
                                                        {notification.notifiable_id}
                                                    </span>
                                                </td>

                                                <td className="px-4 py-4 ">
                                                    <span className="text-sm font-medium">
                                                        {notification.created_at_formatted}
                                                    </span>
                                                </td>

                                                <td className="px-4 py-4 ">
                                                    <span className="text-sm font-medium">
                                                        {notification.read_at ? (
                                                            <span className="text-xs font-semibold text-green-500">
                                                                Přečteno
                                                            </span>

                                                        ): (
                                                            <span className="text-xs font-semibold text-red-500">
                                                                Nepřečteno
                                                            </span>
                                                        )
                                                        }
                                                    </span>
                                                </td>


                                                <td className="px-4 py-4">
                                                    <div className="flex space-x-2">
                                                        <Link
                                                            as="button"
                                                            method="PATCH"
                                                            href={route("notifications.mark-as-read", notification.id)}
                                                            className="group bg-zinc-800 group-hover:bg-zinc-900 p-1 rounded-lg border border-transparent hover:border-green-500 faster-animation"
                                                            preserveScroll
                                                        >
                                                            <BookmarkIcon className={"size-6 " + (notification.read_at ? 'text-green-500 fill-green-500' : 'text-red-500 group-hover:text-green-500 group-hover:fill-green-500')} />
                                                        </Link>

                                                        <Link
                                                            as="button"
                                                            method="DELETE"
                                                            href={route("notifications.destroy", notification.id)}
                                                            className="bg-zinc-800 group-hover:bg-zinc-900 p-1 rounded-lg border border-transparent hover:border-red-500 faster-animation"
                                                            preserveScroll
                                                        >
                                                            <TrashIcon className="size-6 text-red-500" />
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ):(
                                <div className="p-4 text-center text-zinc-400">
                                    <EyeIcon className="size-8 mx-auto" />

                                    <p className="text-lg font-semibold">
                                        Nejsou zde žádné nové notifikace.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
