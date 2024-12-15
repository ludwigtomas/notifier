import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function PrettyJson({ value, className = '' }, ref) {
    const input = ref ? ref : useRef();

    return (
        <pre
            ref={input}
            className={`bg-gray-800 text-gray-100 p-4 rounded-lg overflow-auto ${className}`}
        >
            {JSON.stringify(value, null, 2)}
        </pre>
    );
});
