import React from 'react'
import {
    EditButton,
    ShowButton,
} from '@/Components/Buttons/ActionButtons';

const ChildrensTable = (childrens) => {
    return (
        <table className="min-w-full divide-y divide-zinc-700 rounded-lg overflow-hidden">
            <thead className="bg-zinc-800 text-nowrap">
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

            <tbody className="divide-y divide-zinc-800 bg-zinc-700">
                {childrens.childrens && childrens.childrens.map((group, index) => {
                    return (
                        <tr
                            key={index}
                            className="group text-white transition-colors duration-200 hover:bg-zinc-800"
                        >
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
                                    <EditButton href={route("git-groups.edit", group.group_id)} />
                                    {/* <ShowButton href={route("git-groups.show", group.group_id)} /> */}
                                </div>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    )
}

const RepositoriesTable = (repositories) => {
    return (
        <table className="min-w-full divide-y divide-zinc-700 rounded-lg overflow-hidden">
            <thead className="bg-zinc-800 text-nowrap">
                <tr>
                    <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400"
                    >
                        Repository ID
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
                        slug
                    </th>

                    <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-center text-zinc-400"
                    >
                        repository_url
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

            <tbody className="divide-y divide-zinc-800 bg-zinc-700">
                {repositories.repositories && repositories.repositories.map((repository) => {
                    return (
                        <tr
                            key={repository.repository_id}
                            className="group text-white transition-colors duration-200 hover:bg-zinc-800"
                        >
                            <td className="px-4 py-4">
                                <span className="text-sm font-medium text-zinc-200">
                                    {repository.repository_id}
                                </span>
                            </td>

                            <td className="px-4 py-4">
                                <span className="text-sm font-medium text-zinc-200">
                                    {repository.name}
                                </span>
                            </td>

                            <td className="px-4 py-4">
                                <span className="text-sm font-medium text-zinc-200">
                                    {repository.slug}
                                </span>
                            </td>

                            <td className="px-4 py-4 text-center">
                                <a
                                    href={repository.repository_url}
                                    target="_blank"
                                    className="text-sm font-medium text-zinc-200 hover:underline"
                                >
                                    {repository.repository_url}
                                </a>
                            </td>

                            <td className="px-4 py-4">
                                <div className="flex space-x-2">
                                    <EditButton href={route("repositories.edit", repository.repository_id)} />
                                    <ShowButton href={route("repositories.show", repository.repository_id)} />
                                </div>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    )
}



export { ChildrensTable, RepositoriesTable }
