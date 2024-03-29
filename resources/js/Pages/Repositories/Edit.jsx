import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    EyeIcon,
    ChevronRightIcon,
} from "@heroicons/react/24/outline";
import UpdateRepositoryInformationForm from "@/Pages/Repositories/Partials/UpdateRepositoryInformationForm";
import UpdateRepositoryDetachClientsForm from "@/Pages/Repositories/Partials/UpdateRepositoryDetachClientsForm";
import UpdateRepositoryAttachClientsForm from "@/Pages/Repositories/Partials/UpdateRepositoryAttachClientsForm";
import UpdateRepositoryHostingForm from "@/Pages/Repositories/Partials/UpdateRepositoryHostingForm";
import CreateRepositoryHostingForm from "@/Pages/Repositories/Partials/CreateRepositoryHostingForm";
import Dropdown from "@/Components/Dropdown";

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

                    <div className="p-10 bg-zinc-900 sm:rounded-xl">
                        {repository.relationships.hosting ? (
                            <UpdateRepositoryHostingForm repository={repository}/>
                        ) : (
                            <CreateRepositoryHostingForm repository={repository}/>
                        )}
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

                            <Dropdown.Content direction="up">
                                <h3 className="text-center text-white font-bold uppercase p-2 mb-2 px border-b border-zinc-800">
                                    Odeslání emailu
                                </h3>

                                <Link
                                    href={route("repositories.last-commit", repository.id)}
                                    preserveScroll
                                    className="flex items-center w-full px-4 py-2 text-start text-sm leading-5 text-zinc-400 focus:outline-none focus:bg-zinc-600 transition duration-150 ease-in-out hover:bg-zinc-800 border-l-4 border-transparent hover:border-green-500 hover:text-green-500"
                                >
                                    Last Commit
                                </Link>

                                <Link
                                    href={repository.analytics_property_id ? route("repositories.google-analytics", repository.id) : null}
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
