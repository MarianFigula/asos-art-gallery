// src/components/tableUserColumns.js
import EditIcon from "../icons/edit.svg";

export const getReviewColumns = (editHandler) => [
    {
        name: "Id",
        selector: row => row.id,
        sortable: true,
    },
    {
        name: "Review Text",
        selector: row => row.review_text,
        sortable: true,
    },
    {
        name: 'Rating',
        selector: row => row.rating,
        sortable: true,
    },
    {
        name: 'Date',
        selector: row => row.date,
        sortable: true
    },
    {
        name: "Edit",
        cell: (row) => <button className="button-edit" onClick={() => editHandler(row)}>
            <img src={EditIcon} alt="Edit Icon"/>
        </button>
    }
];