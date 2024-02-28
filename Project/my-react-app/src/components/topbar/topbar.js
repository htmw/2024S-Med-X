import React, { useRef, useState } from 'react';
import SearchIcon from '../img/icons/search.png';
import NotificationIcon from '../img/icons/nbell.png';
import ProfileIcon from '../img/Profile.png';
import ChevronIcon from '../img/icons/chevron.svg';
import Searchbar from '../searchbar/searchbar.js';
import Notification from '../notification/notification.js';
import Profile from '../profile/profile.js';

const Topbar = () => {
    
    return (
        <div className="flex justify-between items-center p-3 gap-2.5 h-[90px]">
            <Searchbar />
            <Notification />
            <Profile />
        </div>
    );
};

export default Topbar;
