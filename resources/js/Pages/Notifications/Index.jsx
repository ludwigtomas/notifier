import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import {
    PencilSquareIcon,
    TrashIcon,
    EyeIcon,
    CheckIcon,
    XMarkIcon,
    ChevronRightIcon,
    LinkIcon,
    BackspaceIcon,
    CommandLineIcon,
} from "@heroicons/react/24/outline";
import Modal from "@/Components/Modal";
import DangerButton from "@/Components/DangerButton";
import TextInput from "@/Components/TextInput";
import SecondaryButton from "@/Components/SecondaryButton";
import Pagination from "@/Components/Pagination";
import debounce from "lodash/debounce";
import { useState, useEffect } from "react";
import Dropdown from "@/Components/Dropdown";

export default function Index({ auth, notifications, filters }) {
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
                    <div className="bg-zinc-900 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="border-4 border-zinc-900 divide-y divide-zinc-800 ">
                            <table className="min-w-full divide-y divide-zinc-700 rounded-md overflow-hidden">
                                <thead className="bg-zinc-950 text-nowrap">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400"
                                        >
                                            Typ notifikace
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400"
                                        >
                                            Model
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400"
                                        >
                                            Nejnovější commit
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400"
                                        >
                                            <span className="sr-only">
                                                Edit
                                            </span>
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-zinc-700 bg-zinc-900">
                                    {notifications.map((notification) => {
                                        return (
                                            <tr
                                                key={notification.id}
                                                className="group hover:bg-zinc-800"
                                            >
                                                <td className="px-4 py-4 ">
                                                    <span className="text-sm font-medium text-zinc-400">
                                                        {notification.type_formatted}
                                                    </span>
                                                </td>

                                                <td className="px-4 py-4 ">
                                                    <span className="text-sm font-medium text-zinc-400">
                                                        {notification.notifiable_type_formatted}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
