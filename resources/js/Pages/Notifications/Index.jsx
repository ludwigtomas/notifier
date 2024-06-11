import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import {
    EyeIcon,
    ChevronRightIcon,
    BookmarkIcon,
} from "@heroicons/react/24/outline";
import Modal from "@/Components/Modal";
import DangerButton from "@/Components/DangerButton";
import TextInput from "@/Components/TextInput";
import SecondaryButton from "@/Components/SecondaryButton";
import Pagination from "@/Components/Pagination";
import { useState, useEffect } from "react";
import Dropdown from "@/Components/Dropdown";
import debounce from "lodash/debounce";

export default function Index({ auth, notifications, filters }) {

    const [search, setSearch] = useState(filters?.search || "");

    const debouncedSearch = debounce((value) => {
        setSearch(value);

        router.get(route("notifications.index"),{
                search: value,
            },
            {
                preserveScroll: true,
                preserveState: true,
            }
        );
    }, 500);


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

                    <div className="mb-2 flex items-center space-x-10">
                        <TextInput
                            label="Hledat"
                            name="search"
                            placeholder="Hledat notifikaci"
                            type="text"
                            className="w-72"
                            onChange={(e) => debouncedSearch(e.target.value)}
                        />
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
                                                    (notification.data.action === 'forceDeleted' ? 'bg-red-500/5 shadow-red-500/15' : '')
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

                                                <td className="px-4 py-4">
                                                    <div className="flex">
                                                        <Link
                                                            as="button"
                                                            method="PATCH"
                                                            href={route("notifications.mark-as-read", notification.id)}
                                                            className="bg-zinc-800 group-hover:bg-zinc-900 p-1 rounded-lg border border-transparent hover:border-sky-500 faster-animation"
                                                        >
                                                            <BookmarkIcon className="size-6 text-sky-500" />
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
