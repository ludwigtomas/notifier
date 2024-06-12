import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import { Link, usePage } from "@inertiajs/react";
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
} from "@heroicons/react/24/outline";

export default function Authenticated({ user, header, children }) {
    return (
        <main className="flex flex-row items-start justify-start min-h-screen">
            <aside className="min-h-screen relative grid w-[6.6rem] lg:w-[16rem]">
                <nav className="bg-zinc-900 border-r border-neutral-700 fixed lg:w-56 h-full left-0 top-0 py-20 ">
                    <div className="relative flex flex-col items-center justify-between h-full">
                        <div className="flex flex-col items-center space-y-5">
                            <Link href="/">
                                <ApplicationLogo className="bg-zinc-950 size-20 p-1.5 rounded-xl" />
                            </Link>

                            <div className="relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-none text-[20px]  hover:text-sky-500 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {user.name}

                                                <ChevronDownIcon className="ms-2 -me-0.5 size-4" />
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content align="left">
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                        >
                                            Profile
                                        </Dropdown.Link>

                                        <Dropdown.Link
                                            href={route("logout")}
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
                                href={route("dashboard.index")}
                                active={route().current("dashboard.*")}
                                className="gap-4 w-full"
                            >
                                <PresentationChartBarIcon className="size-10" />

                                <span className="w-full hidden xl:block">
                                    Dashboard
                                </span>

                                <span>
                                    { usePage().props.global.new_notifications_count }
                                </span>
                            </NavLink>

                            <NavLink
                                href={route("gits.index")}
                                active={route().current("gits.*")}
                                className="gap-4 w-full"
                            >
                                <GlobeAltIcon className="size-10" />

                                <span className="w-full hidden xl:block">
                                    Git
                                </span>

                                <span>
                                    { usePage().props.global.gits_count }
                                </span>
                            </NavLink>

                            <NavLink
                                href={route("git-groups.index")}
                                active={route().current("git-groups.*")}
                                className="gap-4 w-full"
                            >
                                <FolderOpenIcon className="size-10" />

                                <span className="w-full hidden xl:block">
                                    Git groups
                                </span>

                                <span>
                                    { usePage().props.global.git_group_parent_count }
                                </span>
                            </NavLink>

                            <NavLink
                                href={route("repositories.index")}
                                active={route().current("repositories.*")}
                                className="gap-4 w-full"
                            >
                                <RocketLaunchIcon className="size-10" />

                                <span className="w-full hidden xl:block">
                                    Repozitáře
                                </span>

                                <span>
                                    { usePage().props.global.repositories_count }
                                </span>
                            </NavLink>

                            <NavLink
                                href={route("clients.index")}
                                active={route().current("clients.*")}
                                className="gap-4 w-full"
                            >
                                <UsersIcon className="size-10" />

                                <span className="w-full hidden xl:block">
                                    Klienti
                                </span>

                                <span>
                                    { usePage().props.global.clients_count }
                                </span>
                            </NavLink>

                            <NavLink
                                href={route("hostings.index")}
                                active={route().current("hostings.*")}
                                className="gap-4 w-full"
                            >
                                <ServerStackIcon className="size-10" />

                                <span className="w-full hidden xl:block">
                                    Hostingy
                                </span>

                                <span>
                                    { usePage().props.global.hostings_count }
                                </span>
                            </NavLink>

                            <NavLink
                                href={route("notifications.index")}
                                active={route().current("notifications.*")}
                                className="gap-4 w-full"
                            >
                                <BellIcon className="size-10" />

                                <span className="w-full hidden xl:block">
                                    Notifikace
                                </span>

                                <span>
                                    { usePage().props.global.notifications_count }
                                </span>
                            </NavLink>

                        </div>

                        <div className="flex items-center flex-col">
                            <div className="relative grid grid-cols-1">
                                <a
                                    className="px-4 py-2 rounded-lg text-center text-xs leading-5 text-zinc-400 hover:text-zinc-200 focus:outline-none focus:bg-zinc-600 transition duration-150 ease-in-out hover:bg-zinc-800"
                                    href={route("horizon.index")}
                                >
                                    Horizon
                                </a>

                                <a
                                    className="px-4 py-2 rounded-lg text-center text-xs leading-5 text-zinc-400 hover:text-zinc-200 focus:outline-none focus:bg-zinc-600 transition duration-150 ease-in-out hover:bg-zinc-800"
                                    href="/dashboard/pulse"
                                >
                                    Pulse
                                </a>

                                <a
                                    className="px-4 py-2 rounded-lg text-center text-xs leading-5 text-zinc-400 hover:text-zinc-200 focus:outline-none focus:bg-zinc-600 transition duration-150 ease-in-out hover:bg-zinc-800"
                                    href={route("log-viewer.index")}
                                >
                                    Log Viewer
                                </a>
                            </div>
                        </div>

                        <div className="absolute left-1/2 -translate-x-1/2 -bottom-14">
                            <div className="bg-zinc-700 p-2 rounded-xl relative">
                                <div className="absolute size-5 bg-red-500 left-full bottom-full -translate-x-3 translate-y-3 rounded-full flex items-center justify-center">
                                    <span className="text-xs text-white font-bold">
                                        { usePage().props.global.notifications_count }
                                    </span>
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

            <section className="w-full">
                {header && (
                    <header className="bg-zinc-900">
                        <div className="py-6 px-4 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}

                <div className="max-w-[100rem] py-8 mx-auto">{children}</div>
            </section>
        </main>
    );
}
