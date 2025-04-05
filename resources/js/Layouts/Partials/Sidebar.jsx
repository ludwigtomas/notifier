import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { isImage } from '@/Utils/IsImage'
import { Link, usePage } from '@inertiajs/react'
import React from 'react'
import { GitIcon, GitGroupIcon } from '@/Components/Icons/Models'
import { DashboardIcon, SettingIcon } from '@/Components/Icons/Other'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Authenticated = ({ user }) => {
    const { global, environment } = usePage().props

    const headerNavigation = [
        {
            name: 'Dashboard',
            href: 'dashboard.index',
            icon: DashboardIcon,
            active: 'dashboard.*',
        },
        {
            name: 'Git',
            href: 'gits.index',
            icon: GitIcon,
            active: 'gits.*',
        },
        {
            name: 'Git groups',
            href: 'git-groups.index',
            icon: GitGroupIcon,
            active: 'git-groups.*',
        },
    ]
    const repositoryNavigation = [
        {
            name: 'Repozitáře',
            href: 'repositories.index',
            count: global.repositories_count,
            active: 'repositories.*',
        },
        {
            name: 'Klienti',
            href: 'clients.index',
            count: global.clients_count,
            active: 'clients.*',
        },
        {
            name: 'Hostingy',
            href: 'hostings.index',
            count: global.hostings_count,
            active: 'hostings.*',
        },
        {
            name: 'Worker',
            href: 'workers.index',
            count: global.workers_count,
            active: 'workers.*',
        },
        {
            name: 'Notifikace',
            href: 'notifications.index',
            count: global.notifications_count,
            active: 'notifications.*',
        },
    ]

    const otherNavigation = [
        { name: 'Horizon', href: 'horizon.index', production: true },
        { name: 'Pulse', href: 'pulse', production: true },
        { name: 'Log Viewer', href: 'log-viewer.index', production: true },
        { name: 'Telescope', href: 'telescope', production: false },
    ]

    return (
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-60 lg:flex-col">
            <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-neutral-700 bg-zinc-900/50 px-6 pb-4 backdrop-blur-md">
                <div className="flex h-16 shrink-0 items-end justify-center">
                    <img
                        className="mr-2 size-10 rounded-lg"
                        src={isImage('/src/logo/logo_avatar.png')}
                        alt={'Devuni s.r.o'}
                    />

                    <span className="text-xl font-bold text-white">Devuni s.r.o</span>
                </div>
                <nav className="flex flex-1 flex-col">
                    <ul
                        role="list"
                        className="flex flex-1 flex-col gap-y-7"
                    >
                        <li>
                            <div className="text-xs/6 font-semibold text-indigo-200">Nastavení</div>
                            <ul
                                role="list"
                                className="-mx-2 space-y-1"
                            >
                                {headerNavigation.map((navigation) => (
                                    <li key={navigation.name}>
                                        <Link
                                            href={route(navigation.href)}
                                            className={classNames(
                                                route().current(navigation.active)
                                                    ? 'bg-zinc-900 text-white'
                                                    : 'text-zinc-200 hover:bg-zinc-800 hover:text-white',
                                                'group flex rounded-md p-2 text-sm/6 font-semibold'
                                            )}
                                        >
                                            <navigation.icon
                                                aria-hidden="true"
                                                className="mr-3 flex size-6 shrink-0 items-center justify-center rounded-lg border border-zinc-500 bg-zinc-700 p-1"
                                            />

                                            <span className="truncate">{navigation.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>
                        <li>
                            <div className="text-xs/6 font-semibold text-indigo-200">Repozitáře</div>
                            <ul
                                role="list"
                                className="-mx-2 mt-2 space-y-1"
                            >
                                {repositoryNavigation.map((navigation) => (
                                    <li key={navigation.name}>
                                        <Link
                                            href={route(navigation.href)}
                                            className={classNames(
                                                route().current(navigation.active)
                                                    ? 'bg-zinc-900 text-white'
                                                    : 'text-zinc-200 hover:bg-zinc-800 hover:text-white',
                                                'group flex gap-x-3 rounded-md p-2'
                                            )}
                                        >
                                            <span className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-zinc-500 bg-zinc-700">
                                                {navigation.count > 99 ? (
                                                    <span className="text-xs/6 font-semibold">99+</span>
                                                ) : (
                                                    <span className="text-xs/6 font-semibold">{navigation.count}</span>
                                                )}
                                            </span>

                                            <span className="truncate text-sm/6 font-semibold">{navigation.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>
                        <li>
                            <div className="text-xs/6 font-semibold text-indigo-200">Další</div>
                            <ul
                                role="list"
                                className="-mx-2 mt-2"
                            >
                                {otherNavigation.map((navigation) => (
                                    <li key={navigation.name}>
                                        {environment == 'production' ? (
                                            navigation.production == false ? (
                                                <span className="group flex cursor-not-allowed items-center gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-zinc-500">
                                                    <span className="flex size-4 shrink-0 items-center justify-center">
                                                        <ChevronRightIcon />
                                                    </span>
                                                    <span className="truncate">{navigation.name}</span>
                                                </span>
                                            ) : (
                                                <a
                                                    href={route(navigation.href)}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="group flex items-center gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-zinc-200 hover:bg-zinc-800 hover:text-white"
                                                >
                                                    <span className="flex size-4 shrink-0 items-center justify-center">
                                                        <ChevronRightIcon />
                                                    </span>
                                                    <span className="truncate">{navigation.name}</span>
                                                </a>
                                            )
                                        ) : (
                                            <a
                                                href={route(navigation.href)}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="group flex items-center gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-zinc-200 hover:bg-zinc-800 hover:text-white"
                                            >
                                                <span className="flex size-4 shrink-0 items-center justify-center">
                                                    <ChevronRightIcon />
                                                </span>
                                                <span className="truncate">{navigation.name}</span>
                                            </a>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </li>
                        <li className="mt-auto">
                            <a
                                href="#"
                                className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-indigo-200 hover:bg-indigo-700 hover:text-white"
                            >
                                <SettingIcon
                                    aria-hidden="true"
                                    className="size-6 shrink-0 text-indigo-200 group-hover:text-white"
                                />
                                Settings
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Authenticated
