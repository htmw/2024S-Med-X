import React from 'react'

import Footer from "../footer/footer";
import Topbar from "../topbar/topbar";
import Dashboard from "../../pages/dashboard";
import Report from "../../pages/report"
import Medexer from '../../pages/medexer';
import { Routes, Route} from 'react-router-dom';

export const Submain = () => {
    return (
        <div className="h-screen w-full flex flex-col">
            <Topbar />
            <Routes> {/* Wrap Routes around your Routes */}
                <Route path="/dashboard" element={<Dashboard />} /> 
                <Route path="/medexer" element={<Medexer />} /> 
                <Route path="/report" element={<Report />} /> 
            </Routes>
            <Footer />
        </div>
    );
};

export default Submain;