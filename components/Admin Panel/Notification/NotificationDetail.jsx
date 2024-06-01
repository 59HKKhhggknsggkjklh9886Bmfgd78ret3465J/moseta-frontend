import React from 'react'
import "./notificationDetail.css"

const NotificationDetail = ({notif, date}) => {
  return (
    <div className='notificationDetailBody'>
        <p className='notificationDetailContent'>{notif}</p>
        <div className='notificationDetailDate'>
            <p>{date}</p>
        </div>
    </div>
  )
}

export default NotificationDetail