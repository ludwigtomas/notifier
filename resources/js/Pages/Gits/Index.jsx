import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link } from "@inertiajs/react";
import { ChevronRightIcon, GlobeAltIcon } from "@heroicons/react/24/outline";
import {
    EditButton,
} from "@/Components/Buttons/ActionButtons";

export default function Index({ auth, gits }) {
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
                        className="font-semibold text-lg leading-tight text-sky-500"
                        href={route("gits.index")}
                    >
                        Gits
                    </Link>
                </header>
            }
        >
            <Head title="Gity" />

            <div className="max-w-[100rem] mx-auto sm:px-6 lg:px-8">
                <div className="grid grid-cols-1">
                    <div className="card">
                        <div className="flex space-x-4">
                            <div className="flex items-center justify-center">
                                <Link
                                    href={route("gits.index")}
                                    className="p-2 rounded-md bg-zinc-800 border border-zinc-700 hover:border-zinc-600 faster-animation"
                                >
                                    <GlobeAltIcon className="size-10 text-sky-500" />
                                </Link>
                            </div>

                            <div>
                                <h1 className="text-2xl font-semibold capitalize lg:text-3xl dark:text-white">
                                    Gity
                                </h1>

                                <p className="text-zinc-400">
                                    Seznam všech dostupných gitových služeb.
                                </p>
                            </div>
                        </div>
                    </div>

                    <section className="mt-2 card">
                        <table className="min-w-full divide-y divide-zinc-700 rounded-lg overflow-hidden">
                            <thead className="bg-zinc-800 text-nowrap">
                                <tr>
                                    <th className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400">
                                        Avatar
                                    </th>

                                    <th className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400">
                                        Git služba
                                    </th>

                                    <th className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400">
                                        slug
                                    </th>

                                    <th className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400">
                                        Uživatelské jméno
                                    </th>

                                    <th className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400">
                                        Token
                                    </th>

                                    <th className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400">
                                        Počet skupin
                                    </th>

                                    <th className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400">
                                        Počet repozitářů
                                    </th>

                                    <th className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400">
                                        Akce
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-zinc-800 bg-zinc-700">
                                {gits && gits.length >= 1 && gits.map((git) => {
                                    return (
                                        <tr
                                            key={git.id}
                                            className="group text-white transition-colors duration-200 hover:bg-zinc-800"
                                        >
                                            <td className="px-4 py-4">
                                                <img
                                                    className="w-10 h-10 rounded-lg"
                                                    src={ "/storage/avatars/" + git.username + ".png"}
                                                    alt={git.name}
                                                />
                                            </td>

                                            <td className="px-4 py-4">
                                                <span className="text-sm font-medium">
                                                    {git.name}
                                                </span>
                                            </td>

                                            <td className="px-4 py-4">
                                                <span className="text-sm font-medium">
                                                    {git.slug}
                                                </span>
                                            </td>

                                            <td className="px-4 py-4">
                                                <span className="text-sm font-medium">
                                                    {git.username}
                                                </span>
                                            </td>

                                            <td className="px-4 py-4">
                                                <span className="blur hover:blur-0 text-sm font-medium text-zinc-400">
                                                    {git.api_token}
                                                </span>
                                            </td>

                                            <td className="px-4 py-4">
                                                <div className="bg-stone-800 group-hover:bg-stone-700 text-center py-1 px-2 text-gray-200 rounded-lg ">
                                                    { git.relationships.git_groups_parent_count}
                                                </div>
                                            </td>

                                            <td className="px-4 py-4">
                                                <div className="bg-stone-800 group-hover:bg-stone-700 text-center py-1 px-2 text-gray-200 rounded-lg ">
                                                    { git.relationships.repositories_count }
                                                </div>
                                            </td>

                                            <td className="px-4 py-4">
                                                <div className="flex space-x-2">
                                                    <EditButton
                                                        href={route(
                                                            "gits.edit",
                                                            git.id
                                                        )}
                                                    />
                                                    {/* <ShowButton href={route("gits.show", git.id)}/> */}
                                                    {/* <DeleteButton as="button" method="DELETE" href={route("gits.destroy", git.id)}/> */}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </section>
                </div>
            </div>
        </AdminLayout>
    );
}
