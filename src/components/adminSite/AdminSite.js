import React, {useEffect, useState} from "react";
import "../../table.css"
import {getUserColumns} from "../../assets/table-columns/tableUserColumns";
import {useNavigate} from "react-router-dom";
import {Table} from "../table/Table";

export function AdminSite() {
    const [data, setData] = useState([])
    const [records, setRecords] = useState(data)

    const navigate = useNavigate();

    const editHandler = (row) => {
        navigate(`/admin-edit-user/${row.id}`, {
            state: { username: row.username, email: row.email }
        });
    };

    const columns = getUserColumns(editHandler);

    const fetchData = async () => {
        const serverUrl = process.env.REACT_APP_SERVER_URL
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

    useEffect(() => {
        fetchData()
    }, [])


    const refreshData = () => {
        fetchData()
    }
    const handleChange = ({selectedRows}) => {
        console.log('Selected Rows: ', selectedRows);
    };

    // todo: dat eventValue hned toLowerCase()
    const handleFilter = (event) => {
        const eventValue = event.target.value
        const newData = data.filter(row => {
            return row.id.toString().toLowerCase()
                    .includes(eventValue) ||
                row.username.toLowerCase()
                    .includes(eventValue.toLowerCase()) ||
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
            <h1 className="text-center mb-4 mt-9">Administration - Users</h1>
            <Table
                columns={columns}
                records={records}
                handleFilter={handleFilter}
                handleChange={handleChange}
                refreshData={refreshData}
            />
        </>
    )
}