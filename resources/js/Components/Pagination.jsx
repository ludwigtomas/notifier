import React from "react";
import { Link } from "@inertiajs/react";

export default function Pagination({ links }) {
    function getClassName(active) {
        return active
            ? "px-4 py-3 text-sm leading-4 text-sky-500 rounded bg-zinc-900 ring-2 ring-sky-500"
            : "px-4 py-3 text-sm leading-4 text-gray-400 rounded bg-zinc-900 ring-2 ring ring-zinc-700";
    }

    return (
        <div className="mb-4">
            <div className="flex flex-wrap mt-8 space-x-2">
                {links.links.map((link, key) =>
                    link.url === null ? (
                        <div className="px-4 py-3 text-sm leading-4 text-gray-500 border rounded">
                            {link.label}
                        </div>
                    ) : (
                        <Link
                            className={getClassName(link.active)}
                            href={link.url}
                        >
                            {link.label}
                        </Link>
                    )
                )}
            </div>
        </div>
    );
}
