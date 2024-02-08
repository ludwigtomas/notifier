import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
    PencilSquareIcon,
    TrashIcon,
    EyeIcon,
    ChevronRightIcon,
} from "@heroicons/react/24/outline";

export default function Index({ auth, gits }) {
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
                        className="font-semibold text-lg leading-tight text-sky-500"
                        href={route("gits.index")}
                    >
                        Gits
                    </Link>
                </header>
            }
        >
            <Head title="Dashboard" />

            {/* TABLE */}

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-zinc-900 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="border-4 border-zinc-900 divide-y divide-zinc-800 ">
                            <table className="min-w-full divide-y divide-zinc-700 rounded-md overflow-hidden">
                                <thead className="bg-zinc-950">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400"
                                        >
                                            Avatar
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400"
                                        >
                                            Git služba
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-12 py-3.5 text-sm font-normal text-left text-zinc-400"
                                        >
                                            Uživatelské jméno
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-12 py-3.5 text-sm font-normal text-left text-zinc-400"
                                        >
                                            Token
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400"
                                        >
                                            Počet repozitářů
                                        </th>

                                        <th
                                            scope="col"
                                            className="relative py-3.5 px-4"
                                        >
                                            <span className="sr-only">
                                                Edit
                                            </span>
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-zinc-700 bg-zinc-900">
                                    {gits.map((git) => {
                                        return (
                                            <tr key={git.id}>
                                                <td className="px-4 py-4">
                                                    <img
                                                        className="w-10 h-10 rounded-lg"
                                                        src={"/storage/avatars/" + git.username + ".png"}
                                                        alt={git.name}
                                                        key={git.id}
                                                    />
                                                </td>

                                                <td className="px-4 py-4">
                                                    <span className="text-sm font-medium text-zinc-400">
                                                        {git.name}
                                                    </span>
                                                </td>

                                                <td className="px-12 py-4">
                                                    <span className="text-sm font-medium text-zinc-400">
                                                        {git.username}
                                                    </span>
                                                </td>

                                                <td className="px-12 py-4">
                                                    <span className="text-sm font-medium text-zinc-400">
                                                        {git.api_token}
                                                    </span>
                                                </td>

                                                <td className="px-4 py-4 flex justify-center ">
                                                    <div className="bg-green-100 py-1 px-2 rounded-lg ">
                                                        {git.relationships.repositories_count}
                                                    </div>
                                                </td>

                                                <td className="px-4 py-4">
                                                    <div className="flex space-x-2">
                                                        <Link
                                                            href={route("gits.edit", git.id)}
                                                            className="bg-green-100 p-1 rounded-lg hover:bg-green-200 slower-animation"
                                                        >
                                                            <PencilSquareIcon className="w-6 h-6 text-green-500" />
                                                        </Link>

                                                        <Link
                                                            href={route("gits.show", git.id)}
                                                            className="bg-sky-100 p-1 rounded-lg hover:bg-sky-200 slower-animation"
                                                        >
                                                            <EyeIcon className="w-6 h-6 text-sky-500" />
                                                        </Link>

                                                        <Link
                                                            as="button"
                                                            method="delete"
                                                            preserveScroll
                                                            href={route("gits.destroy", git.id)}
                                                            className="bg-red-100 p-1 rounded-lg hover:bg-red-200 slower-animation"
                                                        >
                                                            <TrashIcon className="w-6 h-6 text-red-500" />
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
