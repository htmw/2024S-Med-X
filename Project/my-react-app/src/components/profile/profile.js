import React from 'react'
import ProfileIcon from '../img/Profile.png';
import ChevronIcon from '../img/icons/chevron.svg';

const Profile = () => {
    return (
        <div className="flex justify-start items-center gap-2.5 h-full rounded-[5px] bg-primary  p-2.5 ">
            <div className="flex justify-start items-center gap-2.5 flex-grow flex-shrink flex-basis-0 self-stretch">
                <div className=" bg-opacity-30 rounded-full shadow-inner overflow-hidden h-full w-[45px]">
                    <img src={ProfileIcon} className="object-cover w-full h-full bg-blend-overlay bg-primary" alt="Profile" />
                </div>
                <div />
                <img src={ChevronIcon} className="h-5 w-5" alt="Chevron" />
                <div />
            </div>
        </div>
    )
}

export default Profile
