import { Link } from '@inertiajs/react'
import ResetFilters from '@/Components/ResetFilters'
import {
    EyeIcon,
    BookmarkIcon,
    PencilSquareIcon,
    GlobeAltIcon,
    FolderOpenIcon,
    RocketLaunchIcon,
    UsersIcon,
    ServerStackIcon,
    CircleStackIcon,
    ServerIcon,
} from '@heroicons/react/24/outline'

export default function NotificationTable({ data, filters, clearUrl = route('notifications.index') }) {
    return (
        <>
            {filters.length !== 0 && data.length === 0 ? (
                <ResetFilters href={clearUrl}>Nebyly nalezeny žádné notifikace.</ResetFilters>
            ) : data && data.length > 0 ? (
                <table className="min-w-full divide-y divide-zinc-700 overflow-hidden rounded-lg">
                    <thead className="bg-zinc-800 text-nowrap">
                        <tr>
                            <th className="px-4 py-3.5 text-left text-sm font-normal text-zinc-400">Model</th>
                            <th className="px-4 py-3.5 text-left text-sm font-normal text-zinc-400">Metoda</th>

                            <th className="px-4 py-3.5 text-left text-sm font-normal text-zinc-400">Model</th>

                            <th className="px-4 py-3.5 text-left text-sm font-normal text-zinc-400">Model ID</th>

                            <th className="px-4 py-3.5 text-left text-sm font-normal text-zinc-400">Vytvořeno dne</th>

                            <th className="px-4 py-3.5 text-left text-sm font-normal text-zinc-400">Notifikátor</th>

                            <th className="px-4 py-3.5 text-left text-sm font-normal text-zinc-400">Stav notifikace</th>

                            <th className="px-4 py-3.5 text-center text-sm font-normal text-zinc-400">Akce</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-zinc-800 bg-zinc-700">
                        {data.map((notification, index) => (
                            <tr
                                key={index}
                                className={
                                    'text-white ' +
                                    (notification.data.action === 'created' ? 'bg-green-500/5 hover:bg-green-500/15' : '') +
                                    ' ' +
                                    (notification.data.action === 'updated' ? 'bg-yellow-500/5 hover:bg-yellow-500/15' : '') +
                                    ' ' +
                                    (notification.data.action === 'deleted' ? 'bg-purple-500/5 hover:bg-purple-500/15' : '') +
                                    ' ' +
                                    (notification.data.action === 'restored' ? 'bg-blue-500/5 hover:bg-blue-500/15' : '') +
                                    ' ' +
                                    (notification.data.action === 'forceDeleted' ? 'bg-red-500/5 hover:bg-red-500/15' : '')
                                }
                            >
                                <td className="px-4 py-4">
                                    {{
                                        Git: <GlobeAltIcon className="size-12 rounded-lg bg-zinc-900 p-1.5 text-green-500" />,
                                        GitGroup: <FolderOpenIcon className="size-12 rounded-lg bg-zinc-900 p-1.5 text-sky-500" />,
                                        Repository: <RocketLaunchIcon className="size-12 rounded-lg bg-zinc-900 p-1.5 text-red-500" />,
                                        User: <UsersIcon className="size-12 rounded-lg bg-zinc-900 p-1.5 text-yellow-500" />,
                                        Hosting: <ServerStackIcon className="size-12 rounded-lg bg-zinc-900 p-1.5 text-purple-500" />,
                                        RepositoryDatabase: (
                                            <CircleStackIcon className="size-12 rounded-lg bg-zinc-900 p-1.5 text-yellow-500" />
                                        ),
                                        RepositoryFile: <ServerIcon className="size-12 rounded-lg bg-zinc-900 p-1.5 text-sky-500" />,
                                    }[notification.notifiable_type_formatted] || (
                                        <div>No Icon - {notification.notifiable_type_formatted}</div>
                                    )}
                                </td>

                                <td className="px-4 py-4">
                                    <span
                                        className={
                                            'text-md group rounded-full border-b-4 px-3 py-1 font-extrabold uppercase shadow-inner ' +
                                            (notification.data.action === 'created'
                                                ? 'border-b-green-900 bg-green-500 shadow-green-50'
                                                : '') +
                                            ' ' +
                                            (notification.data.action === 'updated'
                                                ? 'border-b-yellow-900 bg-yellow-500 shadow-yellow-50'
                                                : '') +
                                            ' ' +
                                            (notification.data.action === 'deleted'
                                                ? 'border-b-purple-900 bg-purple-500 shadow-purple-50'
                                                : '') +
                                            ' ' +
                                            (notification.data.action === 'restored'
                                                ? 'border-b-blue-900 bg-blue-500 shadow-blue-50'
                                                : '') +
                                            ' ' +
                                            (notification.data.action === 'forceDeleted' ? 'border-b-red-900 bg-red-500 shadow-red-50' : '')
                                        }
                                    >
                                        {notification.data.action}
                                    </span>
                                </td>

                                <td className="px-4 py-4">
                                    <span className="text-sm font-medium">{notification.notifiable_type_formatted}</span>
                                </td>

                                <td className="px-4 py-4">
                                    <span className="text-sm font-medium">{notification.notifiable_id}</span>
                                </td>

                                <td className="flex flex-col items-center px-4 py-4">
                                    <span className="text-sm font-medium">{notification.created_at_formatted}</span>
                                    <span className="text-sm font-medium text-gray-400">{notification.created_at_human}</span>
                                </td>

                                <td className="px-4 py-4">
                                    <span className="text-sm font-medium">{notification.type_formatted}</span>
                                </td>

                                <td className="px-4 py-4">
                                    <span className={'text-xs font-semibold ' + (notification.read_at ? 'text-green-500' : 'text-red-500')}>
                                        {notification.read_at ? 'Přečteno' : 'Nepřečteno'}
                                    </span>
                                </td>

                                <td className="px-4 py-4">
                                    <div className="flex justify-center space-x-2">
                                        <Link
                                            href={route('notifications.show', notification.id)}
                                            className="faster-animation group rounded-lg border border-transparent bg-zinc-800 p-1 group-hover:bg-zinc-900 hover:border-sky-500"
                                        >
                                            <EyeIcon className="size-6 text-sky-500" />
                                        </Link>

                                        <Link
                                            as="button"
                                            method="PATCH"
                                            href={route('notifications.mark-as-read', notification.id)}
                                            className="faster-animation group rounded-lg border border-transparent bg-zinc-800 p-1 group-hover:bg-zinc-900 hover:border-yellow-500"
                                            preserveScroll
                                        >
                                            <BookmarkIcon
                                                className={
                                                    'size-6 ' +
                                                    (notification.read_at
                                                        ? 'fill-yellow-500 text-yellow-500'
                                                        : 'text-yellow-500 group-hover:fill-yellow-500 group-hover:text-yellow-500')
                                                }
                                            />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="relative overflow-hidden rounded-lg border-2 border-zinc-700 p-4">
                    <div className="flex animate-pulse items-center">
                        <div className="flex-1 space-y-6 py-1">
                            <div className="grid grid-cols-12 gap-4">
                                <div className="col-span-1 h-2 rounded bg-zinc-800" />
                                <div className="col-span-4 h-2 rounded bg-zinc-800" />
                                <div className="col-span-5 h-2 rounded bg-zinc-800" />
                                <div className="col-span-1 h-2 rounded bg-zinc-800" />
                                <div className="col-span-1 h-2 rounded bg-zinc-800" />
                            </div>
                        </div>

                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                            <span className="rounded-full border border-zinc-800 bg-zinc-900 p-2 text-white">Žádné data</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
