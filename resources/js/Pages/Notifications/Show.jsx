import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router } from "@inertiajs/react";
import {
    EyeIcon,
    ChevronRightIcon,
    BookmarkIcon,
    TrashIcon,
    Square2StackIcon,
    PencilSquareIcon,
} from "@heroicons/react/24/outline";

export default function Edit({ auth, notification }) {
    return (
        <AdminLayout
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
                    <section className="mb-5 card">
                        <h1 className="text-center text-white text-2xl font-bold tracking-wider">
                            {notification.notifiable_type_formatted}
                        </h1>
                    </section>

                    <div className="card overflow-x-auto">
                        <table className="min-w-full divide-y divide-zinc-700">
                            <thead>
                                <tr>
                                    {notification.data && notification.data.old_data && (
                                        <>
                                            <th
                                                scope="col"
                                                className="py-3.5 px-4 text-sm font-normal text-left text-gray-300"
                                            >
                                                Metoda
                                            </th>

                                            {Object.keys(notification.data.old_data).map((key) => (
                                                <th
                                                    scope="col"
                                                    className="py-3.5 px-4 text-sm font-normal text-left text-gray-300"
                                                    key={key}
                                                >
                                                    {key}
                                                </th>
                                            ))}
                                        </>
                                    )}

                                    {notification.data && notification.data.new_data && !notification.data.old_data && (
                                        <>
                                            {Object.keys(notification.data.new_data).map((key) => (
                                                <th
                                                    scope="col"
                                                    className="py-3.5 px-4 text-sm font-normal text-left text-gray-300"
                                                    key={key}
                                                >
                                                    {key}
                                                </th>
                                            ))}
                                        </>
                                    )}
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-zinc-700 ">
                                <tr className="space-x-4 mx-2">
                                    {notification.data && notification.data.old_data && (
                                        <>
                                            <td className="px-4 py-4 text-sm font-medium text-gray-400 whitespace-nowrap">
                                                Stará data
                                            </td>

                                            {Object.values(notification.data.old_data).map((value, index) => (
                                                <td
                                                    key={index}
                                                    className="px-4 py-4 text-sm font-medium text-gray-400 whitespace-nowrap"
                                                >
                                                    {notification.data.new_data && notification.data.new_data[Object.keys(notification.data.old_data)[index]] !== value ? (
                                                        <span className="text-red-500">
                                                            {value}
                                                        </span>
                                                    ) : (
                                                        <span>
                                                            {value ?? "-"}
                                                        </span>
                                                    )}
                                                </td>
                                            ))}
                                        </>
                                    )}
                                </tr>

                                <tr className="space-x-4 mx-2">
                                    {notification.data && notification.data.new_data && (
                                        <>
                                            <td className="px-4 py-4 text-sm font-medium text-gray-400 whitespace-nowrap">
                                                Nová data
                                            </td>
                                            {Object.values(notification.data.new_data).map((value, index) => (
                                                <td
                                                    key={index}
                                                    className="px-4 py-4 text-sm font-medium text-gray-400 whitespace-nowrap"
                                                >
                                                    {notification.data.old_data && notification.data.old_data[Object.keys(notification.data.new_data)[index]] !== value ? (
                                                        <span className="text-green-500">
                                                            {value}
                                                        </span>
                                                    ) : (
                                                        <span>
                                                            {value ?? "-"}
                                                        </span>
                                                    )}
                                                </td>
                                            ))}
                                        </>
                                    )}
                                </tr>
                            </tbody>

                        </table>
                    </div>

                    {/* <section className="card grid grid-cols-2">
                        <div>
                            {notification.data && notification.data.old_data && (
                                <>
                                    <h2 className="text-lg font-bold text-white">
                                        Staré údaje
                                    </h2>

                                    <ul>
                                        {Object.entries(notification.data.old_data).map(([key, value]) => (
                                            <li
                                                key={key}
                                                className="space-x-2"

                                            >
                                                <span className="text-xs text-gray-400">
                                                    {key}
                                                </span>

                                                { notification.data.new_data && notification.data.new_data[key] !== value ? (
                                                    <span className="text-red-500">
                                                        {value} <span className="text-xs">→ {notification.data.new_data[key]}</span>
                                                    </span>
                                                ) : (
                                                    <span className="text-white">
                                                        {value}
                                                    </span>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}
                        </div>

                        <div>
                            {notification.data && notification.data.new_data && (
                                <>
                                    <h2 className="text-lg font-bold text-white">
                                        Nové údaje
                                    </h2>

                                    <ul>
                                        {Object.entries(notification.data.new_data).map(([key, value]) => (
                                            <li key={key} className="space-x-2">
                                                <span className="text-xs text-gray-400">
                                                    {key}
                                                </span>

                                                <span className="text-white">
                                                    {value}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}
                        </div>
                    </section> */}
                </div>
            </div>
        </AdminLayout>
    );
}
