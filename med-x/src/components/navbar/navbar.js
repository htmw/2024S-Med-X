

import Vector from '../img/icons/Vector.png';
import Logo from '../img/Logo.png'
import React from 'react';

const NavBar = () => {
    return (
        <div
            className="h-full w-fit p-[35px] bg-primary rounded-tr-[20px] rounded-br-[20px] flex-col justify-start items-start gap-2.5 inline-flex">
            <div className="self-stretch h-full flex-col justify-between items-center flex">
                <div className="p-[15px] flex-col justify-start items-center gap-2.5 flex">
                    <div
                        className="w-[200px] h-[200px] shadow justify-center items-center inline-flex">
                        <img className="" src={Logo} alt="" />
                    </div>
                </div>
                <div
                    className="self-stretch grow shrink basis-0 flex-col justify-between items-center flex">
                    <div className="w-px h-px relative" />
                    <div
                        className="self-stretch h-[210px] flex-col justify-between items-center flex">
                        <div className="w-[230px] justify-start items-center gap-5 inline-flex">
                            <div className="w-[25px] h-[25px] relative">
                                <img src={Vector} className='' alt="" /></div>
                            <a href="/dashboard" className="text-white text-base font-normal font-['Inter']">Dashboard</a>
                        </div>
                        <div className="w-[230px] justify-start items-center gap-5 inline-flex">
                            <div className="w-[25px] h-[25px] relative">
                                <img src={Vector} className='' alt="" /></div>
                            <a href="/medexer" className="text-white text-base font-normal font-['Inter']">Medexer</a>
                        </div>
                        <div className="w-[230px] justify-start items-center gap-5 inline-flex">
                            <div className="w-[25px] h-[25px] relative">
                                <img src={Vector} className='' alt="" /></div>
                            <a href="/report" className="text-white text-base font-normal font-['Inter']">Report</a>
                        </div>
                        <div className="w-[230px] justify-start items-center gap-5 inline-flex">
                            <div className="w-[25px] h-[25px] relative">
                                <img src={Vector} className='' alt="" /></div>
                                <a href="/connect" className="text-white text-base font-normal font-['Inter']">Connect</a>
                        </div>
                    </div>
                    <div
                        className="self-stretch h-[155px] flex-col justify-between items-center flex">
                        <div className="w-[230px] justify-start items-center gap-5 inline-flex">
                            <div className="w-[25px] h-[25px] relative">
                                <img src={Vector} className='' alt="" /></div>
                                <a href="/settings" className="text-white text-base font-normal font-['Inter']">Settings</a>
                        </div>
                        <div className="w-[230px] justify-start items-center gap-5 inline-flex">
                            <div className="w-[25px] h-[25px] relative">
                                <img src={Vector} className='' alt="" /></div>
                                <a href="/aboutus" className="text-white text-base font-normal font-['Inter']">About us</a>
                        </div>
                        <div className="w-[230px] justify-start items-center gap-5 inline-flex">
                            <div className="w-[25px] h-[25px] relative">
                                <img src={Vector} className='' alt="" /></div>
                                <a href="/termsandconditions" className="text-white text-base font-normal font-['Inter']">Terms and Conditions</a>
                        </div>
                    </div>
                    <div className="w-px h-px relative" />
                </div>
            </div>
        </div>

    );
};

export default NavBar;
