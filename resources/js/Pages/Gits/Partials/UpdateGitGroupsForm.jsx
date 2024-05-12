import React from "react";

export default function ({ git, className = "" }) {
    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-zinc-100">
                    Git groups update
                </h2>

                <p className="mt-1 text-sm text-zinc-400">
                    Update your git groups.
                </p>
            </header>
        </section>
    )
}
