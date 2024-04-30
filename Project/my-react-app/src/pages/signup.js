import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/img/Logo.png';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import Patient from '../components/img/patient il.png'
import { db } from '../firebase'; // Import your Firebase configuration
import { setDoc, doc } from 'firebase/firestore';
import { useAuth } from '../components/session/AuthContext';


const SignUp = () => {
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
            setPasswordError("Password must contain at least one uppercase letter, one special character, and be at least 6 characters long.");
            return;
        }


        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const type = "patient"
            console.log('User signed up:', user.uid)
            let patientData = {
                p_email: email,
                p_password: password,
                p_name: email,
                user_type: "0"
            };
            const reportDocRef = doc(db, 'Patient', user.uid);
            await setDoc(reportDocRef, patientData);
            setUser(user);
            setUserType(type); // Set the user type after successful sign-in
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('userType', type);
            navigate('/', { replace: true });

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

    return (
        <div className="Preview w-full h-screen flex flex-row">
            <div className="w-1/2 h-full flex-col justify-center items-center gap-2.5 inline-flex bg-primary">
                <img className="w-26 h-24 absolute top-0 left-0 m-4" src={Logo} alt='' />
            </div>
            <div className="w-1/2 h-full flex-col justify-center items-center gap-5  bg-primary">
                <div className="Patient grow shrink basis-0 self-stretch p-2.5 flex-col justify-center items-center gap-5 inline-flex">
                    <img className="Image1 w-48 h-72 mr-20" src={Patient} alt="Patient" />

                </div>
                {/* Left half */}
            </div>
            <form className="w-1/2 h-full flex flex-col justify-center items-center gap-2.5 bg-primary" onSubmit={handlingSignUp}>
                <div className="Patient text-white text-4xl font-normal font-['Inter']">Sign Up Here!</div>
                <div className="input-container">

                    <input className="w-[355px] h-[50px] bg-zinc-300 rounded-[20px] mb-2.5" type="email" id="grid-first-email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    {/* Display error message under the email input */}
                    {emailError && <p className="text-red-500 text-xs italic">{emailError}</p>}
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-3" htmlFor="grid-first-email">
                        Email
                    </label>
                </div>
                <div className="input-container">
                    <input className="w-[355px] h-[50px] bg-zinc-300 rounded-[20px] mb-2.5" type="email" id="grid-confirm-email" placeholder="Confirm Email" value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)}
                        required
                    />
                    {emailError && <p className="text-red-500 text-xs italic">{emailError}</p>}
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-3" htmlFor="grid-confirm-email">
                        Confirm Email
                    </label>

                </div>

                <div className="input-container relative">
                    <input className="w-[355px] h-[50px] bg-zinc-300 rounded-[20px] mb-2.5 pr-12" type={showPassword ? 'text' : 'password'} id="grid-password" placeholder="Enter a password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    {/* Display error message under the password input */}
                    {passwordError && <p className="text-red-500 text-xs italic">{passwordError}</p>}
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-3" htmlFor="grid-password">Enter a password</label>
                    <button type="button" className="absolute top-1/4 transform -translate-y-1/4 right-1 text-blue-500 w-8 h-8" onClick={togglePasswordVisibility}>
                        {showPassword ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7a2 2 0 00-2 2m0 8a2 2 0 002 2m8-10a2 2 0 012-2m0 8a2 2 0 01-2 2m-4-4a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        )}

                    </button>
                </div>


                <div className="w-[156px] h-[38px] bg-zinc-300 rounded-[20px] relative">
                    <button className="w-full h-full absolute inset-0 group-hover:bg-slate-800 active:bg-green-700 focus:ring focus:ring-gray-700" type="submit">Sign Up</button>
                </div>

            </form>


        </div>

    );
};


export default SignUp;

