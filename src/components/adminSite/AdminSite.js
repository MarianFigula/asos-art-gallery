import React, {useEffect, useState} from "react";
import DataTable from "react-data-table-component";
import SearchIcon from "../../assets/icons/search.svg"
import "../../table.css"

export function AdminSite() {
    const columns = [
        {
            name: "Id",
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Security Question',
            selector: row => row.security_question,
            sortable: true
        },
        {
            name: "Security Answer",
            selector: row => row.security_answer,
            sortable: true
        }
    ]

    const [data, setData] = useState([])
    const [dependency, setDependency] = useState(false);

    const [records, setRecords] = useState(data)

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
        <div className='table-wrapper'>
            <div className="search-wrapper">
                <label htmlFor="search" className="label">
                    <input type="search" id="search" className="input border-15" onChange={handleFilter}
                           placeholder="Search"/>
                    <img src={SearchIcon} alt="Refresh Icon" className="search-icon"/>
                </label>
                <button onClick={refreshData}>Refresh</button>
            </div>

            <DataTable
                columns={columns}
                data={records}
                selectableRows
                onSelectedRowsChange={handleChange}
                pagination
                fixedHeader
                persistTableHead
            />
        </div>
    )
}


// TODO: rewrite to administartion