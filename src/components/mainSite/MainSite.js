import {SearchBar} from "../searchBar/SearchBar";
import "./MainSite.css"
import "../../table.css"
import {ReviewList} from "../reviewList/ReviewList";
import {Art} from "../art/Art";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Modal} from "../modal/Modal";
import {Form} from "../form/Form";
import {FormInput} from "../formInput/FormInput";

// TODO: pridat modal pre vytvorenie review (+ backend)
// TODO: pridat stranku pre vytvorenie Artu (+ backend)
/*
const result = {
    "message": "jotjo",
    "success": true,
    "data": [
    {
        "art_creator_username": "alice",
        "art_creator_id": "2",
        "img_url": "\/arts\/camera.png",
        "title": "Kamera",
        "description": "Toto je kamera",
        "price": "20",
        "upload_date": "2024-09-16 15:18:16",
        "review_user_username": "anna",
        "review_user_id": "10",
        "review_text": "The camera photo is good, but I feel it could use more contrast to make it stand out.",
        "rating": "3",
        "review_creation_date": "2024-09-16 15:18:17"
    },
    {
        "art_creator_username": "alice",
        "art_creator_id": "2",
        "img_url": "\/arts\/camera.png",
        "title": "Kamera",
        "description": "Toto je kamera",
        "price": "20",
        "upload_date": "2024-09-16 15:18:16",
        "review_user_username": "bob",
        "review_user_id": "3",
        "review_text": "The vintage camera photograph is stunning, with beautiful mechanical details.",
        "rating": "5",
        "review_creation_date": "2024-09-16 15:18:17"
    },
    {
        "art_creator_username": "alice",
        "art_creator_id": "2",
        "img_url": "\/arts\/camera.png",
        "title": "Kamera",
        "description": "Toto je kamera",
        "price": "20",
        "upload_date": "2024-09-16 15:18:16",
        "review_user_username": "charlie",
        "review_user_id": "4",
        "review_text": "The vintage camera photo has charm, yet it could benefit from a clearer focus.",
        "rating": "4",
        "review_creation_date": "2024-09-16 15:18:17"
    },
    {
        "art_creator_username": "alice",
        "art_creator_id": "2",
        "img_url": "\/arts\/camera.png",
        "title": "Kamera",
        "description": "Toto je kamera",
        "price": "20",
        "upload_date": "2024-09-16 15:18:16",
        "review_user_username": "clara",
        "review_user_id": "12",
        "review_text": "The vintage camera photo is beautiful, yet the background is a bit distracting.",
        "rating": "4",
        "review_creation_date": "2024-09-16 15:18:17"
    },
    {
        "art_creator_username": "frank",
        "art_creator_id": "7",
        "img_url": "\/arts\/abstract.png",
        "title": "Abstract No.45",
        "description": "A colorful abstract composition filled with organic shapes and dynamic flow.",
        "price": "150",
        "upload_date": "2024-09-16 15:18:16",
        "review_user_username": "eva",
        "review_user_id": "6",
        "review_text": "Abstract No.45 is vibrant, but the composition seems a bit chaotic and overwhelming.",
        "rating": "4",
        "review_creation_date": "2024-09-16 15:18:17"
    },
    {
        "art_creator_username": "frank",
        "art_creator_id": "7",
        "img_url": "\/arts\/abstract.png",
        "title": "Abstract No.45",
        "description": "A colorful abstract composition filled with organic shapes and dynamic flow.",
        "price": "150",
        "upload_date": "2024-09-16 15:18:16",
        "review_user_username": "david",
        "review_user_id": "5",
        "review_text": "Abstract No.45 is a fantastic blend of colors and shapes. Truly mesmerizing!",
        "rating": "5",
        "review_creation_date": "2024-09-16 15:18:17"
    },
    {
        "art_creator_username": "frank",
        "art_creator_id": "7",
        "img_url": "\/arts\/abstract.png",
        "title": "Abstract No.45",
        "description": "A colorful abstract composition filled with organic shapes and dynamic flow.",
        "price": "150",
        "upload_date": "2024-09-16 15:18:16",
        "review_user_username": "george",
        "review_user_id": "9",
        "review_text": "Abstract No.45 is colorful, but the shapes feel too disjointed.",
        "rating": "3",
        "review_creation_date": "2024-09-16 15:18:17"
    },
    {
        "art_creator_username": "frank",
        "art_creator_id": "7",
        "img_url": "\/arts\/abstract.png",
        "title": "Abstract No.45",
        "description": "A colorful abstract composition filled with organic shapes and dynamic flow.",
        "price": "150",
        "upload_date": "2024-09-16 15:18:16",
        "review_user_username": "clara",
        "review_user_id": "12",
        "review_text": "This abstract piece is vibrant, though the overall composition feels a bit cluttered.",
        "rating": "2",
        "review_creation_date": "2024-09-16 15:18:17"
    },
    {
        "art_creator_username": "frank",
        "art_creator_id": "7",
        "img_url": "\/arts\/composition.png",
        "title": "Still life",
        "description": "A not so classic still life with fruit and flowers.",
        "price": "56",
        "upload_date": "2024-09-16 15:18:16",
        "review_user_username": "alice",
        "review_user_id": "2",
        "review_text": "The still life composition feels classic and serene, a beautiful piece of art.",
        "rating": "5",
        "review_creation_date": "2024-09-16 15:18:17"
    },
    {
        "art_creator_username": "frank",
        "art_creator_id": "7",
        "img_url": "\/arts\/composition.png",
        "title": "Still life",
        "description": "A not so classic still life with fruit and flowers.",
        "price": "56",
        "upload_date": "2024-09-16 15:18:16",
        "review_user_username": "george",
        "review_user_id": "9",
        "review_text": "The still life is well done, but the colors seem a bit dull compared to other works.",
        "rating": "4",
        "review_creation_date": "2024-09-16 15:18:17"
    },
    {
        "art_creator_username": "frank",
        "art_creator_id": "7",
        "img_url": "\/arts\/composition.png",
        "title": "Still life",
        "description": "A not so classic still life with fruit and flowers.",
        "price": "56",
        "upload_date": "2024-09-16 15:18:16",
        "review_user_username": "betty",
        "review_user_id": "11",
        "review_text": "The still life is decent, but it doesn\u00e2\u20ac\u2122t bring anything new to the genre.",
        "rating": "1",
        "review_creation_date": "2024-09-16 15:18:17"
    },
    {
        "art_creator_username": "frank",
        "art_creator_id": "7",
        "img_url": "\/arts\/composition.png",
        "title": "Still life",
        "description": "A not so classic still life with fruit and flowers.",
        "price": "56",
        "upload_date": "2024-09-16 15:18:16",
        "review_user_username": "eva",
        "review_user_id": "6",
        "review_text": "The still life is well-executed but lacks a bit of vibrancy.",
        "rating": "4",
        "review_creation_date": "2024-09-16 15:18:17"
    },
    {
        "art_creator_username": "david",
        "art_creator_id": "5",
        "img_url": "\/arts\/raffael.png",
        "title": "The School of Athens",
        "description": "A Renaissance masterpiece by Raphael, depicting great philosophers.",
        "price": "50000000",
        "upload_date": "2024-09-16 15:18:16",
        "review_user_username": "charlie",
        "review_user_id": "4",
        "review_text": "The School of Athens is a masterpiece that brings Renaissance philosophy to life.",
        "rating": "5",
        "review_creation_date": "2024-09-16 15:18:17"
    },
    {
        "art_creator_username": "david",
        "art_creator_id": "5",
        "img_url": "\/arts\/raffael.png",
        "title": "The School of Athens",
        "description": "A Renaissance masterpiece by Raphael, depicting great philosophers.",
        "price": "50000000",
        "upload_date": "2024-09-16 15:18:16",
        "review_user_username": "alice",
        "review_user_id": "2",
        "review_text": "The School of Athens is impressive piece of work.",
        "rating": "5",
        "review_creation_date": "2024-09-16 15:18:17"
    },
    {
        "art_creator_username": "david",
        "art_creator_id": "5",
        "img_url": "\/arts\/raffael.png",
        "title": "The School of Athens",
        "description": "A Renaissance masterpiece by Raphael, depicting great philosophers.",
        "price": "50000000",
        "upload_date": "2024-09-16 15:18:16",
        "review_user_username": "eva",
        "review_user_id": "6",
        "review_text": "Work of a genius mind.",
        "rating": "5",
        "review_creation_date": "2024-09-16 15:18:17"
    },
    {
        "art_creator_username": "david",
        "art_creator_id": "5",
        "img_url": "\/arts\/raffael.png",
        "title": "The School of Athens",
        "description": "A Renaissance masterpiece by Raphael, depicting great philosophers.",
        "price": "50000000",
        "upload_date": "2024-09-16 15:18:16",
        "review_user_username": "sheldon",
        "review_user_id": "8",
        "review_text": "The School of Athens is undeniably a masterpiece, showcasing an impressive array of Renaissance figures. However, the density of philosophers in the composition creates an overcrowded effect that detracts from the clarity and focus of the central figures. For a work of this magnitude, a more streamlined approach would better highlight the intellectual prominence of the depicted individuals.",
        "rating": "3",
        "review_creation_date": "2024-09-16 15:18:17"
    },
    {
        "art_creator_username": "anna",
        "art_creator_id": "10",
        "img_url": "\/arts\/reflection.png",
        "title": "Reflection",
        "description": "Reflection on the water surface captured in painting.",
        "price": "74",
        "upload_date": "2024-09-16 15:18:16",
        "review_user_username": "alice",
        "review_user_id": "2",
        "review_text": "Reflection has a deep sense of tranquility. The symmetry is perfect.",
        "rating": "5",
        "review_creation_date": "2024-09-16 15:18:17"
    },
    {
        "art_creator_username": "anna",
        "art_creator_id": "10",
        "img_url": "\/arts\/reflection.png",
        "title": "Reflection",
        "description": "Reflection on the water surface captured in painting.",
        "price": "74",
        "upload_date": "2024-09-16 15:18:16",
        "review_user_username": "frank",
        "review_user_id": "7",
        "review_text": "Reflection is nice, but it lacks the depth I was expecting.",
        "rating": "3",
        "review_creation_date": "2024-09-16 15:18:17"
    },
    {
        "art_creator_username": "anna",
        "art_creator_id": "10",
        "img_url": "\/arts\/reflection.png",
        "title": "Reflection",
        "description": "Reflection on the water surface captured in painting.",
        "price": "74",
        "upload_date": "2024-09-16 15:18:16",
        "review_user_username": "george",
        "review_user_id": "9",
        "review_text": "Reflection has potential, but it seems somewhat flat.",
        "rating": "3",
        "review_creation_date": "2024-09-16 15:18:17"
    },
    {
        "art_creator_username": "betty",
        "art_creator_id": "11",
        "img_url": "\/arts\/sunset.png",
        "title": "Sunset at the beach",
        "description": "Sun setting over a sandy beach, capturing the peaceful light.",
        "price": "42",
        "upload_date": "2024-09-16 15:18:16",
        "review_user_username": "anna",
        "review_user_id": "10",
        "review_text": "Sunset at the beach is peaceful, but the picture seems a bit overexposed.",
        "rating": "3",
        "review_creation_date": "2024-09-16 15:18:17"
    },
    {
        "art_creator_username": "betty",
        "art_creator_id": "11",
        "img_url": "\/arts\/sunset.png",
        "title": "Sunset at the beach",
        "description": "Sun setting over a sandy beach, capturing the peaceful light.",
        "price": "42",
        "upload_date": "2024-09-16 15:18:16",
        "review_user_username": "bob",
        "review_user_id": "3",
        "review_text": "Sunset at the beach captures a calming and peaceful atmosphere. Lovely colors!",
        "rating": "5",
        "review_creation_date": "2024-09-16 15:18:17"
    },
    {
        "art_creator_username": "betty",
        "art_creator_id": "11",
        "img_url": "\/arts\/sunset.png",
        "title": "Sunset at the beach",
        "description": "Sun setting over a sandy beach, capturing the peaceful light.",
        "price": "42",
        "upload_date": "2024-09-16 15:18:16",
        "review_user_username": "betty",
        "review_user_id": "11",
        "review_text": "Sunset at the beach is nice, though it lacks the dramatic effect I was hoping for.",
        "rating": "4",
        "review_creation_date": "2024-09-16 15:18:17"
    },
    {
        "art_creator_username": "charlie",
        "art_creator_id": "4",
        "img_url": "\/arts\/sunset2.png",
        "title": "Horizon",
        "description": "A minimalist landscape with a setting sun on the horizon and gentle color transitions.",
        "price": "176",
        "upload_date": "2024-09-16 15:18:16",
        "review_user_username": "frank",
        "review_user_id": "7",
        "review_text": "Horizon has a minimalist beauty, the gradients create a soothing visual effect.",
        "rating": "5",
        "review_creation_date": "2024-09-16 15:18:17"
    },
    {
        "art_creator_username": "charlie",
        "art_creator_id": "4",
        "img_url": "\/arts\/sunset2.png",
        "title": "Horizon",
        "description": "A minimalist landscape with a setting sun on the horizon and gentle color transitions.",
        "price": "176",
        "upload_date": "2024-09-16 15:18:16",
        "review_user_username": "bob",
        "review_user_id": "3",
        "review_text": "Horizon is minimalist, but it feels a bit too plain and lacks detail.",
        "rating": "3",
        "review_creation_date": "2024-09-16 15:18:17"
    },
    {
        "art_creator_username": "charlie",
        "art_creator_id": "4",
        "img_url": "\/arts\/sunset2.png",
        "title": "Horizon",
        "description": "A minimalist landscape with a setting sun on the horizon and gentle color transitions.",
        "price": "176",
        "upload_date": "2024-09-16 15:18:16",
        "review_user_username": "anna",
        "review_user_id": "10",
        "review_text": "Horizon is calming, but it feels like it could use more visual interest.",
        "rating": "2",
        "review_creation_date": "2024-09-16 15:18:17"
    },
    {
        "art_creator_username": "charlie",
        "art_creator_id": "4",
        "img_url": "\/arts\/sunset2.png",
        "title": "Horizon",
        "description": "A minimalist landscape with a setting sun on the horizon and gentle color transitions.",
        "price": "176",
        "upload_date": "2024-09-16 15:18:16",
        "review_user_username": "sheldon",
        "review_user_id": "8",
        "review_text": "Horizon presents a minimalist landscape with commendable use of color gradients. Nevertheless, the piece suffers from a lack of spatial complexity and visual intrigue. The horizon line, while aesthetically pleasing, is insufficiently detailed and lacks the dynamic elements that would elevate it to a higher level of artistic sophistication. It\u00e2\u20ac\u2122s a passable work, but does not meet the high standards of visual engagement I seek.",
        "rating": "1",
        "review_creation_date": "2024-09-16 15:18:17"
    }
]
}

 */
