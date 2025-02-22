export default function InputLabel({ isRequired, value, className = '', children, ...props }) {
    return (
        <label
            {...props}
            className={`block text-sm font-medium text-gray-400 ` + className}
        >
            {value ? value : children}
            {isRequired && <span className="ml-2 text-red-500">*</span>}
        </label>
    )
}
