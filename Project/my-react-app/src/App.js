import React, { useState, useEffect } from 'react';
import './App.css';
import Main from './components/main/main.js';
import Navbar from './components/navbar/navbar.js';
import { auth } from './firebase.js'; // Import auth from firebase.js
import Login from './pages/Login.js';

import { AuthProvider } from './components/session/AuthContext.js';
function App() {
    const [user, setUser] = useState(null);

    // Function to check if user is logged in
    const checkAuthState = () => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                setUser(user);
            } else {
                // No user is signed in.
                setUser(null);
            }
        });
    };

    useEffect(() => {
        checkAuthState(); // Check authentication state on component mount
    }, []);

    return (
        <AuthProvider>
        <div className="App overflow-y-scroll no-scrollbar">
            {user ? <Main /> : <Login/>} {/* Conditional rendering based on user */}
        </div>
        </AuthProvider>
    );
}

export default App;
