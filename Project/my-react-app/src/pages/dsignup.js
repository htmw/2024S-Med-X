import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Logo from '../components/img/Logo.png';
import DoctorImage from "../components/img/doctor il2.png";
import { auth } from '../firebase';
import { db } from '../firebase'; // Import your Firebase configuration
import { setDoc, doc } from 'firebase/firestore';
import { useAuth } from '../components/session/AuthContext';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Hide from "../components/img/icons/hide.svg";
import UnHide from "../components/img/icons/unhide.svg";
const DoctorSignUp = () => {

    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(null); //Separate state for email errors
    const [passwordError, setPasswordError] = useState(null); //Separate state for password errors
    const [showPassword, setShowPassword] = useState(false); // State to control password visibility
    const { setUser, setUserType } = useAuth(); // Access setUser and setUserType from AuthContext

    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handlingSignUp = async (e) => {
        e.preventDefault();

        // Test Case: Empty Email and Password Fields
        if (email.trim() === '' || password.trim() === '') {
            setEmailError("Email and password are required fields.");
            return;
        }

        // Test Case: Mismatched Email and Confirm Email
        if (email !== confirmEmail) {
            setEmailError("Emails don't match");
            return;
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{6,})/;
        if (!passwordRegex.test(password)) {
            setPasswordError(
                "Password must contain at least one uppercase letter, one special character, an" +
                "d be at least 6 characters long."
            );
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;
            const type = "doctor"
            console.log('User signed up:', user.uid)
            let doctorData = {
                mp_email: email,
                mp_password: password,
                mp_name: email,
                user_type: "0"
            };
            const reportDocRef = doc(db, 'Medical Professional', user.uid);
            await setDoc(reportDocRef, doctorData);
            setUser(user);
            setUserType(type); // Set the user type after successful sign-in
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('userType', type);
            navigate('/doctorlogin', { replace: true });

            // Step 2: Submit the Form
            const form = e.target;
            form.submit();
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                setEmailError("This email address is already in use.");
            } else {
                setPasswordError(error.message);
            }
        }

    };
    const handleclick = () => {
        navigate("/doctorlogin")

    };
    return (
        <div
            className="MacbookPro141 w-full  h-screen bg-stone-900 flex justify-between items-center">
            <form
                className="Signup bg-primary flex-grow flex-shrink flex-basis-0 self-stretch justify-center items-center gap-2.5 flex h-full"
                onSubmit={handlingSignUp}>
                <div
                    className="w-full h-full px-7 py-5 flex-col justify-center items-center gap-5 inline-flex">
                    <div
                        className="Frame7 py-5 px-5 w-64 flex justify-center items-center gap-2.5 ">
                        <div
                            className="Login text-white text-2xl font-normal flex justify-center items-center">Sign Up as a Doctor</div>

                    </div>
                    <div className="Emailflex w-full justify-start items-center gap-2.5">
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required="required"
                            type="email"
                            id="grid-first-email"
                            placeholder="Email"
                            className="w-full flex h-12 px-5 py-px bg-white rounded-2xl focus:outline-none flex-grow flex-shrink flex-basis-0 self-stretch text-zinc-800 text-opacity-80 text-base font-normal"/> {emailError && <p className="text-red-500 text-sm italic">{emailError}</p>}

                    </div>

                    <div className="Emailflex w-full justify-start items-center gap-2.5 ">
                        <input
                            value={confirmEmail}
                            onChange={(e) => setConfirmEmail(e.target.value)}
                            required="required"
                            type="email"
                            id="grid-confirm-email"
                            placeholder="Confirm email"
                            className="w-full flex h-12 px-5 py-px bg-white rounded-2xl focus:outline-none  flex-grow flex-shrink flex-basis-0 self-stretch text-zinc-800 text-opacity-80 text-base font-normal"/> {emailError && <p className="text-red-500 text-sm italic">{emailError}</p>}

                    </div>
                    <div className="Password flex-row flex w-full justify-between items-center focus:outline-none ">
            <div className="flex py-px h-12 w-full px-5 justify-between bg-white rounded-l-2xl flex-grow flex-shrink flex-basis-0 self-stretch text-zinc-800 text-opacity-80 text-base font-normal focus:ring-0">
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter a password"
                    className="w-full outline-none"
                />
            </div>
            <div className="h-full w-10 flex justify-center items-center rounded-r-2xl bg-customWhite py-px">
                <button
                    type="button"
                    className="text-customPurple focus:outline-none"
                    onClick={togglePasswordVisibility}
                >
                    {showPassword ? (
                        <img src={Hide} alt="Hide" className="w-7 h-w-7" />
                    ) : (
                        <img src={UnHide} alt="Unhide" className="w-7 h-w-7" />
                    )}
                </button>
            </div>

            {/* Display error message under the password input */}
            {passwordError && <p className="text-red-500 text-sm italic">{passwordError}</p>}
        </div>
                    {<div className="text-red-500">{""}</div>}
                    <button
                        className="Frame8 w-36 p-2.5 bg-purple-500 rounded-2xl flex justify-center items-center">
                        <div
                            className="Loginbutton text-white text-base font-normal flex justify-center items-center"
                            onSubmit={handlingSignUp}>Sign Up</div>
                    </button>
                    <div
                        className="DontHaveAnAccountClickHere text-center text-white text-base font-normal">HAVE AN ACCOUNT ?
                        <br />
                        <button className="underline" onClick={handleclick}>Click here</button>
                    </div>
                </div>
            </form>
            <div
                className="Bg  w-[70%] h-full p-7 flex-col justify-end items-end inline-flex">
                <div className="Logo w-48 h-48 justify-center items-center inline-flex">
                    <img alt="Logo" src={Logo} />
                </div>
                <div
                    className="Frame6 self-stretch grow shrink basis-0 justify-center items-center gap-2.5 inline-flex">
                    <img alt="Image4 h-full" src={DoctorImage} />
                </div>
            </div>

        </div>
    )
}

export default DoctorSignUp;
