import React from 'react';

const MedexerOne = () => {
    return (
        <div className="w-[1134px] h-[822px] p-[30px] flex-col justify-start items-start gap-2.5 inline-flex">
    <div className="self-stretch justify-between items-center inline-flex">
        <div className="text-center text-white text-[64px] font-normal font-['Inter']">Medxer</div>
        <div className="text-center text-white text-4xl font-normal font-['Inter']">X-ray ID: #234456</div>
    </div>
    <div className="self-stretch py-5 justify-between items-center inline-flex">
        <div className="grow shrink basis-0 h-[70px] justify-center items-center gap-5 flex">
            <div className="grow shrink basis-0 h-[70px] relative">
            </div>
            <div className="w-[150px] h-[50px] p-2.5 bg-sky-800 rounded-[10px] flex-col justify-center items-center gap-5 inline-flex">
                <div className="text-white text-2xl font-normal font-['Inter']">Analyzing</div>
            </div>
            <div className="w-[25px] h-[25px] relative bg-black bg-opacity-0" />
        </div>
    </div>
    <div className="self-stretch grow shrink basis-0 py-5" />
    <div className="self-stretch p-5 opacity-60 justify-end items-center gap-2.5 inline-flex">
        <div className="px-5 py-2.5 bg-black bg-opacity-20 rounded-[10px] justify-start items-start gap-2.5 flex">
            <div className="text-center text-white text-2xl font-normal font-['Inter']">Download Report</div>
        </div>
        <div className="px-5 py-2.5 bg-white bg-opacity-80 rounded-[10px] justify-start items-start gap-2.5 flex">
            <div className="text-center text-neutral-900 text-2xl font-normal font-['Inter']">Upload New Scan</div>
        </div>
    </div>
</div>
    );
};

export default MedexerOne;