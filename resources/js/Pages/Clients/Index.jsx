import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
    PencilSquareIcon,
    TrashIcon,
    EyeIcon,
    PlusIcon,
    XMarkIcon,
    ChevronRightIcon,
} from "@heroicons/react/24/outline";

export default function Dashboard({ auth, clients }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <header className="flex items-center justify-start flex-row space-x-4 text-zinc-500">
                    <Link
                        className="font-semibold text-lg leading-tight hover:text-sky-500 slower-animation"
                        href={route('dashboard.index')}
                    >
                        Dashboard
                    </Link>

                    <span>
                        <ChevronRightIcon className="w-5 h-5"/>
                    </span>

                    <Link
                        className="font-semibold text-lg leading-tight text-sky-500"
                        href={route('clients.index')}
                    >
                        Klienti
                    </Link>

                </header>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-zinc-900 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex justify-between p-5">
                            <div className=" text-zinc-300">
                                Přidaní klienti
                            </div>

                            <div>
                                <Link
                                    className="bg-zinc-800 text-zinc-200 text-md uppercase px-3 py-2 rounded-lg hover:bg-zinc-700 faster-animation"
                                    href={route("clients.create")}
                                >
                                    Vytvořit
                                </Link>
                            </div>
                        </div>

                        <div className="border-4 border-zinc-900 divide-y divide-zinc-800 ">
                            <table className="min-w-full divide-y divide-zinc-700 rounded-md overflow-hidden">
                                <thead className="bg-zinc-950">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400"
                                        >
                                            Klient
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-12 py-3.5 text-sm font-normal text-left text-zinc-400"
                                        >
                                            Email
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400"
                                        >
                                            Telefon
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400"
                                        >
                                            Počet repositářů
                                        </th>

                                        <th
                                            scope="col"
                                            className="relative py-3.5 px-4"
                                        >
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-700 bg-zinc-900">
                                    {clients.map((client) => (
                                        <tr
                                            key={client.id}
                                            className="group hover:bg-zinc-800"
                                        >
                                            <td className="px-4 py-4 ">
                                                <span className="text-sm font-medium text-zinc-400">
                                                    {client.name}
                                                </span>
                                            </td>
                                            <td className="px-12 py-4 text-sm font-medium text-zinc-400">
                                                {client.email ?? <XMarkIcon className="w-6 h-6 text-red-500"/>}
                                            </td>

                                            <td className="px-4 py-4 text-sm text-zinc-300 whitespace-nowrap">
                                                {client.phone ?? <XMarkIcon className="w-6 h-6 text-red-500"/>}
                                            </td>

                                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                <div className="flex items-center gap-x-2 ">
                                                    {client.relationships.repositories.slice(0,2).map((repository) => (
                                                        <p
                                                            key={repository.id}
                                                            className="px-3 py-1 text-xs text-zinc-400 rounded-full bg-zinc-800 group-hover:bg-zinc-900 faster-animation"
                                                        >
                                                            {repository.name}
                                                        </p>
                                                    ))}

                                                    <span className="px-3 py-1 text-xs text-zinc-400 rounded-full bg-zinc-800 group-hover:bg-zinc-700 faster-animation">
                                                        { client.relationships.repositories_count > 2
                                                            ? (
                                                                <span>
                                                                    + {client.relationships.repositories_count - 2}
                                                                </span>
                                                            )
                                                            : (
                                                                <span>
                                                                    <XMarkIcon className="w-6 h-6 text-zinc-600 group-hover:text-zinc-900 faster-animation"/>
                                                                </span>
                                                            )
                                                        }
                                                    </span>
                                                </div>
                                            </td>

                                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                <div className="flex items-center space-x-2">
                                                    <Link
                                                        href={route("clients.edit", client.id)}
                                                        className="bg-zinc-800 group-hover:bg-zinc-900 p-1 rounded-lg border border-transparent hover:border-green-500 faster-animation"
                                                    >
                                                        <PencilSquareIcon className="w-6 h-6 text-green-500" />
                                                    </Link>

                                                    <Link
                                                        href={route("clients.show",client.id)}
                                                        className="bg-zinc-800 group-hover:bg-zinc-900 p-1 rounded-lg border border-transparent hover:border-sky-500 faster-animation"
                                                    >
                                                        <EyeIcon className="w-6 h-6 text-sky-500" />
                                                    </Link>

                                                    <Link
                                                        as="button"
                                                        method="delete"
                                                        preserveScroll
                                                        href={route("clients.destroy", client.id)}
                                                        className="bg-zinc-800 group-hover:bg-zinc-900 p-1 rounded-lg border border-transparent hover:border-red-500 faster-animation"
                                                    >
                                                        <TrashIcon className="w-6 h-6 text-red-500" />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
