import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
    FireIcon,
    ArrowRightCircleIcon,
    ChevronRightIcon,
} from "@heroicons/react/24/outline";

export default function Dashboard({
    auth,
    git_groups_parent_count,
    git_groups_childrens_count,
    repositories_count,
    databases_count,
    clients_count,
}) {
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
                                    {repositories_count}
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
                                    {databases_count}
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
                                    {clients_count}
                                </div>
                            </div>

                            <div className="group relative p-8 space-y-3 bg-zinc-800 border-2 border-zinc-700 hover:border-sky-500 rounded-xl overflow-hidden">
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

                                <Link
                                    href={route("repositories.index")}
                                    className="absolute inset-0"
                                />

                                <div className="absolute right-0 bottom-0 size-14 bg-zinc-700 flex items-center justify-center text-sky-500 text-4xl font-bold rounded-tl-xl">
                                    {git_groups_parent_count}
                                </div>
                            </div>

                            <div className="group relative p-8 space-y-3 bg-zinc-800 border-2 border-zinc-700 hover:border-sky-500 rounded-xl overflow-hidden">
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

                                <Link
                                    href={route("repositories.index")}
                                    className="absolute inset-0"
                                />

                                <div className="absolute right-0 bottom-0 size-14 bg-zinc-700 flex items-center justify-center text-sky-500 text-4xl font-bold rounded-tl-xl">
                                    {git_groups_childrens_count}
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </div>
        </AuthenticatedLayout>
    );
}
