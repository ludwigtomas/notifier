export default function PrimaryButton({ className = '', disabled, typeOfButton, children, ...props }) {
    let buttonColor = 'bg-gray-800 hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900'

    if (typeOfButton === 'submit') {
        buttonColor = 'bg-green-500 hover:bg-green-600 focus:bg-green-600 active:bg-green-700'
    }

    return (
        <button
            {...props}
            className={
                `${buttonColor} inline-flex items-center rounded-md border border-transparent px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    )
}
