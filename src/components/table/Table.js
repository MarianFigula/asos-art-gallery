import React from "react";
import SearchIcon from "../../assets/icons/search.svg";
import RefreshIcon from "../../assets/icons/arrow-repeat.svg";
import DataTable from "react-data-table-component";


export function Table({
                          columns,
                          records,
                          handleFilter,
                          handleChange,
                          refreshData,
                          searchId
                      }) {

    return (
        <div className='table-wrapper'>
            <div className="search-wrapper mb-1">
                <label htmlFor={searchId} className="label">
                    <input type="search" id={searchId} className="input border-15" onChange={handleFilter}
                           placeholder="Search"/>
                    <img src={SearchIcon} alt="Search Icon" className="search-icon"/>
                </label>
                <button
                    onClick={refreshData}
                    className="button-refresh">

                    <img src={RefreshIcon} alt="Refresh Icon"/>
                </button>
            </div>

            <DataTable
                columns={columns}
                data={records}
                className="table mb-5"
                selectableRows
                onSelectedRowsChange={handleChange}
                pagination
                persistTableHead
            />
        </div>
    )
}