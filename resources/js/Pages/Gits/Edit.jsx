import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link } from "@inertiajs/react";
import { EyeIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import UpdateGitInformationForm from "@/Pages/Gits/Partials/UpdateGitInformationForm";
import UpdateGitGroups from "@/Pages/Gits/Partials/UpdateGitGroups";
import AttachGitGroups from "@/Pages/Gits/Partials/AttachGitGroups";

export default function Edit({ auth, git, repositories }) {
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
                    </div>
                </header>
            }
        >
            <Head title={git.name + " - Edit"} />

            <div className="sm:px-6 lg:px-8">
                <div className="container mx-auto space-y-6 ">
                    <div className="p-8 bg-zinc-900 sm:rounded-3xl border-4 border-zinc-900">
                        <UpdateGitInformationForm git={git} />
                    </div>

                    <div className="p-8 bg-zinc-900 sm:rounded-3xl border-4 border-zinc-900">
                        <UpdateGitGroups
                            git_groups={git.relationships.git_groups_parent}
                            repositories={repositories}
                        />
                    </div>

                    <div className="p-8 bg-zinc-900 sm:rounded-3xl border-4 border-zinc-900">
                        <AttachGitGroups
                            git_groups={git.relationships.git_groups_parent}
                        />
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
