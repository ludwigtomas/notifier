import React from "react";

import { Head, Link } from "@inertiajs/react";
import {
    PencilSquareIcon,
    TrashIcon,
    EyeIcon,
    EyeSlashIcon,
    PlusIcon,
    XMarkIcon,
    ChevronRightIcon,
    CircleStackIcon,
    CalendarDaysIcon,
    UserIcon,
    UsersIcon,
    ArrowDownTrayIcon,
    ShieldCheckIcon,
    CodeBracketIcon,
    ClipboardIcon,
    PlayPauseIcon,
} from "@heroicons/react/24/outline";
export default function RepositoryClientsTable({ repository }) {
    return (
        <div>
            client table
        </div>
        // <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        //     <div className="mt-10 border-4 border-zinc-900 divide-y rounded-lg divide-zinc-800">
        //         <table className="min-w-full divide-y divide-zinc-700 rounded-md overflow-hidden">
        //             <thead className="bg-zinc-950">
        //                 <tr>
        //                     <th
        //                         scope="col"
        //                         className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400"
        //                     >
        //                         Jméno
        //                     </th>

        //                     <th
        //                         scope="col"
        //                         className="px-12 py-3.5 text-sm font-normal text-left text-zinc-400"
        //                     >
        //                         E-mail
        //                     </th>

        //                     <th
        //                         scope="col"
        //                         className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400"
        //                     >
        //                         Telefon
        //                     </th>

        //                     <th
        //                         scope="col"
        //                         className="px-4 py-3.5 text-sm font-normal text-left text-zinc-400"
        //                     >
        //                         ICO
        //                     </th>

        //                     <th scope="col" className="relative py-3.5 px-4">
        //                         <span className="sr-only">Edit</span>
        //                     </th>
        //                 </tr>
        //             </thead>

        //             <tbody className="divide-y divide-zinc-700 bg-zinc-900">
        //                 {repository.relationships.clients.map((client) => (
        //                     <tr className="group hover:bg-zinc-800">
        //                         <td className="px-4 py-4 ">
        //                             <span className="text-sm font-medium text-zinc-400">
        //                                 {client.name}
        //                             </span>
        //                         </td>

        //                         <td className="px-4 py-4 ">
        //                             <span className="text-sm font-medium text-zinc-400">
        //                                 {client.email}
        //                             </span>
        //                         </td>

        //                         <td className="px-4 py-4 ">
        //                             <span className="text-sm font-medium text-zinc-400">
        //                                 {client.phone}
        //                             </span>
        //                         </td>

        //                         <td className="px-4 py-4 ">
        //                             <span className="text-sm font-medium text-zinc-400">
        //                                 {client.ico === null
        //                                     ? ``
        //                                     : `${client.ico} `}
        //                             </span>
        //                         </td>

        //                         <td className="px-4 py-4 text-sm whitespace-nowrap">
        //                             <Link
        //                                 as="button"
        //                                 method="delete"
        //                                 preserveScroll
        //                                 className="bg-zinc-800 group-hover:bg-zinc-900 p-1 rounded-lg border border-transparent hover:border-green-500 faster-animation"
        //                             >
        //                                 <PlusIcon className="w-6 h-6 text-green-500" />
        //                             </Link>
        //                         </td>
        //                     </tr>
        //                 ))}
        //             </tbody>
        //         </table>
        //     </div>
        // </div>
    );
}
