import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
    PencilSquareIcon,
    ChevronRightIcon,
    FireIcon,
    EyeSlashIcon,
    EyeIcon,
    ArchiveBoxIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { EditButton } from '@/Components/Buttons/ActionButtons';


export default function Index({ auth, git_groups, group_details }) {
    const [selectedGroup, setSelectedGroup] = useState();
    const [selectedGroupType, setSelectedGroupType] = useState();
    const [groupDetails, setGroupDetails] = useState();


    const handleSelectGroup = (group, type) => {
        setSelectedGroup(group);
        setSelectedGroupType(type);
    }

    useEffect(() => {
        if (selectedGroup) {
            let url = route('git-groups.index');

            axios.get(url, {
                params: {
                    group_id: selectedGroup.group_id
                }
            })
            .then(response => {
                setGroupDetails(response.data);
            })
            .catch(error => {
                alert('Error: ' + error);
            });
        }
    }, [selectedGroup]);


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
            <Head title="Gits Index" />

            <div className="sm:px-6 lg:px-8 relative">
                <section className="bg-zinc-900 overflow-hidden shadow-sm sm:rounded-3xl ">
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
                                        className="group relative p-8 pb-20 space-y-3 border-2 bg-zinc-800 hover:border-zinc-600 border-zinc-700 rounded-xl overflow-hidden"
                                    >
                                        <div className="flex items-center justify-center space-x-4">
                                            <span className="inline-block">
                                                <FireIcon className="size-8 text-sky-500" />
                                            </span>

                                            <h2 className="text-3xl font-semibold capitalize text-white">
                                                { group.name }
                                            </h2>
                                        </div>

                                        <div className="bg-white/5 rounded-xl py-2 overflow-hidden">
                                            <div className="grid grid-cols-2 place-items-center">
                                                <div className="text-center">
                                                    <p className="text-lg font-bold text-zinc-200">
                                                        { group.childrens_count }
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

                                        <div className="absolute right-0 bottom-0 grid grid-cols-2 place-items-center w-full ">
                                            <div className="grid grid-cols-2 place-items-center w-full h-full">
                                                <button
                                                    className={"flex justify-center items-center w-full h-full " + (selectedGroup && selectedGroup.group_id === group.group_id ? 'bg-green-950 hover:bg-green-900' : 'bg-red-950 hover:bg-red-900')}
                                                    onClick={() => setSelectedGroup(group, 'repositories')}
                                                >
                                                    { selectedGroup && selectedGroup.group_id === group.group_id ? (
                                                        <EyeIcon className="size-8 text-green-500"/>
                                                    ) : (
                                                        <EyeSlashIcon className="size-8 text-red-500"/>
                                                    )}
                                                </button>

                                                <button
                                                    className={"flex justify-center items-center w-full h-full " + (selectedGroup && selectedGroup.group_id === group.group_id ? 'bg-green-950 hover:bg-green-900' : 'bg-red-950 hover:bg-red-900')}
                                                    onClick={() => setSelectedGroup(group, 'childrens')}
                                                >
                                                    { selectedGroup && selectedGroup.group_id === group.group_id ? (
                                                        <EyeIcon className="size-8 text-green-500"/>
                                                    ) : (
                                                        <EyeSlashIcon className="size-8 text-red-500"/>
                                                    )}
                                                </button>
                                            </div>

                                            <button className="p-2 w-full flex justify-center bg-sky-950 hover:bg-sky-900">
                                                <PencilSquareIcon className="size-8 text-sky-500"/>
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {console.log(groupDetails)}

                    {groupDetails && groupDetails.childrens.length > 0 ? (
                        <div>
                            <div className="px-6 pt-6 text-center">
                                <h1 className="text-2xl font-semibold capitalize lg:text-3xl dark:text-white">
                                    {groupDetails.name}
                                </h1>
                            </div>

                            <div className="border-4 border-zinc-900 divide-y divide-zinc-800 ">
                                <table className="min-w-full divide-y divide-zinc-700 rounded-md overflow-hidden">
                                    <thead className="bg-zinc-950">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400"
                                            >
                                                Group ID
                                            </th>

                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400"
                                            >
                                                Name
                                            </th>

                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400"
                                            >
                                                url
                                            </th>

                                            <th
                                                scope="col"
                                                className="px-4 py-3.5 text-sm font-normal text-center text-zinc-400"
                                            >
                                                Parent
                                            </th>

                                            <th
                                                scope="col"
                                                className="relative py-3.5 px-4"
                                            >
                                                <span className="sr-only">
                                                    Edit
                                                </span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-zinc-700 bg-zinc-900">
                                        {groupDetails && groupDetails.childrens.map((group) => {
                                            return (
                                            <tr key={group.group_id}>
                                                <td className="px-4 py-4">
                                                    <span className="text-sm font-medium text-zinc-200">
                                                        {group.group_id}
                                                    </span>
                                                </td>

                                                <td className="px-4 py-4">
                                                    <span className="text-sm font-medium text-zinc-200">
                                                        {group.name}
                                                    </span>
                                                </td>

                                                <td className="px-4 py-4">
                                                    <a
                                                        href={group.web_url}
                                                        target="_blank"
                                                        className="text-sm font-medium text-zinc-200 hover:underline"
                                                    >
                                                        {group.web_url}
                                                    </a>
                                                </td>

                                                <td className="px-4 py-4 ">
                                                    <span className={`flex justify-center uppercase text-sm py-1 rounded-xl font-bold ${group.parent_id ? "text-red-800 bg-red-100" : "text-green-800 bg-green-100"}`}>
                                                        {group.parent_id ? 'children - ' + group.parent_id : "parent"}
                                                    </span>
                                                </td>

                                                <td className="px-4 py-4">
                                                    <div className="flex space-x-2">
                                                        <EditButton href={route("git-groups.edit", group.group_id)}/>
                                                    </div>
                                                </td>
                                            </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ): (
                        <div className="py-5 absolute left-1/2 -translate-x-1/2">
                            <h3 className="text-xl font-semibold text-zinc-200">
                                No data available
                            </h3>
                        </div>
                    )}
                </section>
            </div>
        </AuthenticatedLayout>
    );
}
