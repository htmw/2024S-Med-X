import React, { useState, useEffect } from 'react';
import ProfileIcon from '../components/img/Profile.png';
import { useAuth } from '../components/session/AuthContext';
import { auth, db } from '../firebase';
import {getAuth} from 'firebase/auth';
// import {getAuth, onAuthStateChanged} from '../firebase/auth';
import { collection, query, onSnapshot, doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

const DoctorProfile =()=>{
    const navigate = useNavigate();
    const { userType, user } = useAuth();
    const [userData, setUserData] = useState({
        mp_b_date: '',
        mp_sex: '',
        mp_number: '',
        // mp_email: '',
        mp_state: '',
        mp_city: '',
        mp_zip: '',
        mp_name:'',
        mp_prof:''
    });

    useEffect(() => {
        if (user) {
            const fetchData = async () => { //async makes function return promise
                try {
                    let userData;
                    if (userType === "doctor") {
                        const doctorDoc = doc(db, 'Medical Professional', user.uid);
                        const doctorSnap = await getDoc(doctorDoc); //await makes async function wait for a promise
                        userData = doctorSnap.data();
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
            
            if(userType === "doctor") {
                const doctorDoc = doc(db, 'Medical Professional', user.uid);

                const updatedUserData = { // should I do this updatedUserData for patientprofile as well? 
                    mp_name: userData.mp_name || '', // if they didn't put anything, it stays blank
                    // mp_email: userData.mp_email || '',
                    mp_b_date: userData.mp_b_date || '',
                    mp_sex: userData.mp_sex || '',
                    mp_number: userData.mp_number || '',
                    mp_city: userData.mp_city || '',
                    mp_state: userData.mp_state || '',
                    mp_zip: userData.mp_zip || '',
                    mp_prof: userData.mp_prof || ''
                };
                await updateDoc(doctorDoc, updatedUserData);
            }

            alert("Your information has been updated!")
            navigate('/doctorprofile');
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
            <div style={{color: 'white', fontSize: 40, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>{userData.mp_name}</div>
        </div>
    </div>
    <br/>
    <form style={{alignSelf: 'stretch', height: 377, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex'}} onSubmit={handleSubmit}>
    {/* <div style={{alignSelf: 'stretch', height: 377, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex'}}> */}
        <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 20, display: 'flex'}}>
            <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', gap: 20, display: 'inline-flex'}}>
                <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 20, display: 'inline-flex'}}>
                    <div><label htmlFor="name" style={{color: 'white', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>Full Name</label></div>
                    <div><input type="text" id="name" name="mp_name" onChange={handleChange} value={userData.mp_name} style={{width: 300, height: 50, padding: 10, background: 'white', borderRadius: 15}}></input></div>
                </div>
                <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 20, display: 'inline-flex'}}>
                    <div><label htmlFor = "mp_b_date"style={{color: 'white', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>Date of Birth</label></div>
                    <div><input id="p_b_date" name = "mp_b_date" type="date" onChange={handleChange} value={userData.mp_b_date} required style={{width: 300, height: 50, padding: 10, background: 'white', borderRadius: 15}} /></div>
                </div>
            </div>
            <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', gap: 20, display: 'inline-flex'}}>
                <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 20, display: 'inline-flex'}}>
                    <div><label htmlFor="mp_sex" style={{color: 'white', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>Sex</label></div>
                    <div><select name="mp_sex" id="mp_sex" onChange={handleChange} value={userData.mp_sex} required style={{width: 300, height: 50, padding: 10, background: 'white', borderRadius: 15}}>
                        <option value="">Please choose an option</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    </div>
                </div>
                <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 20, display: 'inline-flex'}}>
                    <div><label htmlFor="mp_number" style={{color: 'white', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>Contact Number</label></div>
                    <div><input type="tel" id="mp_number" name="mp_number" onChange={handleChange} value={userData.mp_number} placeholder="718-123-7698" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required style={{width: 300, height: 50, padding: 10, background: 'white', borderRadius: 15}}></input></div>
                </div>
            </div>
            <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', gap: 20, display: 'inline-flex'}}>
                <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 20, display: 'inline-flex'}}>
                    <div><label htmlFor="mp_city" style={{color: 'white', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>City</label></div>
                    <div><input type="text" id="mp_city_state" name="mp_city" onChange={handleChange} value={userData.mp_city} placeholder="New York, NY" required style={{width: 300, height: 50, padding: 10, background: 'white', borderRadius: 15}}></input></div>
                </div>
                <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 20, display: 'inline-flex'}}>
                    <div><label htmlFor="mp_city_state" style={{color: 'white', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>State</label></div>
                    <div><input type="text" id="mp_state" name="mp_state" onChange={handleChange} value={userData.mp_state} placeholder="New York, NY" required style={{width: 300, height: 50, padding: 10, background: 'white', borderRadius: 15}}></input></div>
                </div>
            </div>
            <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', gap: 20, display: 'inline-flex'}}>
                <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 20, display: 'inline-flex'}}>
                    <div><label htmlFor="mp_zip" style={{color: 'white', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>Zip Code</label></div>
                    <div><input type="text" id="mp_zip" name="mp_zip" onChange={handleChange} value={userData.mp_zip} pattern="[0-9]{5}" placeholder="12345" required style={{width: 300, height: 50, padding: 10, background: 'white', borderRadius: 15}}></input></div>
                </div>
                <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 20, display: 'inline-flex'}}>
                    <div><label htmlFor="mp_prof" style={{color: 'white', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>Specialty</label></div>
                    <div><select id="mp_prof" name="mp_prof" onChange={handleChange} value={userData.prof} required style={{width: 300, height: 50, padding: 10, background: 'white', borderRadius: 15}}>
                    <option value="">Please choose an option</option>
                    <option value="Radiologist">Radiologist</option>
                    <option value="Primary Care">Primary Care</option>
                    <option value="Other">Other</option>
                </select>
                </div>
            </div>
            </div>  
            <div style={{width: 150, height: 50, padding: 10, background: 'linear-gradient(180deg, #A6FCAF 0%, #B5A7F7 52%, #585481 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)', borderRadius: 15, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex'}}>
                <div>
                    <button style={{textAlign: 'center', color: 'white', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>Submit</button></div>
            </div>
        </div>
    {/* </div> */}
    </form>
    <br/>
</div>
</>
    );
}
export default DoctorProfile;