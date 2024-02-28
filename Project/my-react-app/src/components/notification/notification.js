import React from 'react'
import NotificationIcon from '../img/icons/nbell.png';

const Notification = () => {
  return (
        <div className="flex justify-center items-center gap-2.5 bg-neutral-900 rounded-[5px] h-full p-2.5">
                <div className="inline-flex justify-center items-center w-[50px] h-[50px]">
                    <img src={NotificationIcon} alt="Notification" />
                </div>
            </div>
  )
}
export default Notification
