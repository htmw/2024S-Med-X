import React, {useState, useEffect} from 'react';
import './App.css';
import Main from './components/main/main.js';
import Landing from './pages/Landing.js';
import {AuthProvider} from './components/session/AuthContext.js';
import {auth} from './firebase.js'; // Import auth from firebase.js
import PrintableReport from './test/printpdf.js';
import ReportPage from './pages/reportpage.js';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PatientLogin from './pages/PatientLogin.js';
import PatientSignUp from './pages/psignup.js';
function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });

        return() => unsubscribe(); // Cleanup function to unsubscribe from the listener
    }, []);

    return (
        <BrowserRouter>
            <AuthProvider>
                <div className="App overflow-y-scroll no-scrollbar">

                    <Routes>
                        <Route path='*'element=    {
                        user
                            ? <Main user={user}/>
                            : <Landing/>
                    }/>
                    <Route path='/patientlogin' element={<PatientLogin/>}/>   
                    <Route path='/patientsignup' element={<PatientSignUp/>}/>   
                    <Route path='/doctorlogin' element={<PatientLogin/>}/>
                    <Route path='/doctorsignup' element={<PatientLogin/>}/>
                    </Routes>
                
                </div>
            </AuthProvider>
        </BrowserRouter>

    );
}

export default App;