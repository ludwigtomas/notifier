import React from 'react'
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
    PencilSquareIcon,
    TrashIcon,
    EyeIcon,
    ChevronRightIcon,
} from "@heroicons/react/24/outline";

export default function Index ({auth, gits}) {
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
                    <ChevronRightIcon className="w-5 h-5" />
                </span>

                <Link
                    className="font-semibold text-lg leading-tight text-sky-500"
                    href={route("gits.index")}
                >
                    Gits
                </Link>
            </header>
        }
    >

    </AuthenticatedLayout>
  )
}

