import React, { useState, useRef, useEffect } from 'react';
import Uploadimg from "../components/img/upload.png";
import storage from "../firebase.js";
import { ref, listAll, getDownloadURL, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

const Medexer = () => {
    const [fileData, setFileData] = useState({ previewFile: null, errorMessage: '' });
    const fileInputRef = useRef(null);
    const [isDraggingOver, setIsDraggingOver] = useState(false);
    const [imageList, setImageList] = useState([]);

    const imageListRef = ref(storage, "images/");


    const openFileDialog = () => {
        fileInputRef.current.click();
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDraggingOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDraggingOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDraggingOver(false);

        const droppedFiles = Array.from(e.dataTransfer.files);
        const file = droppedFiles[0]; // Assuming only one file is dropped

        checkFileType(file);
    };

    const checkFileType = (file) => {
        // Check if file type is supported
        if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
            setFileData({ ...fileData, errorMessage: 'Unsupported file format. Please upload a .png or .jpeg file.' });
            return;
        }
        const reader = new FileReader();
        reader.onload = (event) => {
            setFileData({ ...fileData, previewFile: { name: file.name, type: file.type, size: file.size, dataURL: event.target.result } });
        };
        reader.readAsDataURL(file);
    };

    const deletePreviewFile = () => {
        setFileData({ ...fileData, previewFile: null, errorMessage: '' });
    };

    const formatBytesToMB = (bytes) => {
        if (bytes === 0) return '0 MB';

        const mbSize = bytes / (1024 * 1024);
        return mbSize.toFixed(2) + ' MB';
    };

    const uploadImage = () => {
        if (fileData.previewFile === null) return;

        const imageRef = ref(storage, `images/${fileData.previewFile.name + v4()}`);
        const metadata = {
            contentType: fileData.previewFile.type, // Set the content type to the file type
        };

        /*
        uploadBytes(imageRef, fileData.previewFile, metadata).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageList((prev) => [...prev, url]);
            });
            alert("Image uploaded successfully!");
        });
    };
    */
        const uploadTask = uploadBytes(imageRef, fileData.previewFile, metadata);

        uploadTask.then((snapshot) => {
            // Handle successful upload
            getDownloadURL(snapshot.ref).then((url) => {
                setImageList((prev) => [...prev, url]);
            });
            alert('Image uploaded successfully!');
        }).catch((error) => {
            // Handle errors
            console.error('Error uploading image:', error);
        });
    };

    useEffect(() => {
        listAll(imageListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageList((prev) => [...prev, url]);
                });
            });
        });
    }, [imageListRef, setImageList]);



    return (
        <div className='w-full h-full flex flex-col justify-center items-center'>
            {fileData.errorMessage && (
                <div className="bg-red-500 text-white p-3 mb-3 rounded">
                    {fileData.errorMessage}
                    <button onClick={() => setFileData({ ...fileData, errorMessage: '' })} className="ml-2 font-semibold">Close</button>
                </div>
            )}
            {fileData.previewFile ? (
                <div className='flex-row inline-flex p-3 text-white gap-5 items-start'>
                    <div id="Preview" className="p-3 h-full flex-col justify-center items-center inline-flex gap-5">
                        <div className="flex-col justify-center items-center flex w-[200px] h-[300px]">
                            <img src={fileData.previewFile.dataURL} alt="Preview" className="w-full h-full object-cover bg-white rounded-[10px]" />
                        </div>
                        <div className='text-white'>
                            <p className='italic'>{fileData.previewFile.name}</p>
                            <p className='text-xs italic'>{formatBytesToMB(fileData.previewFile.size)}</p>
                        </div>
                    </div>
                    <div className='inline-flex flex-col gap-5 items-start justify-around h-full'>
                        <div className='inline-flex flex-col gap-5 items-start justify-start'>
                            <p className='text-xl'>Instruct</p>
                            <p className='inline-flex flex-col gap-5'>
                                Quis tempor aliquip elit ipsum adipisicing.<br />
                                Quis tempor aliquip elit ipsum adipisicing.<br />
                                Quis tempor aliquip elit ipsum adipisicing.<br />
                                Quis tempor aliquip elit ipsum adipisicing.<br />
                                Quis tempor aliquip elit ipsum adipisicing.<br />
                            </p>
                        </div>
                        <div className='inline-flex flex-row gap-5'>
                            <div className='group  '>
                                <button className="group-hover:bg-slate-700 px-5 py-2.5 text-primary bg-white bg-opacity-80 rounded-[5px] justify-start items-start gap-2.5 inline-flex active:bg-green-700 focus:ring focus:ring-gray-700" onClick={deletePreviewFile}>
                                    <div className='group-hover:text-white'>Re-upload</div>
                                </button>
                            </div>
                            <div className='group  '>
                                <button className="group-hover:bg-slate-700 px-5 py-2.5 text-primary bg-white bg-opacity-80 rounded-[5px] justify-start items-start gap-2.5 inline-flex active:bg-green-700 focus:ring focus:ring-gray-700" onClick={uploadImage} >
                                    <div className='group-hover:text-white'>Submit</div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div id="DragNDrop" className={`text-green p-3 h-full w-full flex-col justify-start items-start gap2.5 inline-flex ${isDraggingOver ? 'border-4 border-blue-500' : ''}`} onDragOver={handleDragOver} onDrop={handleDrop} onDragLeave={handleDragLeave}>
                    <div className="self-stretch grow shrink basis-0 p-2.5 rounded-[10px] border-dotted border-2 border-zinc-300 border-opacity-30 flex-col justify-center items-center gap-5 flex">
                        <img className="" src={Uploadimg} alt='' />
                        <div className="text-zinc-300 text-opacity-30 text-lg font-normal font-['Inter']">Drag & Drop to Upload Chest X-ray</div>
                        <input
                            id="fileInput"
                            ref={fileInputRef}
                            type="file"
                            style={{ display: 'none' }}
                            onChange={(e) => checkFileType(e.target.files[0])}
                        />
                        <div className='group'>
                            <button className="group-hover:bg-slate-700 px-5 py-2.5 text-primary bg-white bg-opacity-80 rounded-[5px] justify-start items-start gap-2.5 inline-flex active:bg-green-700 focus:ring focus:ring-gray-700" onClick={openFileDialog}>
                                <div className='group-hover:text-white'>Browse</div>
                            </button>
                        </div>
                        <div className="text-zinc-300 text-opacity-30 text-base font-normal font-['Inter']">Supported File formats: .png, .jpeg</div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Medexer;
