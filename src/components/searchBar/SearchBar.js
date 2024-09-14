import React from "react";


export function SearchBar({searchId,handleFilter, searchIcon}){

    return (
        <>
            <label htmlFor={searchId} className="label">
                <input type="search"
                       id={searchId}
                       className="input border-15"
                       onChange={handleFilter}
                       placeholder="Search"/>
                <img
                    src={searchIcon}
                    alt="Search Icon"
                    className="search-icon"/>
            </label>
        </>
    )
}