import { Link } from "@inertiajs/react";

export default function GoBackLink({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center px-4 py-2 bg-zinc-600 border border-transparent rounded-md font-bold text-xs text-white uppercase tracking-widest hover:bg-zinc-500 focus:bg-zinc-400 active:bg-zinc-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition ease-in-out duration-150 ' + className
            }
        >
            {children}
        </Link>
    );
}
