import AdminLayout from '@/Layouts/AdminLayout'
import { Head, Link } from '@inertiajs/react'
import { ChevronRightIcon, GlobeAltIcon } from '@heroicons/react/24/outline'
import { EditButton } from '@/Components/Buttons/ActionButtons'
import Dropdown from '@/Components/Dropdown'

export default function Index({ auth, gits }) {
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
                        className="text-lg font-semibold leading-tight text-sky-500"
                        href={route('gits.index')}
                    >
                        Gits
                    </Link>
                </header>
            }
        >
            <Head title="Gity" />

            <div className="mx-auto max-w-[100rem] sm:px-6 lg:px-8">
                <div className="grid grid-cols-1">
                    <div className="card">
                        <div className="flex space-x-4">
                            <div className="flex items-center justify-center">
                                <Link
                                    href={route('gits.index')}
                                    className="faster-animation rounded-md border border-zinc-700 bg-zinc-800 p-2 hover:border-zinc-600"
                                >
                                    <GlobeAltIcon className="size-10 text-sky-500" />
                                </Link>
                            </div>

                            <div>
                                <h1 className="text-2xl font-semibold capitalize lg:text-3xl dark:text-white">Gity</h1>

                                <p className="text-zinc-400">Seznam všech dostupných gitových služeb.</p>
                            </div>
                        </div>
                    </div>

                    <section className="card mt-2">
                        <table className="min-w-full divide-y divide-zinc-700 overflow-hidden rounded-lg">
                            <thead className="text-nowrap bg-zinc-800">
                                <tr>
                                    <th className="px-4 py-3.5 text-left text-sm font-normal text-zinc-400">Avatar</th>

                                    <th className="px-4 py-3.5 text-left text-sm font-normal text-zinc-400">Git služba</th>

                                    <th className="px-4 py-3.5 text-left text-sm font-normal text-zinc-400">slug</th>

                                    <th className="px-4 py-3.5 text-left text-sm font-normal text-zinc-400">Uživatelské jméno</th>

                                    <th className="px-4 py-3.5 text-left text-sm font-normal text-zinc-400">Token</th>

                                    <th className="px-4 py-3.5 text-left text-sm font-normal text-zinc-400">Počet skupin</th>

                                    <th className="px-4 py-3.5 text-left text-sm font-normal text-zinc-400">Počet repozitářů</th>

                                    <th className="px-4 py-3.5 text-left text-sm font-normal text-zinc-400">Akce</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-zinc-800 bg-zinc-700">
                                {gits &&
                                    gits.length >= 1 &&
                                    gits.map((git) => {
                                        return (
                                            <tr
                                                key={git.id}
                                                className="group text-white transition-colors duration-200 hover:bg-zinc-800"
                                            >
                                                <td className="px-4 py-4">
                                                    <img
                                                        className="h-10 w-10 rounded-lg"
                                                        src={'/storage/avatars/' + git.username + '.png'}
                                                        alt={git.name}
                                                    />
                                                </td>

                                                <td className="px-4 py-4">
                                                    <span className="text-sm font-medium">{git.name}</span>
                                                </td>

                                                <td className="px-4 py-4">
                                                    <span className="text-sm font-medium">{git.slug}</span>
                                                </td>

                                                <td className="px-4 py-4">
                                                    <span className="text-sm font-medium">{git.username}</span>
                                                </td>

                                                <td className="px-4 py-4">
                                                    <span className="text-sm font-medium text-zinc-400 blur hover:blur-0">
                                                        {git.api_token}
                                                    </span>
                                                </td>

                                                <td className="px-4 py-4">
                                                    <div className="rounded-lg bg-stone-800 px-2 py-1 text-center text-gray-200 group-hover:bg-stone-700">
                                                        {git.relationships.git_groups_parent_count}
                                                    </div>
                                                </td>

                                                <td className="px-4 py-4">
                                                    <div className="rounded-lg bg-stone-800 px-2 py-1 text-center text-gray-200 group-hover:bg-stone-700">
                                                        {git.relationships.repositories_count}
                                                    </div>
                                                </td>

                                                <td className="px-4 py-4">
                                                    <div className="flex space-x-2">
                                                        <EditButton href={route('gits.edit', git.id)} />
                                                        {/* <ShowButton href={route("gits.show", git.id)}/> */}
                                                        {/* <DeleteButton as="button" method="DELETE" href={route("gits.destroy", git.id)}/> */}
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                            </tbody>
                        </table>
                    </section>
                </div>

                {/* Another options */}
                <div className="fixed bottom-10 right-10">
                    <Dropdown maxWidth="md">
                        <Dropdown.Trigger>
                            <div className="flex items-center space-x-2">
                                <div className="group inline-flex rounded-xl bg-sky-500">
                                    <button
                                        type="button"
                                        className="rounded-md px-6 py-3 focus:outline-none"
                                    >
                                        <span className="text-lg font-medium leading-4 text-white transition duration-150 ease-in-out group-hover:text-sky-100">
                                            Další možnosti
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </Dropdown.Trigger>

                        <Dropdown.Content
                            direction="up"
                            width="72"
                        >
                            <h3 className="mb-2 border-b border-zinc-800 py-2 text-center font-bold uppercase text-white">Settings</h3>

                            <Link
                                href={route('gits.sync', 'gitlab')}
                                preserveScroll
                                className="flex items-center justify-center border-l-4 border-transparent py-2 pl-1 text-sm leading-5 text-zinc-400 transition duration-150 ease-in-out hover:border-green-500 hover:bg-zinc-800 hover:text-green-500 focus:bg-zinc-600 focus:outline-none"
                            >
                                <code className="w-full p-1">Sync Gitlab</code>
                            </Link>
                        </Dropdown.Content>
                    </Dropdown>
                </div>
            </div>
        </AdminLayout>
    )
}
