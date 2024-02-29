import React, { useRef, useState } from 'react';
// import SearchIcon from '../img/icons/search.png';
import { FaSearch } from "react-icons/fa";

const Searchbar = () => {
    const searchInputRef = useRef(null);
    const [showSearchOptions, setShowSearchOptions] = useState(false);

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
            <div className="inline-flex justify-between items-center p-5 bg-neutral-900 rounded-full h-full w-full">
                <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search"
                    className="text-customBasewhite-30 w-full text-base font-normal font-['Inter'] bg-transparent border-none outline-none  focus:placeholder:text-primary"
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
