import React from "react";
import { Link } from "@inertiajs/react";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function ResetFilters ({href, children, className = ""}) {
    return (
        <section className={"card " + (className)}>
            <div className="col-span-3 p-4 text-center text-zinc-400">
                <TrashIcon className="size-8 mx-auto" />

                <p className="text-lg font-semibold">
                    {children}
                </p>

                <div className="mt-6">
                    <Link
                        href={href}
                        className="bg-zinc-800 px-4 py-2 rounded-md border border-zinc-700 hover:border-red-500 text-red-400 transition ease-in-out duration-150"
                    >
                        Zrušit filtry
                    </Link>
                </div>
            </div>
        </section>
    );
};
