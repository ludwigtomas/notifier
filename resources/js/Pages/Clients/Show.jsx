import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link } from "@inertiajs/react";
import {
    PencilSquareIcon,
    ChevronRightIcon,
} from "@heroicons/react/24/outline";

export default function Dashboard({ auth, client }) {
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
                        href={route("clients.index")}
                    >
                        Klienti
                    </Link>

                    <span>
                        <ChevronRightIcon className="size-5" />
                    </span>

                    <Link
                        className="font-semibold text-lg leading-tight text-sky-500"
                        href={route("clients.show", client.id)}
                    >
                        {client.name}
                    </Link>

                    <span>
                        <ChevronRightIcon className="size-5" />
                    </span>

                    <div className="relative group">
                        <Link
                            className="font-semibold text-lg leading-tight text-sky-500"
                            href={route("clients.show", client.id)}
                        >
                            Zobrazit
                        </Link>

                        <div className="absolute invisible group-hover:visible flex flex-col left-0 top-full pt-6 z-30">
                            <div className="bg-zinc-900 border-2 border-zinc-700 rounded-xl p-4 grid gap-y-2 ">
                                <Link
                                    href={route("clients.edit", client.id)}
                                    className="flex items-center justify-center space-x-4 bg-zinc-800 px-4 py-1.5 rounded-lg border border-transparent hover:border-green-500"
                                >
                                    <span className="text-gray-200">
                                        Editovat
                                    </span>

                                    <PencilSquareIcon className="w-6 h-6 text-green-500" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </header>
            }
        >
            <Head title={client.name + " - Show"} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">clients</div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
