export default function InputLabel({ isRequired, value, className = '', children, ...props }) {
    return (
        <label {...props} className={`block font-medium text-sm text-gray-400 ` + className}>
            {value ? value : children}
            {isRequired && <span className="text-red-500 ml-2">*</span>}
        </label>
    );
}
