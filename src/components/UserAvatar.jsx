import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from '@fortawesome/free-solid-svg-icons';
function UserAvatar({size}) {
  return (
    <div className='hover:cursor-pointer w-fit'>
      <FontAwesomeIcon size={`${size}`} icon={faUser} className='text-textPrimary' />
    </div>
  )
}

export default UserAvatar
