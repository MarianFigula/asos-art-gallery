import React, {useEffect, useState} from "react";
import {getArtColumns} from "../../assets/table-columns/tableArtColumns";
import {getReviewColumns} from "../../assets/table-columns/tableReviewColumns";
import {Table} from "../table/Table";
import {Form} from "../form/Form";
import {FormInput} from "../formInput/FormInput";
import "./AdminEditUser.css"
import {Modal} from "../modal/Modal";
import {useLocation, useParams} from "react-router-dom";

// admin page
// TODO ked zmenim id v url a aj ked tam na zaciatku nic neni
//  ale user s id funguje tak ho updatne, treba zo zmenit ci to nechame
//  ako naschval bug ?
export function AdminEditUser() {
    const { id } = useParams();
    const location = useLocation();
    const {username: initialUsername, email: initialEmail } = location.state || {};
    const serverUrl = process.env.REACT_APP_SERVER_URL


    const [artData, setArtData] = useState([])
    const [artRecords, setArtRecords] = useState(artData)

    const [reviewData, setReviewData] = useState([])
    const [reviewRecords, setReviewRecords] = useState(reviewData)
    const [error, setError] = useState("")
    const [username, setUsername] = useState(initialUsername || "")
    const [email, setEmail] = useState(initialEmail || "")
    const [isArtModalOpen, setIsArtModalOpen] = useState(false)
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)

    const [artEditData, setArtEditData] = useState(
        {
            id: null,
            title: "",
            description: "",
            price: 0
        }
    )

    const [reviewEditData, setReviewEditData] = useState(
        {
            id: null,
            review_text: "",
            rating: ""
        }
    )


    const fetchArtData = async () => {
        const response = await fetch(`${serverUrl}/api/art/read.php`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({user_id: id})
        });
        const result = await response.json();
        setArtData(result.data);
        setArtRecords(result.data)
    };

    const fetchReviewData = async () => {
        const response = await fetch(`${serverUrl}/api/review/read.php`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({user_id: id}),
        });
        const result = await response.json();
        setReviewData(result.data);
        setReviewRecords(result.data)
    };

    useEffect(() => {
        if (id) {
            fetchArtData();
            fetchReviewData()
        } else {
            setError("No id provided")
        }
    }, [id]);


    const editArtsHandler = (row) => {
        console.log(row)
        setArtEditData({
            id: row.id,
            title: row.title,
            description: row.description,
            price: Number(row.price),
        })
        setIsArtModalOpen(true)
    }

    const editReviewsHandler = (row) => {
        console.log(row);
        setReviewEditData({
            id: row.id,
            review_text: row.review_text,
            rating: row.rating,
        });
        setIsReviewModalOpen(true);
    }

    const columnsArts = getArtColumns(editArtsHandler)
    const columnsReviews = getReviewColumns(editReviewsHandler)


    const handleChange = ({selectedRows}) => {
        console.log('Selected Rows: ', selectedRows);
    };

    const handleArtFilter = (event) => {
        const eventValue = event.target.value
        const newData = artData.filter(row => {
            return row.id.toString().toLowerCase()
                    .includes(eventValue) ||
                row.img_url.toLowerCase()
                    .includes(eventValue.toLowerCase()) ||
                row.title.toLowerCase()
                    .includes(eventValue.toLowerCase()) ||
                row.description.toLowerCase()
                    .includes(eventValue.toLowerCase()) ||
                row.price.toString().toLowerCase()
                    .includes(eventValue) ||
                row.upload_date.toString().toLowerCase()
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
                row.review_creation_date.toString().toLowerCase()
                    .includes(eventValue)
        });
        setReviewRecords(newData);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // tu dat error
        console.log("submitujem edit user")
        try {
            const response =
                await fetch(`${serverUrl}/api/user/update.php`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({id, username, email})
                })

            const result = await response.json();
            console.log(result)
            if (result.success){
                setUsername(username)
                setEmail(email)
                alert("successfully")
            }

        } catch (error) {
            setError(error)
            console.warn(error)
        }
    }

    const handleEditArtSubmit = async (e) => {
        e.preventDefault()
        try {
            const response =
                await fetch(`${serverUrl}/api/art/update.php`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: artEditData.id,
                        title: artEditData.title,
                        description: artEditData.description,
                        price: artEditData.price
                    })
                })

            const result = await response.json();
            if (result.success){
                window.location.reload()
                alert("Successfully")
            }

        }catch (error){
            setError(error)
            console.warn(error)
        }
    }
    const handleEditReviewSubmit = async (e) => {
        e.preventDefault()
        try {
            const response =
                await fetch(`${serverUrl}/api/review/update.php`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: reviewEditData.id,
                        review_text: reviewEditData.review_text,
                        rating: reviewEditData.rating,
                    })
                })

            const result = await response.json();
            if (result.success){
                window.location.reload()
                alert("Successfully")
            }

        }catch (error){
            setError(error)
            console.warn(error)
        }
    }
    return (
        <>
            <Modal
                isOpen={isArtModalOpen}
                onClose={() => setIsArtModalOpen(false)}
                title="Edit Art"
            >
                <Form
                    onSubmit={handleEditArtSubmit}
                    error={error}
                    submitLabel="Apply changes"
                    buttonClassName="button-confirm"
                >
                    <FormInput
                        label="Title"
                        type="text"
                        value={artEditData.title}
                        onChange={(e) => setArtEditData(
                            {
                                ...artEditData,
                                title: e.target.value
                            }
                        )}
                        required
                    />
                    <FormInput
                        label="Description"
                        type="textarea"
                        rows="7"
                        value={artEditData.description}
                        onChange={(e) => setArtEditData(
                            {
                                ...artEditData,
                                description: e.target.value
                            }
                        )}
                        required
                    />
                    <FormInput
                        label="Price (€)"
                        type="number"
                        value={artEditData.price}
                        onChange={(e) => setArtEditData(
                            {
                                ...artEditData,
                                price: Number(e.target.value)
                            }
                        )}
                        required
                    />

                </Form>

            </Modal>


            <Modal
                isOpen={isReviewModalOpen}
                onClose={() => setIsReviewModalOpen(false)}
                title="Edit Review"
            >
                <Form
                    onSubmit={handleEditReviewSubmit}
                    error={error}
                    submitLabel="Apply changes"
                    buttonClassName="button-confirm"
                >
                    <FormInput
                        label="Review"
                        type="textarea"
                        rows="7"
                        value={reviewEditData.review_text}
                        onChange={(e) => setReviewEditData(
                            {
                                ...reviewEditData,
                                review_text: e.target.value
                            }
                        )}
                        required
                    />
                    {
                        //TODO osetrit min max
                        // hodnoty aj na serveri
                        // alebo to nechame ako feature bug
                        // ze user moze v html prepisat min a max
                        // a potom bude moct davat vyssi rating
                        // alebo tam miesto input type number pridame hviezdicky
                    }
                    <FormInput
                        label="Rating"
                        type="number"
                        max="5"
                        min="0"
                        value={reviewEditData.rating}
                        onChange={(e) => setReviewEditData(
                            {
                                ...reviewEditData,
                                rating: Number(e.target.value)
                            }
                        )}
                        required
                    />

                </Form>
            </Modal>
            <h1 className="text-center mb-2">User - {username}</h1>
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