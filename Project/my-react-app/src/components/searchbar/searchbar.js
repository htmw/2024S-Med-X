'use client'

import React, { useRef, useState, useEffect } from 'react';
import { FaSearch } from "react-icons/fa";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";

const firebaseConfig = {
    //Firebase configuration
    apiKey: "AIzaSyBVe1Rjk5oFHP57-ZRgG9nm-S62hZZQpd4",
    authDomain: "med-x-5f2b4.firebaseapp.com",
    databaseURL: "https://med-x-5f2b4-default-rtdb.firebaseio.com",
    projectId: "med-x-5f2b4",
    storageBucket: "med-x-5f2b4.appspot.com",
    messagingSenderId: "9302046680",
    appId: "1:9302046680:web:38444a4847e45702f664ad",
    measurementId: "G-LR1NET7P9R"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Searchbar = () => {
    const searchInputRef = useRef(null);
    const [showSearchOptions, setShowSearchOptions] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [xrayData, setXrayData] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'X-ray'), (snapshot) => {
            const xrays = snapshot.docs.map(doc => {
                const data = doc.data();
                const { medical_term, p_id, scan_date } = data;
                const { id } = doc;
                const scanFormattedDate = scan_date && typeof scan_date.toDate === 'function' ? scan_date.toDate().toLocaleDateString() : '';
                return { id, medical_term, p_id, scanFormattedDate };
            });
            setXrayData(xrays);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setSearchResults([]);
            return;
        }

        const results = xrayData.filter(xray =>
            Object.values(xray).some(value =>
                value !== undefined && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            ) || xray.id.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results);
    }, [searchTerm, xrayData]);

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
    };

    const handleSearchIconClick = (event) => {
        event.preventDefault();
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
        setShowSearchOptions(!showSearchOptions);
    };

    return (
        <form className="h-full w-full bg-neutral-900 rounded-[20px] flex-col justify-start items-start inline-flex">
            {/* X-ray data section */}
            {searchTerm && searchResults.length > 0 && (
                <div className="h-full w-full bg-neutral-900 rounded-[20px] flex-col justify-start items-start inline-flex">
                    {searchResults.map((xray, index) => (
                        <div key={index} className="self-stretch p-5 bg-neutral-900 rounded-[20px] justify-between items-center inline-flex">
                            <div className="h-[19px] justify-center items-center gap-5 flex">
                                <div className="text-white text-base font-normal font-['Inter']">{xray.id}</div>
                                <div className="text-indigo-300 text-base font-normal font-['Inter']">{xray.medical_term}</div>
                            </div>
                            <div className="justify-end items-center gap-5 flex">
                                <div className="text-emerald-200 text-base font-normal font-['Inter']">{xray.scanFormattedDate}</div>
                                {/* Add status */}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Search bar */}
            <div className="inline-flex justify-between items-center p-5 bg-primary rounded-[30px] h-full w-full">
                <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search"
                    className="text-customBasewhite w-full text-base font-normal font-['Inter'] bg-transparent border-none outline-none placeholder:text-customBasewhite-30 focus:placeholder:invisible"
                    onChange={(e) => handleSearch(e)}
                />
                <button className="relative  rounded-full" onClick={handleSearchIconClick}>
                    <div className='w-25 h-25 text-customBasewhite-30 hover:text-white'>
                        <FaSearch />
                    </div>
                </button>
            </div>
        </form>
    );
};

export default Searchbar;






