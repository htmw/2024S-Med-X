import React, { useState, useRef } from 'react';
import ProfileIcon from '../components/img/Profile.png';
import { db } from '../firebase'; // Import your Firebase configuration
import { collection, getDocs } from 'firebase/firestore';
import { storage } from "../firebase.js";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import Uploadimg from "../components/img/upload.png";


const PatientProfile =()=>{
    const [fileData, setFileData] = useState({ previewFile: null, errorMessage: '' });
    const fileInputRef = useRef(null);
    const [isDraggingOver, setIsDraggingOver] = useState(false);
    const [uploadedImage, setUploadedImage] = useState(null)

    const openFileDialog = () => {
       fileInputRef.current.click();
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDraggingOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDraggingOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDraggingOver(false);

        const droppedFiles = Array.from(e.dataTransfer.files);
        const file = droppedFiles[0]; // Assuming only one file is dropped

        checkFileType(file);
    };

    const checkFileType = (file) => {
        setUploadedImage(file)
        // Check if file type is supported
        if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
            setFileData({ ...fileData, errorMessage: 'Unsupported file format. Please upload a .png or .jpeg file.' });
            return;
        }
        const reader = new FileReader();
        reader.onload = (event) => {
            setFileData({ ...fileData, previewFile: { name: file.name, type: file.type, size: file.size, dataURL: event.target.result } });
        };
        reader.readAsDataURL(file);
    };

return(

<>
<div style={{width: '100%', height: '100%', padding: 30, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
    <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
        <div className='image-container'>
            <div><img src={ProfileIcon} alt="profile image" style={{width: 100, height: 100, background: '#D9D9D9', borderRadius: 100}}/></div>
            <br/>
            <div><button className="button_plus hover:bg-green-400" style={{width: '35px', height: '35px', textAlign: 'center',cologitr:'#fff',border: '2px solid #095776',cursor:'pointer'}}
            onClick={openFileDialog}>+</button></div>
            <label style={{color:'white',fontFamily: 'Inter', fontWeight:'500'}}>Update Profile pic</label>    
        </div>
        <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
            <div style={{color: 'white', fontSize: 40, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>{userData.p_name}</div>
            <div style={{color: 'white', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>Dr. Name</div>
        </div>
    </div>
    <br/>
    <form style={{alignSelf: 'stretch', height: 377, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex'}}>
        <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 20, display: 'flex'}}>
            <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', gap: 20, display: 'inline-flex'}}>
                <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 20, display: 'inline-flex'}}>
                    <div><label htmlFor="p_name" style={{color: 'white', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>Full Name</label></div>
                    <div><input type="text" id="p_name" name="p_name" onChange={handleChange} value={userData.p_name} required style={{width: 300, height: 50, padding: 10, background: 'white', borderRadius: 15}}></input></div>
                </div>
                <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 20, display: 'inline-flex'}}>
                    <div><label htmlFor = "p_b_date"style={{color: 'white', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>Date of Birth</label></div>
                    <div><input id="p_b_date" name = "p_b_date" type="date" onChange={handleChange} value={userData.p_b_date} required style={{width: 300, height: 50, padding: 10, background: 'white', borderRadius: 15}} /></div>
                </div>
            </div>
            <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', gap: 20, display: 'inline-flex'}}>
                <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 20, display: 'inline-flex'}}>
                    <div><label htmlFor="p_sex" style={{color: 'white', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>Sex at Birth</label></div>
                    <div><select name="p_sex" id="p_sex" onChange={handleChange} value={userData.p_sex} required style={{width: 300, height: 50, padding: 10, background: 'white', borderRadius: 15}}>
                        <option value="">Please choose an option</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    </div>
                </div>
                <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 20, display: 'inline-flex'}}>
                    <div><label htmlFor="p_number" style={{color: 'white', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>Contact Number</label></div>
                    <div><input type="tel" id="p_number" name="p_number" onChange={handleChange} value={userData.p_number} placeholder="718-123-7698" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required style={{width: 300, height: 50, padding: 10, background: 'white', borderRadius: 15}}></input></div>
                </div>
            </div>
            <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', gap: 20, display: 'inline-flex'}}>
                <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 20, display: 'inline-flex'}}>
                <div><label style={{color: 'white', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>E-mail</label></div>
                    <div><input type="email" id="p_email" name="p_email" onChange={handleChange} value={userData.p_email} required style={{width: 300, height: 50, padding: 10, background: 'white', borderRadius: 15}}></input></div>
                </div>
                <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 20, display: 'inline-flex'}}>
                    <div><label htmlFor="p_city_state" style={{color: 'white', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>City</label></div>
                    <div><input type="text" id="p_city_state" name="p_city" onChange={handleChange} value={userData.p_city} placeholder="New York, NY" required style={{width: 300, height: 50, padding: 10, background: 'white', borderRadius: 15}}></input></div>
                </div>
            </div>
            <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', gap: 20, display: 'inline-flex'}}>
                <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 20, display: 'inline-flex'}}>
                    <div><label htmlFor="p_city_state" style={{color: 'white', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>State</label></div>
                    <div><input type="text" id="p_city_state" name="p_state" onChange={handleChange} value={userData.p_state} placeholder="New York, NY" required style={{width: 300, height: 50, padding: 10, background: 'white', borderRadius: 15}}></input></div>
                </div>
                <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 20, display: 'inline-flex'}}>
                <div><label htmlFor="p_zip" style={{color: 'white', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>Zip Code</label></div>
                    <div><input type="text" id="p_zip" name="p_zip" onChange={handleChange} value={userData.p_zip} pattern="[0-9]{5}" required style={{width: 300, height: 50, padding: 10, background: 'white', borderRadius: 15}}></input></div>
                </div>
            </div>
            <div style={{width: 150, height: 50, padding: 10, background: 'linear-gradient(180deg, #A6FCAF 0%, #B5A7F7 52%, #585481 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)', borderRadius: 15, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex'}}>
                <div>
                    <button style={{textAlign: 'center', color: 'white', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}
                    >Submit</button></div>
            </div>
        </div>
    {/* </div> */}
    </form>
    <br/>
    <br/>
</div>
</>
    );
}
export default PatientProfile;