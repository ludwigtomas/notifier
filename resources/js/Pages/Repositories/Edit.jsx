import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import UpdateRepositoryInformationForm from "@/Pages/Repositories/Partials/UpdateRepositoryInformationForm";
import UpdateRepositoryDetachClientsForm from "@/Pages/Repositories/Partials/UpdateRepositoryDetachClientsForm";
import UpdateRepositoryAttachClientsForm from "@/Pages/Repositories/Partials/UpdateRepositoryAttachClientsForm";
import UpdateRepositoryHostingForm from "@/Pages/Repositories/Partials/UpdateRepositoryHostingForm";
import CreateRepositoryHostingForm from "@/Pages/Repositories/Partials/CreateRepositoryHostingForm";
import Dropdown from "@/Components/Dropdown";
import { Head, Link } from '@inertiajs/react';
import { motion } from "framer-motion";
import {
    EyeIcon,
    ChevronRightIcon,
    ClipboardIcon,
    CommandLineIcon,
} from "@heroicons/react/24/outline";

export default function Edit({ auth, repository, hostings, clients }) {

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
                        className="font-semibold text-lg leading-tight hover:text-sky-500 slower-animation"
                        href={route("repositories.index")}
                    >
                        Repozitáře
                    </Link>

                    <span>
                        <ChevronRightIcon className="size-5" />
                    </span>

                    <Link
                        className="font-semibold text-lg leading-tight text-sky-500"
                        href={route("repositories.edit", repository.repository_id)}
                    >
                        {repository.name}
                    </Link>

                    <span>
                        <ChevronRightIcon className="size-5" />
                    </span>

                    <div className="relative group">
                        <Link
                            className="font-semibold text-lg leading-tight text-sky-500"
                            href={route("repositories.show", repository.repository_id)}
                        >
                            Edit
                        </Link>

                        <div className="absolute invisible group-hover:visible flex flex-col left-0 top-full pt-6 z-30">
                            <div className="bg-zinc-900 border-2 border-zinc-700 rounded-xl p-2 grid gap-y-2 shadow-xl shadow-black">
                                <Link
                                    className="flex items-center justify-center space-x-4 bg-zinc-800 px-4 py-2 rounded-md border border-transparent hover:border-sky-500"
                                    href={route("repositories.show", repository.repository_id)}
                                >
                                    <span className="text-gray-200">
                                        Zobrazit
                                    </span>

                                    <EyeIcon className="size-6 text-sky-500" />
                                </Link>

                                { repository.relationships.hosting_repository && repository.relationships.hosting_repository.id && (
                                    <Link
                                        className="flex items-center justify-center space-x-4 bg-zinc-800 px-4 py-2 rounded-md border border-transparent hover:border-orange-500"
                                        href={route("hosting-repository.vps-connect", repository.relationships.hosting_repository.id)}
                                    >
                                        <span className="text-gray-200">
                                            Hosting
                                        </span>

                                        <CommandLineIcon className="size-6 text-orange-500" />
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </header>
            }
        >
            <Head title={repository.name + " - Edit"} />

            <div className="py-12">
                <div className="max-w-[90rem] mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-10 bg-zinc-900 sm:rounded-xl">
                        <UpdateRepositoryInformationForm repository={repository}/>
                    </div>

                    <div className="p-10 bg-zinc-900 sm:rounded-xl">
                        <UpdateRepositoryDetachClientsForm repository={repository}/>
                    </div>

                    <div className="p-10 bg-zinc-900 sm:rounded-xl">
                        <UpdateRepositoryAttachClientsForm
                            repository={repository}
                            clients={clients}
                        />
                    </div>

                    <div className="p-10 bg-zinc-900 sm:rounded-xl grid grid-cols-2 place-items-center gap-20">
                        { repository.relationships.hosting_repository ? (
                            <UpdateRepositoryHostingForm
                                hosting_repository={repository.relationships.hosting_repository}
                                hosting={repository.relationships.hosting}
                                hostings={hostings}
                                className="w-full"
                            />
                        ) : (
                            <CreateRepositoryHostingForm
                                repository_id={repository.repository_id}
                                hosting_repository={repository.relationships.hosting_repository}
                                hostings={hostings}
                                className="w-full"
                            />
                        )}

                            <div className="w-full bg-stone-900 p-1 drop-shadow-2xl rounded-xl overflow-hidden">
                                <div className="flex justify-between items-center relative">
                                    <div className="absolute left-1/2 -translate-x-1/2">
                                        <span className="text-gray-400 mr-4">
                                            .ssh
                                        </span>
                                        <span className="text-white text-xl font-bold uppercase">
                                            VPS connection
                                        </span>
                                    </div>

                                    <div className="p-2 flex space-x-2">
                                        <div className="space-x-2">
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                <ClipboardIcon className="size-6 text-white" />
                                            </motion.button>
                                        </div>
                                    </div>

                                    <div className="p-4 flex space-x-2">
                                        <div className="rounded-full w-3 h-3 bg-red-500"></div>
                                        <div className="rounded-full w-3 h-3 bg-yellow-500"></div>
                                        <div className="rounded-full w-3 h-3 bg-green-500"></div>
                                    </div>
                                </div>

                                <div className="w-full flex items-center justify-center">
                                    <div className="bg-stone-800 rounded-lg w-full">
                                        <div
                                            id="code-area"
                                            className="p-5 space-y-3"
                                        >
                                            <div className="text-base text-center">
                                                <span className="text-yellow-300">
                                                    ssh
                                                </span>{" "}
                                                <span className="text-purple-400">
                                                    { repository.relationships.hosting_repository?.login_user }
                                                </span>
                                                <span className="text-green-300">
                                                    @
                                                </span>
                                                <span className="text-purple-400">
                                                    { repository.relationships.hosting_repository?.ip_address }
                                                </span>{" "}

                                                {repository.relationships.hosting_repository?.ip_port && (
                                                    <span>
                                                        <span className="text-green-300">
                                                            -p
                                                        </span>{" "}
                                                        <span className="text-purple-400">
                                                            { repository.relationships.hosting_repository?.ip_port }
                                                        </span>
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>

                    {/* Another options */}
                    <div className="fixed right-10 bottom-10">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <div className="flex items-center space-x-2">
                                    <div className="group inline-flex rounded-xl bg-sky-500 ">
                                        <button
                                            type="button"
                                            className="px-6 py-3 rounded-md focus:outline-none"
                                        >
                                            <span className="leading-4 font-medium text-white text-lg group-hover:text-sky-100 transition ease-in-out duration-150">
                                                Další možnosti
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </Dropdown.Trigger>

                            <Dropdown.Content
                                direction="up"
                                width="64"
                            >
                                <h3 className="text-center w-64 text-white font-bold uppercase p-2 mb-2 px border-b border-zinc-800">
                                    Odeslání emailu
                                </h3>

                                <Link
                                    href={route("repositories.last-commit", repository.repository_id)}
                                    preserveScroll
                                    className="flex items-center w-full px-4 py-2 text-start text-sm leading-5 text-zinc-400 focus:outline-none focus:bg-zinc-600 transition duration-150 ease-in-out hover:bg-zinc-800 border-l-4 border-transparent hover:border-green-500 hover:text-green-500"
                                >
                                    VPS
                                </Link>

                                <Link
                                    href={route("repositories.last-commit", repository.repository_id)}
                                    preserveScroll
                                    className="flex items-center w-full px-4 py-2 text-start text-sm leading-5 text-zinc-400 focus:outline-none focus:bg-zinc-600 transition duration-150 ease-in-out hover:bg-zinc-800 border-l-4 border-transparent hover:border-green-500 hover:text-green-500"
                                >
                                    Delete
                                </Link>

                                <Link
                                    href={route("repositories.last-commit", repository.repository_id)}
                                    preserveScroll
                                    className="flex items-center w-full px-4 py-2 text-start text-sm leading-5 text-zinc-400 focus:outline-none focus:bg-zinc-600 transition duration-150 ease-in-out hover:bg-zinc-800 border-l-4 border-transparent hover:border-green-500 hover:text-green-500"
                                >
                                    Last Commit
                                </Link>


                                <Link
                                    href={repository.analytics_property_id ? route("repositories.google-analytics", repository.repository_id) : null}
                                    preserveScroll
                                    disabled={!repository.analytics_property_id}
                                    className={"flex items-center w-full px-4 py-2 text-start text-sm leading-5 text-zinc-400 transition duration-150 ease-in-out border-l-4 "
                                    + (repository.analytics_property_id ? 'border-transparent hover:bg-zinc-800 hover:border-green-500 hover:text-green-500' : 'cursor-not-allowed border-red-500')}
                                >
                                    Google analytics

                                </Link>

                            </Dropdown.Content>
                        </Dropdown>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
