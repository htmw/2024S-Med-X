import Footer from "../footer/footer";

import React from 'react';
import Topbar from "../topbar/topbar";
import Dashboard from "../../pages/dashboard";

const Submain = () => {
    return (
        <div className="h-screen w-full flex flex-col">
            <Topbar/>
             <Dashboard/>
            <Footer/>
        </div>
    );
};

export default Submain;
