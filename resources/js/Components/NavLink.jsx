import { Link } from "@inertiajs/react";

export default function NavLink({
    active = false,
    className = "",
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'border h-12 flex items-center px-2 relative size-20 rounded-xl  ' +
                (active
                    ? 'bg-zinc-700 border-white/45 before:rounded-[11px] before:absolute before:inset-0 before:border-t before:border-white/30 before:shadow before:shadow-zinc-700 text-white '
                    : 'text-gray-300 border-transparent ') +
                className
            }
        >
            {children}
        </Link>
    );
}
