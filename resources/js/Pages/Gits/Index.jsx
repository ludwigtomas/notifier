import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
    ChevronRightIcon,
} from "@heroicons/react/24/outline";
import {
    EditButton,
    ShowButton,
    DeleteButton,
} from '@/Components/Buttons/ActionButtons';

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
            <Head title="Gits Index" />

            <div className="sm:px-6 lg:px-8">
                <section className="bg-zinc-900 overflow-hidden shadow-sm sm:rounded-3xl">
                    <div className="">

                        <div className="mb-2 px-6 pt-6">
                            <h1 className="text-2xl font-semibold capitalize lg:text-3xl dark:text-white">
                                Gits index
                            </h1>
                        </div>

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
                                            className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400"
                                        >
                                            slug
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
                                            Počet skupin
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
                                                    />
                                                </td>

                                                <td className="px-4 py-4">
                                                    <span className="text-sm font-medium text-zinc-400">
                                                        {git.name}
                                                    </span>
                                                </td>

                                                <td className="px-4 py-4">
                                                    <span className="text-sm font-medium text-zinc-400">
                                                        {git.slug}
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

                                                <td className="px-4 py-4">
                                                    <div className="bg-stone-800 text-center py-1 px-2 text-gray-200 rounded-lg ">
                                                        {git.relationships.git_groups_count}
                                                    </div>
                                                </td>


                                                <td className="px-4 py-4">
                                                    <div className="bg-stone-800 text-center py-1 px-2 text-gray-200 rounded-lg ">
                                                        {git.relationships.repositories_count}
                                                    </div>
                                                </td>

                                                <td className="px-4 py-4">
                                                    <div className="flex space-x-2">
                                                        <EditButton href={route("gits.edit", git.id)}/>
                                                        <ShowButton href={route("gits.show", git.id)}/>
                                                        <DeleteButton as="button" method="DELETE" href={route("gits.destroy", git.id)}/>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </AuthenticatedLayout>
    );
}
