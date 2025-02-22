import { Link } from '@inertiajs/react'

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'relative flex h-12 items-center rounded-xl border px-4 hover:bg-zinc-800 ' +
                (active
                    ? 'border-white/45 bg-zinc-700 text-white before:absolute before:inset-0 before:rounded-[11px] before:border-t before:border-white/30 before:shadow before:shadow-zinc-700'
                    : 'border-transparent text-gray-300') +
                className
            }
        >
            {children}
        </Link>
    )
}
