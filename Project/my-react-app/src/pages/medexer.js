import React from 'react';

const Medexer = () => {
    return (
        <div className="text-green p-3 h-full flex-col justify-start items-start gap-2.5 inline-flex">
           
    <div className="self-stretch grow shrink basis-0 p-2.5 rounded-[20px] border-2 border-zinc-300 border-opacity-30 flex-col justify-center items-center gap-5 flex">
        <div className="w-[200px] h-[200px] relative bg-black bg-opacity-0" />
        <div className="text-zinc-300 text-opacity-30 text-[32px] font-normal font-['Inter']">Drag & Drop to Upload Chest X-ray </div>
        <div className="px-5 py-2.5 bg-white bg-opacity-80 rounded-[10px] justify-start items-start gap-2.5 inline-flex">
            <div className="text-neutral-900 text-2xl font-normal font-['Inter']">Browse File</div>
        </div>
        <div className="text-zinc-300 text-opacity-30 text-base font-normal font-['Inter']">Supported File formats: .png, .jpeg, .svg</div>
    </div>
</div>
    );
};

export default Medexer;
