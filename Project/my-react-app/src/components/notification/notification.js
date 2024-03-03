import React from 'react'
//import NotificationIcon from '../img/icons/nbell.png';
import { IoIosNotifications } from "react-icons/io";

const Notification = () => {
  return (
        <div className="flex justify-center items-center gap-2.5 bg-neutral-900 rounded-full h-full p-2.5">
                <div className="inline-flex justify-center items-center w-[50px] h-[50px]">
                <IoIosNotifications style={{ fontSize: '30px', color: 'white' }}/>
                </div>
            </div>
  )
}
export default Notification 
