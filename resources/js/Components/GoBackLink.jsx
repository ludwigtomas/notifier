import { Link } from '@inertiajs/react'

export default function GoBackLink({ className = '', disabled, children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center rounded-md border border-transparent bg-zinc-600 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-zinc-500 focus:bg-zinc-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 active:bg-zinc-400 ' +
                className
            }
        >
            {children}
        </Link>
    )
}
