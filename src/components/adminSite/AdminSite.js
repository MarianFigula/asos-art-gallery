import React, {useEffect, useState} from "react";
import DataTable from "react-data-table-component";
import SearchIcon from "../../assets/icons/search.svg"
import RefreshIcon from "../../assets/icons/arrow-repeat.svg"
import EditIcon from "../../assets/icons/edit.svg"
import "../../table.css"
import {getColumns} from "../../tableColumns";
import {useNavigate} from "react-router-dom";

export function AdminSite() {
    const [data, setData] = useState([])
    const [dependency, setDependency] = useState(false);

    const [records, setRecords] = useState(data)

    const navigate = useNavigate();

    const editHandler = (row) => {
        navigate(`/user/${row.id}`); // Redirect to the user details page
    };

    const columns = getColumns(editHandler);

    useEffect(() => {
        const serverUrl = process.env.REACT_APP_SERVER_URL
        const fetchData = async () => {
            try {
                const response =
                    await fetch(`${serverUrl}/api/user/read.php`, {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    })

                const result = await response.json();
                setData(result.data);
                setRecords(result.data);
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [dependency])


    const refreshData = () => {
        setDependency(prev => !prev);
    }
    const handleChange = ({selectedRows}) => {
        console.log('Selected Rows: ', selectedRows);
    };

    const handleFilter = (event) => {
        console.log(data)
        const eventValue = event.target.value
        const newData = data.filter(row => {
            return row.id.toString().toLowerCase()
                    .includes(eventValue) ||
                row.email.toLowerCase()
                    .includes(eventValue.toLowerCase()) ||
                row.security_question.toLowerCase()
                    .includes(eventValue.toLowerCase()) ||
                row.security_answer.toLowerCase()
                    .includes(eventValue.toLowerCase());
        });
        setRecords(newData);
    };

    return (
        <>
            <h1 className="text-center mb-4">Administration - Users</h1>
            <div className='table-wrapper'>
                <div className="search-wrapper mb-1">
                    <label htmlFor="search" className="label">
                        <input type="search" id="search" className="input border-15" onChange={handleFilter}
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
                    className="table"
                    selectableRows
                    onSelectedRowsChange={handleChange}
                    pagination
                    fixedHeader
                    persistTableHead
                />
            </div>
        </>
    )
}


// TODO: rewrite to administartion