import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import { Link } from "@inertiajs/react";
import {
    PresentationChartBarIcon,
    BugAntIcon,
    ArchiveBoxIcon,
    UsersIcon,
    ServerStackIcon,
} from "@heroicons/react/24/solid";

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <main className="flex flex-row items-start justify-start min-h-screen">
            <aside className="min-h-screen relative grid w-[16rem]">
                <nav className="bg-zinc-900 fixed w-56 h-full left-0 top-0 py-20 ">
                    <div className="flex flex-col items-center justify-between h-full">
                        <div className="flex flex-col items-center space-y-5">
                            <Link href="/">
                                <ApplicationLogo className="bg-sky-500 w-20 h-20 p-1.5 rounded-xl" />
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

                                                <svg
                                                    className="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
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
                                <PresentationChartBarIcon className="size-6"/>

                                <span className="w-full">
                                    Dashboard
                                </span>
                            </NavLink>

                            <NavLink
                                href={route("gits.index")}
                                active={route().current("gits.*")}
                                className="gap-4 w-full"
                            >
                                <BugAntIcon className="size-6"/>

                                <span className="w-full">
                                    Git
                                </span>
                            </NavLink>

                            <NavLink
                                href={route("repositories.index")}
                                active={route().current("repositories.*")}
                                className="gap-4 w-full"
                            >
                                <ArchiveBoxIcon className="size-6"/>

                                <span className="w-full">
                                    Repozitáře
                                </span>
                            </NavLink>

                            <NavLink
                                href={route("clients.index")}
                                active={route().current("clients.*")}
                                className="gap-4 w-full"
                            >
                                <UsersIcon className="size-6"/>

                                <span className="w-full">
                                    Klienti
                                </span>
                            </NavLink>

                            <NavLink
                                href={route("hostings.index")}
                                active={route().current("hostings.*")}
                                className="gap-4 w-full"
                            >
                                <ServerStackIcon className="size-6"/>

                                <span className="w-full">
                                    Hostingy
                                </span>
                            </NavLink>
                        </div>

                        <div className="flex items-center flex-col">
                            <div className="relative grid grid-cols-3">
                                <a
                                    className="px-1 py-2 rounded-lg text-center text-xs leading-5 text-zinc-400 hover:text-zinc-200 focus:outline-none focus:bg-zinc-600 transition duration-150 ease-in-out hover:bg-zinc-800"
                                    href={route("horizon.index")}
                                >
                                    Horizon
                                </a>

                                <a
                                    className="px-1 py-2 rounded-lg text-center text-xs leading-5 text-zinc-400 hover:text-zinc-200 focus:outline-none focus:bg-zinc-600 transition duration-150 ease-in-out hover:bg-zinc-800"
                                    href='/dashboard/pulse'
                                >
                                    Pulse
                                </a>

                                <a
                                    className="px-1 py-2 rounded-lg text-center text-xs leading-5 text-zinc-400 hover:text-zinc-200 focus:outline-none focus:bg-zinc-600 transition duration-150 ease-in-out hover:bg-zinc-800"
                                    href={route("log-viewer.index")}
                                >
                                    Log Viewer
                                </a>

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

                <div className="max-w-[90rem] mx-auto">
                    {children}
                </div>
            </section>

        </main>

    );
}
