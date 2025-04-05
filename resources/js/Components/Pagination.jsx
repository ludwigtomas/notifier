import React from 'react'
import { Link } from '@inertiajs/react'

export default function Pagination({ links }) {
    function getClassName(active) {
        return active
            ? 'px-4 py-3 text-sm leading-4 text-sky-500 rounded bg-zinc-800 ring-2 ring-sky-500'
            : 'px-4 py-3 text-sm leading-4 text-gray-400 rounded bg-zinc-800 ring-2 ring ring-zinc-700 hover:text-sky-500 hover:ring-sky-500'
    }

    function preserveQueryParams(url) {
        if (!url) return url

        const relation_param = route().params?.relation

        if (!relation_param) {
            return url
        }

        // Parse the target URL
        const targetUrl = new URL(url, window.location.origin)

        // Add relation parameter to the target URL
        targetUrl.searchParams.set('relation', relation_param)

        // Return the combined URL
        return targetUrl.toString()
    }

    return (
        <section className="flex flex-col items-center justify-center">
            <div className="card">
                <div className="text-center">
                    <span className="text-sm text-gray-400">
                        Zobrazeno
                        <span className="font-medium"> {links.from} </span>
                        až
                        <span className="font-medium"> {links.to} </span>z<span className="font-medium"> {links.total} </span>
                        výsledků
                    </span>
                </div>

                <div className="mt-2 flex flex-wrap space-x-2">
                    {links.links.map((link, key) => (
                        <Link
                            key={key}
                            className={getClassName(link.active)}
                            href={preserveQueryParams(link.url)}
                            preserveState
                            preserveScroll
                            dangerouslySetInnerHTML={{
                                __html:
                                    link.label === 'pagination.next'
                                        ? 'Další'
                                        : link.label === 'pagination.previous'
                                          ? 'Předchozí'
                                          : link.label,
                            }}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
