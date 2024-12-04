import React from 'react'

function Button({children, bgColor, textColor, className="", ...props}) {
  return (
    <button className={`rounded-full px-4 py-1 flex items-center justify-between gap-x-2  ${bgColor} ${textColor} ${className}`} {...props}>
      {children}
    </button>
  )
}

export default Button
