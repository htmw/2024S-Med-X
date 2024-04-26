import React, { useState } from "react";
import Logo from "../components/img/Logo.png";
import { getAuth, signInWithEmailAndPassword,signOut, sendEmailVerification } from "firebase/auth";
import { useAuth } from '../components/session/AuthContext'; // Import useAuth hook
import { useNavigate } from 'react-router-dom';
import DoctorImage from "../components/img/doctor il2.png";
import { db } from '../firebase';
import {doc,getDoc } from "firebase/firestore";
const DoctorLogin = () => {

    const { setUser, setUserType } = useAuth(); // Access setUser and setUserType from AuthContext
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Run only once on component mount
    const handleLogin = async (email, password,type) => {
        try {
            console.log(email,password)
            const auth = getAuth();
            // Sign in user
            await signInWithEmailAndPassword(auth, email, password);
    
            // Get current user
            const currentUser = auth.currentUser;
    
            if (currentUser) {
                // Get user document from Firestore
                
                const doctorDoc = doc(db, 'Medical Professional',currentUser.uid);
                const userDoc = await getDoc(doctorDoc);
                console.log(userDoc._document)
                if (userDoc._document!=null) {
                                setUser(currentUser);
                                setUserType(type); // Set the user type after successful sign-in
                                localStorage.setItem('user', JSON.stringify(currentUser));
                                localStorage.setItem('userType', type);
                                navigate('/');
                  
                } else {
                    // User document does not exist

                    setError("You are not authorized to log in as a Patient.");
                    const auth = getAuth();
                    signOut(auth)
                    // Handle this case
                }
            } else {
                console.log("No user signed in")
                // No user signed in
                // Handle this case
            }
        } catch (error) {
            // Handle errors
            console.error("Error handling login:", error);
        }
    };
    const handleclick = () => {
        navigate("/doctorsignup")
    };
    return (
        <div
            className="MacbookPro141 w-full  h-screen bg-stone-900 flex justify-between items-center">
            <div
                className="Signup bg-primary flex-grow flex-shrink flex-basis-0 self-stretch justify-center items-center gap-2.5 flex h-full">
                <div
                    className="w-full h-full px-7 py-5 flex-col justify-center items-center gap-5 inline-flex">
                    <div className="Frame7 w-64 flex justify-center items-center gap-2.5 ">
                        <div
                            className="Login text-white text-5xl font-normal flex justify-center items-center">Login</div>
                        <div className="As text-white text-5xl font-normal">As</div>
                        <div className="Patient text-white text-5xl font-normal">Doctor</div>
                    </div>
                    <div className="Emailflex w-full justify-start items-center gap-2.5">
                        <input value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                            placeholder="example@gmail.com"
                            className="w-full flex h-12 px-5 py-px bg-white rounded-2xl  flex-grow flex-shrink flex-basis-0 self-stretch text-zinc-800 text-opacity-80 text-base font-normal" />
                    </div>
                    <div className="Password w-full justify-start items-center gap-2.5">
                        <input value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="********"
                            className="flex py-px h-12 w-full px-5 bg-white rounded-2xl flex-grow flex-shrink flex-basis-0 self-stretch text-zinc-800 text-opacity-80 text-base font-normal" />
                    </div> {error && <div className="text-red-500">{error}</div>}
                    <button
                        className="Frame8 w-36 p-2.5 bg-purple-500 rounded-2xl flex justify-center items-center"  onClick={() => handleLogin(email, password,"doctor")}>
                        <div
                            className="Loginbutton text-white text-base font-normal flex justify-center items-center">Login</div>
                    </button>
                    <div
                        className="DontHaveAnAccountClickHere text-center text-white text-base font-normal">DONT HAVE AN ACCOUNT?
                        <br />
                        <button className="underline" onClick={handleclick}>Click here</button>
                    </div>
                </div>
            </div>
            <div
                className="Bg  w-[70%] h-full p-7 flex-col justify-end items-end inline-flex">
                <div className="Logo w-48 h-48 justify-center items-center inline-flex">
                    <img className="Logo" src={Logo} alt="Logo" />
                </div>
                <div
                    className="Frame6 self-stretch grow shrink basis-0 justify-center items-center gap-2.5 inline-flex">
                    <img className="Image4 h-full" src={DoctorImage} alt="" />
                </div>
            </div>

        </div>
    )
}

export default DoctorLogin;
