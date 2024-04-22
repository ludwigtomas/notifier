import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { FireIcon, ArrowRightCircleIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function Dashboard({ auth, repositories_count, databases_count, clients_count }) {
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
                <section class="bg-zinc-900 overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="container px-6 py-10 mx-auto">

                        <h1 class="text-2xl font-semibold capitalize lg:text-3xl dark:text-white">
                            Dahboard
                        </h1>

                        <div class="grid grid-cols-1 gap-8 mt-8 xl:mt-8 xl:gap-12 md:grid-cols-2 xl:grid-cols-3">
                            <div class="group relative p-8 space-y-3 border-2 border-zinc-700 hover:border-sky-500 rounded-xl overflow-hidden">
                                <span class="inline-block text-zinc-400">
                                    <FireIcon className="size-8"/>
                                </span>

                                <h1 class="text-xl font-semibold capitalize text-white">
                                    Repozitáře
                                </h1>

                                <p class="text-zinc-400">
                                    Správá repozitářů, přístupových údajů k VPS, zálohování a obnova databází a mnoho dalšího.
                                </p>

                                <div className="pt-4">
                                    <div class="inline-flex p-2 capitalize group-hover:scale-110 faster-animation rounded-full bg-zinc-500 text-white hover:underline hover:text-sky-500">
                                        <ArrowRightCircleIcon className="size-6"/>
                                    </div>
                                </div>

                                <Link
                                    href={route("repositories.index")}
                                    class="absolute inset-0"
                                />

                                <div className="absolute right-0 bottom-0 size-14 bg-zinc-700 flex items-center justify-center text-sky-500 text-4xl font-bold rounded-tl-xl">
                                    {repositories_count}
                                </div>
                            </div>

                            <div class="group relative p-8 space-y-3 border-2 border-zinc-700 hover:border-sky-500 rounded-xl overflow-hidden">
                                <span class="inline-block text-zinc-400">
                                    <FireIcon className="size-8"/>
                                </span>

                                <h1 class="text-xl font-semibold capitalize text-white">
                                    Databáze
                                </h1>

                                <p class="text-zinc-400">
                                    Správá databází, zálohování a obnova databází.
                                </p>

                                <div className="pt-4">
                                    <div class="inline-flex p-2 capitalize group-hover:scale-110 faster-animation rounded-full bg-zinc-500 text-white hover:underline hover:text-sky-500">
                                        <ArrowRightCircleIcon className="size-6"/>
                                    </div>
                                </div>

                                <Link
                                    href={route("databases.index")}
                                    class="absolute inset-0"
                                />

                                <div className="absolute right-0 bottom-0 size-14 bg-zinc-700 flex items-center justify-center text-sky-500 text-2xl font-bold rounded-tl-xl">
                                    {databases_count}
                                </div>
                            </div>

                            <div class="group relative p-8 space-y-3 border-2 border-zinc-700 hover:border-sky-500 rounded-xl overflow-hidden">
                                <span class="inline-block text-zinc-400">
                                    <FireIcon className="size-8"/>
                                </span>

                                <h1 class="text-xl font-semibold capitalize text-white">
                                    Klienti
                                </h1>

                                <p class="text-zinc-400">
                                    Správá klientů, zálohování a obnova databází.
                                </p>

                                <div className="pt-4">
                                    <div class="inline-flex p-2 capitalize group-hover:scale-110 faster-animation rounded-full bg-zinc-500 text-white hover:underline hover:text-sky-500">
                                        <ArrowRightCircleIcon className="size-6"/>
                                    </div>
                                </div>

                                <Link
                                    href={route("clients.index")}
                                    class="absolute inset-0"
                                />

                                <div className="absolute right-0 bottom-0 size-14 bg-zinc-700 flex items-center justify-center text-sky-500 text-4xl font-bold rounded-tl-xl">
                                    {clients_count}
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </div>
        </AuthenticatedLayout>
    );
}
