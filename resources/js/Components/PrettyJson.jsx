import { forwardRef, useEffect, useRef } from 'react'

export default forwardRef(function PrettyJson({ value, className = '' }, ref) {
    const input = ref ? ref : useRef()

    return (
        <pre
            ref={input}
            className={`overflow-auto rounded-lg bg-gray-800 p-4 text-gray-100 ${className}`}
        >
            {JSON.stringify(value, null, 2)}
        </pre>
    )
})
