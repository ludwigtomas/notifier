import AdminLayout from '@/Layouts/AdminLayout'
import { Head, Link, usePage, router } from '@inertiajs/react'
import {
    FireIcon,
    ArrowRightCircleIcon,
    EyeIcon,
    BookmarkIcon,
    PresentationChartBarIcon,
    ServerStackIcon,
    ChartPieIcon,
} from '@heroicons/react/24/outline'
import { useState } from 'react'
import InputLabel from '@/Components/InputLabel'
import { PulseIcon, Horizonicon, TelescopeIcon } from '@/Components/Ecosystem/Icons'
import NotificationTable from '@/Components/Tables/NotificationTable'

export default function Dashboard({ auth, notifications, models, filters, environment }) {
    const [selectedModel, setSelectedModel] = useState(filters.model || [])

    const handleModel = (model) => {
        if (model === 'clear_all') {
            setSelectedModel([])
            router.get(
                route('dashboard.index'),
                {},
                {
                    preserveScroll: true,
                    preserveState: true,
                }
            )
            return
        }

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
                        className="text-lg font-semibold leading-tight text-sky-500"
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
                    <main className="space-y-4">
                        <section className="card">
                            <div className="flex space-x-4">
                                <div className="flex flex-col items-center justify-center">
                                    <Link
                                        href={route('dashboard.index')}
                                        className="faster-animation rounded-md border border-zinc-700 bg-zinc-800 p-2 hover:border-zinc-600"
                                    >
                                        <EyeIcon className="size-10 text-sky-500" />
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

                                        <div className="absolute right-0 top-full hidden pt-4 group-hover:block">
                                            <div className="z-40 h-80 w-[30rem] overflow-y-auto overflow-x-hidden rounded-xl border border-neutral-600 bg-neutral-800 p-2">
                                                <div className="grid grid-cols-3 gap-4">
                                                    {selectedModel.length === 0 ? (
                                                        <div className="col-span-3 rounded-lg border-2 border-zinc-600 bg-zinc-700 p-4">
                                                            <div className="text-center text-gray-200">
                                                                <p className="text-lg font-semibold">Nejsou vybrané žádné modely</p>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <button
                                                            onClick={() => handleModel('clear_all')}
                                                            className="col-span-3 cursor-pointer rounded-lg border-2 border-red-600 bg-red-500 p-4"
                                                        >
                                                            <div className="text-center text-white">
                                                                <p className="text-lg font-semibold">Vyčistit vše</p>
                                                            </div>
                                                        </button>
                                                    )}

                                                    {models.map((model, index) => {
                                                        return (
                                                            <div
                                                                key={index}
                                                                onClick={() => handleModel(model)}
                                                                className={
                                                                    'flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 bg-zinc-700 p-4 text-xs text-gray-200 ' +
                                                                    (selectedModel.includes(model)
                                                                        ? ' border-green-500'
                                                                        : ' border-zinc-600')
                                                                }
                                                            >
                                                                <BookmarkIcon
                                                                    className={
                                                                        'mb-3 size-10 text-neutral-400 ' +
                                                                        (selectedModel.includes(model)
                                                                            ? ' fill-neutral-400'
                                                                            : ' border-zinc-600 bg-zinc-700')
                                                                    }
                                                                />

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
                                clear_url={route('dashboard.index')}
                            />
                        </section>
                    </main>

                    <main>
                        <section className="card">
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

                        <section className="my-2 grid grid-cols-3 gap-2">
                            <figure className="card relative flex min-h-40 items-center justify-center space-x-10 p-10 hover:border-zinc-600">
                                <Horizonicon className="size-20" />

                                <figcaption className="text-left">
                                    <h1 className="text-2xl font-semibold capitalize lg:text-3xl dark:text-white">Horizon</h1>

                                    <p className="text-zinc-400">Horizon je nástroj pro monitorování fronty.</p>
                                </figcaption>

                                <a
                                    className="absolute inset-0"
                                    target="_blank"
                                    href={route('horizon.index')}
                                />
                            </figure>

                            <figure className="card relative flex min-h-40 items-center justify-center space-x-10 p-10 hover:border-zinc-600">
                                <PulseIcon className="size-20" />

                                <figcaption className="text-left">
                                    <h1 className="text-2xl font-semibold capitalize lg:text-3xl dark:text-white">Pulse</h1>

                                    <p className="text-zinc-400">Pulse je nástroj pro monitorování výkonu aplikace a fronty.</p>
                                </figcaption>

                                <a
                                    className="absolute inset-0"
                                    target="_blank"
                                    href={route('pulse')}
                                />
                            </figure>

                            <figure className="card relative flex min-h-40 items-center justify-center space-x-10 p-10 hover:border-zinc-600">
                                <TelescopeIcon className="size-20" />

                                <figcaption className="text-left">
                                    <h1 className="text-2xl font-semibold capitalize lg:text-3xl dark:text-white">Telescope</h1>

                                    <p className="text-zinc-400">Telescope je nástroj pro debugování aplikace.</p>

                                    {environment == 'production' && <p className="mt-2 text-red-500">Only for development purposes.</p>}
                                </figcaption>

                                <a
                                    className="absolute inset-0"
                                    target="_blank"
                                    href={route('telescope')}
                                />
                            </figure>
                        </section>
                    </main>

                    <main className="mb-10 pb-10">
                        <section className="card">
                            <div className="flex space-x-4">
                                <div className="flex items-center justify-center">
                                    <Link
                                        href={route('dashboard.index')}
                                        className="faster-animation rounded-md border border-zinc-700 bg-zinc-800 p-2 hover:border-zinc-600"
                                    >
                                        <PresentationChartBarIcon className="size-10 text-sky-500" />
                                    </Link>
                                </div>

                                <div>
                                    <h1 className="text-2xl font-semibold capitalize lg:text-3xl dark:text-white">Dashboard</h1>

                                    <p className="text-zinc-400">Zde se nachází všechny notifikace, co se událo.</p>
                                </div>
                            </div>
                        </section>

                        <section className="card mt-2">
                            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3 xl:gap-2">
                                <div className="col-span-2 grid">
                                    <div className="group relative grid grid-cols-2 space-x-5 overflow-hidden rounded-lg border-2 border-zinc-700 bg-zinc-800 p-8 hover:border-sky-500">
                                        <div className="text-center">
                                            <span className="inline-block text-zinc-400">
                                                <FireIcon className="size-8" />
                                            </span>

                                            <h1 className="text-xl font-semibold capitalize text-white">Hlavní skupiny</h1>

                                            <p className="text-zinc-400">Správá git skupin (rodičů), zálohování a obnova databází.</p>

                                            <div className="pt-4">
                                                <div className="faster-animation inline-flex rounded-full bg-zinc-500 p-2 capitalize text-white hover:text-sky-500 hover:underline group-hover:scale-110">
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
                                                <FireIcon className="size-8" />
                                            </span>

                                            <h1 className="text-xl font-semibold capitalize text-white">Podřadné skupiny</h1>

                                            <p className="text-zinc-400">Správá git skupin (dětí), zálohování a obnova databází.</p>

                                            <div className="pt-4">
                                                <div className="faster-animation inline-flex rounded-full bg-zinc-500 p-2 capitalize text-white hover:text-sky-500 hover:underline group-hover:scale-110">
                                                    <ArrowRightCircleIcon className="size-6" />
                                                </div>
                                            </div>

                                            <div className="absolute bottom-0 right-0 flex size-14 items-center justify-center rounded-tl-xl bg-zinc-700 text-4xl font-bold text-sky-500">
                                                {usePage().props.global.git_group_child_count}
                                            </div>
                                        </div>

                                        <Link
                                            href={route('git-groups.index')}
                                            className="absolute inset-0"
                                        />
                                    </div>
                                </div>

                                <div className="group relative space-y-3 overflow-hidden rounded-lg border-2 border-zinc-700 bg-zinc-800 p-8 hover:border-sky-500">
                                    <span className="inline-block text-zinc-400">
                                        <FireIcon className="size-8" />
                                    </span>

                                    <h1 className="text-xl font-semibold capitalize text-white">Repozitáře</h1>

                                    <p className="text-zinc-400">
                                        Správá repozitářů, přístupových údajů k VPS, zálohování a obnova databází a mnoho dalšího.
                                    </p>

                                    <div className="pt-4">
                                        <div className="faster-animation inline-flex rounded-full bg-zinc-500 p-2 capitalize text-white hover:text-sky-500 hover:underline group-hover:scale-110">
                                            <ArrowRightCircleIcon className="size-6" />
                                        </div>
                                    </div>

                                    <Link
                                        href={route('repositories.index')}
                                        className="absolute inset-0"
                                    />

                                    <div className="absolute bottom-0 right-0 flex size-14 items-center justify-center rounded-tl-xl bg-zinc-700 text-4xl font-bold text-sky-500">
                                        {usePage().props.global.repositories_count}
                                    </div>
                                </div>

                                {/* <div className="group relative p-8 space-y-3 bg-zinc-800 border-2 border-zinc-700 hover:border-sky-500 rounded-lg overflow-hidden">
                                    <span className="inline-block text-zinc-400">
                                        <FireIcon className="size-8" />
                                    </span>

                                    <h1 className="text-xl font-semibold capitalize text-white">
                                        Databáze
                                    </h1>

                                    <p className="text-zinc-400">
                                        Správá databází.
                                    </p>

                                    <div className="pt-4">
                                        <div className="inline-flex p-2 capitalize group-hover:scale-110 faster-animation rounded-full bg-zinc-500 text-white hover:underline hover:text-sky-500">
                                            <ArrowRightCircleIcon className="size-6" />
                                        </div>
                                    </div>

                                    <Link
                                        href={route("databases.index")}
                                        className="absolute inset-0"
                                    />

                                    <div className="absolute right-0 bottom-0 size-14 bg-zinc-700 flex items-center justify-center text-sky-500 text-4xl font-bold rounded-tl-xl">
                                        { usePage().props.global.repositories_count }
                                    </div>
                                </div> */}

                                <div className="group relative space-y-3 overflow-hidden rounded-lg border-2 border-zinc-700 bg-zinc-800 p-8 hover:border-sky-500">
                                    <span className="inline-block text-zinc-400">
                                        <FireIcon className="size-8" />
                                    </span>

                                    <h1 className="text-xl font-semibold capitalize text-white">Klienti</h1>

                                    <p className="text-zinc-400">Správá klientů.</p>

                                    <div className="pt-4">
                                        <div className="faster-animation inline-flex rounded-full bg-zinc-500 p-2 capitalize text-white hover:text-sky-500 hover:underline group-hover:scale-110">
                                            <ArrowRightCircleIcon className="size-6" />
                                        </div>
                                    </div>

                                    <Link
                                        href={route('clients.index')}
                                        className="absolute inset-0"
                                    />

                                    <div className="absolute bottom-0 right-0 flex size-14 items-center justify-center rounded-tl-xl bg-zinc-700 text-4xl font-bold text-sky-500">
                                        {usePage().props.global.clients_count}
                                    </div>
                                </div>

                                <div className="group relative space-y-3 overflow-hidden rounded-lg border-2 border-zinc-700 bg-zinc-800 p-8 hover:border-sky-500">
                                    <span className="inline-block text-zinc-400">
                                        <ServerStackIcon className="size-8" />
                                    </span>

                                    <h1 className="text-xl font-semibold capitalize text-white">Hostingy</h1>

                                    <p className="text-zinc-400">Správá hostingů.</p>

                                    <div className="pt-4">
                                        <div className="faster-animation inline-flex rounded-full bg-zinc-500 p-2 capitalize text-white hover:text-sky-500 hover:underline group-hover:scale-110">
                                            <ArrowRightCircleIcon className="size-6" />
                                        </div>
                                    </div>

                                    <Link
                                        href={route('hostings.index')}
                                        className="absolute inset-0"
                                    />

                                    <div className="absolute bottom-0 right-0 flex size-14 items-center justify-center rounded-tl-xl bg-zinc-700 text-4xl font-bold text-sky-500">
                                        {usePage().props.global.hostings_count}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>
                </div>
            </div>
        </AdminLayout>
    )
}
