import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
    PencilSquareIcon,
    TrashIcon,
    EyeIcon,
} from "@heroicons/react/24/outline";

export default function Dashboard({ auth, gits }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-400 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-zinc-900 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-300">Přidané gity</div>

                        {/* variable gits */}
                        <div className="p-6 flex flex-col divide-y divide-zinc-800">
                            {gits.map((git) => (
                                <div className="flex items-center justify-between py-2">
                                    <div>
                                        <img
                                            className="w-10 h-10 rounded-lg"
                                            src={"/storage/avatars/" + git.username + ".png"}
                                            alt={git.name}
                                        />
                                    </div>

                                    <div className="text-gray-500 p-5">
                                        {git.name}
                                    </div>

                                    <div className="flex space-x-2">
                                        <Link
                                            href={route("gits.edit", git.id)}
                                            className="bg-green-100 p-1 rounded-lg hover:bg-green-200 slower-animation"
                                        >
                                            <PencilSquareIcon className="w-6 h-6 text-green-500" />
                                        </Link>

                                        <Link
                                            href={route("gits.show", git.id)}
                                            className="bg-sky-100 p-1 rounded-lg hover:bg-sky-200 slower-animation"
                                        >
                                            <EyeIcon className="w-6 h-6 text-sky-500" />
                                        </Link>

                                        <Link
                                            as="button"
                                            method="delete"
                                            preserveScroll
                                            href={route("gits.destroy", git.id)}
                                            className="bg-red-100 p-1 rounded-lg hover:bg-red-200 slower-animation"
                                        >
                                            <TrashIcon className="w-6 h-6 text-red-500" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
