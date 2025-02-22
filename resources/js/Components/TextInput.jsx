import { forwardRef, useEffect, useRef } from 'react'

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef()

    useEffect(() => {
        if (isFocused) {
            input.current.focus()
        }
    }, [])

    return (
        <input
            {...props}
            type={type}
            className={
                'rounded-md border-2 border-zinc-500 bg-zinc-700 text-zinc-200 shadow-sm focus:border-sky-500 focus:ring-sky-500 ' +
                className
            }
            ref={input}
        />
    )
})
