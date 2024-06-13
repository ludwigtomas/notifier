import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage, router } from "@inertiajs/react";
import {
    FireIcon,
    ArrowRightCircleIcon,
    ServerStackIcon,
    EyeIcon,
    BookmarkIcon,
    PresentationChartBarIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";


export default function Dashboard({ auth, notifications, models, filters }) {

    const [selectedModel, setSelectedModel] = useState(filters.model || [])

    const handleModel = (model) => {
        if (selectedModel.includes(model)) {
            setSelectedModel(selectedModel.filter((item) => item !== model));
        } else {
            setSelectedModel([...selectedModel, model]);
        }

        router.get(route('dashboard.index', {
            model: selectedModel.includes(model) ? selectedModel.filter((item) => item !== model) : [...selectedModel, model]
        }));
    }


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <header className="flex items-center justify-start flex-row space-x-4 text-zinc-500">
                    <Link
                        className="font-semibold text-lg leading-tight hover:text-sky-500 slower-animation"
                        href={route("dashboard.index")}
                    >
                        Dashboard
                    </Link>
                </header>
            }
        >
            <Head title="Dashboard" />


            <div className="sm:px-6 lg:px-8 grid grid-cols-1 gap-y-10">
                <section className="bg-zinc-900 shadow-sm sm:rounded-3xl">
                    <div className="p-6">

                        <div className="mb-6 flex items-center justify-between space-x-4">
                            <div className="flex space-x-2">
                                <div className="grid">
                                    <Link
                                        href={route("notifications.index")}
                                        className="p-2 rounded-lg bg-zinc-700 hover:bg-zinc-800 faster-animation"
                                    >
                                        <EyeIcon className="size-10 text-neutral-400"/>
                                    </Link>
                                </div>

                                <div>
                                    <h1 className="text-2xl font-semibold capitalize lg:text-3xl dark:text-white">
                                        Nové notifikace
                                    </h1>

                                    <p className="text-zinc-400">
                                        Zde se nachází všechny notifikace, co se událo.
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div className="group relative">
                                    <div className="flex items-center justify-center space-x-4 bg-zinc-700 px-4 py-2 rounded-xl">
                                        <h3 className="text-gray-300">
                                            Vybrané modely
                                        </h3>

                                        <div className="text-white font-bold">
                                            {selectedModel.length}
                                        </div>
                                    </div>

                                    <div className="hidden group-hover:block absolute right-0 top-full pt-4 ">
                                        <div className="z-40 h-64 overflow-y-auto overflow-x-hidden p-2 w-[30rem] border border-neutral-600 bg-neutral-800 rounded-xl">
                                            <div className="grid grid-cols-3 gap-4">
                                                {models.map((model, index) => {
                                                    return (
                                                        <div
                                                            key={index}
                                                            onClick={() => handleModel(model)}
                                                            className={'text-xs text-gray-200 flex flex-col items-center justify-center rounded-lg p-4 border-2 cursor-pointer bg-zinc-700 ' +
                                                            (selectedModel.includes(model) ? ' border-green-500' : ' border-zinc-600')}
                                                        >
                                                            <BookmarkIcon
                                                                className={"size-10 text-neutral-400 mb-3 " +
                                                                    (selectedModel.includes(model) ? ' fill-neutral-400' : ' border-zinc-600 bg-zinc-700')
                                                                }
                                                            />

                                                            { model }
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {notifications && notifications.length > 0 ? (
                            <table className="min-w-full divide-y divide-zinc-700 rounded-lg overflow-hidden">
                                <thead className="bg-zinc-800 text-nowrap">
                                    <tr>
                                        <th className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400">
                                            Metoda
                                        </th>

                                        <th className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400">
                                            Event
                                        </th>

                                        <th className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400">
                                            Model
                                        </th>

                                        <th className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400">
                                            Model_id
                                        </th>

                                        <th className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400">
                                            Vytvořeno dne
                                        </th>

                                        <th className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400">
                                            Akce
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-zinc-800 bg-zinc-700">
                                    {notifications.map((notification) => (
                                        <tr
                                            key={notification.id}
                                            className={"text-white " +
                                                (notification.data.action === 'created' ? 'bg-green-500/5 hover:bg-green-500/15' : '') + ' ' +
                                                (notification.data.action === 'updated' ? 'bg-yellow-500/5 hover:bg-yellow-500/15' : '') + ' ' +
                                                (notification.data.action === 'deleted' ? 'bg-purple-500/5 hover:bg-purple-500/15' : '') + ' ' +
                                                (notification.data.action === 'restored' ? 'bg-blue-500/5 hover:bg-blue-500/15' : '') + ' ' +
                                                (notification.data.action === 'forceDeleted' ? 'bg-red-500/5 shadow-red-500/15' : '')
                                            }
                                        >
                                            <td className="px-4 py-4 ">
                                                <span
                                                     className={"group px-3 py-1 rounded-full font-extrabold text-md uppercase shadow-inner border-b-4 " +
                                                        (notification.data.action === 'created' ? 'bg-green-500 shadow-green-50 border-b-green-900' : '') + ' ' +
                                                        (notification.data.action === 'updated' ? 'bg-yellow-500 shadow-yellow-50 border-b-yellow-900' : '') + ' ' +
                                                        (notification.data.action === 'deleted' ? 'bg-purple-500 shadow-purple-50 border-b-purple-900' : '') + ' ' +
                                                        (notification.data.action === 'restored' ? 'bg-blue-500 shadow-blue-50 border-b-blue-900' : '') + ' ' +
                                                        (notification.data.action === 'forceDeleted' ? 'bg-red-500 shadow-red-50 border-b-red-900' : '')
                                                    }
                                                >
                                                    {notification.data.action}
                                                </span>
                                            </td>

                                            <td className="px-4 py-4 ">
                                                <span className="text-sm font-medium">
                                                    {notification.type_formatted}
                                                </span>
                                            </td>

                                            <td className="px-4 py-4 ">
                                                <span className="text-sm font-medium">
                                                    {notification.notifiable_type_formatted}
                                                </span>
                                            </td>

                                            <td className="px-4 py-4 ">
                                                <span className="text-sm font-medium">
                                                    {notification.notifiable_id}
                                                </span>
                                            </td>

                                            <td className="px-4 py-4 ">
                                                <span className="text-sm font-medium">
                                                    {notification.created_at_formatted}
                                                </span>
                                            </td>

                                            <td className="px-4 py-4">
                                                <div className="flex">
                                                    <Link
                                                        as="button"
                                                        method="PATCH"
                                                        href={route("notifications.mark-as-read", notification.id)}
                                                        className="bg-zinc-800 group-hover:bg-zinc-900 p-1 rounded-lg border border-transparent hover:border-sky-500 faster-animation"
                                                    >
                                                        <BookmarkIcon className="size-6 text-sky-500" />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ):(
                            <div className="p-4 text-center text-zinc-400">
                                <EyeIcon className="size-8 mx-auto" />

                                <p className="text-lg font-semibold">
                                    Nejsou zde žádné nové notifikace.
                                </p>
                            </div>
                        )}

                    </div>
                </section>

                <section className="bg-zinc-900 overflow-hidden shadow-sm sm:rounded-3xl">
                    <div className="p-6">
                        <div className="mb-6 flex items-center justify-between space-x-4">

                            <div className="flex space-x-2">
                                <div className="grid">
                                    <Link
                                        href={route("dashboard.index")}
                                        className="p-2 rounded-lg bg-zinc-700 hover:bg-zinc-800 faster-animation"
                                    >
                                        <PresentationChartBarIcon className="size-10 text-neutral-400"/>
                                    </Link>
                                </div>

                                <div>
                                    <h1 className="text-2xl font-semibold capitalize lg:text-3xl dark:text-white">
                                        Dashboard
                                    </h1>

                                    <p className="text-zinc-400">
                                        Zde se nachází všechny notifikace, co se událo.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-8 xl:gap-2 md:grid-cols-2 xl:grid-cols-3">

                            <div className="col-span-2 grid">
                                <div className="grid grid-cols-2 group relative p-8 space-x-5 bg-zinc-800 border-2 border-zinc-700 hover:border-sky-500 rounded-xl overflow-hidden">
                                    <div className="text-center">
                                        <span className="inline-block text-zinc-400">
                                            <FireIcon className="size-8" />
                                        </span>

                                        <h1 className="text-xl font-semibold capitalize text-white">
                                            Hlavní skupiny
                                        </h1>

                                        <p className="text-zinc-400">
                                            Správá git skupin (rodičů), zálohování a
                                            obnova databází.
                                        </p>

                                        <div className="pt-4">
                                            <div className="inline-flex p-2 capitalize group-hover:scale-110 faster-animation rounded-full bg-zinc-500 text-white hover:underline hover:text-sky-500">
                                                <ArrowRightCircleIcon className="size-6" />
                                            </div>
                                        </div>

                                        <div className="absolute left-0 bottom-0 size-14 bg-zinc-700 flex items-center justify-center text-sky-500 text-4xl font-bold rounded-tr-xl">
                                            { usePage().props.global.git_group_parent_count }
                                        </div>
                                    </div>

                                    <div className="absolute bottom-0 left-1/2 translate-x-[-100%]">
                                        <span className="size-8 bg-zinc-700 flex items-center justify-center text-sky-500 text-lg font-bold rounded-t-md">
                                            { usePage().props.global.git_groups_count }
                                        </span>
                                    </div>

                                    <div className="text-center">
                                        <span className="inline-block text-zinc-400">
                                            <FireIcon className="size-8" />
                                        </span>

                                        <h1 className="text-xl font-semibold capitalize text-white">
                                            Podřadné skupiny
                                        </h1>

                                        <p className="text-zinc-400">
                                            Správá git skupin (dětí), zálohování a
                                            obnova databází.
                                        </p>

                                        <div className="pt-4">
                                            <div className="inline-flex p-2 capitalize group-hover:scale-110 faster-animation rounded-full bg-zinc-500 text-white hover:underline hover:text-sky-500">
                                                <ArrowRightCircleIcon className="size-6" />
                                            </div>
                                        </div>

                                        <div className="absolute right-0 bottom-0 size-14 bg-zinc-700 flex items-center justify-center text-sky-500 text-4xl font-bold rounded-tl-xl">
                                            { usePage().props.global.git_group_child_count }
                                        </div>
                                    </div>

                                    <Link
                                        href={route("git-groups.index")}
                                        className="absolute inset-0"
                                    />
                                </div>
                            </div>

                            <div className="group relative p-8 space-y-3 bg-zinc-800 border-2 border-zinc-700 hover:border-sky-500 rounded-xl overflow-hidden">
                                <span className="inline-block text-zinc-400">
                                    <FireIcon className="size-8" />
                                </span>

                                <h1 className="text-xl font-semibold capitalize text-white">
                                    Repozitáře
                                </h1>

                                <p className="text-zinc-400">
                                    Správá repozitářů, přístupových údajů k VPS,
                                    zálohování a obnova databází a mnoho
                                    dalšího.
                                </p>

                                <div className="pt-4">
                                    <div className="inline-flex p-2 capitalize group-hover:scale-110 faster-animation rounded-full bg-zinc-500 text-white hover:underline hover:text-sky-500">
                                        <ArrowRightCircleIcon className="size-6" />
                                    </div>
                                </div>

                                <Link
                                    href={route("repositories.index")}
                                    className="absolute inset-0"
                                />

                                <div className="absolute right-0 bottom-0 size-14 bg-zinc-700 flex items-center justify-center text-sky-500 text-4xl font-bold rounded-tl-xl">
                                    { usePage().props.global.repositories_count }
                                </div>
                            </div>

                            <div className="group relative p-8 space-y-3 bg-zinc-800 border-2 border-zinc-700 hover:border-sky-500 rounded-xl overflow-hidden">
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
                            </div>

                            <div className="group relative p-8 space-y-3 bg-zinc-800 border-2 border-zinc-700 hover:border-sky-500 rounded-xl overflow-hidden">
                                <span className="inline-block text-zinc-400">
                                    <FireIcon className="size-8" />
                                </span>

                                <h1 className="text-xl font-semibold capitalize text-white">
                                    Klienti
                                </h1>

                                <p className="text-zinc-400">
                                    Správá klientů.
                                </p>

                                <div className="pt-4">
                                    <div className="inline-flex p-2 capitalize group-hover:scale-110 faster-animation rounded-full bg-zinc-500 text-white hover:underline hover:text-sky-500">
                                        <ArrowRightCircleIcon className="size-6" />
                                    </div>
                                </div>

                                <Link
                                    href={route("clients.index")}
                                    className="absolute inset-0"
                                />

                                <div className="absolute right-0 bottom-0 size-14 bg-zinc-700 flex items-center justify-center text-sky-500 text-4xl font-bold rounded-tl-xl">
                                    { usePage().props.global.clients_count }
                                </div>
                            </div>

                            <div className="group relative p-8 space-y-3 bg-zinc-800 border-2 border-zinc-700 hover:border-sky-500 rounded-xl overflow-hidden">
                                <span className="inline-block text-zinc-400">
                                    <ServerStackIcon className="size-8" />
                                </span>

                                <h1 className="text-xl font-semibold capitalize text-white">
                                    Hostingy
                                </h1>

                                <p className="text-zinc-400">
                                    Správá hostingů.
                                </p>

                                <div className="pt-4">
                                    <div className="inline-flex p-2 capitalize group-hover:scale-110 faster-animation rounded-full bg-zinc-500 text-white hover:underline hover:text-sky-500">
                                        <ArrowRightCircleIcon className="size-6" />
                                    </div>
                                </div>

                                <Link
                                    href={route("hostings.index")}
                                    className="absolute inset-0"
                                />

                                <div className="absolute right-0 bottom-0 size-14 bg-zinc-700 flex items-center justify-center text-sky-500 text-4xl font-bold rounded-tl-xl">
                                    { usePage().props.global.hostings_count }
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </div>
        </AuthenticatedLayout>
    );
}
