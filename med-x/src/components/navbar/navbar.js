
import Vector from '../img/icons/Vector.png';
import Logo from '../img/Logo.png'
import React from 'react';
import { Link } from 'react-router-dom';
import Dashicon from "../img/icons/dashcube.svg"
import Medexericon from "../img/icons/medex-w.svg"
import Reporticon from '../img/icons/report.svg';

const NavBar = () => {
    return (
        <div
            className="h-full w-fit p-5 bg-primary  flex-col justify-start items-start gap-2.5 inline-flex">
            <div className="self-stretch h-full flex-col justify-between items-center flex gap-9">
                <div className="flex-col justify-start items-center gap-2.5 flex">
                    <div
                        className="w-[180px] h-[180px] justify-center items-center inline-flex">
                        <img className="" src={Logo} alt="" />
                    </div>
                </div>
                <div
                    className="self-stretch grow shrink basis-0 flex-col justify-between items-center flex">
                    <div
                        className="self-stretch flex-col justify-between items-start flex gap-5">
                        <div className="w-fit justify-start items-center gap-3 inline-flex">
                            <div className="w-[20px] h-[20px] relative">
                                <img src={Dashicon} className='' alt="" /></div>
                            <div className="text-white text-base font-normal font-['Inter']"><Link to="/dashboard">Dashboard</Link></div>
                        </div>
                        <div className="w-fit justify-start items-center gap-3 inline-flex">
                            <div className="w-[20px] h-[20px] relative">
                                <img src={Medexericon} className='' alt="" /></div>
                            <div className="text-white text-base font-normal font-['Inter']"><Link to="/medexer">Medexer</Link></div>
                        </div>
                        <div className="w-fit justify-start items-center gap-3 inline-flex">
                            <div className="w-[20px] h-[20px] relative">
                                <img src={Reporticon} className='' alt="" /></div>
                            <div className="text-white text-base font-normal font-['Inter']"><Link to="/report">Report</Link></div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    );
};

export default NavBar;
