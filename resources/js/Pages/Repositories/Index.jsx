import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
    ChevronRightIcon,
} from "@heroicons/react/24/outline";
export default function Index({ auth, repositories }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <header className="flex items-center justify-start flex-row space-x-4 text-zinc-500">
                    <Link
                        className="font-semibold text-lg leading-tight hover:text-sky-500 slower-animation"
                        href={route('dashboard.index')}
                    >
                        Dashboard
                    </Link>

                    <span>
                        <ChevronRightIcon className="w-5 h-5"/>
                    </span>

                    <Link
                        className="font-semibold text-lg leading-tight text-sky-500"
                        href={route('repositories.index')}
                    >
                        Repozitáře
                    </Link>

                </header>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="max-w-lg">
                                {repositories.map((repository) => {
                                    return (
                                        <div
                                            key={repository.id}
                                            className="grid grid-cols-2 gap-10"
                                        >
                                            <h1>{repository.name}</h1>

                                            <Link
                                                className="text-sm text-red-500"
                                                href={route("repositories.edit", repository.id)}
                                            >
                                                Edit
                                            </Link>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
