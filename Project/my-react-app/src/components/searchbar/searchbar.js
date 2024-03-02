'use client'

import React, { useRef, useState } from 'react';
// import SearchIcon from '../img/icons/search.png';
import { FaSearch } from "react-icons/fa";
import {numbers} from "../../Data/data.js";

const Searchbar = () => {
    const searchInputRef = useRef(null);
    const [showSearchOptions, setShowSearchOptions] = useState(false);

    const [activeSearch, setActiveSearch]=useState([])

    const handleSearch = (e) => {
        if(e.target.value === '') {
            setActiveSearch([])
            return false;
        }

        setActiveSearch(numbers.filter(n => n.toString().includes(e.target.value)).slice(0, 8))
    }

    const handleSearchIconClick = (event) => {
        event.preventDefault();
        // Focus on the search input field when the search icon is clicked
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
        // Toggle the search options
        setShowSearchOptions(!showSearchOptions);
    };

    return (
        <form className="flex flex-col justify-start items-start gap-2.5 flex-grow flex-shrink flex-basis-0 self-stretch">
            <div className="inline-flex justify-between items-center p-5 bg-primary rounded-[30px] h-full w-full">
                <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search"
                    className="text-customBasewhite w-full text-base font-normal font-['Inter'] bg-transparent border-none outline-none placeholder:text-customBasewhite-30 focus:placeholder:invisible" onChange={(e) => handleSearch(e)} 
                />
                <button className="relative  rounded-full" onClick={handleSearchIconClick}>
                <div className='w-25 h-25 text-customBasewhite-30 hover:text-white'>
    <FaSearch />
</div>
                </button>
                </div>

                {
                    activeSearch.length > 0 && (
                        //absolute top-full right-2 mt-1  w-48 bg-primary shadow-lg rounded-lg
                        //justify-between items-center p-5 top-20 bg-slate-900 text-white w-full rounded-xl left-1/2 -translate-x-1/2 flex flex-col gap-2
                        <div className="absolute top-20 items-center p-5 bg-primary rounded-full w-full text-white flex flex-col gap-2 -translate-x-1" >
                          {
                            activeSearch.map(s => (
                                <span>{s}</span>

                            ))
                          }  
            </div>
                    )
                }
                
           
            
        </form>
    );
};

export default Searchbar;
