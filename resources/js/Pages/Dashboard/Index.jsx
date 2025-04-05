import AdminLayout from '@/Layouts/AdminLayout'
import { Head, Link, usePage, router } from '@inertiajs/react'
import { ArrowRightCircleIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import InputLabel from '@/Components/InputLabel'
import { PulseIcon, HorizonIcon, TelescopeIcon } from '@/Components/Icons/Ecosystem'
import NotificationTable from '@/Components/Tables/NotificationTable'
import { DashboardIcon } from '@/Components/Icons/Other'
import { ClientIcon, GitGroupIcon, HostingIcon, NotificationIcon, RepositoryIcon, getIconComponent } from '@/Components/Icons/Models'

export default function Dashboard({ auth, notifications, models, filters, environment }) {
    const [selectedModel, setSelectedModel] = useState(filters.model || [])

    function handleSelectedModel(model) {
        model === 'clear_all' ? clearModels() : updateModels(model)
    }

    function clearModels() {
        setSelectedModel([])
        router.get(
            route('dashboard.index'),
            {},
            {
                preserveScroll: true,
                preserveState: true,
            }
        )
    }

    function updateModels(model) {
        const updatedModel = selectedModel.includes(model) ? selectedModel.filter((item) => item !== model) : [...selectedModel, model]

        setSelectedModel(updatedModel)
        router.get(
            route('dashboard.index'),
            {
                model: updatedModel,
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
                        className="text-lg leading-tight font-semibold text-sky-500"
                        href={route('dashboard.index')}
                    >
                        Dashboard
                    </Link>
                </header>
            }
        >
            <Head title="Dashboard" />

            <div className="mx-auto max-w-[100rem] sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-y-20">
                    <main className="space-y-1">
                        <section className="card">
                            <div className="flex space-x-4">
                                <div className="flex flex-col items-center justify-center">
                                    <Link
                                        href={route('dashboard.index')}
                                        className="faster-animation rounded-md border border-zinc-700 bg-zinc-800 p-2 hover:border-zinc-600"
                                    >
                                        <NotificationIcon className="size-10 text-sky-500" />
                                    </Link>
                                </div>

                                <div>
                                    <h1 className="text-2xl font-semibold capitalize lg:text-3xl dark:text-white">Nejnovější notifikace</h1>

                                    <p className="text-zinc-400">Zde se nachází všechny notifikace, co se událo.</p>
                                </div>
                            </div>
                        </section>

                        <section className="card">
                            <div className="grid grid-cols-5 items-center gap-2">
                                <div>
                                    <InputLabel
                                        className="mb-1"
                                        htmlFor="search"
                                        value="Vyhledat"
                                    />

                                    <div className="group relative w-full rounded-md border-2 border-zinc-600 bg-zinc-700 py-2 text-zinc-200 shadow-sm focus:border-sky-500 focus:ring-sky-500">
                                        <div className="flex items-center justify-center space-x-4 rounded-xl bg-zinc-700">
                                            <h3 className="text-gray-300">Vybrané modely</h3>

                                            <div className="font-bold text-white">{selectedModel.length}</div>
                                        </div>

                                        <div className="absolute top-full -left-3 hidden pt-4 group-hover:block">
                                            <div className="relative z-50 h-96 w-[30rem] overflow-x-hidden overflow-y-auto rounded-xl border border-neutral-600 bg-neutral-800 p-2">
                                                <div className="grid grid-cols-3 gap-4">
                                                    <div className="col-span-3">
                                                        {selectedModel.length === 0 ? (
                                                            <div className="rounded-lg border-2 border-zinc-600 bg-zinc-700 p-4">
                                                                <div className="text-center text-gray-200">
                                                                    <p className="text-lg font-semibold">Nejsou vybrané žádné modely</p>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <button
                                                                onClick={() => handleSelectedModel('clear_all')}
                                                                className="inline-flex w-full cursor-pointer justify-center space-x-2 rounded-lg border-2 border-red-600 bg-red-500 p-4"
                                                            >
                                                                <TrashIcon className="size-8" />

                                                                <p className="text-center text-lg font-semibold text-white">Vyčistit vše</p>
                                                            </button>
                                                        )}
                                                    </div>

                                                    {models.map((model, index) => {
                                                        return (
                                                            <div
                                                                key={index}
                                                                onClick={() => handleSelectedModel(model)}
                                                                className={
                                                                    'flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 bg-zinc-700 p-4 text-xs text-gray-200 ' +
                                                                    (selectedModel.includes(model)
                                                                        ? ' border-green-500'
                                                                        : ' border-zinc-600')
                                                                }
                                                            >
                                                                {(() => {
                                                                    const IconComponent = getIconComponent(model)
                                                                    return IconComponent ? (
                                                                        <IconComponent
                                                                            className={
                                                                                'mb-3 size-10 text-neutral-400 ' +
                                                                                (selectedModel.includes(model)
                                                                                    ? ' fill-neutral-400'
                                                                                    : ' border-zinc-600 bg-zinc-700')
                                                                            }
                                                                        />
                                                                    ) : null
                                                                })()}

                                                                {model}
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="card">
                            <NotificationTable
                                data={notifications}
                                filters={filters}
                            />
                        </section>
                    </main>

                    <main className="grid gap-1">
                        <section className="card">
                            <div className="flex space-x-4">
                                <div className="flex items-center justify-center">
                                    <Link
                                        href={route('dashboard.index')}
                                        className="faster-animation rounded-md border border-zinc-700 bg-zinc-800 p-2 hover:border-zinc-600"
                                    >
                                        <DashboardIcon className="size-10 text-sky-500" />
                                    </Link>
                                </div>

                                <div>
                                    <h1 className="text-2xl font-semibold capitalize lg:text-3xl dark:text-white">Dashboard</h1>

                                    <p className="text-zinc-400">Základní informace o aplikaci.</p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3 xl:gap-1">
                                <div className="col-span-2 grid">
                                    <div className="card group relative grid grid-cols-2 space-x-5 overflow-hidden p-8">
                                        <div className="text-center">
                                            <span className="inline-block text-zinc-400">
                                                <GitGroupIcon className="size-8" />
                                            </span>

                                            <h1 className="text-xl font-semibold text-white capitalize">Hlavní skupiny</h1>

                                            <p className="text-zinc-400">Správá git skupin (rodičů), zálohování a obnova databází.</p>

                                            <div className="pt-4">
                                                <div className="faster-animation inline-flex rounded-full bg-zinc-500 p-2 text-white capitalize group-hover:scale-110 hover:text-sky-500 hover:underline">
                                                    <ArrowRightCircleIcon className="size-6" />
                                                </div>
                                            </div>

                                            <div className="absolute bottom-0 left-0 flex size-14 items-center justify-center rounded-tr-xl bg-zinc-700 text-4xl font-bold text-sky-500">
                                                {usePage().props.global.git_group_parent_count}
                                            </div>
                                        </div>

                                        <div className="absolute bottom-0 left-1/2 translate-x-[-100%]">
                                            <span className="flex size-8 items-center justify-center rounded-t-md bg-zinc-700 text-lg font-bold text-sky-500">
                                                {usePage().props.global.git_groups_count}
                                            </span>
                                        </div>

                                        <div className="text-center">
                                            <span className="inline-block text-zinc-400">
                                                <GitGroupIcon className="size-8" />
                                            </span>

                                            <h1 className="text-xl font-semibold text-white capitalize">Podřadné skupiny</h1>

                                            <p className="text-zinc-400">Správá git skupin (dětí), zálohování a obnova databází.</p>

                                            <div className="pt-4">
                                                <div className="faster-animation inline-flex rounded-full bg-zinc-500 p-2 text-white capitalize group-hover:scale-110 hover:text-sky-500 hover:underline">
                                                    <ArrowRightCircleIcon className="size-6" />
                                                </div>
                                            </div>

                                            <div className="absolute right-0 bottom-0 flex size-14 items-center justify-center rounded-tl-xl bg-zinc-700 text-4xl font-bold text-sky-500">
                                                {usePage().props.global.git_group_child_count}
                                            </div>
                                        </div>

                                        <Link
                                            href={route('git-groups.index')}
                                            className="absolute inset-0"
                                        />
                                    </div>
                                </div>

                                <div className="card group relative space-y-3 overflow-hidden p-8">
                                    <span className="inline-block text-zinc-400">
                                        <RepositoryIcon className="size-8" />
                                    </span>

                                    <h1 className="text-xl font-semibold text-white capitalize">Repozitáře</h1>

                                    <p className="text-zinc-400">
                                        Správá repozitářů, přístupových údajů k VPS, zálohování a obnova databází a mnoho dalšího.
                                    </p>

                                    <div className="pt-4">
                                        <div className="faster-animation inline-flex rounded-full bg-zinc-500 p-2 text-white capitalize group-hover:scale-110 hover:text-sky-500 hover:underline">
                                            <ArrowRightCircleIcon className="size-6" />
                                        </div>
                                    </div>

                                    <Link
                                        href={route('repositories.index')}
                                        className="absolute inset-0"
                                    />

                                    <div className="absolute right-0 bottom-0 flex size-14 items-center justify-center rounded-tl-xl bg-zinc-700 text-4xl font-bold text-sky-500">
                                        {usePage().props.global.repositories_count}
                                    </div>
                                </div>

                                <div className="card group relative space-y-3 overflow-hidden p-8">
                                    <span className="inline-block text-zinc-400">
                                        <ClientIcon className="size-8" />
                                    </span>

                                    <h1 className="text-xl font-semibold text-white capitalize">Klienti</h1>

                                    <p className="text-zinc-400">Správá klientů.</p>

                                    <div className="pt-4">
                                        <div className="faster-animation inline-flex rounded-full bg-zinc-500 p-2 text-white capitalize group-hover:scale-110 hover:text-sky-500 hover:underline">
                                            <ArrowRightCircleIcon className="size-6" />
                                        </div>
                                    </div>

                                    <Link
                                        href={route('clients.index')}
                                        className="absolute inset-0"
                                    />

                                    <div className="absolute right-0 bottom-0 flex size-14 items-center justify-center rounded-tl-xl bg-zinc-700 text-4xl font-bold text-sky-500">
                                        {usePage().props.global.clients_count}
                                    </div>
                                </div>

                                <div className="card group relative space-y-3 overflow-hidden p-8">
                                    <span className="inline-block text-zinc-400">
                                        <HostingIcon className="size-8" />
                                    </span>

                                    <h1 className="text-xl font-semibold text-white capitalize">Hostingy</h1>

                                    <p className="text-zinc-400">Správá hostingů.</p>

                                    <div className="pt-4">
                                        <div className="faster-animation inline-flex rounded-full bg-zinc-500 p-2 text-white capitalize group-hover:scale-110 hover:text-sky-500 hover:underline">
                                            <ArrowRightCircleIcon className="size-6" />
                                        </div>
                                    </div>

                                    <Link
                                        href={route('hostings.index')}
                                        className="absolute inset-0"
                                    />

                                    <div className="absolute right-0 bottom-0 flex size-14 items-center justify-center rounded-tl-xl bg-zinc-700 text-4xl font-bold text-sky-500">
                                        {usePage().props.global.hostings_count}
                                    </div>
                                </div>

                                <div className="card group relative space-y-3 overflow-hidden p-8">
                                    <span className="inline-block text-zinc-400">
                                        <NotificationIcon className="size-8" />
                                    </span>

                                    <h1 className="text-xl font-semibold text-white capitalize">Notifikace</h1>

                                    <p className="text-zinc-400">Správá notifikací.</p>

                                    <div className="pt-4">
                                        <div className="faster-animation inline-flex rounded-full bg-zinc-500 p-2 text-white capitalize group-hover:scale-110 hover:text-sky-500 hover:underline">
                                            <ArrowRightCircleIcon className="size-6" />
                                        </div>
                                    </div>

                                    <Link
                                        href={route('notifications.index')}
                                        className="absolute inset-0"
                                    />

                                    <div className="absolute right-0 bottom-0 flex size-14 items-center justify-center rounded-tl-xl bg-zinc-700 text-4xl font-bold text-sky-500">
                                        {usePage().props.global.notifications_count}
                                    </div>
                                </div>

                                <hr className="col-span-full my-4 h-2 rounded-full border-none bg-zinc-900" />

                                <figure className="card relative flex items-center justify-center space-x-10 p-10 hover:border-zinc-600">
                                    <HorizonIcon className="size-20" />

                                    <figcaption className="text-left">
                                        <h1 className="text-2xl font-semibold capitalize lg:text-3xl dark:text-white">Horizon</h1>

                                        <p className="text-zinc-400">Horizon je nástroj pro monitorování fronty.</p>
                                    </figcaption>

                                    <a
                                        className="absolute inset-0"
                                        target="_blank"
                                        href={route('horizon.index')}
                                        rel="noreferrer"
                                    />
                                </figure>

                                <figure className="card relative flex items-center justify-center space-x-10 p-10 hover:border-zinc-600">
                                    <PulseIcon className="size-20" />

                                    <figcaption className="text-left">
                                        <h1 className="text-2xl font-semibold capitalize lg:text-3xl dark:text-white">Pulse</h1>

                                        <p className="text-zinc-400">Pulse je nástroj pro monitorování výkonu aplikace a fronty.</p>
                                    </figcaption>

                                    <a
                                        className="absolute inset-0"
                                        target="_blank"
                                        href={route('pulse')}
                                        rel="noreferrer"
                                    />
                                </figure>

                                <figure className="card relative flex items-center justify-center space-x-10 p-10 hover:border-zinc-600">
                                    <TelescopeIcon className="size-20" />

                                    <figcaption className="text-left">
                                        <h1 className="text-2xl font-semibold capitalize lg:text-3xl dark:text-white">Telescope</h1>

                                        <p className="text-zinc-400">Telescope je nástroj pro debugování aplikace.</p>

                                        {environment == 'production' && <p className="mt-2 text-red-500">Only for development purposes.</p>}
                                    </figcaption>

                                    {environment !== 'production' && (
                                        <a
                                            className="absolute inset-0"
                                            target="_blank"
                                            href={route('telescope')}
                                            rel="noreferrer"
                                        />
                                    )}
                                </figure>
                            </div>
                        </section>
                    </main>

                    {/* <main className="grid grid-cols-12 gap-1">
                        <section className="card col-span-full">
                            <div className="flex space-x-4">
                                <div className="flex items-center justify-center">
                                    <Link
                                        href={route('dashboard.index')}
                                        className="faster-animation rounded-md border border-zinc-700 bg-zinc-800 p-2 hover:border-zinc-600"
                                    >
                                        <ChartPieIcon className="size-10 text-sky-500" />
                                    </Link>
                                </div>

                                <div>
                                    <h1 className="text-2xl font-semibold capitalize lg:text-3xl dark:text-white">Laravel Ecosystem</h1>

                                    <p className="text-zinc-400">Zde se nachází Laravel Ecosystem, které jsou v aplikaci.</p>
                                </div>
                            </div>
                        </section>
                    </main> */}
                </div>
            </div>
        </AdminLayout>
    )
}
