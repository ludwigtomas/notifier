import AdminLayout from '@/Layouts/AdminLayout'
import { Head, Link, router } from '@inertiajs/react'
import { EyeIcon, ChevronRightIcon, BookmarkIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import debounce from 'lodash/debounce'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import ResetFilters from '@/Components/ResetFilters'
import NotificationsTable from '@/Pages/Notifications/Partials/NotificationsTable'

export default function Index({ auth, notifications, models, actions, filters }) {
    const [search, setSearch] = useState(filters.search || '')
    const [isRead, setIsRead] = useState(filters.read_at || false)
    const [selectedModel, setSelectedModel] = useState(filters.model || [])
    const [selectedAction, setSelectedAction] = useState(filters.action || '')

    const debouncedSearch = debounce((value) => {
        setSearch(value)

        router.get(
            route('notifications.index'),
            {
                search: value,
                read_at: isRead,
                model: selectedModel,
                action: selectedAction,
            },
            {
                preserveScroll: true,
                preserveState: true,
            }
        )
    }, 500)

    const handleModel = (model) => {
        if (model === 'clear_all') {
            setSelectedModel([])

            router.get(
                route(
                    'notifications.index',
                    {
                        search: search,
                        read_at: isRead,
                        action: selectedAction,
                        model: [],
                    },
                    {
                        preserveScroll: true,
                        preserveState: true,
                    }
                )
            )
        } else {
            if (selectedModel.includes(model)) {
                setSelectedModel(selectedModel.filter((item) => item !== model))
            } else {
                setSelectedModel([...selectedModel, model])
            }

            router.get(
                route(
                    'notifications.index',
                    {
                        search: search,
                        read_at: isRead,
                        action: selectedAction,
                        model: selectedModel.includes(model) ? selectedModel.filter((item) => item !== model) : [...selectedModel, model],
                    },
                    {
                        preserveScroll: true,
                        preserveState: true,
                    }
                )
            )
        }
    }

    const handleSetIsRead = (value) => {
        setIsRead(value)

        router.get(
            route('notifications.index'),
            {
                search: search,
                read_at: value,
                model: selectedModel,
                action: selectedAction,
            },
            {
                preserveScroll: true,
                preserveState: true,
            }
        )
    }

    const deleteNotification = (id) => {
        router.delete(route('notifications.destroy', id), {
            preserveScroll: true,
        })
    }

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
                        href={route('notifications.index')}
                    >
                        Notifikace
                    </Link>
                </header>
            }
        >
            <Head title="Notifikace" />

            <div className="mx-auto max-w-[100rem] sm:px-6 lg:px-8">
                <section className="card mb-10">
                    <div className="grid grid-cols-5 items-center gap-2">
                        <div>
                            <InputLabel
                                className="mb-1"
                                htmlFor="search"
                                value="Vyhledat"
                            />

                            <TextInput
                                name="search"
                                id="search"
                                placeholder="Hledat notifikaci"
                                type="text"
                                className="w-full !border-zinc-600"
                                onChange={(e) => debouncedSearch(e.target.value)}
                            />
                        </div>

                        <div>
                            <InputLabel
                                className="mb-1"
                                htmlFor="read_at"
                                value="Stav notifikace"
                            />

                            <button
                                id="read_at"
                                name="read_at"
                                className="w-full rounded-md border-2 border-zinc-600 bg-zinc-700 py-2 text-zinc-200 shadow-sm"
                                onClick={(e) => handleSetIsRead(!isRead)}
                            >
                                <span className="text-xs text-zinc-400">aktuálně: &nbsp;</span>
                                <span className="text-zinc-200">{isRead ? 'Přečtené' : 'Všechny'}</span>
                            </button>
                        </div>

                        <div>
                            <InputLabel
                                className="mb-1"
                                htmlFor="action"
                                value="Metoda"
                            />

                            <select
                                id="action"
                                name="action"
                                className="w-full rounded-md border-2 border-zinc-600 bg-zinc-700 text-zinc-200 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                                value={selectedAction}
                                onChange={(e) => {
                                    setSelectedAction(e.target.value)
                                    router.get(
                                        route('notifications.index'),
                                        {
                                            search: search,
                                            read_at: isRead,
                                            action: e.target.value,
                                            model: selectedModel,
                                        },
                                        {
                                            preserveScroll: true,
                                            preserveState: true,
                                        }
                                    )
                                }}
                            >
                                <option value="">Vyberte metodu</option>
                                {actions.map((action, index) => (
                                    <option
                                        key={index}
                                        value={action}
                                    >
                                        {action}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <InputLabel
                                className="mb-1"
                                value="Eventy"
                            />

                            <div className="group relative w-full rounded-md border-2 border-zinc-600 bg-zinc-700 py-2 text-zinc-200 shadow-sm focus:border-sky-500 focus:ring-sky-500">
                                <div className="flex items-center justify-center space-x-4 rounded-xl bg-zinc-700">
                                    <h3 className="text-gray-300">Vybrané Eventy</h3>

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
                                                <div
                                                    onClick={() => handleModel('clear_all')}
                                                    className="col-span-3 cursor-pointer rounded-lg border-2 border-red-600 bg-red-500 p-4"
                                                >
                                                    <div className="text-center text-white">
                                                        <p className="text-lg font-semibold">Vyčistit vše</p>
                                                    </div>
                                                </div>
                                            )}

                                            {models.map((model, index) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        onClick={() => handleModel(model)}
                                                        className={
                                                            'flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 bg-zinc-700 p-4 text-xs text-gray-200 ' +
                                                            (selectedModel.includes(model) ? ' border-green-500' : ' border-zinc-600')
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

                        <div>
                            <InputLabel
                                className="mb-1"
                                value="Model"
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
                                                <div
                                                    onClick={() => handleModel('clear_all')}
                                                    className="col-span-3 cursor-pointer rounded-lg border-2 border-red-600 bg-red-500 p-4"
                                                >
                                                    <div className="text-center text-white">
                                                        <p className="text-lg font-semibold">Vyčistit vše</p>
                                                    </div>
                                                </div>
                                            )}

                                            {models.map((model, index) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        onClick={() => handleModel(model)}
                                                        className={
                                                            'flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 bg-zinc-700 p-4 text-xs text-gray-200 ' +
                                                            (selectedModel.includes(model) ? ' border-green-500' : ' border-zinc-600')
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
                            <h1 className="text-2xl font-semibold capitalize lg:text-3xl dark:text-white">Notifikace</h1>

                            <p className="text-zinc-400">Zde se nachází všechny notifikace, co se událo.</p>
                        </div>
                    </div>
                </section>

                <main className="mt-2">
                    {notifications && notifications.data.length >= 1 ? (
                        <NotificationsTable notifications={notifications} />
                    ) : (
                        <ResetFilters href={route('notifications.index')}>Nebyly nalezeny žádné notifikace.</ResetFilters>
                    )}
                </main>
            </div>
        </AdminLayout>
    )
}
