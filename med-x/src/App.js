import "./App.css";
import React from 'react';
import "./components/navbar/navbar";
import Main from "./components/main/main";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Medexer from '../../med-x/src/pages/medexer';
import Dashboard from '../../med-x/src/pages/dashboard';


function App() {
  return (
    /*
    <div className="App overflow-y-scroll no-scrollbar ">
      <Main />
    </div>
    */
    
      <Router>
      <div className="App overflow-y-scroll no-scrollbar">
        <Routes> {/* Wrap Routes around your Routes */}
          <Route path="/dashboard" element={<Dashboard />} /> {/* Use element prop to specify the component */}
          <Route path="/medexer" element={<Medexer />} /> {/* Use element prop to specify the component */}
        </Routes>
        <Main />
      </div>
    </Router>
    
  );
};

export default App;
