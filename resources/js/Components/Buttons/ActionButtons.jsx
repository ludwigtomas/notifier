import React from "react";
import {
    PencilSquareIcon,
    TrashIcon,
    EyeIcon,
} from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";

const EditButton = ({
    className = "",
    disabled,
    typeOfButton,
    ...props
}) => {
    let buttonColor = "bg-green-100 hover:bg-green-200 focus:bg-green-300 active:bg-green-300";

    return (
        <Link
            {...props}
            className={
                `${buttonColor} inline-flex items-center p-1.5 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest transition ease-in-out duration-150 ${
                    disabled && "opacity-25"
                } ` + className
            }
            disabled={disabled}
        >
            <PencilSquareIcon className="size-6 text-green-500" />
        </Link>
    );
};

const BackButton = ({
    className = "",
    disabled,
    typeOfButton,
    children,
    ...props
}) => {
    let buttonColor = "bg-gray-700 hover:bg-blue-200 focus:bg-blue-300 active:bg-blue-300";

    return (
        <Link
            {...props}
            className={
                `${buttonColor} inline-flex items-center px-4 py-2 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest transition ease-in-out duration-150 ${
                    disabled && "opacity-25"
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </Link>
    );
};

const ShowButton = ({
    className = "",
    disabled,
    typeOfButton,
    ...props
}) => {
    let buttonColor = "bg-blue-100 hover:bg-blue-200 focus:bg-blue-300 active:bg-blue-300";

    return (
        <Link
            {...props}
            className={
                `${buttonColor} inline-flex items-center p-1.5 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest transition ease-in-out duration-150 ${
                    disabled && "opacity-25"
                } ` + className
            }
            disabled={disabled}
        >
            <EyeIcon className="size-6 text-blue-500" />
        </Link>
    );
};

const DeleteButton = ({
    className = "",
    disabled,
    typeOfButton,
    ...props
}) => {
    let buttonColor = "bg-red-100 hover:bg-red-200 focus:bg-red-300 active:bg-red-300";

    return (
        <Link
            {...props}
            className={
                `${buttonColor} inline-flex items-center p-1.5 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest transition ease-in-out duration-150 ${
                    disabled && "opacity-25"
                } ` + className
            }
            disabled={disabled}
        >
            <TrashIcon className="size-6 text-red-500" />
        </Link>
    );
};


const ActionButton = ({
    className = "",
    disabled,
    typeOfButton,
    children,
    ...props
}) => {

    let buttonColor = "bg-gray-800 hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900";

    if (typeOfButton === "show") {
        buttonColor = "bg-blue-500 hover:bg-blue-600 focus:bg-blue-600 active:bg-blue-700";
    }

    if (typeOfButton === "delete") {
        buttonColor = "bg-red-500 hover:bg-red-600 focus:bg-red-600 active:bg-red-700";
    }

    if(typeOfButton === "edit") {
        buttonColor = "bg-green-500 hover:bg-green-600 focus:bg-green-600 active:bg-green-700";
    }

    return (
        <button
            {...props}
            className={
                `${buttonColor} inline-flex items-center px-4 py-2 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest transition ease-in-out duration-150 ${
                    disabled && "opacity-25"
                } ` + className
            }
            disabled={disabled}
        >

            {/* icons depending on typeOfButton */}
            {typeOfButton === "show" && <EyeIcon className="w-6 h-6 text-white" />}
            {typeOfButton === "delete" && <TrashIcon className="w-6 h-6 text-white" />}
            {typeOfButton === "edit" && <PencilSquareIcon className="w-6 h-6 text-white" />}

            {children}
        </button>
    );
};


export { BackButton, EditButton, ShowButton, DeleteButton, ActionButton };
