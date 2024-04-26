'use client'

import React, { useRef, useState, useEffect } from 'react';
import { FaSearch } from "react-icons/fa";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import StatusButton from '../button/StatusButton';
import { db } from '../../firebase'; 

import { useNavigate } from 'react-router-dom'; //useLocation

const Searchbar = () => {
    const searchInputRef = useRef(null);
    const [showSearchOptions, setShowSearchOptions] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [xrayData, setXrayData] = useState([]);

    const navigate = useNavigate();
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'X-ray'), (snapshot) => {
            const xrays = snapshot.docs.map(doc => {
                const data = doc.data();
                const { medical_term, p_id, scan_date, status } = data;
                const { id } = doc;
                const scanFormattedDate = scan_date && typeof scan_date.toDate === 'function' ? scan_date.toDate().toLocaleDateString() : '';
                const searchStatus = data.status === '0' ? 'Reviewing' : 'Reviewed'; // Fixed the assignment here
                return { id, medical_term, p_id, scanFormattedDate, status, searchStatus }; // Added searchStatus to return object
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
            ) || xray.id.toLowerCase().includes(searchTerm.toLowerCase() || xray.searchStatus)
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

    const handleNavigate=(reportId)=>{
        console.log(reportId)
navigate(`/reportdetails/${reportId}`)
setSearchResults([]);
    }
    return (
        <form className="h-full w-full bg-neutral-900 rounded-[20px] flex-col justify-start items-start inline-flex z-40">
            {/* X-ray data section */}
           

            {/* Search bar */}
            <div className="inline-flex justify-between items-center p-5 bg-primary rounded-[30px] h-full w-full">
                <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search your report id, medical term, date or status"
                    className="text-customBasewhite w-full text-base font-normal font-['Inter'] bg-transparent border-none outline-none placeholder:text-customBasewhite-30 focus:placeholder:invisible"
                    onChange={(e) => handleSearch(e)}
                />
                <button className="relative  rounded-full" onClick={handleSearchIconClick}>
                    <div className='w-25 h-25 text-customBasewhite-30 hover:text-white'>
                        <FaSearch />
                    </div>
                </button>
            </div>
            <div className='mt-3 bg-neutral-900 rounded-[20px] w-full h-[300px] '>
            {searchTerm && searchResults.length > 0 && (
                <div className="max-h-[400px] w-full bg-neutral-900 rounded-[20px] flex-col justify-start items-start inline-flex overflow-scroll no-scrollbar " >
                    {searchResults.map((xray, index) => (
                        <div key={index} className="self-stretch p-5 bg-neutral-900 rounded-[20px] justify-between items-center inline-flex hover:bg-slate-700" onClick={() => handleNavigate(xray.id)}>
                            <div className="h-[19px] justify-center items-center gap-5 flex">
                                <div className="text-white text-base font-normal font-['Inter']">{xray.id}</div>
                                <div className="text-indigo-300 text-base font-normal font-['Inter']">{xray.medical_term}</div>
                            </div>
                            <div className="justify-end items-center gap-5 flex">
                            
      <StatusButton status={xray.status} />
                                <div className="text-emerald-200 text-base font-normal font-['Inter'] ">{xray.scanFormattedDate}</div>
                               
                            </div>
                        </div>
                    ))}
                </div>
            )}
            </div>
        </form>
    );
};

export default Searchbar;






