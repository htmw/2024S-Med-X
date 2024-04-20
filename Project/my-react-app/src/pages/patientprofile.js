import React, { useState, useEffect } from 'react';
import ProfileIcon from '../components/img/Profile.png';

const PatientProfile =()=>{

return(
<>
<div style={{width: '100%', height: '100%', padding: 30, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
    <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
        <div><img src={ProfileIcon} alt="profile image" style={{width: 100, height: 100, background: '#D9D9D9', borderRadius: 100}}/></div>
        <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
            <div style={{color: 'white', fontSize: 48, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>Patient Profile</div>
            <div style={{color: 'white', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>Dr. Name</div>
        </div>
    </div>
    <form style={{alignSelf: 'stretch', height: 377, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex'}}>
    {/* <div style={{alignSelf: 'stretch', height: 377, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex'}}> */}
        <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 20, display: 'flex'}}>
            <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', gap: 20, display: 'inline-flex'}}>
                <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 20, display: 'inline-flex'}}>
                    <div><label for="fname" style={{color: 'white', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>First Name</label></div>
                    <div><input type="text" id="fname" name="fname" style={{width: 300, height: 50, padding: 10, background: 'white', borderRadius: 15}}></input></div>
                </div>
                <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 20, display: 'inline-flex'}}>
                    <div><label for="lname" style={{color: 'white', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>Last Name</label></div>
                    <div><input type="text" id="lname" name="lname" style={{width: 300, height: 50, padding: 10, background: 'white', borderRadius: 15}}></input></div>
                </div>
            </div>
            <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', gap: 20, display: 'inline-flex'}}>
                <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 20, display: 'inline-flex'}}>
                    <div><label for = "bdate"style={{color: 'white', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>Date of Birth</label></div>
                    <div><input id="bdate" name = "bdate" type="date" required style={{width: 300, height: 50, padding: 10, background: 'white', borderRadius: 15}} /></div>
                </div>
                <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 20, display: 'inline-flex'}}>
                    <div><label for="sex" style={{color: 'white', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>Sex</label></div>
                    <div><select name="sex" id ="sex" required style={{width: 300, height: 50, padding: 10, background: 'white', borderRadius: 15}}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    </div>
                </div>
            </div>
            <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', gap: 20, display: 'inline-flex'}}>
                <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 20, display: 'inline-flex'}}>
                    <div><label for="phone" style={{color: 'white', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>Contact Number</label></div>
                    <div><input type="tel" id="phone" name="phone" placeholder="718-123-7698" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required style={{width: 300, height: 50, padding: 10, background: 'white', borderRadius: 15}}></input></div>
                </div>
                <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 20, display: 'inline-flex'}}>
                <div><label style={{color: 'white', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>E-mail</label></div>
                    <div><input type="email" required style={{width: 300, height: 50, padding: 10, background: 'white', borderRadius: 15}}></input></div>
                </div>
            </div>
            <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', gap: 20, display: 'inline-flex'}}>
                <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 20, display: 'inline-flex'}}>
                    <div><label for="address" style={{color: 'white', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>City, State</label></div>
                    <div><input type="text" id="address" name="address" placeholder="New York, NY" required style={{width: 300, height: 50, padding: 10, background: 'white', borderRadius: 15}}></input></div>
                </div>
                <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 20, display: 'inline-flex'}}>
                <div><label for="zip" style={{color: 'white', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>Zip Code</label></div>
                    <div><input type="text" id="zip" name="zip" pattern="[0-9]{5}" required style={{width: 300, height: 50, padding: 10, background: 'white', borderRadius: 15}}></input></div>
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