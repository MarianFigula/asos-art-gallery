import React, {useState} from "react";
import DataTable from "react-data-table-component";
export function AdminSite() {
    const columns = [
        {
            name: 'Title',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true
        },
        {
            name: "Age",
            selector: row => row.age
        }
    ]

    const data = [
        {
            id: 1,
            name: 'Majo',
            email: "majo@azet.sk",
            age: 13
        },
        {
            id: 2,
            name: 'Anna',
            email: "Anna@gmail.sk",
            age: 12
        },
        {
            id: 3,
            name: 'jozo',
            email: "jozo@email.sk",
            age: 12
        },
        {
            id: 4,
            name: 'samo',
            email: "samo@centrum.sk",
            age: 12
        },{
            id: 3,
            name: 'jozo',
            email: "jozo@email.sk",
            age: 12
        },
        {
            id: 4,
            name: 'samo',
            email: "samo@centrum.sk",
            age: 12
        },
    ]

    const [records,setRecords] = useState(data)
    const handleChange = ({ selectedRows }) => {
        // You can set state or dispatch with something like Redux so we can use the retrieved data
        console.log('Selected Rows: ', selectedRows);
    };

    const handleFilter = (event) => {
        const newData = data.filter(row => {
            return row.name.toLocaleLowerCase()
                .includes(event.target.value.toLocaleLowerCase())
            || row.email.toLocaleLowerCase()
                    .includes(event.target.value.toLocaleLowerCase())
            || row.age.toString().toLowerCase()
                    .includes(event.target.value.toString()
                        .toLowerCase())
        })
        setRecords(newData)
    }

    return (
        <div className=''>
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