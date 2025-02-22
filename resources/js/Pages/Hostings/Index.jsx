import AdminLayout from '@/Layouts/AdminLayout'
import { Head, Link, router } from '@inertiajs/react'
import { ChevronRightIcon, ServerStackIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import TextInput from '@/Components/TextInput'
import InputLabel from '@/Components/InputLabel'
import debounce from 'lodash/debounce'
import Dropdown from '@/Components/Dropdown'
import ResetFilters from '@/Components/ResetFilters'
import HostingsTable from '@/Pages/Hostings/Partials/HostingsTable'

export default function Index({ auth, hostings, filters }) {
    const [search, setSearch] = useState(filters.search ?? '')

    const debouncedSearch = debounce((value) => {
        setSearch(value)

        router.get(
            route('hostings.index'),
            {
                search: value,
            },
            {
                preserveScroll: true,
                preserveState: true,
            }
        )
    }, 500)

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
                        href={route('hostings.index')}
                    >
                        Hostingy
                    </Link>
                </header>
            }
        >
            <Head title="Hostings" />

            <div className="mx-auto max-w-[100rem] sm:px-6 lg:px-8">
                <div className="grid grid-cols-1">
                    <section className="card mb-10">
                        <div className="grid grid-cols-5 items-center gap-2">
                            <div>
                                <InputLabel
                                    className="mb-1"
                                    htmlFor="search"
                                    value="Vyhledat"
                                />

                                <TextInput
                                    label="Hledat"
                                    name="search"
                                    placeholder="Vyhledat hosting ..."
                                    type="text"
                                    className="w-full !border-zinc-600"
                                    onChange={(e) => debouncedSearch(e.target.value)}
                                />
                            </div>
                        </div>
                    </section>

                    <section className="card">
                        <div className="flex space-x-4">
                            <div className="flex items-center justify-center">
                                <Link
                                    href={route('hostings.index')}
                                    className="faster-animation rounded-md border border-zinc-700 bg-zinc-800 p-2 hover:border-zinc-600"
                                >
                                    <ServerStackIcon className="size-10 text-sky-500" />
                                </Link>
                            </div>

                            <div>
                                <h1 className="text-2xl font-semibold capitalize lg:text-3xl dark:text-white">Klienti</h1>

                                <p className="text-zinc-400">Seznam všech klientů.</p>
                            </div>
                        </div>
                    </section>

                    <main className="mt-2">
                        {hostings && hostings.data.length >= 1 ? (
                            <HostingsTable hostings={hostings} />
                        ) : (
                            <ResetFilters href={route('hostings.index')}>Nebyly nalezeny žádné hostingy.</ResetFilters>
                        )}
                    </main>
                </div>
            </div>

            {/* Another options */}
            <div className="fixed bottom-10 right-10">
                <Dropdown width="72">
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
                        width="64"
                    >
                        <h3 className="mb-2 border-b border-zinc-800 py-2 text-center font-bold uppercase text-white">Možnosti</h3>

                        <Dropdown.Link
                            href={route('hostings.create')}
                            className="flex items-center justify-center border-l-4 border-transparent py-2 text-center text-sm leading-5 text-zinc-400 transition duration-150 ease-in-out hover:border-sky-500 hover:bg-zinc-800 hover:text-sky-500 focus:bg-zinc-600 focus:outline-none"
                        >
                            <code className="w-full p-1">Vytvořit hosting</code>
                        </Dropdown.Link>
                    </Dropdown.Content>
                </Dropdown>
            </div>
        </AdminLayout>
    )
}
