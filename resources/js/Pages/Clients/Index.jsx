import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
    PencilSquareIcon,
    TrashIcon,
    EyeIcon,
} from "@heroicons/react/24/outline";

export default function Dashboard({ auth, clients }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-zinc-900 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex justify-between p-5">
                            <div className=" text-gray-300">
                                Přidaní klienti
                            </div>

                            <div>
                                <Link
                                    class="bg-zinc-800 text-gray-200 text-md uppercase px-3 py-2 rounded-lg hover:bg-zinc-700 slower-animation"
                                    href={route("clients.create")}
                                >
                                    Vytvořit
                                </Link>
                            </div>
                        </div>

                        <div className="p-6 flex flex-col divide-y divide-zinc-800 ">
                            <table class="min-w-full divide-y divide-gray-700">
                                <thead class="bg-gray-800">
                                    <tr>
                                        <th
                                            scope="col"
                                            class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-400"
                                        >
                                            <div class="flex items-center gap-x-3">
                                                <span>Name</span>
                                            </div>
                                        </th>

                                        <th
                                            scope="col"
                                            class="px-[59px] py-3.5 text-sm font-normal text-left rtl:text-right text-gray-400"
                                        >
                                            <button class="flex items-center gap-x-2">
                                                <span>Email</span>
                                            </button>
                                        </th>

                                        <th
                                            scope="col"
                                            class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-400"
                                        >
                                            <button class="flex items-center gap-x-2">
                                                <span>Phone</span>
                                            </button>
                                        </th>

                                        <th
                                            scope="col"
                                            class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-400"
                                        >
                                            Teams
                                        </th>

                                        <th
                                            scope="col"
                                            class="relative py-3.5 px-4"
                                        >
                                            <span class="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                {clients.map((client) => (
                                    <tbody class="divide-y divide-gray-700 bg-gray-900">
                                        <tr>
                                            <td class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                <div class="inline-flex items-center gap-x-3">
                                                    <div class="flex items-center gap-x-2">
                                                        <div>
                                                            <h2 class="font-medium text-white ">
                                                                {client.name}
                                                            </h2>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="px-12 py-4 text-sm font-medium text-gray-500 whitespace-nowrap">
                                                <div class="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-gray-800">
                                                    <h2 class="text-sm font-normal">
                                                        <a
                                                            href={`mailto:${client.email}`}
                                                        >
                                                            {client.email}
                                                        </a>
                                                    </h2>
                                                </div>
                                            </td>
                                            <td class="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">
                                                {client.phone}
                                            </td>

                                            <td class="px-4 py-4 text-sm whitespace-nowrap">
                                                <div class="flex items-center gap-x-2">
                                                    <p class="px-3 py-1 text-xs text-indigo-500 rounded-full bg-gray-800">
                                                        Design
                                                    </p>
                                                    <p class="px-3 py-1 text-xs text-blue-500 rounded-full bg-gray-800">
                                                        Product
                                                    </p>
                                                    <p class="px-3 py-1 text-xs text-pink-500 rounded-full bg-gray-800">
                                                        Marketing
                                                    </p>
                                                </div>
                                            </td>

                                            <td class="px-4 py-4 text-sm whitespace-nowrap">
                                                <div class="flex items-center gap-x-6">
                                                    <Link
                                                        href={route("gits.edit", client.id)}
                                                        className="bg-green-100 p-1 rounded-lg hover:bg-green-200 slower-animation"
                                                    >
                                                        <PencilSquareIcon className="w-6 h-6 text-green-500" />
                                                    </Link>

                                                    <Link
                                                        href={route("clients.show",client.id)}
                                                        className="bg-sky-100 p-1 rounded-lg hover:bg-sky-200 slower-animation"
                                                    >
                                                        <EyeIcon className="w-6 h-6 text-sky-500" />
                                                    </Link>

                                                    <Link
                                                        as="button"
                                                        method="delete"
                                                        preserveScroll
                                                        href={route("clients.destroy", client.id)}
                                                        className="bg-red-100 p-1 rounded-lg hover:bg-red-200 slower-animation"
                                                    >
                                                        <TrashIcon className="w-6 h-6 text-red-500" />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                ))}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
