import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router } from "@inertiajs/react";
import {
    EyeIcon,
    ChevronRightIcon,
    BookmarkIcon,
    TrashIcon,
    PencilSquareIcon,
    GlobeAltIcon,
    FolderOpenIcon,
    RocketLaunchIcon,
    UsersIcon,
    ServerStackIcon,
    CircleStackIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import debounce from "lodash/debounce";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import ResetFilters from "@/Components/ResetFilters";
import Pagination from "@/Components/Pagination";

export default function Index({
    auth,
    notifications,
    models,
    actions,
    filters,
}) {
    const [search, setSearch] = useState(filters.search || "");
    const [isRead, setIsRead] = useState(filters.read_at || false);
    const [selectedModel, setSelectedModel] = useState(filters.model || []);
    const [selectedAction, setSelectedAction] = useState(filters.action || "");

    const debouncedSearch = debounce((value) => {
        setSearch(value);

        router.get(
            route("notifications.index"),
            {
                search: value,
                read_at: isRead,
                model: selectedModel,
                action: selectedAction,
            },
            {
                preserveScroll: true,
                preserveState: true,
            }
        );
    }, 500);

    const handleModel = (model) => {
        if (model === "clear_all") {
            setSelectedModel([]);

            router.get(
                route(
                    "notifications.index",
                    {
                        search: search,
                        read_at: isRead,
                        action: selectedAction,
                        model: [],
                    },
                    {
                        preserveScroll: true,
                        preserveState: true,
                    }
                )
            );
        } else {
            if (selectedModel.includes(model)) {
                setSelectedModel(
                    selectedModel.filter((item) => item !== model)
                );
            } else {
                setSelectedModel([...selectedModel, model]);
            }

            router.get(
                route(
                    "notifications.index",
                    {
                        search: search,
                        read_at: isRead,
                        action: selectedAction,
                        model: selectedModel.includes(model)
                            ? selectedModel.filter((item) => item !== model)
                            : [...selectedModel, model],
                    },
                    {
                        preserveScroll: true,
                        preserveState: true,
                    }
                )
            );
        }
    };

    const handleSetIsRead = (value) => {
        setIsRead(value);

        router.get(route("notifications.index"),{
                search: search,
                read_at: value,
                model: selectedModel,
                action: selectedAction,
            },
            {
                preserveScroll: true,
                preserveState: true,
            }
        );
    };

    const deleteNotification = (id) => {
        router.delete(route("notifications.destroy", id), {
            preserveScroll: true,
        });
    }

    return (
        <AdminLayout
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

            <div className="max-w-[100rem] mx-auto sm:px-6 lg:px-8">
                <section className="mb-10 card">
                    <div className="grid grid-cols-5 gap-2 items-center">
                        <div>
                            <InputLabel
                                className="mb-1"
                                htmlFor="search"
                                value="Vyhledat"
                            />

                            <TextInput
                                name="search"
                                id="search"
                                placeholder="Hledat notifikaci"
                                type="text"
                                className="w-full !border-zinc-600 "
                                onChange={(e) =>
                                    debouncedSearch(e.target.value)
                                }
                            />
                        </div>

                        <div>
                            <InputLabel
                                className="mb-1"
                                htmlFor="read_at"
                                value="Stav notifikace"
                            />

                            <button
                                id="read_at"
                                name="read_at"
                                className="w-full bg-zinc-700 py-2 border-2 border-zinc-600 text-zinc-200 rounded-md shadow-sm"
                                onClick={(e) => handleSetIsRead(!isRead)}
                            >
                                <span className="text-xs text-zinc-400">
                                    aktuálně: &nbsp;
                                </span>
                                <span className="text-zinc-200">
                                    {isRead ? "Přečtené" : "Všechny"}
                                </span>
                            </button>
                        </div>

                        <div>
                            <InputLabel
                                className="mb-1"
                                htmlFor="action"
                                value="Metoda"
                            />

                            <select
                                id="action"
                                name="action"
                                className="w-full bg-zinc-700 border-2 border-zinc-600 focus:border-sky-500 focus:ring-sky-500 text-zinc-200 rounded-md shadow-sm"
                                value={selectedAction}
                                onChange={(e) => {
                                    setSelectedAction(e.target.value);
                                    router.get(
                                        route("notifications.index"),
                                        {
                                            search: search,
                                            read_at: isRead,
                                            action: e.target.value,
                                            model: selectedModel,
                                        },
                                        {
                                            preserveScroll: true,
                                            preserveState: true,
                                        }
                                    );
                                }}
                            >
                                <option value="">Vyberte metodu</option>
                                {actions.map((action, index) => (
                                    <option key={index} value={action}>
                                        {action}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <InputLabel className="mb-1" value="Eventy" />

                            <div className="relative group w-full bg-zinc-700 py-2 border-2 border-zinc-600 focus:border-sky-500 focus:ring-sky-500 text-zinc-200 rounded-md shadow-sm">
                                <div className="flex items-center justify-center space-x-4 bg-zinc-700 rounded-xl">
                                    <h3 className="text-gray-300">
                                        Vybrané Eventy
                                    </h3>

                                    <div className="text-white font-bold">
                                        {selectedModel.length}
                                    </div>
                                </div>

                                <div className="hidden group-hover:block absolute right-0 top-full pt-4 ">
                                    <div className="z-40 h-80 overflow-y-auto overflow-x-hidden p-2 w-[30rem] border border-neutral-600 bg-neutral-800 rounded-xl">
                                        <div className="grid grid-cols-3 gap-4">
                                            {selectedModel.length === 0 ? (
                                                <div className="col-span-3  bg-zinc-700 rounded-lg p-4 border-2 border-zinc-600">
                                                    <div className="text-center text-gray-200 ">
                                                        <p className="text-lg font-semibold">
                                                            Nejsou vybrané
                                                            žádné modely
                                                        </p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div
                                                    onClick={() => handleModel("clear_all")}
                                                    className="col-span-3 bg-red-500 rounded-lg p-4 border-2 border-red-600 cursor-pointer"
                                                >
                                                    <div className="text-center text-white">
                                                        <p className="text-lg font-semibold">
                                                            Vyčistit vše
                                                        </p>
                                                    </div>
                                                </div>
                                            )}

                                            {models.map((model, index) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        onClick={() => handleModel(model)}
                                                        className={
                                                            "text-xs text-gray-200 flex flex-col items-center justify-center rounded-lg p-4 border-2 cursor-pointer bg-zinc-700 " +
                                                            (selectedModel.includes(model)
                                                                ? " border-green-500"
                                                                : " border-zinc-600")
                                                        }
                                                    >
                                                        <BookmarkIcon
                                                            className={
                                                                "size-10 text-neutral-400 mb-3 " +
                                                                (selectedModel.includes(model)
                                                                    ? " fill-neutral-400"
                                                                    : " border-zinc-600 bg-zinc-700")
                                                            }
                                                        />

                                                        {model}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <InputLabel className="mb-1" value="Model" />

                            <div className="relative group w-full bg-zinc-700 py-2 border-2 border-zinc-600 focus:border-sky-500 focus:ring-sky-500 text-zinc-200 rounded-md shadow-sm">
                                <div className="flex items-center justify-center space-x-4 bg-zinc-700 rounded-xl">
                                    <h3 className="text-gray-300">
                                        Vybrané modely
                                    </h3>

                                    <div className="text-white font-bold">
                                        {selectedModel.length}
                                    </div>
                                </div>

                                <div className="hidden group-hover:block absolute right-0 top-full pt-4 ">
                                    <div className="z-40 h-80 overflow-y-auto overflow-x-hidden p-2 w-[30rem] border border-neutral-600 bg-neutral-800 rounded-xl">
                                        <div className="grid grid-cols-3 gap-4">
                                            {selectedModel.length === 0 ? (
                                                <div className="col-span-3  bg-zinc-700 rounded-lg p-4 border-2 border-zinc-600">
                                                    <div className="text-center text-gray-200 ">
                                                        <p className="text-lg font-semibold">
                                                            Nejsou vybrané
                                                            žádné modely
                                                        </p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div
                                                    onClick={() =>
                                                        handleModel(
                                                            "clear_all"
                                                        )
                                                    }
                                                    className="col-span-3 bg-red-500 rounded-lg p-4 border-2 border-red-600 cursor-pointer"
                                                >
                                                    <div className="text-center text-white">
                                                        <p className="text-lg font-semibold">
                                                            Vyčistit vše
                                                        </p>
                                                    </div>
                                                </div>
                                            )}

                                            {models.map((model, index) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        onClick={() =>
                                                            handleModel(
                                                                model
                                                            )
                                                        }
                                                        className={
                                                            "text-xs text-gray-200 flex flex-col items-center justify-center rounded-lg p-4 border-2 cursor-pointer bg-zinc-700 " +
                                                            (selectedModel.includes(
                                                                model
                                                            )
                                                                ? " border-green-500"
                                                                : " border-zinc-600")
                                                        }
                                                    >
                                                        <BookmarkIcon
                                                            className={
                                                                "size-10 text-neutral-400 mb-3 " +
                                                                (selectedModel.includes(
                                                                    model
                                                                )
                                                                    ? " fill-neutral-400"
                                                                    : " border-zinc-600 bg-zinc-700")
                                                            }
                                                        />

                                                        {model}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="card">
                    <div className="flex space-x-4">
                        <div className="flex flex-col items-center justify-center">
                            <Link
                                href={route("dashboard.index")}
                                className="p-2 rounded-md bg-zinc-800 border border-zinc-700 hover:border-zinc-600 faster-animation"
                            >
                                <EyeIcon className="size-10 text-sky-500" />
                            </Link>
                        </div>

                        <div>
                            <h1 className="text-2xl font-semibold capitalize lg:text-3xl dark:text-white">
                                Notifikace
                            </h1>

                            <p className="text-zinc-400">
                                Zde se nachází všechny notifikace, co se
                                událo.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="mt-2 card">
                    <div className="divide-y divide-zinc-800 ">
                        {notifications && notifications.data.length > 0 ? (
                            <>
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
                                        {notifications.data.map((notification) => (
                                            <tr
                                                key={notification.id}
                                                className={
                                                    "text-white " +
                                                    (notification.data.action === "created"
                                                        ? "bg-green-500/5 hover:bg-green-500/15"
                                                        : "")
                                                    + " " +
                                                    (notification.data.action === "updated"
                                                        ? "bg-yellow-500/5 hover:bg-yellow-500/15"
                                                        : "")
                                                    + " " +
                                                    (notification.data.action === "deleted"
                                                        ? "bg-purple-500/5 hover:bg-purple-500/15"
                                                        : "")
                                                    + " " +
                                                    (notification.data.action === "restored"
                                                        ? "bg-blue-500/5 hover:bg-blue-500/15"
                                                        : "")
                                                    + " " +
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
                                                    }[ notification.notifiable_type_formatted] || (
                                                        <div>
                                                            No Icon
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

                                                <td className="px-4 py-4 flex flex-col">
                                                    <span className="text-sm font-medium">
                                                        { notification.created_at_human }
                                                    </span>

                                                    <span className="text-xs text-gray-300">
                                                        { notification.created_at_formatted }
                                                    </span>
                                                </td>

                                                <td className="px-4 py-4 ">
                                                    <span className="text-sm font-medium">
                                                        { notification.type_formatted }
                                                    </span>
                                                </td>

                                                <td className="px-4 py-4 ">
                                                    <span
                                                        className={ "text-xs font-semibold " + (notification.read_at
                                                            ? "text-green-500"
                                                            : "text-red-500"
                                                        )}
                                                    >
                                                        {notification.read_at ? "Přečteno" : "Nepřečteno" }
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
                                                            <BookmarkIcon
                                                                className={ "size-6 " + (notification.read_at
                                                                    ? "text-yellow-500 fill-yellow-500"
                                                                    : "text-yellow-500 group-hover:text-yellow-500 group-hover:fill-yellow-500"
                                                                )}
                                                            />
                                                        </Link>

                                                        <button
                                                            onClick={() => deleteNotification(notification.id)}
                                                            className="bg-zinc-800 group-hover:bg-zinc-900 p-1 rounded-lg border border-transparent hover:border-red-500 faster-animation"
                                                            preserveScroll
                                                        >
                                                            <TrashIcon className="size-6 text-red-500" />
                                                        </button>
{/*
                                                        <Link
                                                            as="button"
                                                            method="DELETE"
                                                            href={route("notifications.destroy", notification.id )}
                                                            className="bg-zinc-800 group-hover:bg-zinc-900 p-1 rounded-lg border border-transparent hover:border-red-500 faster-animation"
                                                            preserveScroll
                                                        >
                                                            <TrashIcon className="size-6 text-red-500" />
                                                        </Link> */}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <div className="mt-5 pt-5">
                                    <Pagination
                                        links={notifications.meta}
                                    />
                                </div>
                            </>
                        ) : (
                            <ResetFilters
                                href={route("notifications.index")}
                            >
                                Nebyly nalezeny žádné notifikace.
                            </ResetFilters>
                        )}
                    </div>
                </section>
            </div>
        </AdminLayout>
    );
}
