import React from 'react'
import "./notFound.css"
import { MdOutlineRunningWithErrors } from "react-icons/md";

const NotFound = () => {
  return (
    <div className='notFoundBody'>
        <p>PAGE NOT FOUND</p>
        <div><MdOutlineRunningWithErrors /></div>
    </div>
  )
}

export default NotFound