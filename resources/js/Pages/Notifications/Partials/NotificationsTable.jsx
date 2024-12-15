import {
    PencilSquareIcon,
    TrashIcon,
    EyeIcon,
    XMarkIcon,
    LinkIcon,
    GlobeAltIcon,
    FolderOpenIcon,
    RocketLaunchIcon,
    UsersIcon,
    ServerStackIcon,
    CircleStackIcon,
    ServerIcon,
    BookmarkIcon,
} from "@heroicons/react/24/outline";
import { Link, router } from "@inertiajs/react";
import Modal from "@/Components/Modal";
import DangerButton from "@/Components/DangerButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { useState } from "react";
import Pagination from "@/Components/Pagination";

export default function NotificationsTable({notifications}) {
    const [toggleDeleteModal, setToggleDeleteModal] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState(null);

    const toggleModal = (client) => {
        setSelectedNotification(client);

        setToggleDeleteModal(true);
    };

    const closeModal = () => {
        setToggleDeleteModal(false);
    };

    const deleteNotification = () => {
        let url = route("notifications.destroy", selectedNotification.id);

        router.delete(url, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                setToggleDeleteModal(false);
            },
        });
    };


    return (
        <>
            <section className="card">
                <table className="min-w-full divide-y divide-zinc-700 rounded-lg overflow-hidden">
                    <thead className="bg-zinc-800 text-nowrap">
                        <tr>
                            <th className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400">
                                Model
                            </th>
                            <th className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400">
                                Metoda
                            </th>

                            <th className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400">
                                Model
                            </th>

                            <th className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400">
                                Model ID
                            </th>

                            <th className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400">
                                Vytvořeno dne
                            </th>

                            <th className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400">
                                Notifikátor
                            </th>

                            <th className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400">
                                Stav notifikace
                            </th>

                            <th className="px-4 py-3.5 text-sm font-normal text-center text-zinc-400">
                                Akce
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-zinc-800 bg-zinc-700">
                        {notifications.data.map((notification, index) => (
                            <tr
                                key={index}
                                className={
                                    "text-white " +
                                    (notification.data.action === "created"
                                        ? "bg-green-500/5 hover:bg-green-500/15"
                                        : "") +
                                    " " +
                                    (notification.data.action === "updated"
                                        ? "bg-yellow-500/5 hover:bg-yellow-500/15"
                                        : "") +
                                    " " +
                                    (notification.data.action === "deleted"
                                        ? "bg-purple-500/5 hover:bg-purple-500/15"
                                        : "") +
                                    " " +
                                    (notification.data.action === "restored"
                                        ? "bg-blue-500/5 hover:bg-blue-500/15"
                                        : "") +
                                    " " +
                                    (notification.data.action === "forceDeleted"
                                        ? "bg-red-500/5 hover:bg-red-500/15"
                                        : "")
                                }
                            >
                                <td className="px-4 py-4">
                                    {{
                                        Git: <GlobeAltIcon className="size-12 text-green-500 bg-zinc-900 p-1.5 rounded-lg" />,
                                        GitGroup: <FolderOpenIcon className="size-12 text-sky-500 bg-zinc-900 p-1.5 rounded-lg" />,
                                        Repository: <RocketLaunchIcon className="size-12 text-red-500 bg-zinc-900 p-1.5 rounded-lg" />,
                                        User: <UsersIcon className="size-12 text-yellow-500 bg-zinc-900 p-1.5 rounded-lg" />,
                                        Hosting: <ServerStackIcon className="size-12 text-purple-500 bg-zinc-900 p-1.5 rounded-lg" />,
                                        RepositoryDatabase: <CircleStackIcon className="size-12 text-yellow-500 bg-zinc-900 p-1.5 rounded-lg" />,
                                        RepositoryFile: <ServerIcon className="size-12 text-sky-500 bg-zinc-900 p-1.5 rounded-lg" />,
                                    }[ notification.notifiable_type_formatted] || (
                                        <div>
                                            No Icon - {notification.notifiable_type_formatted}
                                        </div>
                                    )}
                                </td>

                                <td className="px-4 py-4 ">
                                    <span
                                        className={
                                            "group px-3 py-1 rounded-full font-extrabold text-md uppercase shadow-inner border-b-4 " +
                                            (notification.data.action === "created" ? "bg-green-500 shadow-green-50 border-b-green-900" : "" )
                                                + " " +
                                            (notification.data.action === "updated" ? "bg-yellow-500 shadow-yellow-50 border-b-yellow-900" : "")
                                                + " " +
                                            (notification.data.action === "deleted" ? "bg-purple-500 shadow-purple-50 border-b-purple-900" : "")
                                                + " " +
                                            (notification.data.action === "restored" ? "bg-blue-500 shadow-blue-50 border-b-blue-900" : "")
                                                + " " +
                                            (notification.data.action === "forceDeleted" ? "bg-red-500 shadow-red-50 border-b-red-900" : "")
                                        }
                                    >
                                        { notification.data.action }
                                    </span>
                                </td>

                                <td className="px-4 py-4 ">
                                    <span className="text-sm font-medium">
                                        { notification.notifiable_type_formatted }
                                    </span>
                                </td>

                                <td className="px-4 py-4 ">
                                    <span className="text-sm font-medium">
                                        { notification.notifiable_id }
                                    </span>
                                </td>

                                <td className="px-4 py-4 flex flex-col items-center ">
                                    <span className="text-sm font-medium">
                                        { notification.created_at_formatted }
                                    </span>
                                    <span className="text-sm font-medium text-gray-400">
                                        { notification.created_at_human }
                                    </span>
                                </td>

                                <td className="px-4 py-4 ">
                                    <span className="text-sm font-medium">
                                        { notification.type_formatted }
                                    </span>
                                </td>

                                <td className="px-4 py-4 ">
                                    <span
                                        className={"text-xs font-semibold " +
                                            (notification.read_at
                                                ? "text-green-500"
                                                : "text-red-500")
                                        }
                                    >
                                        {notification.read_at ? "Přečteno" : "Nepřečteno"}
                                    </span>
                                </td>

                                <td className="px-4 py-4">
                                    <div className="flex justify-center space-x-2">
                                        <Link
                                            href={route("notifications.show", notification.id )}
                                            className="group bg-zinc-800 group-hover:bg-zinc-900 p-1 rounded-lg border border-transparent hover:border-sky-500 faster-animation"
                                        >
                                            <EyeIcon className="size-6 text-sky-500" />
                                        </Link>

                                        <Link
                                            as="button"
                                            method="PATCH"
                                            href={route("notifications.mark-as-read", notification.id)}
                                            className="group bg-zinc-800 group-hover:bg-zinc-900 p-1 rounded-lg border border-transparent hover:border-yellow-500 faster-animation"
                                            preserveScroll
                                        >
                                            <BookmarkIcon className={"size-6 " + (
                                                notification.read_at
                                                    ? "text-yellow-500 fill-yellow-500"
                                                    : "text-yellow-500 group-hover:text-yellow-500 group-hover:fill-yellow-500"
                                                )}
                                            />
                                        </Link>

                                        <Link
                                            as="button"
                                            method="DELETE"
                                            href={route("notifications.destroy", notification.id)}
                                            className="group bg-zinc-800 group-hover:bg-zinc-900 p-1 rounded-lg border border-transparent hover:border-red-500 faster-animation"
                                            preserveScroll
                                        >
                                            <TrashIcon className={"size-6 text-red-500 group-hover:text-red-600"}/>
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="mt-5">
                    <Pagination links={notifications.meta} />
                </div>
            </section>
        </>
    )
}
