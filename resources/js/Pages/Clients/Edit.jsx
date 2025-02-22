import AdminLayout from '@/Layouts/AdminLayout'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { Head, Link } from '@inertiajs/react'
import UpdateClientInformationForm from '@/Pages/Clients/Partials/UpdateClientInformationForm'
import UpdateClientAttachedRepositoriesForm from '@/Pages/Clients/Partials/UpdateClientAttachedRepositoriesForm'
import AttachClientRepositoriesForm from '@/Pages/Clients/Partials/AttachClientRepositoriesForm'

export default function Edit({ auth, client, repositories }) {
    return (
        <AdminLayout
            user={auth.user}
            header={
                <header className="flex flex-row items-center justify-start space-x-4 text-zinc-500">
                    <Link
                        className="slower-animation text-lg font-semibold leading-tight hover:text-sky-500"
                        href={route('dashboard.index')}
                    >
                        Dashboard
                    </Link>

                    <span>
                        <ChevronRightIcon className="size-5" />
                    </span>

                    <Link
                        className="slower-animation text-lg font-semibold leading-tight hover:text-sky-500"
                        href={route('clients.index')}
                    >
                        Klienti
                    </Link>

                    <span>
                        <ChevronRightIcon className="size-5" />
                    </span>

                    <Link
                        className="slower-animation text-lg font-semibold leading-tight text-sky-500"
                        href={route('clients.edit', client.id)}
                    >
                        {client.name}
                    </Link>

                    <span>
                        <ChevronRightIcon className="size-5" />
                    </span>

                    <Link
                        className="text-lg font-semibold leading-tight text-sky-500"
                        href={route('clients.edit', client.id)}
                    >
                        Edit
                    </Link>
                </header>
            }
        >
            <Head title={client.name + ' - Edit'} />

            <div className="mx-auto max-w-[90rem] space-y-6 sm:px-6 lg:px-8">
                <div className="bg-zinc-900 p-10 sm:rounded-xl">
                    <UpdateClientInformationForm client={client} />
                </div>

                <div className="bg-zinc-900 p-10 sm:rounded-xl">
                    <UpdateClientAttachedRepositoriesForm client={client} />
                </div>

                <div className="bg-zinc-900 p-10 sm:rounded-xl">
                    <AttachClientRepositoriesForm
                        client={client}
                        repositories={repositories}
                    />
                </div>
            </div>
        </AdminLayout>
    )
}
