import React, {useState} from "react";
import {getArtColumns} from "../../assets/table-columns/tableArtColumns";
import {getReviewColumns} from "../../assets/table-columns/tableReviewColumns";
import {Table} from "../table/Table";
import {Link} from "react-router-dom";
import {Form} from "../form/Form";
import {FormInput} from "../formInput/FormInput";
import "./EditUserAdmin.css"

// admin page
export function EditUserAdmin() {

    const [artData, setArtData] = useState([])
    const [artRecords, setArtRecords] = useState(artData)

    const [reviewData, setReviewData] = useState([])
    const [reviewRecords, setReviewRecords] = useState(reviewData)
    const [error, setError] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")

    const editArtsHandler = (row) => {
        console.log(row)
        // display modal s formom pre upravu artov
    }

    const editReviewsHandler = (row) => {
        // display modal s formom pre upravu reviews
        console.log(row)
    }

    const columnsArts = getArtColumns(editArtsHandler)
    const columnsReviews = getReviewColumns(editReviewsHandler)

    const fetchArtData = async () => {
        const serverUrl = process.env.REACT_APP_SERVER_URL;
        const response = await fetch(`${serverUrl}/api/art/read.php`, {method: "POST"});
        const result = await response.json();
        setArtData(result.data);
        setArtRecords(result.data)
    };

    const fetchReviewData = async () => {
        const serverUrl = process.env.REACT_APP_SERVER_URL;
        const response = await fetch(`${serverUrl}/api/review/read.php`, {method: "POST"});
        const result = await response.json();
        setReviewData(result.data);
        setReviewRecords(result.data)
    };
    const handleChange = ({selectedRows}) => {
        console.log('Selected Rows: ', selectedRows);
    };

    const handleArtFilter = (event) => {
        const eventValue = event.target.value
        const newData = artData.filter(row => {
            return row.id.toString().toLowerCase()
                    .includes(eventValue) ||
                row.title.toLowerCase()
                    .includes(eventValue.toLowerCase()) ||
                row.description.toLowerCase()
                    .includes(eventValue.toLowerCase()) ||
                row.price.toString().toLowerCase()
                    .includes(eventValue) ||
                row.date.toString().toLowerCase()
                    .includes(eventValue)
        });
        setArtRecords(newData);
    }

    const handleReviewFilter = (event) => {
        const eventValue = event.target.value
        const newData = reviewData.filter(row => {
            return row.id.toString().toLowerCase()
                    .includes(eventValue) ||
                row.review_text.toLowerCase()
                    .includes(eventValue.toLowerCase()) ||
                row.rating.toString().toLowerCase()
                    .includes(eventValue) ||
                row.date.toString().toLowerCase()
                    .includes(eventValue)
        });
        setReviewRecords(newData);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // tu dat error
    }
    return (
        <>
            <h1 className="text-center mb-2">User - email</h1>
            <div className="edit-user-wrapper mb-4">
                <Form
                    onSubmit={handleSubmit}
                    error={error}
                    submitLabel="Edit"
                    buttonClassName="button-confirm"
                >
                    <FormInput
                        label="Username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <FormInput
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                </Form>
            </div>
            <h1 className="text-center mb-1">Arts</h1>
            <Table
                columns={columnsArts}
                records={artRecords}
                handleFilter={handleArtFilter}
                handleChange={handleChange}
                refreshData={fetchArtData}
                searchId="search-art-id"
            />

            <h1 className="text-center mb-1">Reviews</h1>
            <Table
                columns={columnsReviews}
                records={reviewRecords}
                handleFilter={handleReviewFilter}
                handleChange={handleChange}
                refreshData={fetchReviewData}
                searchId="search-review-id"

            />
        </>
    )

}