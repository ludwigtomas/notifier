import React from 'react'
import { PencilSquareIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline'
import { Link } from '@inertiajs/react'

const EditButton = ({ className = '', disabled, typeOfButton, ...props }) => {
    let buttonColor = 'bg-green-100 hover:bg-green-200 focus:bg-green-300 active:bg-green-300'

    return (
        <Link
            {...props}
            className={
                `${buttonColor} inline-flex items-center rounded-md border border-transparent p-1.5 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            <PencilSquareIcon className="size-6 text-green-500" />
        </Link>
    )
}

const BackButton = ({ className = '', disabled, typeOfButton, children, ...props }) => {
    let buttonColor = 'bg-gray-700 hover:bg-blue-200 focus:bg-blue-300 active:bg-blue-300'

    return (
        <Link
            {...props}
            className={
                `${buttonColor} inline-flex items-center rounded-md border border-transparent px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </Link>
    )
}

const ShowButton = ({ className = '', disabled, typeOfButton, ...props }) => {
    let buttonColor = 'bg-blue-100 hover:bg-blue-200 focus:bg-blue-300 active:bg-blue-300'

    return (
        <Link
            {...props}
            className={
                `${buttonColor} inline-flex items-center rounded-md border border-transparent p-1.5 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            <EyeIcon className="size-6 text-blue-500" />
        </Link>
    )
}

const DeleteButton = ({ className = '', disabled, typeOfButton, ...props }) => {
    let buttonColor = 'bg-red-100 hover:bg-red-200 focus:bg-red-300 active:bg-red-300'

    return (
        <Link
            {...props}
            className={
                `${buttonColor} inline-flex items-center rounded-md border border-transparent p-1.5 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            <TrashIcon className="size-6 text-red-500" />
        </Link>
    )
}

const ActionButton = ({
    className = '',
    elementType = 'button',
    elementAction = 'show',
    showIcon = true,
    disabled = false,
    children,
    ...props
}) => {
    let buttonColor = 'bg-gray-800 hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900'

    switch (elementAction) {
        case 'show':
            buttonColor = 'bg-sky-500 hover:bg-sky-600'
            break

        case 'delete':
            buttonColor = 'bg-red-500 hover:bg-red-600 focus:bg-red-600 active:bg-red-700'
            break

        case 'edit':
            buttonColor = 'bg-green-700 hover:bg-green-600 focus:bg-green-600 active:bg-green-700'
            break

        case 'update':
            buttonColor = 'bg-green-700 hover:bg-green-600 focus:bg-green-600 active:bg-green-700'
            break

        case 'back':
            buttonColor = 'bg-gray-700 hover:bg-gray-600 focus:bg-gray-600 active:bg-gray-800'
            break
        default:
            buttonColor = 'bg-gray-800 hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900'
    }

    return (
        <>
            {elementType === 'link' && (
                <Link
                    {...props}
                    className={
                        `${buttonColor} inline-flex items-center rounded-md px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out ${disabled && 'opacity-25'} ` +
                        className
                    }
                    disabled={disabled}
                >
                    {showIcon && (
                        <>
                            {elementAction === 'show' && <EyeIcon className="size-4 text-white" />}
                            {elementAction === 'delete' && <TrashIcon className="size-4 text-white" />}
                            {elementAction === 'edit' && <PencilSquareIcon className="size-4 text-white" />}
                            {elementAction === 'update' && <PencilSquareIcon className="size-4 text-white" />}
                        </>
                    )}

                    {children}
                </Link>
            )}

            {elementType === 'button' && (
                <button
                    {...props}
                    className={
                        `${buttonColor} inline-flex items-center rounded-md border border-transparent px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out ${disabled && 'opacity-25'} ` +
                        className
                    }
                    disabled={disabled}
                >
                    {showIcon && (
                        <>
                            {elementAction === 'show' && <EyeIcon className="size-4 text-white" />}
                            {elementAction === 'delete' && <TrashIcon className="size-4 text-white" />}
                            {elementAction === 'edit' && <PencilSquareIcon className="size-4 text-white" />}
                            {elementAction === 'update' && <PencilSquareIcon className="size-4 text-white" />}
                        </>
                    )}

                    <span className={children && showIcon ? 'ml-2' : ''}>{children}</span>
                </button>
            )}
        </>
    )
}

export { BackButton, EditButton, ShowButton, DeleteButton, ActionButton }
