import {SearchBar} from "../searchBar/SearchBar";
import "./MainSite.css"
import "../../table.css"
import {ReviewList} from "../reviewList/ReviewList";
import {Art} from "../art/Art";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

// TODO: pridat modal pre vytvorenie review (+ backend)
// TODO: pridat stranku pre vytvorenie Artu (+ backend)

export function MainSite() {
    // State to store arts and search term
    const [initialArtData, setInitialArtData] = useState([])
    const [arts, setArts] = useState([]);
    const [activeButton, setActiveButton] = useState(null); // Track the active button
    const [isOriginal, setIsOriginal] = useState(true); // Track if the original data is shown
    const navigate = useNavigate()

    const fetchData = async () => {
        const serverUrl = process.env.REACT_APP_SERVER_URL
        try {
            const response = await fetch(`${serverUrl}/api/art/read.php`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = await response.json();

            if (result.success) {
                const artData = result.data.map(item => ({
                    username: item.art_creator_username,
                    img_url: item.img_url,
                    title: item.title,
                    description: item.description,
                    price: parseFloat(item.price), // Convert price to number
                    date: item.upload_date,
                    reviews: [{
                        username: item.review_user_username,
                        date: item.review_creation_date,
                        reviewText: item.review_text,
                        rating: parseInt(item.rating, 10)
                    }]
                }));

                setArts(artData);
                setInitialArtData(artData)
            }
        } catch (error) {
            console.error("Error fetching art and reviews data: ", error);
        }
    };

    useEffect(() => {
        fetchData()
    }, [])


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

    return (
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
                    <ReviewList reviews={art.reviews} />
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

    )
}