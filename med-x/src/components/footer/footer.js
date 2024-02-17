import React from 'react';

export const Footer = () => {
    return (
        <div className="w-full h-[58px] rounded-[10px] justify-start items-start gap-2.5 inline-flex">
            <div className="grow shrink basis-0 h-[58px] p-2.5 bg-neutral-900 rounded-[10px] justify-center items-center gap-2.5 flex">
                <div className="grow shrink basis-0 self-stretch bg-neutral-900 text-center text-zinc-300 text-opacity-30 text-base font-normal font-['Inter']">copyright Med-X AI</div>
            </div>
        </div>



    );

};


export default Footer;