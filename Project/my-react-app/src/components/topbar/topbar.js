import React from 'react';

const Topbar = () => {
    return (
        <div className="w-full h-[90px] justify-between items-center inline-flex">
        <div className="grow shrink basis-0 self-stretch p-2.5 flex-col justify-start items-start gap-2.5 inline-flex">
            <div className="self-stretch grow shrink basis-0 p-5 bg-neutral-900 rounded-[10px] justify-between items-center inline-flex">
                <div className="text-zinc-300 text-opacity-30 text-base font-normal font-['Inter']">Search</div>
                <div className="w-[25px] h-[25px] relative" />
            </div>
        </div>
        <div className="p-2.5 bg-primary rounded-[100px] justify-center items-center gap-2.5 flex">
            <div className="w-[50px] h-[50px] flex-col justify-center items-center gap-2.5 inline-flex">
                <div className="w-[5px] h-[5px] bg-gradient-to-b from-emerald-200 via-indigo-300 to-slate-600 rounded-full" />
            </div>
        </div>
        <div className="w-[90px] h-[90px] p-2.5 rounded-[10px] justify-start items-center gap-2.5 flex">
            <div className="grow shrink basis-0 self-stretch justify-start items-center gap-2.5 flex">
                <div className="grow shrink basis-0 self-stretch bg-black bg-opacity-30 rounded-full shadow-inner" />
            </div>
        </div>
    </div>
    );
};

export default Topbar;
