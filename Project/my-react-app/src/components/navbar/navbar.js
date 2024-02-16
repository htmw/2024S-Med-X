import React from 'react';
import vector from '../img/icons/Vector.png';
import Logo from '../img/Logo.png'
const Navbar = () => {
    return (
        <div
            className="h-full w-fit p-[35px] bg-neutral-900 rounded-[20px] flex-col justify-start items-start gap-2.5 inline-flex">
            <div className="self-stretch h-full flex-col justify-between items-center flex">
                <div className="p-[15px] flex-col justify-start items-center gap-2.5 flex">
                    <div
                        className="w-[200px] h-[200px] shadow justify-center items-center inline-flex">
                        <img className="" src={Logo}/>
                    </div>
                </div>
                <div
                    className="self-stretch grow shrink basis-0 flex-col justify-between items-center flex">
                    <div className="w-px h-px relative"/>
                    <div
                        className="self-stretch h-[210px] flex-col justify-between items-center flex">
                        <div className="w-[230px] justify-start items-center gap-5 inline-flex">
                            <div className="w-[25px] h-[25px] relative">
                                <img src={vector} className=''/></div>
                            <div className="text-white text-base font-normal font-['Inter']">Dashboard</div>
                        </div>
                        <div className="w-[230px] justify-start items-center gap-5 inline-flex">
                        <div className="w-[25px] h-[25px] relative">
                                <img src={vector} className=''/></div>
                            <div className="text-white text-base font-normal font-['Inter']">Medexer</div>
                        </div>
                        <div className="w-[230px] justify-start items-center gap-5 inline-flex">
                        <div className="w-[25px] h-[25px] relative">
                                <img src={vector} className=''/></div>
                            <div className="text-white text-base font-normal font-['Inter']">Report</div>
                        </div>
                        <div className="w-[230px] justify-start items-center gap-5 inline-flex">
                        <div className="w-[25px] h-[25px] relative">
                                <img src={vector} className=''/></div>
                            <div className="text-white text-base font-normal font-['Inter']">Connect</div>
                        </div>
                    </div>
                    <div
                        className="self-stretch h-[155px] flex-col justify-between items-center flex">
                        <div className="w-[230px] justify-start items-center gap-5 inline-flex">
                        <div className="w-[25px] h-[25px] relative">
                                <img src={vector} className=''/></div>
                            <div className="text-white text-base font-normal font-['Inter']">Settings</div>
                        </div>
                        <div className="w-[230px] justify-start items-center gap-5 inline-flex">
                        <div className="w-[25px] h-[25px] relative">
                                <img src={vector} className=''/></div>
                            <div className="text-white text-base font-normal font-['Inter']">About us</div>
                        </div>
                        <div className="w-[230px] justify-start items-center gap-5 inline-flex">
                        <div className="w-[25px] h-[25px] relative">
                                <img src={vector} className=''/></div>
                            <div className="text-white text-base font-normal font-['Inter']">Terms and Condition</div>
                        </div>
                    </div>
                    <div className="w-px h-px relative"/>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
