import React from 'react'

import Footer from "../footer/footer";
import Topbar from "../topbar/topbar";
import Dashboard from "../../pages/dashboard";
import Medexer from '../../pages/medexer';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

export const Submain = () => {
    return (
        <div className="h-screen w-full flex flex-col">
            <Topbar />
            {/*<Dashboard /> */}
            {/*<Medexer /> */}
            <Routes> {/* Wrap Routes around your Routes */}
                <Route path="/dashboard" element={<Dashboard />} /> {/* Use element prop to specify the component */}
                <Route path="/medexer" element={<Medexer />} /> {/* Use element prop to specify the component */}
            </Routes>
            <Footer />
        </div>
    );
};

export default Submain;