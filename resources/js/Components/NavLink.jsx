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
                "inline-flex items-center px-1 pt-1  text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none hover:text-sky-500 " +
                (active ? " text-sky-500 " : "border-transparent text-white ") +
                className
            }
        >
            {children}
        </Link>
    );
}
