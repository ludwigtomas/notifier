import AdminLayout from '@/Layouts/AdminLayout'
import { Head, Link } from '@inertiajs/react'
import { PencilSquareIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

export default function Dashboard({ auth, client }) {
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
                        className="text-lg font-semibold leading-tight text-sky-500"
                        href={route('clients.show', client.id)}
                    >
                        {client.name}
                    </Link>

                    <span>
                        <ChevronRightIcon className="size-5" />
                    </span>

                    <div className="group relative">
                        <Link
                            className="text-lg font-semibold leading-tight text-sky-500"
                            href={route('clients.show', client.id)}
                        >
                            Zobrazit
                        </Link>

                        <div className="invisible absolute left-0 top-full z-30 flex flex-col pt-6 group-hover:visible">
                            <div className="grid gap-y-2 rounded-xl border-2 border-zinc-700 bg-zinc-900 p-4">
                                <Link
                                    href={route('clients.edit', client.id)}
                                    className="flex items-center justify-center space-x-4 rounded-lg border border-transparent bg-zinc-800 px-4 py-1.5 hover:border-green-500"
                                >
                                    <span className="text-gray-200">Editovat</span>

                                    <PencilSquareIcon className="h-6 w-6 text-green-500" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </header>
            }
        >
            <Head title={client.name + ' - Show'} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">clients</div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}
