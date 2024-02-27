import "./App.css";
import React from 'react';
import "./components/navbar/navbar";
import Main from "./components/main/main";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Notfound from "./pages/notfound";


function App() {
  return (
    /*
    <div className="App overflow-y-scroll no-scrollbar ">
      <Main />
    </div>
    */
    <div className="App overflow-y-scroll no-scrollbar">
      <Router>


        <Main />
      </Router>

    </div>
  );
};

export default App;
