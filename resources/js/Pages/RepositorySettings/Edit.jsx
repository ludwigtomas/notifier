import AdminLayout from "@/Layouts/AdminLayout";
import UpdateRepositoryInformationForm from "@/Pages/Repositories/Partials/UpdateRepositoryInformationForm";
import UpdateRepositoryDetachClientsForm from "@/Pages/Repositories/Partials/UpdateRepositoryDetachClientsForm";
import UpdateRepositoryAttachClientsForm from "@/Pages/Repositories/Partials/UpdateRepositoryAttachClientsForm";
import UpdateRepositoryHostingForm from "@/Pages/Repositories/Partials/UpdateRepositoryHostingForm";
import CreateRepositoryHostingForm from "@/Pages/Repositories/Partials/CreateRepositoryHostingForm";
import Dropdown from "@/Components/Dropdown";
import { Head, Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import {
    EyeIcon,
    ChevronRightIcon,
    ClipboardIcon,
    CommandLineIcon,
    PencilSquareIcon,
} from "@heroicons/react/24/outline";

export default function Edit({ auth, repository, repository_setting }) {
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
                        className="font-semibold text-lg leading-tight hover:text-sky-500 slower-animation"
                        href={route("repositories.index")}
                    >
                        Repozitáře
                    </Link>

                    <span>
                        <ChevronRightIcon className="size-5" />
                    </span>

                    <div className="relative group">
                        <Link
                            className="font-semibold text-lg leading-tight hover:text-sky-500 slower-animation"
                            href={route("repositories.edit", repository.repository_id)}
                        >
                            {repository.name}
                        </Link>

                        <div className="absolute invisible group-hover:visible flex flex-col left-0 top-full w-full pt-6 z-30">
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

                                <Link
                                    className="flex items-center justify-center space-x-4 bg-zinc-800 px-4 py-2 rounded-md border border-transparent hover:border-green-500"
                                    href={route("repositories.edit", repository.repository_id)}
                                >
                                    <span className="text-gray-200">
                                        Editovat
                                    </span>

                                    <PencilSquareIcon className="w-6 h-6 text-green-500" />
                                </Link>


                                {repository.relationships.hosting_repository && repository.relationships.hosting_repository.id && (
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

                    <span>
                        <ChevronRightIcon className="size-5" />
                    </span>

                    <div className="relative group">
                        <Link
                            className="font-semibold text-lg leading-tight text-sky-500"
                            href={route("repository-settings.create", repository.repository_id)}
                        >
                            Repository settings
                        </Link>

                        <div className="absolute invisible group-hover:visible flex flex-col left-0 top-full pt-6 z-30">
                            <div className="bg-zinc-900 border-2 border-zinc-700 rounded-xl p-2 grid gap-y-2 shadow-xl shadow-black">
                                <Link
                                    className="flex items-center justify-center space-x-4 bg-zinc-800 px-4 py-2 rounded-md border border-transparent hover:border-sky-500"
                                    href={route("repository-settings.create", repository.repository_id)}
                                >
                                    <span className="text-gray-200">
                                        Create
                                    </span>

                                    <EyeIcon className="size-6 text-sky-500" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </header>
            }
        >
            <Head title={repository.name + " - Edit"} />

            <div className="max-w-[90rem] mx-auto sm:px-6 lg:px-8 space-y-6">

            </div>
        </AdminLayout>
    );
}
