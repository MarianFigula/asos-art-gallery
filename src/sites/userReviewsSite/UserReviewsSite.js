import {useNavigate} from "react-router-dom";
import {Form} from "../../components/form/Form";
import {FormInput} from "../../components/formInput/FormInput";
import {Modal} from "../../components/modal/Modal";
import React, {useEffect, useState} from "react";
import {Table} from "../../components/table/Table";
import {getReviewColumns} from "../../assets/table-columns/tableReviewColumns";
import axios from "axios";

export function UserReviewsSite() {

    const navigate = useNavigate()
    
    const [error, setError] = useState("")
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
    const [reviewData, setReviewData] = useState([])
    const [reviewRecords, setReviewRecords] = useState(reviewData)


    //todo: dodat nejaky # pre zobrazenie ze neni prihlaseny
    const email =
        localStorage.getItem("user-email") ?
            localStorage.getItem("user-email") : navigate("/")

    const serverUrl = process.env.REACT_APP_SERVER_URL

    

    const [reviewEditData, setReviewEditData] = useState(
        {
            id: null,
            review_text: "",
            rating: ""
        }
    )

    const fetchReviewData = async () => {
        try {
            const response = await axios.get(`${serverUrl}/api/review/read.php`, {
                headers: {
                    "Content-Type": "application/json",
                },
                params: {
                    user_email: email,  // Send user_email as a query parameter
                },
            });

            const result = response.data;
            setReviewData(result.data);
            setReviewRecords(result.data);

        } catch (error) {
            console.error("Error fetching review data: ", error);
        }
    };

    useEffect(() => {
        fetchReviewData()
    }, [])

    const editReviewsHandler = (row) => {
        console.log(row);
        setReviewEditData({
            id: row.id,
            review_text: row.review_text,
            rating: row.rating,
        });
        setIsReviewModalOpen(true);
    }

    const columnsReviews = getReviewColumns(editReviewsHandler)

    
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
            if (result.success) {
                window.location.reload()
                alert("Successfully")
            }

        } catch (error) {
            setError(error)
            console.warn(error)
        }
    }


    return (
        <>
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

            <h1 className="text-center mb-4 mt-10">Reviews</h1>
            <Table
                columns={columnsReviews}
                records={reviewRecords}
                handleFilter={handleReviewFilter}
                refreshData={fetchReviewData}
                searchId="search-review-id"

            />

        </>
    )
}