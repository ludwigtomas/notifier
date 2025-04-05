import AdminLayout from '@/Layouts/AdminLayout'
import UpdateRepositoryInformationForm from '@/Pages/Repositories/Partials/UpdateRepositoryInformationForm'
import UpdateRepositoryDetachClientsForm from '@/Pages/Repositories/Partials/UpdateRepositoryDetachClientsForm'
import UpdateRepositoryAttachClientsForm from '@/Pages/Repositories/Partials/UpdateRepositoryAttachClientsForm'
import UpdateRepositoryHostingForm from '@/Pages/Repositories/Partials/UpdateRepositoryHostingForm'
import CreateRepositoryHostingForm from '@/Pages/Repositories/Partials/CreateRepositoryHostingForm'
import Dropdown from '@/Components/Dropdown'
import { Head, Link } from '@inertiajs/react'
import { motion } from 'framer-motion'
import { EyeIcon, ChevronRightIcon, ClipboardIcon, CommandLineIcon } from '@heroicons/react/24/outline'

export default function Edit({ auth, repository, hostings, clients }) {
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
                        className="slower-animation text-lg leading-tight font-semibold hover:text-sky-500"
                        href={route('repositories.index')}
                    >
                        Repozitáře
                    </Link>

                    <span>
                        <ChevronRightIcon className="size-5" />
                    </span>

                    <Link
                        className="text-lg leading-tight font-semibold text-sky-500"
                        href={route('repositories.edit', repository.repository_id)}
                    >
                        {repository.name}
                    </Link>

                    <span>
                        <ChevronRightIcon className="size-5" />
                    </span>

                    <div className="group relative">
                        <Link
                            className="text-lg leading-tight font-semibold text-sky-500"
                            href={route('repositories.edit', repository.repository_id)}
                        >
                            Edit
                        </Link>

                        <div className="invisible absolute top-full left-0 z-30 flex flex-col pt-6 group-hover:visible">
                            <div className="grid gap-y-2 rounded-xl border-2 border-zinc-700 bg-zinc-900 p-2 shadow-xl shadow-black">
                                <Link
                                    className="flex items-center justify-center space-x-4 rounded-md border border-transparent bg-zinc-800 px-4 py-2 hover:border-sky-500"
                                    href={route('repositories.show', repository.repository_id)}
                                >
                                    <span className="text-gray-200">Zobrazit</span>

                                    <EyeIcon className="size-6 text-sky-500" />
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
            <Head title={repository.name + ' - Edit'} />

            <div className="mx-auto max-w-[90rem] space-y-6 sm:px-6 lg:px-8">
                <div className="bg-zinc-900 p-10 sm:rounded-xl">
                    <UpdateRepositoryInformationForm repository={repository} />
                </div>

                <div className="grid bg-zinc-900 p-10 sm:rounded-xl">
                    <header>
                        <h2 className="text-lg font-medium text-gray-100">Repository settings</h2>

                        <p className="mt-1 text-sm text-gray-400">Manage repository settings</p>

                        <p className="mt-1 text-sm text-gray-400">
                            <Link
                                href={route('repository-settings.create', repository.repository_id)}
                                className="text-sky-500"
                            >
                                Create
                            </Link>
                        </p>
                    </header>

                    <table className="mt-6 w-full p-3 text-left whitespace-nowrap">
                        <thead className="border-b border-white/10 text-sm leading-6 text-white">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-4 py-3.5 text-left text-sm font-semibold text-gray-200"
                                >
                                    Key
                                </th>

                                <th
                                    scope="col"
                                    className="px-4 py-3.5 text-left text-sm font-semibold text-gray-200"
                                >
                                    Value
                                </th>

                                <th
                                    scope="col"
                                    className="px-4 py-3.5 text-left text-sm font-semibold text-gray-200"
                                >
                                    Last attempt at
                                </th>

                                <th
                                    scope="col"
                                    className="px-4 py-3.5 text-left text-sm font-semibold text-gray-200"
                                >
                                    Attempts
                                </th>

                                <th
                                    scope="col"
                                    className="px-4 py-3.5 text-left text-sm font-semibold text-gray-200"
                                >
                                    is successful
                                </th>

                                <th
                                    scope="col"
                                    className="px-4 py-3.5 text-left text-sm font-semibold text-gray-200"
                                >
                                    is active
                                </th>

                                <th
                                    scope="col"
                                    className="px-4 py-3.5 text-left text-sm font-semibold text-gray-200"
                                >
                                    actions
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-900">
                            {repository.relationships.repository_settings.map((setting) => (
                                <tr
                                    className="bg-zinc-800 transition duration-150 ease-in-out hover:bg-zinc-700"
                                    key={setting.id}
                                >
                                    <td className="px-4 py-3 text-sm font-medium whitespace-nowrap text-gray-300">{setting.key}</td>

                                    <td className="px-4 py-3 text-sm font-medium whitespace-nowrap text-gray-300">{setting.value}</td>

                                    <td className="px-4 py-3 text-sm font-medium whitespace-nowrap text-gray-300">
                                        {setting.last_attempt_at ?? 'N/A'}
                                    </td>

                                    <td className="px-4 py-3 text-sm font-medium whitespace-nowrap text-gray-300">
                                        {setting.attempts ?? 'N/A'}
                                    </td>

                                    <td className="px-4 py-3 text-sm font-medium whitespace-nowrap text-gray-300">
                                        {setting.was_successful ? (
                                            <span className="text-green-500">Yes</span>
                                        ) : (
                                            <span className="text-red-500">No</span>
                                        )}
                                    </td>

                                    <td className="px-4 py-3 text-sm font-medium whitespace-nowrap text-gray-300">
                                        {setting.is_active ? (
                                            <span className="text-green-500">Active</span>
                                        ) : (
                                            <span className="text-red-500">Inactive</span>
                                        )}
                                    </td>

                                    <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0">
                                        <div className="flex items-center space-x-2">
                                            <Link
                                                className="rounded-md bg-green-500 px-4 py-1 text-white"
                                                href={route('repository-settings.edit', {
                                                    repository: repository.repository_id,
                                                    repository_setting: setting.id,
                                                })}
                                            >
                                                Edit
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="bg-zinc-900 p-10 sm:rounded-xl">
                    <UpdateRepositoryDetachClientsForm repository={repository} />
                </div>

                <div className="bg-zinc-900 p-10 sm:rounded-xl">
                    <UpdateRepositoryAttachClientsForm
                        repository={repository}
                        clients={clients}
                    />
                </div>

                <div className="grid grid-cols-2 place-items-center gap-20 bg-zinc-900 p-10 sm:rounded-xl">
                    {repository.relationships.hosting_repository ? (
                        <UpdateRepositoryHostingForm
                            hosting_repository={repository.relationships.hosting_repository}
                            hostings={hostings}
                            className="w-full"
                        />
                    ) : (
                        <CreateRepositoryHostingForm
                            repository_id={repository.repository_id}
                            hosting_repository={repository.relationships.hosting_repository}
                            hostings={hostings}
                            className="w-full"
                        />
                    )}

                    <div className="w-full overflow-hidden rounded-xl bg-stone-900 p-1 drop-shadow-2xl">
                        <div className="relative flex items-center justify-between">
                            <div className="absolute left-1/2 -translate-x-1/2">
                                <span className="mr-4 text-gray-400">.ssh</span>
                                <span className="text-xl font-bold text-white uppercase">VPS connection</span>
                            </div>

                            <div className="flex space-x-2 p-2">
                                <div className="space-x-2">
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <ClipboardIcon className="size-6 text-white" />
                                    </motion.button>
                                </div>
                            </div>

                            <div className="flex space-x-2 p-4">
                                <div className="size-3 rounded-full bg-red-500"></div>
                                <div className="size-3 rounded-full bg-yellow-500"></div>
                                <div className="size-3 rounded-full bg-green-500"></div>
                            </div>
                        </div>

                        <div className="flex w-full items-center justify-center">
                            <div className="w-full rounded-lg bg-stone-800">
                                <div
                                    id="code-area"
                                    className="space-y-3 p-5"
                                >
                                    <div className="text-center text-base">
                                        <span className="text-yellow-300">ssh</span>{' '}
                                        <span className="text-purple-400">{repository.relationships.hosting_repository?.login_user}</span>
                                        <span className="text-green-300">@</span>
                                        <span className="text-purple-400">
                                            {repository.relationships.hosting_repository?.ip_address}
                                        </span>{' '}
                                        {repository.relationships.hosting_repository?.ip_port && (
                                            <span>
                                                <span className="text-green-300">-p</span>{' '}
                                                <span className="text-purple-400">
                                                    {repository.relationships.hosting_repository?.ip_port}
                                                </span>
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Another options */}
                <div className="fixed right-10 bottom-10">
                    <Dropdown>
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
                            width="64"
                        >
                            <h3 className="px mb-2 w-64 border-b border-zinc-800 p-2 text-center font-bold text-white uppercase">
                                Odeslání emailu
                            </h3>

                            <Link
                                href={route('repositories.last-commit', repository.repository_id)}
                                preserveScroll
                                className="flex w-full items-center border-l-4 border-transparent px-4 py-2 text-start text-sm leading-5 text-zinc-400 transition duration-150 ease-in-out hover:border-green-500 hover:bg-zinc-800 hover:text-green-500 focus:bg-zinc-600 focus:outline-none"
                            >
                                Last Commit
                            </Link>

                            <Link
                                href={
                                    repository.analytics_property_id
                                        ? route('repositories.google-analytics', repository.repository_id)
                                        : null
                                }
                                preserveScroll
                                disabled={!repository.analytics_property_id}
                                className={
                                    'flex w-full items-center border-l-4 px-4 py-2 text-start text-sm leading-5 text-zinc-400 transition duration-150 ease-in-out ' +
                                    (repository.analytics_property_id
                                        ? 'border-transparent hover:border-green-500 hover:bg-zinc-800 hover:text-green-500'
                                        : 'cursor-not-allowed border-red-500')
                                }
                            >
                                Google analytics
                            </Link>
                        </Dropdown.Content>
                    </Dropdown>
                </div>
            </div>
        </AdminLayout>
    )
}
