
import { forwardRef, useId } from 'react'


const Input = forwardRef(function Input({
    label,
    type="text",
    className="",
    ...props
}, ref){

    const id = useId();
    return (
        <div className='w-full'>
            {label && 
            <label htmlFor={id} className='inline-block'>
                {label}
            </label>}
            <input 
            id={id}
            type={type}
            className={`outline-none text-textPrimary  px-2 bg-inherit ${className}`}
            ref={ref}
            {...props}
            />
        </div>
    )
})

export default Input