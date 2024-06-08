import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import {
    FireIcon,
    ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";

export default function Dashboard({ auth }) {
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

            <div className="sm:px-6 lg:px-8">
                <section className="bg-zinc-900 overflow-hidden shadow-sm sm:rounded-3xl">
                    <div className="p-6">
                        <div className="mb-2">
                            <h1 className="text-2xl font-semibold capitalize lg:text-3xl dark:text-white">
                                Dahboard
                            </h1>
                        </div>

                        <div className="grid grid-cols-1 gap-8 xl:gap-2 md:grid-cols-2 xl:grid-cols-3">

                            <div className="col-span-2 grid">
                                <div className="grid grid-cols-2 group relative p-8 space-x-5 bg-zinc-800 border-2 border-zinc-700 hover:border-sky-500 rounded-xl overflow-hidden">
                                    <div className="text-center">
                                        <span className="inline-block text-zinc-400">
                                            <FireIcon className="size-8" />
                                        </span>

                                        <h1 className="text-xl font-semibold capitalize text-white">
                                            Git skupiny (rodiče)
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
                                            Git skupiny (dětí)
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
                                    Správá databází, zálohování a obnova
                                    databází.
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
                                    Správá klientů, zálohování a obnova
                                    databází.
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
                        </div>
                    </div>
                </section>
            </div>
        </AuthenticatedLayout>
    );
}
