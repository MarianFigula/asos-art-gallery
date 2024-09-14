import React from "react";
import SearchIcon from "../../assets/icons/search.svg";
import RefreshIcon from "../../assets/icons/arrow-repeat.svg";
import DataTable from "react-data-table-component";
import {SearchBar} from "../searchBar/SearchBar";


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
                <SearchBar searchId={searchId}
                           handleFilter={handleFilter}
                />
                <button
                    onClick={refreshData}
                    className="button-refresh">

                    <img src={RefreshIcon} alt="Refresh Icon"/>
                </button>
            </div>

            <DataTable
                columns={columns}
                data={records}
                className="table mb-2"
                selectableRows
                onSelectedRowsChange={handleChange}
                pagination
                persistTableHead
            />
        </div>
    )
}