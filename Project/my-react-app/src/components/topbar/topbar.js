import React from 'react';
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
