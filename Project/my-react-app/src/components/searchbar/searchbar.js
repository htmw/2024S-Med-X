import React, { useRef, useState } from 'react';
import SearchIcon from '../img/icons/search.png';


const Searchbar = () => {

    const searchInputRef = useRef(null);
    const [showSearchOptions, setShowSearchOptions] = useState(false);

    const handleSearchIconClick = () => {
        // Focus on the search input field when the search icon is clicked
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
        // Toggle the search options
        setShowSearchOptions(!showSearchOptions);
    };
    return (
        <form className="flex flex-col justify-start items-start gap-2.5 flex-grow flex-shrink flex-basis-0 self-stretch">
            <div className="inline-flex justify-between items-center p-5 bg-neutral-900 rounded-full h-full w-full ">
                <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search"
                    className="text-zinc-300 w-full text-opacity-30 text-base font-normal font-['Inter'] bg-transparent border-none outline-none  focus:placeholder:text-primary"
                />
                <button className="relative w-[25px] h-[25px] rounded-full" onClick={handleSearchIconClick}>
                    <img src={SearchIcon} alt="Search" />
                </button>

                {/*
                {showSearchOptions && (
                    <div className="absolute top-[calc(100%+5px)] left-0 w-full bg-slate-900 rounded-xl flex-col">
                    
                    </div>
                )}
                */}
            </div>
        </form>
    )
}

export default Searchbar;