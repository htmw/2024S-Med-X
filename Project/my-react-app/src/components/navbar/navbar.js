import React from 'react';
import vector from '../img/icons/Vector.png';
import Logo from '../img/Logo.png'
import { Link } from 'react-router-dom';
const Navbar = () => {
    return (
        <div
            className="h-full w-fit p-5 bg-primary  flex-col justify-start items-start gap-2.5 inline-flex">
            <div className="self-stretch h-full flex-col justify-between items-center flex gap-9">
                <div className=" flex-col justify-start items-center gap-2.5 flex">
                    <div
                        className="w-[180px] h-[180px] justify-center items-center inline-flex">
                        <img className="" src={Logo}/>
                    </div>
                </div>
                <div
                    className="self-stretch grow shrink basis-0 flex-col justify-start items-center flex ">
                   
                    <div
                        className="self-stretch flex-col justify-between items-start flex gap-5">
                        <div className="w-fit justify-start items-center gap-3 inline-flex">
                            <div className="w-[20px] h-[20px] relative">
                                <img src={vector} className=''/></div>
                            <div className="text-white text-base font-normal font-['Inter']"><Link to="/">Dashboard</Link></div>
                        </div>
                        <div className="w-fit justify-start items-center gap-3 inline-flex">
                        <div className="w-[20px] h-[20px] relative">
                                <img src={vector} className=''/></div>
                            <div className="text-white text-base font-normal font-['Inter']"><Link to="/medexer">Medexer</Link></div>
                        </div>
                        <div className="w-fit justify-start items-center gap-3 inline-flex">
                        <div className="w-[20px] h-[20px] relative">
                                <img src={vector} className=''/></div>
                            <div className="text-white text-base font-normal font-['Inter']"><Link to="/report">Report</Link></div>
                        </div>
                    </div>
                  
                </div>
            </div>
        </div>
    );
};

export default Navbar;
