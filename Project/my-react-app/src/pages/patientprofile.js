import React, { useState, useEffect } from 'react';
import ProfileIcon from '../components/img/Profile.png';
import { useAuth } from '../components/session/AuthContext';
import { auth, db } from '../firebase';
import {sendEmailVerification,updateEmail, getAuth} from 'firebase/auth';
// import {getAuth, onAuthStateChanged} from '../firebase/auth';
import { collection, query, onSnapshot, doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

const PatientProfile =()=>{
    const navigate = useNavigate();
    const { userType, user } = useAuth();
    const [userData, setUserData] = useState({
        p_fname: '',
        p_lname: '',
        p_b_date: '',
        p_sex: '',
        p_number: '',
        p_email: '',
        p_city_state: '',
        p_zip: '',
        p_name:''
    });

    useEffect(() => {
        if (user) {
            const fetchData = async () => { //async makes function return promise
                try {
                    let userData;
                    if (userType === "patient") {
                        const patientDoc = doc(db, 'Patient', user.uid);
                        const patientSnap = await getDoc(patientDoc); //await makes async function wait for a promise
                        userData = patientSnap.data();
                        setUserData(userData); //gets current data in Firebase, so it shows on the page.
                    } 
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            };

            fetchData();
        }
    }, [user, userType]);

    const handleChange = (event) => { //allows you to update values
        const {name, value} = event.target; //from input/select, etc.
        setUserData((pastUserData) => ({
            ...pastUserData, ///spread operator. this is userData before we update the value in the form
            [name]:value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const auth = getAuth();
            
            try{ 
                await updateEmail(auth.currentUser, userData.p_email);
                //await sendEmailVerification()
            }catch (error) {
                console.error(`Error code: ${error.code}`);
                console.error(`Error message: ${error.message}`);
            }
            console.log(user.email);// should be old one
            // if(user.emailVerified){
            //     console.log("email is verified");
            // }
            console.log("hope it works");
            if(userType == "patient") {
                const patientDoc = doc(db, 'Patient', user.uid);
                await updateDoc(patientDoc,{
                    p_name: userData.p_email,
                    p_email: userData.p_email,
                    p_fname: userData.p_fname,
                    p_lname: userData.p_lname,
                    p_b_date: userData.p_b_date,
                    p_sex: userData.p_sex,
                    p_number: userData.p_number,
                    p_city_state: userData.p_city_state,
                    p_zip: userData.p_zip
                });
            }
            console.log(user.email); // should be new one
            alert("Your information has been updated!")
            navigate('/patientprofile');
         } catch (error) {
            console.error(`Error code: ${error.code}`);
            console.error(`Error message: ${error.message}`);
        }
    };

return(

<>
<div style={{width: '100%', height: '100%', padding: 30, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
    <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
        <div><img src={ProfileIcon} alt="profile image" style={{width: 100, height: 100, background: '#D9D9D9', borderRadius: 100}}/></div>
        <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
            <div style={{color: 'white', fontSize: 48, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>{userData.p_fname} {userData.p_lname}</div>
            <div style={{color: 'white', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>Dr. Name</div>
        </div>
    </div>
    <form style={{alignSelf: 'stretch', height: 377, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex'}} onSubmit={handleSubmit}>
    {/* <div style={{alignSelf: 'stretch', height: 377, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex'}}> */}
        <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 20, display: 'flex'}}>
            <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', gap: 20, display: 'inline-flex'}}>
                <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 20, display: 'inline-flex'}}>
                    <div><label htmlFor="fname" style={{color: 'white', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>First Name</label></div>
                    <div><input type="text" id="fname" name="p_fname" onChange={handleChange} value={userData.p_fname} style={{width: 300, height: 50, padding: 10, background: 'white', borderRadius: 15}}></input></div>
                </div>
                <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 20, display: 'inline-flex'}}>
                    <div><label htmlFor="lname" style={{color: 'white', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>Last Name</label></div>
                    <div><input type="text" id="lname" name="p_lname" onChange={handleChange} value={userData.p_lname} style={{width: 300, height: 50, padding: 10, background: 'white', borderRadius: 15}}></input></div>
                </div>
            </div>
            <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', gap: 20, display: 'inline-flex'}}>
                <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 20, display: 'inline-flex'}}>
                    <div><label htmlFor = "p_b_date"style={{color: 'white', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>Date of Birth</label></div>
                    <div><input id="p_b_date" name = "p_b_date" type="date" onChange={handleChange} value={userData.p_b_date} required style={{width: 300, height: 50, padding: 10, background: 'white', borderRadius: 15}} /></div>
                </div>
                <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 20, display: 'inline-flex'}}>
                    <div><label htmlFor="p_sex" style={{color: 'white', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>Sex</label></div>
                    <div><select name="p_sex" id="p_sex" onChange={handleChange} value={userData.p_sex} required style={{width: 300, height: 50, padding: 10, background: 'white', borderRadius: 15}}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    </div>
                </div>
            </div>
            <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', gap: 20, display: 'inline-flex'}}>
                <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 20, display: 'inline-flex'}}>
                    <div><label htmlFor="p_number" style={{color: 'white', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>Contact Number</label></div>
                    <div><input type="tel" id="p_number" name="p_number" onChange={handleChange} value={userData.p_number} placeholder="718-123-7698" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required style={{width: 300, height: 50, padding: 10, background: 'white', borderRadius: 15}}></input></div>
                </div>
                <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 20, display: 'inline-flex'}}>
                <div><label style={{color: 'white', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>E-mail</label></div>
                    <div><input type="email" id="p_email" name="p_email" onChange={handleChange} value={userData.p_email} required style={{width: 300, height: 50, padding: 10, background: 'white', borderRadius: 15}}></input></div>
                </div>
            </div>
            <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', gap: 20, display: 'inline-flex'}}>
                <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 20, display: 'inline-flex'}}>
                    <div><label htmlFor="p_city_state" style={{color: 'white', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>City, State</label></div>
                    <div><input type="text" id="p_city_state" name="p_city_state" onChange={handleChange} value={userData.p_city_state} placeholder="New York, NY" required style={{width: 300, height: 50, padding: 10, background: 'white', borderRadius: 15}}></input></div>
                </div>
                <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 20, display: 'inline-flex'}}>
                <div><label htmlFor="p_zip" style={{color: 'white', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>Zip Code</label></div>
                    <div><input type="text" id="p_zip" name="p_zip" onChange={handleChange} value={userData.p_zip} pattern="[0-9]{5}" required style={{width: 300, height: 50, padding: 10, background: 'white', borderRadius: 15}}></input></div>
                </div>
            </div>
            <div style={{width: 150, height: 50, padding: 10, background: 'linear-gradient(180deg, #A6FCAF 0%, #B5A7F7 52%, #585481 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)', borderRadius: 15, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex'}}>
                <div>
                    <button style={{textAlign: 'center', color: 'white', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>Submit</button></div>
            </div>
        </div>
    {/* </div> */}
    </form>
</div>
</>
    );
}
export default PatientProfile;