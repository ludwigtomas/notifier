import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import {
    PencilSquareIcon,
    ChevronRightIcon,
    FireIcon,
    EyeIcon,
    RocketLaunchIcon,
    UserGroupIcon,
    FolderOpenIcon,
} from "@heroicons/react/24/outline";
import {
    ChildrensTable,
    RepositoriesTable,
} from "@/Pages/GitGroups/Partials/GroupRelationshipsTable";
import TextInput from "@/Components/TextInput";
import debounce from "lodash/debounce";

export default function ({ auth, git_groups, group_details, filters }) {
    const [search, setSearch] = useState(filters.search || "");

    const debouncedSearch = debounce((value) => {
        setSearch(value);

        router.get(
            route("git-groups.index"),
            {
                search: value,
            },
            {
                preserveScroll: true,
                preserveState: true,
                replace: true,
            }
        );
    }, 500);

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
                        href={route("git-groups.index")}
                    >
                        Git groups
                    </Link>
                </header>
            }
        >
            <Head title="Gits Index" />

            <div className="sm:px-6 lg:px-8 relative">
                <div className="mx-auto w-96">
                    <TextInput
                        label="Hledat"
                        name="search"
                        placeholder="Hledat hlavní skupinu..."
                        type="text"
                        className="w-full"
                        onChange={(e) => debouncedSearch(e.target.value)}
                    />
                </div>

                <section className="mt-2 bg-zinc-900 overflow-hidden shadow-sm sm:rounded-3xl ">
                    <div className="p-6">
                        <div className="mb-2">
                            <h1 className="text-2xl font-semibold capitalize lg:text-3xl dark:text-white">
                                Git Groups Index
                            </h1>
                        </div>

                        <div className="grid grid-cols-1 gap-8 xl:gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {git_groups.map((group) => {
                                return (
                                    <div
                                        key={group.group_id}
                                        className="group relative p-8 pb-20 space-y-10 border-2  bg-zinc-800 hover:border-zinc-600 border-zinc-700 rounded-xl"
                                    >
                                        <div className="absolute left-1/2 -translate-x-1/2 top-0 bg-zinc-700 border-zinc-700 border-b-2 border-x-2 rounded-b-xl ">
                                            <span className="px-2 text-zinc-400">
                                                {group.group_id}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-center space-x-4">
                                            <span className="inline-block">
                                                <FireIcon className="size-8 text-sky-500" />
                                            </span>

                                            <h2 className="text-3xl font-semibold capitalize text-white">
                                                {group.name}
                                            </h2>
                                        </div>

                                        <div className="bg-white/5 rounded-xl py-2 overflow-hidden">
                                            <div className="grid grid-cols-2 place-items-center">
                                                <div className="text-center">
                                                    <p className="text-lg font-bold text-zinc-200">
                                                        {group.childrens_count}
                                                    </p>

                                                    <p className="text-xs text-zinc-400">
                                                        Podkategorie
                                                    </p>
                                                </div>

                                                <div className="text-center">
                                                    <p className="text-lg font-bold text-zinc-200">
                                                        { group.all_repositories_count }
                                                    </p>

                                                    <p className="text-xs text-zinc-400">
                                                        Repozitáře
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="absolute right-0 bottom-0 grid grid-cols-2 place-items-center w-full rounded-b-[0.65rem] overflow-hidden">
                                            <div className="grid grid-cols-2 place-items-center w-full h-full">
                                                <Link
                                                    className={
                                                        "flex justify-center items-center w-full h-full " +
                                                        (filters?.relationship ==
                                                            "childrens" &&
                                                        filters?.group_id ==
                                                            group.group_id
                                                            ? "bg-sky-950 hover:bg-sky-900"
                                                            : "bg-red-950 hover:bg-red-900")
                                                    }
                                                    preserveScroll
                                                    href={route( "git-groups.index",{
                                                            group_id: group.group_id,
                                                            relationship: "childrens",
                                                        }
                                                    )}
                                                >
                                                    <FolderOpenIcon
                                                        className={
                                                            "size-8 " +
                                                            (filters?.relationship ==
                                                                "childrens" &&
                                                            filters?.group_id ==
                                                                group.group_id
                                                                ? "text-sky-500"
                                                                : "text-red-500")
                                                        }
                                                    />
                                                </Link>

                                                <Link
                                                    className={
                                                        "flex justify-center items-center w-full h-full " +
                                                        (filters?.relationship ==
                                                            "repositories" &&
                                                        filters?.group_id ==
                                                            group.group_id
                                                            ? "bg-sky-950 hover:bg-sky-900"
                                                            : "bg-red-950 hover:bg-red-900")
                                                    }
                                                    href={route(
                                                        "git-groups.index",
                                                        {
                                                            group_id:
                                                                group.group_id,
                                                            relationship:
                                                                "repositories",
                                                        }
                                                    )}
                                                    preserveScroll
                                                >
                                                    <RocketLaunchIcon
                                                        className={
                                                            "size-8 " +
                                                            (filters?.relationship ==
                                                                "repositories" &&
                                                            filters?.group_id ==
                                                                group.group_id
                                                                ? "text-sky-500"
                                                                : "text-red-500")
                                                        }
                                                    />
                                                </Link>
                                            </div>

                                            <Link
                                                className="p-2 w-full flex justify-center bg-green-950 hover:bg-green-900"
                                                preserveScroll
                                                href={route(
                                                    "git-groups.edit",
                                                    group.group_id
                                                )}
                                            >
                                                <PencilSquareIcon className="size-8 text-green-500" />
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {group_details && group_details.length > 0 ? (
                        <div>
                            <div className="px-6 pt-6 text-center">
                                <h1 className="text-2xl font-semibold capitalize lg:text-3xl dark:text-white">
                                    {filters.relationship}
                                </h1>
                            </div>

                            <div className="border-4 border-zinc-900 divide-y divide-zinc-800 ">
                                {filters.relationship === "repositories" ? (
                                    <RepositoriesTable
                                        repositories={group_details}
                                    />
                                ) : (
                                    <ChildrensTable childrens={group_details} />
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="py-5 absolute left-1/2 -translate-x-1/2">
                            <h3 className="text-xl font-semibold text-zinc-200">
                                Select group to see details
                            </h3>
                        </div>
                    )}
                </section>
            </div>
        </AuthenticatedLayout>
    );
}
