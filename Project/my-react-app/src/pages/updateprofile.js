import React from 'react'
import Navbar from '../components/navbar/navbar';
import Submain from '../components/submain/submain';
import Footer from '../components/footer/footer';
import Topbar from '../components/topbar/topbar';
import Searchbar from '../components/searchbar/searchbar';
import Notification from '../components/notification/notification';
import Profile from '../components/profile/profile';

const updateprofile = () => {



    return (

        <div className="h-screen bg-secondary justify-center items-center inline-flex">

            <Navbar />
            <div className="w-[1134px] h-[822px] p-[30px] flex-col justify-start items-start gap-2.5 inline-flex">
                <div className="justify-start items-center gap-2.5 inline-flex">
                    <div className="w-[150px] h-[150px] bg-zinc-300 rounded-[100px]" />
                    <div className="flex-col justify-center items-start gap-2.5 inline-flex">
                        <div className="text-white text-5xl font-normal font-['Inter']">Profile Update</div>
                        <div className="text-white text-base font-normal font-['Inter']">Dr. Name</div>
                    </div>
                </div>
                <div className="self-stretch h-[377px] flex-col justify-center items-center gap-2.5 flex">
                    <div className="flex-col justify-center items-center gap-5 flex">
                        <div className="self-stretch justify-start items-center gap-5 inline-flex">
                            <div className="flex-col justify-center items-start gap-5 inline-flex">
                                <div className="text-white text-base font-normal font-['Inter']">First Name</div>
                                <div className="w-[300px] h-[50px] p-2.5 bg-white rounded-[15px]" />
                            </div>
                            <div className="flex-col justify-center items-start gap-5 inline-flex">
                                <div className="text-white text-base font-normal font-['Inter']">Last Name</div>
                                <div className="w-[300px] h-[50px] p-2.5 bg-white rounded-[15px]" />
                            </div>
                        </div>
                        <div className="self-stretch justify-start items-center gap-5 inline-flex">
                            <div className="flex-col justify-center items-start gap-5 inline-flex">
                                <div className="text-white text-base font-normal font-['Inter']">Date of Birth</div>
                                <div className="w-[300px] h-[50px] p-2.5 bg-white rounded-[15px]" />
                            </div>
                            <div className="flex-col justify-center items-start gap-5 inline-flex">
                                <div className="text-white text-base font-normal font-['Inter']">Sex</div>
                                <div className="w-[300px] h-[50px] p-2.5 bg-white rounded-[15px]" />
                            </div>
                        </div>
                        <div className="self-stretch justify-start items-center gap-5 inline-flex">
                            <div className="flex-col justify-center items-start gap-5 inline-flex">
                                <div className="text-white text-base font-normal font-['Inter']">Contact Number</div>
                                <div className="w-[300px] h-[50px] p-2.5 bg-white rounded-[15px]" />
                            </div>
                            <div className="flex-col justify-center items-start gap-5 inline-flex">
                                <div className="text-white text-base font-normal font-['Inter']">E-mail</div>
                                <div className="w-[300px] h-[50px] p-2.5 bg-white rounded-[15px]" />
                            </div>
                        </div>
                        <div className="w-[150px] h-[50px] p-2.5 bg-black bg-opacity-20 rounded-[15px] flex-col justify-center items-center gap-2.5 flex">
                            <div className="text-center text-white text-base font-normal font-['Inter']">Submit</div>
                        </div>
                    </div>
                </div>
            </div>
            <Submain />


            {/* <Test/> */}
        </div>



    );
};

export default updateprofile