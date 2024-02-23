import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    TrashIcon,
    EyeIcon,
    PlusIcon,
    ChevronRightIcon,
    UserIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import UpdateRepositoryInformationForm from "@/Pages/Repositories/Partials/UpdateRepositoryInformationForm";
import UpdateRepositoryDetachClientsForm from "@/Pages/Repositories/Partials/UpdateRepositoryDetachClientsForm";
import UpdateRepositoryAttachClientsForm from "@/Pages/Repositories/Partials/UpdateRepositoryAttachClientsForm";

import { Head, Link, useForm, usePage } from '@inertiajs/react';


export default function Edit({ auth, repository, clients }) {

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
                        <ChevronRightIcon className="w-5 h-5" />
                    </span>

                    <Link
                        className="font-semibold text-lg leading-tight hover:text-sky-500 slower-animation"
                        href={route("repositories.index")}
                    >
                        Repozitáře
                    </Link>

                    <span>
                        <ChevronRightIcon className="w-5 h-5" />
                    </span>

                    <Link
                        className="font-semibold text-lg leading-tight text-sky-500"
                        href={route("repositories.edit", repository.id)}
                    >
                        {repository.name}
                    </Link>

                    <span>
                        <ChevronRightIcon className="w-5 h-5" />
                    </span>

                    <div className="relative group">
                        <Link
                            className="font-semibold text-lg leading-tight text-sky-500"
                            href={route("repositories.show", repository.id)}
                        >
                            Edit
                        </Link>

                        <div className="absolute invisible group-hover:visible flex flex-col left-0 top-full pt-6">
                            <div className="bg-zinc-900 border-2 border-zinc-700 rounded-xl p-4 grid gap-y-2 ">
                                <Link
                                    href={route("repositories.show", repository.id)}
                                    className="flex items-center justify-center space-x-4 bg-zinc-800 px-4 py-1.5 rounded-lg border border-transparent hover:border-sky-500"
                                >
                                    <span className="text-gray-200">
                                        Zobrazit
                                    </span>

                                    <EyeIcon className="w-6 h-6 text-sky-500" />
                                </Link>

                                {/* <Link
                                    as="button"
                                    method="delete"
                                    preserveScroll
                                    href={route("repositories.destroy", repository.id)}
                                    className="flex items-center justify-center space-x-4 bg-zinc-800 px-4 py-1.5 rounded-lg border border-transparent hover:border-sky-500"
                                >
                                    <span className="text-gray-200">
                                        Smazat
                                    </span>

                                    <TrashIcon className="w-6 h-6 text-red-500" />
                                </Link> */}
                            </div>
                        </div>
                    </div>
                </header>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-[90rem] mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-10 bg-zinc-900 sm:rounded-xl">
                        <UpdateRepositoryInformationForm
                            repository={repository}
                        />
                    </div>

                    <div className="p-10 bg-zinc-900 sm:rounded-xl">
                        <UpdateRepositoryDetachClientsForm
                            repository={repository}
                        />
                    </div>

                    <div className="p-10 bg-zinc-900 sm:rounded-xl">
                        <UpdateRepositoryAttachClientsForm
                            repository={repository}
                            clients={clients}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
