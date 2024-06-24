import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import {
    EyeIcon,
    ChevronRightIcon,
    BookmarkIcon,
    TrashIcon,
    Square2StackIcon,
    PencilSquareIcon,
} from "@heroicons/react/24/outline";

export default function Edit({ auth, notification }) {
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

                    <span>
                        <ChevronRightIcon className="size-5" />
                    </span>

                    <Link
                        className="font-semibold text-lg leading-tight text-sky-500"
                        href={route("notifications.index")}
                    >
                        Notifikace
                    </Link>
                </header>
            }
        >
            <Head title="Notifikace" />

            <div className="py-12">
                <div className="max-w-[100rem] mx-auto sm:px-6 lg:px-8">
                    <div className="mb-5 bg-zinc-900 border border-zinc-700 p-2 rounded-xl">
                        <h1 className="text-center text-white text-2xl font-bold tracking-wider">
                            {notification.type_formatted}
                        </h1>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
