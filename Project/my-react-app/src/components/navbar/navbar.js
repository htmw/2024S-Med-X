import React from 'react';
import {BrowserRouter as NavLink} from 'react-router-dom';
import Logo from '../img/Logo.png'

import { ReactComponent as Reporticon } from "../img/icons/report.svg";
import { ReactComponent as Medexericon } from "../img/icons/medex-w.svg";
import { ReactComponent as Dashicon } from "../img/icons/dashcube.svg";

const Navbar = () => {
    const activeClassName = 'text-white';
    const normalLink = 'text-customBasewhite-30';
    return (
        <div
            className="h-full w-fit p-5 bg-primary  flex-col justify-start items-start gap-2.5 inline-flex">
            <div
                className="self-stretch h-full flex-col justify-between items-center flex gap-9">
                <div className=" flex-col justify-start items-center gap-2.5 flex">
                    <div className="w-[180px] h-[180px] justify-center items-center inline-flex">
                        <img className="" src={Logo} alt=''/>
                    </div>
                </div>
                <div
                    className="self-stretch grow shrink basis-0 flex-col justify-start items-center flex p-6 ">

                    <div className="self-stretch flex-col justify-between items-start flex gap-5">
                        <div className="w-fit justify-start items-center gap-3 inline-flex">
                            <div className="w-[20px] h-[20px] relative">
                                <Dashicon className='w-[20px] h-[20px]'/></div>
                            <div >
                                <NavLink
                                    to="/"
                                    className={(
                                        {isActive}) => isActive
                                        ? activeClassName
                                        : normalLink}>Dashboard</NavLink>
                            </div>
                        </div>
                        <div className="w-fit justify-start items-center gap-3 inline-flex">
                            <div className="w-[20px] h-[20px] relative">
                            <Medexericon className='w-[20px] h-[20px]'/></div>
                            <div >
                                <NavLink to="/medexer" className={(
                                        {isActive}) => isActive
                                        ? activeClassName
                                        : normalLink}>Medexer</NavLink>
                            </div>
                        </div>
                        <div className="w-fit justify-start items-center gap-3 inline-flex">
                            <div className="w-[20px] h-[20px] relative">
                                <Reporticon  className="w-[20px] h-[20px]"/></div>
                            <div >
                                <NavLink to="/report" className={(
                                        {isActive}) => isActive
                                        ? activeClassName
                                        : normalLink}>Report</NavLink>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Navbar;
