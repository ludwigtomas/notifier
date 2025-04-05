import React from 'react'
import AdminLayout from '@/Layouts/AdminLayout'
import { Head, Link } from '@inertiajs/react'
import {
    ChevronRightIcon,
    GlobeAltIcon,
    FolderOpenIcon,
    RocketLaunchIcon,
    UsersIcon,
    ServerStackIcon,
    CircleStackIcon,
} from '@heroicons/react/24/outline'

export default function Edit({ auth, notification }) {
    return (
        <AdminLayout
            user={auth.user}
            header={
                <header className="flex flex-row items-center justify-start space-x-4 text-zinc-500">
                    <Link
                        className="slower-animation text-lg leading-tight font-semibold hover:text-sky-500"
                        href={route('dashboard.index')}
                    >
                        Dashboard
                    </Link>

                    <span>
                        <ChevronRightIcon className="size-5" />
                    </span>

                    <Link
                        className="text-lg leading-tight font-semibold text-sky-500"
                        href={route('notifications.index')}
                    >
                        Notifikace
                    </Link>
                </header>
            }
        >
            <Head title="Notifikace" />

            <div className="mx-auto max-w-[100rem] sm:px-6 lg:px-8">
                <section className="card mb-5">
                    <h1 className="text-center text-2xl font-bold tracking-wider text-white">{notification.notifiable_type_formatted}</h1>
                </section>

                <div className="mb-5">
                    {{
                        Git: <GlobeAltIcon className="size-12 rounded-lg bg-zinc-900 p-1.5 text-green-500" />,
                        GitGroup: <FolderOpenIcon className="size-12 rounded-lg bg-zinc-900 p-1.5 text-sky-500" />,
                        Repository: <RocketLaunchIcon className="size-12 rounded-lg bg-zinc-900 p-1.5 text-red-500" />,
                        User: <UsersIcon className="size-12 rounded-lg bg-zinc-900 p-1.5 text-yellow-500" />,
                        Hosting: <ServerStackIcon className="size-12 rounded-lg bg-zinc-900 p-1.5 text-purple-500" />,
                        RepositoryDatabase: <CircleStackIcon className="size-12 rounded-lg bg-zinc-900 p-1.5 text-yellow-500" />,
                    }[notification.notifiable_type_formatted] || <div>No Icon</div>}

                    {
                        {
                            created: <span className="text-green-500">Vytvoření {notification.notifiable_type_formatted}</span>,
                            updated: <span className="text-yellow-500">Aktualizace {notification.notifiable_type_formatted}</span>,
                            deleted: <span className="text-red-500">Smazání {notification.notifiable_type_formatted}</span>,
                            restored: <span className="text-green-500">Obnovení {notification.notifiable_type_formatted}</span>,
                            forceDeleted: <span className="text-red-500">Trvalé smazání {notification.notifiable_type_formatted}</span>,
                        }[notification.data.action]
                    }
                </div>

                <div className="card overflow-x-auto">
                    <table className="min-w-full divide-y divide-zinc-700">
                        <thead>
                            <tr>
                                {notification.data && notification.data.old_data && (
                                    <>
                                        <th
                                            scope="col"
                                            className="px-4 py-3.5 text-left text-sm font-normal text-gray-300"
                                        >
                                            Metoda
                                        </th>

                                        {Object.keys(notification.data.old_data).map((key) => (
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-left text-sm font-normal text-gray-300"
                                                key={key}
                                            >
                                                {key}
                                            </th>
                                        ))}
                                    </>
                                )}

                                {notification.data && notification.data.new_data && !notification.data.old_data && (
                                    <>
                                        {!notification.data.old_data && (
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-left text-sm font-normal text-gray-300"
                                            >
                                                Metoda
                                            </th>
                                        )}

                                        {Object.keys(notification.data.new_data).map((key) => (
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-left text-sm font-normal text-gray-300"
                                                key={key}
                                            >
                                                {key}
                                            </th>
                                        ))}
                                    </>
                                )}
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-zinc-700">
                            <tr className="mx-2 space-x-4">
                                {notification.data && notification.data.old_data && (
                                    <>
                                        <td className="px-4 py-4 text-sm font-medium whitespace-nowrap text-gray-400">Stará data</td>

                                        {Object.values(notification.data.old_data).map((value, index) => (
                                            <td
                                                key={index}
                                                className="px-4 py-4 text-sm font-medium whitespace-nowrap text-gray-400"
                                            >
                                                {notification.data.new_data &&
                                                notification.data.new_data[Object.keys(notification.data.old_data)[index]] !== value ? (
                                                    <span className="text-red-500">{value}</span>
                                                ) : (
                                                    <span>{value ?? '-'}</span>
                                                )}
                                            </td>
                                        ))}
                                    </>
                                )}
                            </tr>

                            <tr className="mx-2 space-x-4">
                                {notification.data && notification.data.new_data && (
                                    <>
                                        <td className="px-4 py-4 text-sm font-medium whitespace-nowrap text-gray-400">Nová data</td>
                                        {Object.values(notification.data.new_data).map((value, index) => (
                                            <td
                                                key={index}
                                                className="px-4 py-4 text-sm font-medium whitespace-nowrap text-gray-400"
                                            >
                                                {notification.data.old_data &&
                                                notification.data.old_data[Object.keys(notification.data.new_data)[index]] !== value ? (
                                                    <span className="text-green-500">{value}</span>
                                                ) : (
                                                    <span>{value ?? '-'}</span>
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
        </AdminLayout>
    )
}
