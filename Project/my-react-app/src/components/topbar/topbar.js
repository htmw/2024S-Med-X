import React, { useRef } from 'react';
import SearchIcon from '../img/icons/search.png';
import NotificationIcon from '../img/icons/nbell.png';
import ProfileIcon from '../img/Profile.png';
import ChevronIcon from '../img/icons/chevron.svg';

const Topbar = () => {
    const searchInputRef = useRef(null);

    const handleSearchIconClick = () => {
        // Focus on the search input field when the search icon is clicked
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    };

    return (
        <div className="flex justify-between items-center p-3 gap-2.5 h-[90px]">
            <div className="flex flex-col justify-start items-start gap-2.5 flex-grow flex-shrink flex-basis-0 self-stretch">
                <div className="inline-flex justify-between items-center p-5 bg-neutral-900 rounded-[5px] h-full w-full">
                    <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Search"
                        className="text-zinc-300 text-opacity-30 text-base font-normal font-['Inter'] bg-transparent border-none outline-none focus:placeholder:text-primary"
                    />
                    <div className="relative w-[25px] h-[25px]" onClick={handleSearchIconClick}>
                        <img src={SearchIcon} alt="Search" />
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center gap-2.5 bg-neutral-900 rounded-[5px] h-full p-2.5">
                <div className="inline-flex justify-center items-center w-[50px] h-[50px]">
                    <img src={NotificationIcon} alt="Notification" />
                </div>
            </div>
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
        </div>
    );
};

export default Topbar;
