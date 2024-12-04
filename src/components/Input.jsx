
import { forwardRef, useId } from 'react'

// only can send refrence from parent if using forwardRef, this is used for controlling the element from parent 
const Input = forwardRef(function Input({
    label,
    type="text",
    className="",
    ...props
}, ref){

    const id = useId();
    return (
        <div className='w-full'>
            {/* if level is there only then create label */}
            {label && 
            <label htmlFor={id} className='inline-block'>
                {label}
            </label>}
            <input 
            id={id}
            type={type}
            className={`outline-none text-textPrimary  px-2 bg-inherit ${className}`}
            // now this input can be controlled from parent by sending ref
            ref={ref}
            {...props}
            />
        </div>
    )
})

export default Input