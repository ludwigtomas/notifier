import AdminLayout from '@/Layouts/AdminLayout'
import { Head, Link } from '@inertiajs/react'
import { EyeIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import UpdateGitInformationForm from '@/Pages/Gits/Partials/UpdateGitInformationForm'
import UpdateGitGroups from '@/Pages/Gits/Partials/UpdateGitGroups'
import AttachGitGroups from '@/Pages/Gits/Partials/AttachGitGroups'

export default function Edit({ auth, git, repositories }) {
    return (
        <AdminLayout
            user={auth.user}
            header={
                <header className="flex flex-row items-center justify-start space-x-4 text-zinc-500">
                    <Link
                        className="slower-animation text-lg leading-tight font-semibold hover:text-sky-500"
                        href={route('dashboard.index')}
                    >
                        Dashboard
                    </Link>

                    <span>
                        <ChevronRightIcon className="size-5" />
                    </span>

                    <Link
                        className="slower-animation text-lg leading-tight font-semibold hover:text-sky-500"
                        href={route('gits.index')}
                    >
                        Gits
                    </Link>

                    <span>
                        <ChevronRightIcon className="size-5" />
                    </span>

                    <Link
                        className="text-lg leading-tight font-semibold text-sky-500"
                        href={route('gits.edit', git.id)}
                    >
                        {git.name}
                    </Link>

                    <span>
                        <ChevronRightIcon className="size-5" />
                    </span>

                    <div className="group relative">
                        <Link
                            className="text-lg leading-tight font-semibold text-sky-500"
                            href={route('gits.edit', git.id)}
                        >
                            Edit
                        </Link>
                    </div>
                </header>
            }
        >
            <Head title={git.name + ' - Edit'} />

            <div className="">
                <div className="container mx-auto space-y-6">
                    <div className="card p-6">
                        <UpdateGitInformationForm git={git} />
                    </div>

                    <div className="card p-6">
                        <UpdateGitGroups
                            git_groups={git.relationships.git_groups_parent}
                            repositories={repositories}
                        />
                    </div>

                    <div className="card p-6">
                        <AttachGitGroups git_groups={git.relationships.git_groups_parent} />
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}
