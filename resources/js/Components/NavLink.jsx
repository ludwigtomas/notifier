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
                'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-sky-500 text-white focus:border-sky-700 '
                    : 'border-transparent text-gray-300 hover:text-white hover:border-sky-400 focus:text-white focus:border-sky-400 ') +
                className
            }
        >
            {children}
        </Link>
    );
}
