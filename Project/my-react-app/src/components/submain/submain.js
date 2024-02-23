import Footer from "../footer/footer";

import React from 'react';
import Topbar from "../topbar/topbar";
import Dashboard from "../../pages/dashboard";
import Medexer from "../../pages/medexer";
import { Routes, Route } from "react-router-dom";

const Submain = () => {
    return (
        <div className="h-screen w-full flex flex-col">
            <Topbar/>
             <Routes> 
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/medexer" element={<Medexer />} /> 
            </Routes>
            <Footer/>
        </div>
    );
};

export default Submain;
