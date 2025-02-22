import ApplicationLogo from '@/Components/ApplicationLogo'
import Dropdown from '@/Components/Dropdown'
import NavLink from '@/Components/NavLink'
import { Link, usePage } from '@inertiajs/react'
import {
    PresentationChartBarIcon,
    UsersIcon,
    ServerStackIcon,
    ChevronDownIcon,
    BellAlertIcon,
    FolderOpenIcon,
    GlobeAltIcon,
    RocketLaunchIcon,
    BellIcon,
} from '@heroicons/react/24/outline'

const Sidebar = ({ user }) => {
    return (
        <aside className="relative grid min-h-screen w-[4rem] lg:w-[14rem]">
            <nav className="fixed left-0 top-0 h-full w-[4rem] border-r border-neutral-700 bg-zinc-900 py-20 lg:w-[14rem]">
                <div className="relative flex h-full flex-col items-center justify-between">
                    <div className="flex flex-col items-center space-y-5">
                        <Link href={route('dashboard.index')}>
                            <ApplicationLogo className="size-20 rounded-xl bg-zinc-950 p-1.5" />
                        </Link>

                        <div className="relative">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button
                                            type="button"
                                            className="inline-flex items-center rounded-md border border-transparent bg-none px-3 py-2 text-[20px] text-sm font-medium leading-4 text-white transition duration-150 ease-in-out hover:text-sky-500 focus:outline-none"
                                        >
                                            {user.name}

                                            <ChevronDownIcon className="-me-0.5 ms-2 size-4" />
                                        </button>
                                    </span>
                                </Dropdown.Trigger>

                                <Dropdown.Content
                                    align="center"
                                    width="40"
                                >
                                    <Dropdown.Link
                                        href={route('profile.edit')}
                                        className="justify-center"
                                    >
                                        Profile
                                    </Dropdown.Link>

                                    <Dropdown.Link
                                        className="justify-center"
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                    >
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>

                    <div className="space-y-2 px-4">
                        <NavLink
                            href={route('dashboard.index')}
                            active={route().current('dashboard.*')}
                            className="w-full gap-4"
                        >
                            <PresentationChartBarIcon className="size-10" />

                            <span className="hidden w-full xl:block">Dashboard</span>

                            <span>{usePage().props.global.new_notifications_count}</span>
                        </NavLink>

                        <NavLink
                            href={route('gits.index')}
                            active={route().current('gits.*')}
                            className="w-full gap-4"
                        >
                            <GlobeAltIcon className="size-10" />

                            <span className="hidden w-full xl:block">Git</span>

                            <span>{usePage().props.global.gits_count}</span>
                        </NavLink>

                        <NavLink
                            href={route('git-groups.index')}
                            active={route().current('git-groups.*')}
                            className="w-full gap-4"
                        >
                            <FolderOpenIcon className="size-10" />

                            <span className="hidden w-full xl:block">Git groups</span>

                            <span>{usePage().props.global.git_group_parent_count}</span>
                        </NavLink>

                        <NavLink
                            href={route('repositories.index')}
                            active={route().current('repositories.*')}
                            className="w-full gap-4"
                        >
                            <RocketLaunchIcon className="size-10" />

                            <span className="hidden w-full xl:block">Repozitáře</span>

                            <span>{usePage().props.global.repositories_count}</span>
                        </NavLink>

                        <NavLink
                            href={route('clients.index')}
                            active={route().current('clients.*')}
                            className="w-full gap-4"
                        >
                            <UsersIcon className="size-10" />

                            <span className="hidden w-full xl:block">Klienti</span>

                            <span>{usePage().props.global.clients_count}</span>
                        </NavLink>

                        <NavLink
                            href={route('hostings.index')}
                            active={route().current('hostings.*')}
                            className="w-full gap-4"
                        >
                            <ServerStackIcon className="size-10" />

                            <span className="hidden w-full xl:block">Hostingy</span>

                            <span>{usePage().props.global.hostings_count}</span>
                        </NavLink>

                        <NavLink
                            href={route('workers.index')}
                            active={route().current('workers.*')}
                            className="w-full gap-4"
                        >
                            <ServerStackIcon className="size-10" />

                            <span className="hidden w-full xl:block">Workers</span>

                            <span>{usePage().props.global.workers_count}</span>
                        </NavLink>

                        <NavLink
                            href={route('notifications.index')}
                            active={route().current('notifications.*')}
                            className="w-full gap-4"
                        >
                            <BellIcon className="size-10" />

                            <span className="hidden w-full xl:block">Notifikace</span>

                            <span>{usePage().props.global.notifications_count}</span>
                        </NavLink>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="relative grid grid-cols-1">
                            <a
                                className="rounded-lg px-4 py-2 text-center text-xs leading-5 text-zinc-400 transition duration-150 ease-in-out hover:bg-zinc-800 hover:text-zinc-200 focus:bg-zinc-600 focus:outline-none"
                                href={route('horizon.index')}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Horizon
                            </a>

                            <a
                                className="rounded-lg px-4 py-2 text-center text-xs leading-5 text-zinc-400 transition duration-150 ease-in-out hover:bg-zinc-800 hover:text-zinc-200 focus:bg-zinc-600 focus:outline-none"
                                href={route('pulse')}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Pulse
                            </a>

                            {/* <a
                                className="px-4 py-2 rounded-lg text-center text-xs leading-5 text-zinc-400 hover:text-zinc-200 focus:outline-none focus:bg-zinc-600 transition duration-150 ease-in-out hover:bg-zinc-800"
                                href={route("telescope")}
                                target="_blank"
                            >
                                Telescope
                            </a> */}

                            <a
                                className="rounded-lg px-4 py-2 text-center text-xs leading-5 text-zinc-400 transition duration-150 ease-in-out hover:bg-zinc-800 hover:text-zinc-200 focus:bg-zinc-600 focus:outline-none"
                                href={route('log-viewer.index')}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Log Viewer
                            </a>
                        </div>
                    </div>

                    <div className="absolute -bottom-14 left-1/2 -translate-x-1/2">
                        <div className="relative rounded-xl bg-zinc-700 p-2">
                            <div className="absolute bottom-full left-full flex size-5 -translate-x-3 translate-y-3 items-center justify-center rounded-full bg-red-500">
                                <span className="text-xs font-bold text-white">{usePage().props.global.notifications_count}</span>
                            </div>

                            <BellAlertIcon className="size-6 text-zinc-400 hover:text-zinc-200" />

                            <Link
                                href={route('notifications.index')}
                                className="absolute inset-0 z-20"
                            />
                        </div>
                    </div>
                </div>
            </nav>
        </aside>
    )
}

export default Sidebar
