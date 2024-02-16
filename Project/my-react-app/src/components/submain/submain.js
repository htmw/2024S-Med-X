import Footer from "../footer/footer";

import React from 'react';
import Topbar from "../topbar/topbar";
import Dashboard from "../../pages/dashboard";
import Medexer from "../../pages/medexer";

const Submain = () => {
    return (
        <div className="h-screen w-full flex flex-col">
            <Topbar/>
             {/* <Dashboard/> */}
             <Medexer/>
            <Footer/>
        </div>
    );
};

export default Submain;
