import AdminLayout from '@/Layouts/AdminLayout'
import { Head, Link } from '@inertiajs/react'
import {
    PencilSquareIcon,
    ChevronRightIcon,
    CircleStackIcon,
    CalendarDaysIcon,
    UsersIcon,
    ServerIcon,
    CommandLineIcon,
    Cog6ToothIcon,
    ComputerDesktopIcon,
    BellAlertIcon,
} from '@heroicons/react/24/outline'
import { useState } from 'react'
import RepositoryClientsTable from '@/Pages/Repositories/Partials/RepositoryClientsTable'
import RepositoryNotificationsTable from '@/Pages/Repositories/Partials/RepositoryNotificationsTable'
import RepositoryDatabasesTable from '@/Pages/Repositories/Partials/RepositoryDatabasesTable'
import RepositoryStoragesTable from '@/Pages/Repositories/Partials/RepositoryStoragesTable'
import RepositoryHostingTable from '@/Pages/Repositories/Partials/RepositoryHostingTable'
import RepositorySettingsTable from '@/Pages/Repositories/Partials/RepositorySettingsTable'
import RepositorySettingForApi from '@/Components/RepositorySettingForApi'

export default function Show({ auth, repository, clients, repository_storages, repository_databases }) {
    const [showRelationship, setShowRelationship] = useState('databases')

    const handleShowRepositoryRelation = (relation) => {
        return () => {
            setShowRelationship(relation)
        }
    }

    return (
        <section>
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
                            className="slower-animation text-lg font-semibold leading-tight hover:text-sky-500"
                            href={route('repositories.index')}
                        >
                            Repozitáře
                        </Link>

                        <span>
                            <ChevronRightIcon className="size-5" />
                        </span>

                        <Link
                            className="text-lg font-semibold leading-tight text-sky-500"
                            href={route('repositories.show', repository.repository_id)}
                        >
                            {repository.name}
                        </Link>

                        <span>
                            <ChevronRightIcon className="size-5" />
                        </span>

                        <div className="group relative">
                            <Link
                                className="text-lg font-semibold leading-tight text-sky-500"
                                href={route('repositories.show', repository.repository_id)}
                            >
                                Zobrazit
                            </Link>

                            <div className="invisible absolute left-0 top-full z-30 flex flex-col pt-6 group-hover:visible">
                                <div className="grid gap-y-2 rounded-xl border-2 border-zinc-700 bg-zinc-900 p-2 shadow-xl shadow-black">
                                    <Link
                                        className="flex items-center justify-center space-x-4 rounded-md border border-transparent bg-zinc-800 px-4 py-2 hover:border-green-500"
                                        href={route('repositories.edit', repository.repository_id)}
                                    >
                                        <span className="text-gray-200">Editovat</span>

                                        <PencilSquareIcon className="h-6 w-6 text-green-500" />
                                    </Link>

                                    {repository.relationships.hosting_repository && repository.relationships.hosting_repository.id && (
                                        <Link
                                            className="flex items-center justify-center space-x-4 rounded-md border border-transparent bg-zinc-800 px-4 py-2 hover:border-orange-500"
                                            href={route('hosting-repository.vps-connect', repository.relationships.hosting_repository.id)}
                                        >
                                            <span className="text-gray-200">Hosting</span>

                                            <CommandLineIcon className="size-6 text-orange-500" />
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </header>
                }
            >
                <Head title={repository.name + ' - Show'} />

                <div className="mx-auto max-w-[100rem] sm:px-6 lg:px-8">
                    <div className="mx-auto w-9/12">
                        <RepositorySettingForApi repository={repository} />
                    </div>

                    <div className="relative grid grid-cols-6 gap-3">
                        {/* Last commit */}
                        <div className="col-span-full grid overflow-hidden rounded-xl bg-zinc-900 pb-5">
                            <div className="flex justify-center overflow-hidden">
                                <div className="relative flex h-8 w-72 items-center justify-center bg-zinc-700">
                                    <span className="absolute -left-10 h-10 w-20 skew-x-[40deg] bg-zinc-900 px-6" />

                                    <span className="text-xl font-bold tracking-wider text-zinc-100">Poslední commit</span>

                                    <span className="absolute -right-10 h-10 w-20 skew-x-[-40deg] bg-zinc-900 px-6" />
                                </div>
                            </div>

                            <CalendarDaysIcon className="m-auto h-28 w-14 stroke-1 text-sky-500" />

                            <div className="text-center">
                                <h3 className="text-center text-xs text-gray-500">
                                    {new Date(repository.last_commit_at).toLocaleDateString('cs-CZ', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                    })}
                                </h3>

                                <div className="mt-2 text-gray-200">
                                    <h2 className="text-2xl font-bold">{repository.last_commit_at_human}</h2>

                                    <h3 className="text-xs text-gray-400">Nejnovější commit</h3>
                                </div>
                            </div>
                        </div>

                        {/* Database */}
                        <div
                            onClick={handleShowRepositoryRelation('databases')}
                            className={
                                'grid cursor-pointer overflow-hidden rounded-xl border-2 bg-zinc-900 pb-5 hover:border-sky-500' +
                                (showRelationship === 'databases' ? ' border-sky-500' : ' border-transparent')
                            }
                        >
                            <div className="flex justify-center overflow-hidden">
                                <div className="relative flex h-8 w-72 items-center justify-center bg-zinc-700">
                                    <span className="absolute -left-10 h-10 w-20 skew-x-[40deg] bg-zinc-900 px-6" />

                                    <span className="text-xl font-bold tracking-wider text-zinc-100">Databáze</span>

                                    <span className="absolute -right-10 h-10 w-20 skew-x-[-40deg] bg-zinc-900 px-6" />
                                </div>
                            </div>

                            <CircleStackIcon className="m-auto h-28 w-14 stroke-1 text-sky-500" />

                            <div className="space-x-4 text-center">
                                <span className="text-xl font-bold text-gray-200">
                                    {repository.relationships.repository_database_backups_count}
                                </span>

                                <span className="text-xs text-gray-400">Zálohy databáze</span>
                            </div>
                        </div>

                        {/* Storage */}
                        <div
                            onClick={handleShowRepositoryRelation('storages')}
                            className={
                                'grid cursor-pointer overflow-hidden rounded-xl border-2 bg-zinc-900 pb-5 hover:border-sky-500' +
                                (showRelationship === 'storages' ? ' border-sky-500' : ' border-transparent')
                            }
                        >
                            <div className="flex justify-center overflow-hidden">
                                <div className="relative flex h-8 w-72 items-center justify-center bg-zinc-700">
                                    <span className="absolute -left-10 h-10 w-20 skew-x-[40deg] bg-zinc-900 px-6" />

                                    <span className="text-xl font-bold tracking-wider text-zinc-100">Storage</span>

                                    <span className="absolute -right-10 h-10 w-20 skew-x-[-40deg] bg-zinc-900 px-6" />
                                </div>
                            </div>

                            <ServerIcon className="m-auto h-28 w-14 stroke-1 text-sky-500" />

                            <div className="space-x-4 text-center">
                                <span className="text-xl font-bold text-gray-200">
                                    {repository.relationships.repository_storage_backups_count}
                                </span>

                                <span className="text-xs text-gray-400">Zálohy storage</span>
                            </div>
                        </div>

                        {/* Clients */}
                        <div
                            onClick={handleShowRepositoryRelation('clients')}
                            className={
                                'grid cursor-pointer overflow-hidden rounded-xl border-2 bg-zinc-900 pb-5 hover:border-sky-500' +
                                (showRelationship === 'clients' ? ' border-sky-500' : ' border-transparent')
                            }
                        >
                            <div className="flex justify-center overflow-hidden">
                                <div className="relative flex h-8 w-72 items-center justify-center bg-zinc-700">
                                    <span className="absolute -left-10 h-10 w-20 skew-x-[40deg] bg-zinc-900 px-6" />

                                    <span className="text-xl font-bold tracking-wider text-zinc-100">Klienti</span>

                                    <span className="absolute -right-10 h-10 w-20 skew-x-[-40deg] bg-zinc-900 px-6" />
                                </div>
                            </div>

                            <UsersIcon className="m-auto h-28 w-14 stroke-1 text-sky-500" />

                            <div className="space-x-4 text-center">
                                <span className="text-xl font-bold text-gray-200">{repository.relationships.clients_count}</span>

                                <span className="text-xs text-gray-400">klienti</span>
                            </div>
                        </div>

                        {/* Settings */}
                        <div
                            onClick={handleShowRepositoryRelation('settings')}
                            className={
                                'grid cursor-pointer overflow-hidden rounded-xl border-2 bg-zinc-900 pb-5 hover:border-sky-500' +
                                (showRelationship === 'settings' ? ' border-sky-500' : ' border-transparent')
                            }
                        >
                            <div className="flex justify-center overflow-hidden">
                                <div className="relative flex h-8 w-72 items-center justify-center bg-zinc-700">
                                    <span className="absolute -left-10 h-10 w-20 skew-x-[40deg] bg-zinc-900 px-6" />

                                    <span className="text-xl font-bold tracking-wider text-zinc-100">Nastavení</span>

                                    <span className="absolute -right-10 h-10 w-20 skew-x-[-40deg] bg-zinc-900 px-6" />
                                </div>
                            </div>

                            <Cog6ToothIcon className="m-auto h-28 w-14 stroke-1 text-sky-500" />

                            <div className="space-x-4 text-center">
                                <span className="text-xl font-bold text-gray-200">
                                    {repository.relationships.repository_settings.length}
                                </span>

                                <span className="text-xs text-gray-400">nastavení</span>
                            </div>
                        </div>

                        {/* Notifications */}
                        <div
                            onClick={handleShowRepositoryRelation('notifications')}
                            className={
                                'grid cursor-pointer overflow-hidden rounded-xl border-2 bg-zinc-900 pb-5 hover:border-sky-500' +
                                (showRelationship === 'notifications' ? ' border-sky-500' : ' border-transparent')
                            }
                        >
                            <div className="flex justify-center overflow-hidden">
                                <div className="relative flex h-8 w-72 items-center justify-center bg-zinc-700">
                                    <span className="absolute -left-10 h-10 w-20 skew-x-[40deg] bg-zinc-900 px-6" />

                                    <span className="text-xl font-bold tracking-wider text-zinc-100">Notifikace</span>

                                    <span className="absolute -right-10 h-10 w-20 skew-x-[-40deg] bg-zinc-900 px-6" />
                                </div>
                            </div>

                            <BellAlertIcon className="m-auto h-28 w-14 stroke-1 text-sky-500" />

                            <div className="space-x-4 text-center">
                                <span className="text-xl font-bold text-gray-200">{repository.relationships.notifications.length}</span>

                                <span className="text-xs text-gray-400">notifikací</span>
                            </div>
                        </div>

                        {/* Hosting */}
                        <div
                            onClick={handleShowRepositoryRelation('hosting')}
                            className={
                                'grid cursor-pointer overflow-hidden rounded-xl border-2 bg-zinc-900 pb-5 hover:border-sky-500' +
                                (showRelationship === 'hosting' ? ' border-sky-500' : ' border-transparent')
                            }
                        >
                            <div className="flex justify-center overflow-hidden">
                                <div className="relative flex h-8 w-72 items-center justify-center bg-zinc-700">
                                    <span className="absolute -left-10 h-10 w-20 skew-x-[40deg] bg-zinc-900 px-6" />

                                    <span className="text-xl font-bold tracking-wider text-zinc-100">Hosting</span>

                                    <span className="absolute -right-10 h-10 w-20 skew-x-[-40deg] bg-zinc-900 px-6" />
                                </div>
                            </div>

                            <ComputerDesktopIcon className="m-auto h-28 w-14 stroke-1 text-sky-500" />

                            <div className="flex items-center justify-center space-x-4 text-center">
                                {repository.relationships.hosting ? (
                                    <span className="animate-pulse rounded-full bg-green-500 p-3" />
                                ) : (
                                    <span className="animate-pulse rounded-full bg-red-500 p-3" />
                                )}
                            </div>
                        </div>
                    </div>

                    <div>
                        {showRelationship === 'databases' ? (
                            <RepositoryDatabasesTable
                                repository={repository}
                                backups={repository_databases}
                            />
                        ) : showRelationship === 'storages' ? (
                            <RepositoryStoragesTable
                                repository={repository}
                                backups={repository_storages}
                            />
                        ) : showRelationship === 'clients' ? (
                            <RepositoryClientsTable clients={clients} />
                        ) : showRelationship === 'settings' ? (
                            <RepositorySettingsTable
                                repository={repository}
                                settings={repository.relationships.repository_settings}
                            />
                        ) : showRelationship === 'notifications' ? (
                            <RepositoryNotificationsTable notifications={repository.relationships.notifications} />
                        ) : (
                            showRelationship === 'hosting' &&
                            repository.relationships.hosting && <RepositoryHostingTable hosting={repository.relationships.hosting} />
                        )}
                    </div>
                </div>
            </AdminLayout>
        </section>
    )
}
