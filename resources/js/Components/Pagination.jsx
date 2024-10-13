import React from "react";
import { Link } from "@inertiajs/react";

export default function Pagination({ links }) {
    function getClassName(active) {
        return active
            ? "px-4 py-3 text-sm leading-4 text-sky-500 rounded bg-zinc-800 ring-2 ring-sky-500"
            : "px-4 py-3 text-sm leading-4 text-gray-400 rounded bg-zinc-800 ring-2 ring ring-zinc-700 hover:text-sky-500 hover:ring-sky-500";
    }

    return (
        <section className="flex flex-col items-center justify-center">
            <div className="card">
                <div className="text-center">
                    <span className="text-sm text-gray-400">
                        Zobrazeno
                        <span className="font-medium"> {links.from} </span>
                        až
                        <span className="font-medium"> {links.to} </span>
                        z
                        <span className="font-medium"> {links.total} </span>
                        výsledků
                    </span>
                </div>

                <div className="flex flex-wrap mt-2 space-x-2">
                    {links.links.map((link, key) => (
                        <Link
                            key={key}
                            className={getClassName(link.active)}
                            href={link.url}
                            dangerouslySetInnerHTML={{ __html:
                                link.label === 'pagination.next'
                                    ? 'Další'
                                    : link.label === 'pagination.previous'
                                        ? 'Předchozí'
                                        : link.label
                            }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
