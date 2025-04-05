import React, { useState, useEffect } from 'react'
import AdminLayout from '@/Layouts/AdminLayout'
import { Head, Link, router } from '@inertiajs/react'
import { PencilSquareIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { ChildrensTable, RepositoriesTable } from '@/Pages/GitGroups/Partials/GroupRelationshipsTable'
import TextInput from '@/Components/TextInput'
import InputLabel from '@/Components/InputLabel'
import debounce from 'lodash/debounce'
import ResetFilters from '@/Components/ResetFilters'
import { GitGroupIcon, RepositoryIcon } from '@/Components/Icons/Models'
import GitGroupTable from '@/Components/Tables/GitGroupTable'

export default function ({ auth, git_groups, group_details, filters }) {
    const [search, setSearch] = useState(filters.search || '')

    const debouncedSearch = debounce((value) => {
        setSearch(value)

        router.get(
            route('git-groups.index'),
            {
                search: value,
            },
            {
                preserveScroll: true,
                preserveState: true,
                replace: true,
            }
        )
    }, 500)

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
                        href={route('git-groups.index')}
                    >
                        Git groups
                    </Link>
                </header>
            }
        >
            <Head title="Gits Index" />

            <div className="mx-auto max-w-[100rem] sm:px-6 lg:px-8">
                <main className="space-y-1">
                    <section className="card">
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
                                    placeholder="Hledat hlavní skupinu..."
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
                                    href={route('git-groups.index')}
                                    className="faster-animation rounded-md border border-zinc-700 bg-zinc-800 p-2 hover:border-zinc-600"
                                >
                                    <GitGroupIcon className="size-10 text-sky-500" />
                                </Link>
                            </div>

                            <div>
                                <h1 className="text-2xl font-semibold capitalize lg:text-3xl dark:text-white">Git Groups</h1>

                                <p className="text-zinc-400">Seznam všech dostupných gitových služeb.</p>
                            </div>
                        </div>
                    </section>

                    <section className="card grid grid-cols-3 gap-2">
                        <GitGroupTable
                            data={git_groups}
                            filters={filters}
                            clearUrl={route('dashboard.index')}
                        />
                    </section>

                    <section className="card mt-2 text-center font-mono text-white">
                        in progress
                        {/* {group_details && group_details.length > 0 ? (
                            <div>
                                <div className="px-6 pt-6 text-center">
                                    <h1 className="text-2xl font-semibold capitalize lg:text-3xl dark:text-white">
                                        {filters.relationship}
                                    </h1>
                                </div>

                                <div className="divide-y divide-zinc-800 border-4 border-zinc-900">
                                    {filters.relationship === 'repositories' ? (
                                        <RepositoriesTable repositories={group_details} />
                                    ) : (
                                        <ChildrensTable childrens={group_details} />
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="py-5">
                                <h3 className="text-xl font-semibold text-zinc-200">
                                    {group_details && group_details.length === 0 ? (
                                        <div>
                                            Selected <u>{filters.relationship}</u> is empty
                                        </div>
                                    ) : (
                                        <div className="col-span-3 animate-pulse p-4 text-center text-red-400">
                                            <p className="text-lg font-semibold">
                                                Need to select a <u>relationship</u>
                                            </p>
                                        </div>
                                    )}
                                </h3>
                            </div>
                        )} */}
                    </section>
                </main>
            </div>
        </AdminLayout>
    )
}
