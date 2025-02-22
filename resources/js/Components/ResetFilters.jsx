import React from 'react'
import { Link } from '@inertiajs/react'
import { TrashIcon } from '@heroicons/react/24/outline'

export default function ResetFilters({ href, children, className = '' }) {
    return (
        <section className={'card ' + className}>
            <div className="col-span-3 p-4 text-center text-zinc-400">
                <TrashIcon className="mx-auto size-8" />

                <p className="text-lg font-semibold">{children}</p>

                <div className="mt-6">
                    <Link
                        href={href}
                        className="rounded-md border border-zinc-700 bg-zinc-800 px-4 py-2 text-red-400 transition duration-150 ease-in-out hover:border-red-500"
                    >
                        Zrušit filtry
                    </Link>
                </div>
            </div>
        </section>
    )
}
