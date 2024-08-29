import React, {useEffect, useState} from "react";
import DataTable from "react-data-table-component";

export function AdminSite() {
    const columns = [
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
            }catch (error) {
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
        const newData = data.filter(row => {
            return row.email.toLowerCase()
                    .includes(event.target.value.toLowerCase()) ||
                row.security_question.toLowerCase()
                    .includes(event.target.value.toLowerCase()) ||
                row.security_answer.toLowerCase()
                    .includes(event.target.value.toLowerCase());
        });
        setRecords(newData);
    };

    return (
        <div className=''>
            <button onClick={refreshData}>RefreshData</button>
            <div className='input'>
                <input type="text" onChange={handleFilter}/></div>
            <DataTable
                columns={columns}
                data={records}
                selectableRows
                onSelectedRowsChange={handleChange}
                pagination
                fixedHeader
            />
        </div>
    )
}