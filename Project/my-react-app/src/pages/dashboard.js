import React from 'react';

const Dashboard = () => {
    return (
        <div
            className=" h-full flex-col   inline-flex gap-10 pl-5 pr-5 pt-5">
            <div className='flex-col  items-start inline-flex gap-5'>
                <div className="text-center text-white text-4xl font-normal font-['Inter']">Dashboard</div>

            </div>
            <div className="justify-center items-center gap-10 inline-flex p-5">

                <div className="self-stretch flex-col justify-start items-start inline-flex">

                    <div
                        className="flex-col justify-center items-start gap-5 flex w-[200px] h-[300px]">
                        <img
                            className="rounded-[10px] object-cover w-full h-full"
                            src="https://via.placeholder.com/200x600"
                            alt="Placeholder"/>
                    </div>
                </div>
                <div
                    className="grow shrink basis-0 self-stretch flex-col justify-center items-center gap-5 inline-flex">
                    <div
                        className=" w-1/2 self-stretch h-12 justify-between items-center inline-flex">
                        <div className="text-center  text-customPurple text-3xl font-normal font-['Inter']">Results</div>

                        <div className=" text-customGreen font-normal font-['Inter']">18th January 2014 4:30pm</div>
                    </div>
                    <div className="self-stretch  flex-col justify-start items-start  flex">
                        <div
                            className="text-center text-customPurple  text-xl font-normal font-['Inter']">Hernia</div>
                        <div
                            className="self-stretch text-justify text-white font-normal font-['Inter'] text-wrap w-1/2">Horem
                            ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                            dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus
                            sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget
                            condimentum velit</div>
                    </div>
                    <div className="self-stretch  flex-col justify-start items-start  flex">
                        <div
                            className="text-center text-customPurple  text-xl font-normal font-['Inter']">Doctors Message:</div>
                        <div
                            className="self-stretch text-justify text-white font-normal font-['Inter'] text-wrap w-1/2">Horem
                            ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie,
                            condimentum velit</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
