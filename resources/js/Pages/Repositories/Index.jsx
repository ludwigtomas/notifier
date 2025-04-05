import AdminLayout from '@/Layouts/AdminLayout'
import { Head, Link, router } from '@inertiajs/react'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import TextInput from '@/Components/TextInput'
import InputLabel from '@/Components/InputLabel'
import ResetFilters from '@/Components/ResetFilters'
import debounce from 'lodash/debounce'
import { useState } from 'react'
import Dropdown from '@/Components/Dropdown'
import RepositoriesTable from '@/Pages/Repositories/Partials/RepositoriesTable'
import { RepositoryIcon } from '@/Components/Icons/Models'

export default function Index({ auth, repositories, filters }) {
    const [search, setSearch] = useState(filters.search || '')
    const [trashed, setTrashed] = useState(filters.trashed || false)

    const debouncedSearch = debounce((value) => {
        setSearch(value)
        fetchRepositories(value, trashed)
    }, 500)

    const handleSetTrashed = (value) => {
        setTrashed(value)
        fetchRepositories(search, value)
    }

    const fetchRepositories = (searchValue, trashedValue) => {
        router.get(
            route('repositories.index'),
            {
                search: searchValue,
                trashed: trashedValue,
            },
            {
                preserveScroll: true,
                preserveState: true,
            }
        )
    }

    return (
        <AdminLayout
            user={auth.user}
            header={
                <header className="flex flex-row items-center justify-start space-x-4 text-zinc-500">
                    <Link
                        className="slower-animation text-lg leading-tight font-semibold hover:text-sky-500"
                        href={route('dashboard.index')}
                    >
                        Dashboard
                    </Link>

                    <span>
                        <ChevronRightIcon className="size-5" />
                    </span>

                    <Link
                        className="text-lg leading-tight font-semibold text-sky-500"
                        href={route('repositories.index')}
                    >
                        Repozitáře
                    </Link>
                </header>
            }
        >
            <Head title="Repozitáře" />

            {/* TABLE */}
            <div>
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
                                        placeholder="Hledat repozitář..."
                                        type="text"
                                        className="w-full !border-zinc-600"
                                        onChange={(e) => debouncedSearch(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        className="mb-1"
                                        htmlFor="trashed"
                                        value="Smazané"
                                    />

                                    <div className="group relative w-full rounded-md border-2 border-zinc-600 bg-zinc-700 py-2 text-zinc-200 shadow-sm focus:border-sky-500 focus:ring-sky-500">
                                        <div className="flex items-center justify-center space-x-4 rounded-xl bg-zinc-700">
                                            <h3 className="text-gray-300">Vybrané modely</h3>

                                            <div className="font-bold text-white">{trashed}</div>
                                        </div>

                                        <div className="absolute top-full right-0 hidden pt-4 group-hover:block">
                                            <div className="z-40 w-[30rem] overflow-x-hidden overflow-y-auto rounded-xl border border-neutral-600 bg-neutral-800 p-2">
                                                <div className="grid grid-cols-1 gap-4">
                                                    <button
                                                        className={
                                                            'w-full rounded-md border-2 border-zinc-600 bg-zinc-700 py-2 text-zinc-200 shadow-sm hover:bg-zinc-800 ' +
                                                            (trashed === 'with' ? 'bg-zinc-800' : '')
                                                        }
                                                        onClick={(e) => handleSetTrashed('with')}
                                                    >
                                                        <span className="text-zinc-200">Společně s mazanými</span>
                                                    </button>

                                                    <button
                                                        className={
                                                            'w-full rounded-md border-2 border-zinc-600 bg-zinc-700 py-2 text-zinc-200 shadow-sm hover:bg-zinc-800 ' +
                                                            (trashed === 'only' ? 'bg-zinc-800' : '')
                                                        }
                                                        onClick={(e) => handleSetTrashed('only')}
                                                    >
                                                        <span className="text-zinc-200">Pouze smazané</span>
                                                    </button>

                                                    <button
                                                        className={
                                                            'w-full rounded-md border-2 border-zinc-600 bg-zinc-700 py-2 text-zinc-200 shadow-sm hover:bg-zinc-800 ' +
                                                            (trashed === 'without' ? 'bg-zinc-800' : '')
                                                        }
                                                        onClick={(e) => handleSetTrashed('without')}
                                                    >
                                                        <span className="text-zinc-200">Pouze aktivní</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="card">
                            <div className="flex space-x-4">
                                <div className="flex items-center justify-center">
                                    <Link
                                        href={route('repositories.index')}
                                        className="faster-animation rounded-md border border-zinc-700 bg-zinc-800 p-2 hover:border-zinc-600"
                                    >
                                        <RepositoryIcon className="size-10 text-sky-500" />
                                    </Link>
                                </div>

                                <div>
                                    <h1 className="text-2xl font-semibold capitalize lg:text-3xl dark:text-white">Repositories</h1>

                                    <p className="text-zinc-400">Seznam všech dostupných repozitářů.</p>
                                </div>
                            </div>
                        </section>

                        <main className="mt-2">
                            {repositories && repositories.data.length > 0 ? (
                                <RepositoriesTable repositories={repositories} />
                            ) : (
                                <ResetFilters href={route('repositories.index')}>Nebyly nalezeny žádné repozitáře.</ResetFilters>
                            )}
                        </main>
                    </div>
                </div>

                {/* Another options */}
                <div className="fixed right-10 bottom-10">
                    <Dropdown maxWidth="md">
                        <Dropdown.Trigger>
                            <div className="flex items-center space-x-2">
                                <div className="group inline-flex rounded-xl bg-sky-500">
                                    <button
                                        type="button"
                                        className="rounded-md px-6 py-3 focus:outline-none"
                                    >
                                        <span className="text-lg leading-4 font-medium text-white transition duration-150 ease-in-out group-hover:text-sky-100">
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
                            <h3 className="mb-2 border-b border-zinc-800 py-2 text-center font-bold text-white uppercase">Settings</h3>

                            <Link
                                href={route('repositories.sync')}
                                preserveScroll
                                className="flex items-center justify-center border-l-4 border-transparent py-2 pl-1 text-sm leading-5 text-zinc-400 transition duration-150 ease-in-out hover:border-green-500 hover:bg-zinc-800 hover:text-green-500 focus:bg-zinc-600 focus:outline-none"
                            >
                                <code className="w-full p-1">
                                    Repositories - sync everything <br />
                                    <span className="text-xs text-zinc-500">(img, last commit)</span>
                                </code>
                            </Link>
                        </Dropdown.Content>
                    </Dropdown>
                </div>
            </div>
        </AdminLayout>
    )
}
