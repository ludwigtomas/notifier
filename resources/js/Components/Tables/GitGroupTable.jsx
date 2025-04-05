import { Link } from '@inertiajs/react'
import ResetFilters from '@/Components/ResetFilters'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { GitGroupIcon, RepositoryIcon } from '@/Components/Icons/Models'

export default function NotificationTable({ data, filters, clearUrl = route('git-groups.index') }) {
    return (
        <>
            {filters.length !== 0 && data.length === 0 ? (
                <ResetFilters href={clearUrl}>Nebyly nalezeny žádné notifikace.</ResetFilters>
            ) : data && data.length > 0 ? (
                <>
                    {data.map((git_group) => {
                        return (
                            <div
                                key={git_group.group_id}
                                className="group relative space-y-10 !overflow-hidden rounded-lg border-2 border-zinc-700 bg-zinc-800 p-8 pb-20 hover:border-zinc-600"
                            >
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 rounded-b-lg border-x-2 border-b-2 border-zinc-700 bg-zinc-700">
                                    <span className="px-2 text-zinc-400">{git_group.group_id}</span>
                                </div>

                                <div className="flex items-center justify-center space-x-4">
                                    <span className="inline-block">
                                        <GitGroupIcon className="size-8 text-sky-500" />
                                    </span>

                                    <h2 className="text-3xl font-semibold text-white capitalize">{git_group.name}</h2>
                                </div>

                                <div className="overflow-hidden rounded-xl bg-white/5 py-2">
                                    <div className="grid grid-cols-2 place-items-center">
                                        <div className="text-center">
                                            <p className="text-lg font-bold text-zinc-200">{git_group.childrens_count}</p>

                                            <p className="text-xs text-zinc-400">Podkategorie</p>
                                        </div>

                                        <div className="text-center">
                                            <p className="text-lg font-bold text-zinc-200">{git_group.all_repositories_count}</p>

                                            <p className="text-xs text-zinc-400">Repozitáře</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute right-0 bottom-0 grid w-full grid-cols-2 place-items-center overflow-hidden">
                                    <div className="grid h-full w-full grid-cols-2 place-items-center">
                                        <Link
                                            className={
                                                'flex h-full w-full items-center justify-center ' +
                                                (filters?.relationship == 'childrens' && filters?.group_id == git_group.group_id
                                                    ? 'bg-sky-950 hover:bg-sky-900'
                                                    : 'bg-red-950 hover:bg-red-900')
                                            }
                                            preserveScroll
                                            href={route('git-groups.index', {
                                                group_id: git_group.group_id,
                                                relationship: 'childrens',
                                            })}
                                        >
                                            <GitGroupIcon
                                                className={
                                                    'size-8 ' +
                                                    (filters?.relationship == 'childrens' && filters?.group_id == git_group.group_id
                                                        ? 'text-sky-500'
                                                        : 'text-red-500')
                                                }
                                            />
                                        </Link>

                                        <Link
                                            className={
                                                'flex h-full w-full items-center justify-center ' +
                                                (filters?.relationship == 'repositories' && filters?.group_id == git_group.group_id
                                                    ? 'bg-sky-950 hover:bg-sky-900'
                                                    : 'bg-red-950 hover:bg-red-900')
                                            }
                                            href={route('git-groups.index', {
                                                group_id: git_group.group_id,
                                                relationship: 'repositories',
                                            })}
                                            preserveScroll
                                        >
                                            <RepositoryIcon
                                                className={
                                                    'size-8 ' +
                                                    (filters?.relationship == 'repositories' && filters?.group_id == git_group.group_id
                                                        ? 'text-sky-500'
                                                        : 'text-red-500')
                                                }
                                            />
                                        </Link>
                                    </div>

                                    <Link
                                        className="flex w-full justify-center bg-green-950 p-2 hover:bg-green-900"
                                        preserveScroll
                                        href={route('git-groups.edit', git_group.group_id)}
                                    >
                                        <PencilSquareIcon className="size-8 text-green-500" />
                                    </Link>
                                </div>
                            </div>
                        )
                    })}
                </>
            ) : (
                <div className="relative overflow-hidden rounded-lg border-2 border-zinc-700 p-4">
                    <div className="flex animate-pulse items-center">
                        <div className="flex-1 space-y-6 py-1">
                            <div className="grid grid-cols-12 gap-4">
                                <div className="col-span-1 h-2 rounded bg-zinc-800" />
                                <div className="col-span-4 h-2 rounded bg-zinc-800" />
                                <div className="col-span-5 h-2 rounded bg-zinc-800" />
                                <div className="col-span-1 h-2 rounded bg-zinc-800" />
                                <div className="col-span-1 h-2 rounded bg-zinc-800" />
                            </div>
                        </div>

                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                            <span className="rounded-full border border-zinc-800 bg-zinc-900 p-2 text-white">Žádné data</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
