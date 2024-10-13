import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link } from "@inertiajs/react";
import { ChevronRightIcon, GlobeAltIcon } from "@heroicons/react/24/outline";
import {
    EditButton,
} from "@/Components/Buttons/ActionButtons";
import Dropdown from "@/Components/Dropdown";

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

                {/* Another options */}
                <div className="fixed right-10 bottom-10">
                    <Dropdown maxWidth="md">
                        <Dropdown.Trigger>
                            <div className="flex items-center space-x-2">
                                <div className="group inline-flex rounded-xl bg-sky-500 ">
                                    <button
                                        type="button"
                                        className="px-6 py-3 rounded-md focus:outline-none"
                                    >
                                        <span className="leading-4 font-medium text-white text-lg group-hover:text-sky-100 transition ease-in-out duration-150">
                                            Další možnosti
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </Dropdown.Trigger>

                        <Dropdown.Content direction="up" width="72">
                            <h3 className="text-center text-white font-bold uppercase py-2 mb-2 border-b border-zinc-800">
                                Settings
                            </h3>

                            <Link
                                href={route("gits.sync", "gitlab")}
                                preserveScroll
                                className="flex items-center justify-center py-2 pl-1 text-sm leading-5 text-zinc-400 focus:outline-none focus:bg-zinc-600 transition duration-150 ease-in-out hover:bg-zinc-800 border-l-4 border-transparent hover:border-green-500 hover:text-green-500"
                            >
                                <code className="p-1 w-full">
                                    Sync Gitlab
                                </code>
                            </Link>
                        </Dropdown.Content>
                    </Dropdown>
                </div>
            </div>
        </AdminLayout>
    );
}
