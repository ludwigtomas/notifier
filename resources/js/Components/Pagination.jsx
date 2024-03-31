import React from "react";
import { Link } from "@inertiajs/react";

export default function Pagination({ links }) {
    function getClassName(active) {
        return active
            ? "px-4 py-3 text-sm leading-4 text-sky-500 rounded bg-zinc-900 ring-2 ring-sky-500"
            : "px-4 py-3 text-sm leading-4 text-gray-400 rounded bg-zinc-900 ring-2 ring ring-zinc-700 hover:text-sky-500 hover:ring-sky-500";
    }

    return (
        <div className="mb-4">

            <div>

                <span className="text-sm text-gray-400">
                    Showing
                    <span className="font-medium"> {links.from} </span>
                    to
                    <span className="font-medium"> {links.to} </span>
                    of
                    <span className="font-medium"> {links.total} </span>
                    results
                </span>
            </div>

            <div className="flex flex-wrap mt-8 space-x-2">
                {links.links.map((link, key) => (
                    <Link
                        key={key}
                        className={getClassName(link.active)}
                        href={link.url}
                        preserveScroll
                        dangerouslySetInnerHTML={{ __html: link.label === 'pagination.next' ? 'Next' : link.label === 'pagination.previous' ? 'Previous' : link.label}}
                    />
                ))}
            </div>
        </div>
    );
}
