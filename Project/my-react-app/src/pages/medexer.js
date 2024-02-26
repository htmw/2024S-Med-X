import React from 'react';
import uploadimg from '../components/img/upload.png';
const Medexer = () => {
    return (
        <div
            className=" p-3 h-full flex-col justify-start items-start gap-2.5 inline-flex">

            <div
                className="self-stretch grow shrink basis-0 p-2.5 rounded-[10px] border-dotted border-2 border-zinc-300 border-opacity-30 flex-col justify-center items-center gap-5 flex">
                <div>
                    <div className="w-[200px] h-[200px] justify-center items-center inline-flex">
                        <img className="" src={uploadimg}/>
                    </div>
                    <div
                        className="text-zinc-300 text-opacity-30 text-lg font-normal font-['Inter']">Drag & Drop to Upload Chest X-ray
                    </div>
                </div>
                <div
                    className="px-5 py-2.5 bg-white bg-opacity-80 rounded-[5px] justify-start items-start gap-2.5 inline-flex">
                    <div className="text-neutral-900 font-normal font-['Inter']">Browse File</div>
                </div>
                <div
                    className="text-zinc-300 text-opacity-30 text-base font-normal font-['Inter']">Supported File formats: .png, .jpeg, .svg</div>
            </div>
        </div>
    );
};

export default Medexer;
