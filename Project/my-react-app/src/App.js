import './App.css';
import Main from './components/main/main.js';
import './components/navbar/navbar.js'

//import { Routes, Route } from "react-router-dom";
//import Notfound from './pages/notfound.js';
function App() {
    return (
        <div className="App overflow-y-scroll no-scrollbar ">
            <Main/>
        </div>
    );
}

export default App;
