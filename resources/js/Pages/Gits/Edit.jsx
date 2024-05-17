import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from '@inertiajs/react';
import {
    EyeIcon,
    ChevronRightIcon,
} from "@heroicons/react/24/outline";
import UpdateGitInformationForm from "@/Pages/Gits/Partials/UpdateGitInformationForm";
import UpdateGitGroups from "@/Pages/Gits/Partials/UpdateGitGroups";
import AttachGitGroups from "@/Pages/Gits/Partials/AttachGitGroups";

export default function Edit({ auth, git }) {

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
                        href={route("gits.index")}
                    >
                        Gits
                    </Link>

                    <span>
                        <ChevronRightIcon className="size-5" />
                    </span>

                    <Link
                        className="font-semibold text-lg leading-tight text-sky-500"
                        href={route("gits.edit", git.id)}
                    >
                        {git.name}
                    </Link>

                    <span>
                        <ChevronRightIcon className="size-5" />
                    </span>

                    <div className="relative group">
                        <Link
                            className="font-semibold text-lg leading-tight text-sky-500"
                            href={route("gits.edit", git.id)}
                        >
                            Edit
                        </Link>

                        <div className="absolute invisible group-hover:visible flex flex-col left-0 top-full pt-6 z-30">
                            <div className="bg-zinc-900 border-2 border-zinc-700 rounded-xl p-2 grid gap-y-2 shadow-xl shadow-black">
                                <Link
                                    className="flex items-center justify-center space-x-4 bg-zinc-800 px-4 py-2 rounded-md border border-transparent hover:border-sky-500"
                                    href={route("gits.show", git.id)}
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
            <Head title={git.name + " - Edit"} />

            <div className="sm:px-6 lg:px-8">
                <div className="container mx-auto space-y-6 ">
                    <div className="p-8 bg-zinc-900 sm:rounded-3xl border-4 border-zinc-900">
                        <UpdateGitInformationForm
                            git={git}
                        />
                    </div>

                    <div className="p-8 bg-zinc-900 sm:rounded-3xl border-4 border-zinc-900">
                        <UpdateGitGroups
                            git={git}
                        />
                    </div>

                    <div className="p-8 bg-zinc-900 sm:rounded-3xl border-4 border-zinc-900">
                        <AttachGitGroups
                            git_groups={git.relationships.git_groups}
                        />
                    </div>

                </div>
            </div>


        </AuthenticatedLayout>
    );
}
