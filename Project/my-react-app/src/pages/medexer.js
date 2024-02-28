import React, { useState } from 'react'
import Uploadimg from "../components/img/upload.png";

const Medexer = () => {
    const [isDraggingOver, setIsDragginOver] = useState(false);
    const [previewFile, setPreviewFile] = useState(null);

    const handlingFileUpload = () => {
        const fileInput = document.getElementById('fileInput');
        fileInput.click();
    }

    const handlingDragOver = (e) => {
        e.preventDefault();
        setIsDragginOver(true);
    };
    const handlingDragLeave = (e) => {
        e.preventDefault();
        setIsDragginOver(false);
    };

    const handlingDrop = (e) => {
        e.preventDefault();
        setIsDragginOver(false);

        //logic for drag and drop file
        const droppedFiles = Array.from(e.dataTransfer.files);
        const file = droppedFiles[0]; // Assuming only one file is dropped

        const reader = new FileReader();
        reader.onload = (event) => {
            setPreviewFile({
                name: file.name,
                type: file.type,
                size: file.size,
                dataURL: event.target.result
            });
        };
        reader.readAsDataURL(file);
    }

    const deletePreviewFile = () => {
        setPreviewFile(null);
    }

    return (
        <div className={`text-green p-3 h-full flex-col justify-start items-start gap2.5 inline-flex ${isDraggingOver ? 'border-4 border-blue-500' : ''}`}
            onDragOver={handlingDragOver}
            onDrop={handlingDrop}
            onDragLeave={handlingDragLeave}
        >
            <div className="self-stretch grow shrink basis-0 p-2.5 rounded-[10px] border-dotted border-2 border-zinc-300 border-opacity-30 flex-col justify-center items-center gap-5 flex">
                <div className="w-[200px] h-[200px] relative bg-black bg-opacity-0">
                    {previewFile && (
                        <div>
                            <img src={previewFile.dataURL} alt="Preview" className="w-full h-full object-cover" />
                            <button className="px-5 py-2.5 bg-white bg-opacity-80 rounded-[5px] justify-start items-start gap-2.5 inline-flex hover:bg-green-600 active:bg-green-700 focus:ring focus:ring-gray-700" onClick={deletePreviewFile}>Delete File</button>
                        </div>
                    )}
                </div>
                <img className="" src={Uploadimg} alt=''/>

                <div className="text-zinc-300 text-opacity-30 text-lg font-normal font-['Inter']">Drag & Drop to Upload Chest X-ray </div>
                <input
                    id="fileInput"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={(e) => {
                        const file = e.target.files[0];

                        const reader = new FileReader();
                        reader.onload = (event) => {
                            setPreviewFile({
                                name: file.name,
                                type: file.type,
                                size: file.size,
                                dataURL: event.target.result
                            });
                        };
                        reader.readAsDataURL(file);
                    }}
                />
                <button className="px-5 py-2.5 bg-white bg-opacity-80 rounded-[5px] justify-start items-start gap-2.5 inline-flex hover:bg-green-600 active:bg-green-700 focus:ring focus:ring-gray-700" onClick={handlingFileUpload}>
                    <div className="text-neutral-900 font-normal font-['Inter']">Browse File</div>
                </button>
                <div className="text-zinc-300 text-opacity-30 text-base font-normal font-['Inter']">Supported File formats: .png, .jpeg</div>
            </div>
        </div>
    )
}

export default Medexer;
