import React from 'react'

function Title({children, className=""}) {
  return (
    <h3 className={`text-textSecondary w-fit text-wrap ${className}`}>{children}</h3>
  )
}

export default Title
