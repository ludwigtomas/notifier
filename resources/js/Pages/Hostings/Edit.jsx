import AdminLayout from '@/Layouts/AdminLayout'
import { Head, Link, router, useForm } from '@inertiajs/react'
import TextInput from '@/Components/TextInput'
import InputLabel from '@/Components/InputLabel'
import InputError from '@/Components/InputError'
import {
    PencilSquareIcon,
    TrashIcon,
    EyeIcon,
    PlusIcon,
    CheckIcon,
    XMarkIcon,
    ChevronRightIcon,
    ServerStackIcon,
    ArchiveBoxArrowDownIcon,
} from '@heroicons/react/24/outline'
import PrimaryButton from '@/Components/PrimaryButton'
import AttachHostingRepositoriesForm from '@/Pages/Hostings/Partials/AttachHostingRepositoriesForm'
import UpdateHostingAttachedRepositoriesForm from '@/Pages/Hostings/Partials/UpdateHostingAttachedRepositoriesForm'
import UpdateHostingInformationForm from '@/Pages/Hostings/Partials/UpdateHostingInformationForm'
import WorkerStatus from './Partials/WorkerStatus'

export default function Index({ auth, hosting, repositories }) {
    const { data, setData, put, processing, errors, recentlySuccessful } = useForm({
        name: hosting.name,
        hosting_url: hosting.hosting_url ?? '',
        repositories: [],
    })

    const submit = (e) => {
        e.preventDefault()

        put(route('hostings.update', hosting.id))
    }

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
                        href={route('hostings.index')}
                    >
                        Klienti
                    </Link>

                    <span>
                        <ChevronRightIcon className="size-5" />
                    </span>

                    <Link
                        className="slower-animation text-lg leading-tight font-semibold text-sky-500"
                        href={route('hostings.edit', hosting.id)}
                    >
                        {hosting.name}
                    </Link>

                    <span>
                        <ChevronRightIcon className="size-5" />
                    </span>

                    <Link
                        className="text-lg leading-tight font-semibold text-sky-500"
                        href={route('hostings.edit', hosting.id)}
                    >
                        Edit
                    </Link>
                </header>
            }
        >
            <Head title="Dashboard" />

            <div className="mx-auto max-w-[90rem] space-y-6 sm:px-6 lg:px-8">
                <div className="bg-zinc-900 p-10 sm:rounded-xl">
                    <UpdateHostingInformationForm hosting={hosting} />
                </div>

                <div className="bg-zinc-900 p-10 sm:rounded-xl">
                    <UpdateHostingAttachedRepositoriesForm hosting={hosting} />
                </div>

                <div className="bg-zinc-900 p-10 sm:rounded-xl">
                    <AttachHostingRepositoriesForm
                        hosting={hosting}
                        repositories={repositories}
                    />
                </div>
                {hosting.relationships.worker?.id && (
                    <div className="bg-zinc-900 p-10 sm:rounded-xl">
                        <WorkerStatus worker={hosting.relationships.worker} />
                    </div>
                )}
            </div>
        </AdminLayout>
    )
}