export function MainSite() {
    // State to store arts and search term
    const [initialArtData, setInitialArtData] = useState([])
    const [arts, setArts] = useState([]);
    const [activeButton, setActiveButton] = useState(null); // Track the active button
    const [isOriginal, setIsOriginal] = useState(true); // Track if the original data is shown
    const [isArtModalOpen, setIsArtModalOpen] = useState(false)
    const [error, setError] = useState("")
    const [reviewText, setReviewText] = useState("")
    const [selectedArtId, setSelectedArtId] = useState(null); // store the selected art id

    const navigate = useNavigate()

    const fetchData = async () => {
        const serverUrl = process.env.REACT_APP_SERVER_URL;
        try {
            const response = await fetch(`${serverUrl}/api/art/read.php`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = await response.json();

            if (result.success) {
                const artDataMap = [];

                // Iterate through the data to group reviews by art
                result.data.forEach(item => {
                    const artId = item.art_id;

                    // If this art already exists in the map, add the review to its reviews array
                    if (artDataMap[artId]) {
                        artDataMap[artId].reviews.push({
                            username: item.review_user_username,
                            date: item.review_creation_date,
                            reviewText: item.review_text,
                            rating: parseInt(item.rating, 10)
                        });
                    } else {
                        // If this is the first review for this art, initialize the entry
                        artDataMap[artId] = {
                            art_id: artId,
                            username: item.art_creator_username,
                            img_url: item.img_url,
                            title: item.title,
                            description: item.description,
                            price: parseFloat(item.price), // Convert price to number
                            date: item.upload_date,
                            reviews: item.review_user_username ? [{
                                username: item.review_user_username,
                                date: item.review_creation_date,
                                reviewText: item.review_text,
                                rating: parseInt(item.rating, 10)
                            }] : []  // Only add a review if there's a username
                        };
                    }
                });

                // Convert the map back into an array
                const artData = Object.values(artDataMap);

                setArts(artData);
                setInitialArtData(artData);
            }
        } catch (error) {
            console.error("Error fetching art and reviews data: ", error);
        }
    };

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        console.log("Current arts data:", arts);
    }, [arts]);

    // Function to reset to original state
    const resetToOriginal = () => {
        setArts(initialArtData);
        setActiveButton(null); // Reset active button
        setIsOriginal(true); // Indicate we're back to the original state
    };

    const toggleSortByPriceAsc = () => {
        if (activeButton === 'priceAsc') {
            resetToOriginal();
            return
        }
        const sortedArts = [...arts].sort((a, b) => a.price - b.price);
        setArts(sortedArts);
        setActiveButton('priceAsc');
        setIsOriginal(false);

    };

    const toggleSortByPriceDesc = () => {
        if (activeButton === 'priceDesc') {
            resetToOriginal();
            return
        }
        const sortedArts = [...arts].sort((a, b) => b.price - a.price);
        setArts(sortedArts);
        setActiveButton('priceDesc');
        setIsOriginal(false);

    };

    const toggleSortByRatingAsc = () => {
        if (activeButton === 'ratingAsc') {
            resetToOriginal();
            return
        }
        const sortedArts = [...arts].sort((a, b) => a.rating - b.rating);
        setArts(sortedArts);
        setActiveButton('ratingAsc');
        setIsOriginal(false);

    };

    const toggleSortByRatingDesc = () => {
        if (activeButton === 'ratingDesc') {
            resetToOriginal();
            return
        }
        const sortedArts = [...arts].sort((a, b) => b.rating - a.rating);
        setArts(sortedArts);
        setActiveButton('ratingDesc');
        setIsOriginal(false);

    };

    // Handle search filtering
    const handleFilter = (event) => {
        const searchValue = event.target.value.toLowerCase();

        const newData = initialArtData.filter(row => {
            return row.title.toLowerCase().includes(searchValue)
        })
        setArts(newData)
    };

    const redirectToUploadArt = () => {
        // TODO: zober email z ls a ked neni prihlaseny tak redirect na login a ked je redirect na upload

        const email = localStorage.getItem("user-email")

        email !== null ? navigate("upload-art", {state: {email}}) : navigate("/login")

    }

    const openReviewModal = (artId) => {
        setSelectedArtId(artId); // set the art id when opening the modal
        setIsArtModalOpen(true); // open the modal
    };
    const handleReviewSubmit = () => {
        // TODO create review
    }

    return (
        <>
            <Modal
                isOpen={isArtModalOpen}
                onClose={() => setIsArtModalOpen(false)}
                title="Add Review"
            >
                <Form error={error}
                      buttonClassName="button-confirm"
                      onSubmit={handleReviewSubmit}
                      submitLabel="Add review">
                    <FormInput type="hidden" value={selectedArtId}/>

                    <FormInput
                        label="Review Text"
                        type="text"
                        value={reviewText}
                        onChange={(e) => {setReviewText(e.target.value)}}
                        required
                    />
                    {// TODO add rating using stars
                         }
                </Form>

            </Modal>
            <div className="main-content">
                <h1 className="text-center">Discover new Arts</h1>
                <section className="main-header-wrapper">
                    <SearchBar
                        searchId="main-searchbar"
                        handleFilter={handleFilter}
                        placeholder="Search for art..."
                    />
                    <div className="button-wrapper">
                        <button
                            onClick={toggleSortByPriceAsc}
                            className={activeButton === 'priceAsc' ? 'active' : ''}
                        >
                            Price <i className="bi bi-arrow-up"></i>
                        </button>
                        <button
                            onClick={toggleSortByPriceDesc}
                            className={activeButton === 'priceDesc' ? 'active' : ''}
                        >
                            Price <i className="bi bi-arrow-down"></i>
                        </button>
                        <button
                            onClick={toggleSortByRatingAsc}
                            className={activeButton === 'ratingAsc' ? 'active' : ''}
                        >
                            Rating <i className="bi bi-arrow-up"></i>
                        </button>
                        <button
                            onClick={toggleSortByRatingDesc}
                            className={activeButton === 'ratingDesc' ? 'active' : ''}
                        >
                            Rating <i className="bi bi-arrow-down"></i>
                        </button>
                    </div>
                </section>

                {/* Render filtered arts */}
                {arts.map((art, index) => (
                    <section className="art-review-wrapper mb-3" key={index}>
                        <Art art={art}/>
                        <ReviewList reviews={art.reviews}
                                    openReviewModal={() => openReviewModal(art.art_id)}/>
                    </section>
                ))}


                <button className="create-art button-confirm" onClick={redirectToUploadArt}>
                    Upload Art
                    <i className="bi bi-plus"></i>
                </button>
                {/*<div className="create-art">*/}
                {/*    <p>Create Art</p>*/}
                {/*    <i className="bi bi-plus-circle-fill"></i>*/}
                {/*</div>*/}

            </div>
        </>
    )
}