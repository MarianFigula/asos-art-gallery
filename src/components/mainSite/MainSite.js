import {SearchBar} from "../searchBar/SearchBar";
import "./MainSite.css"
import {ReviewList} from "../reviewList/ReviewList";
import {Art} from "../art/Art";
import {useState} from "react";


// Mock Data for Arts with date and rating
const initialArtData = [
    {
        img_url: '/arts/camera.png',
        title: 'Camera Art',
        username: 'Artist123',
        description: 'This is a beautiful piece of art representing the essence of photography.',
        price: 20,
        date: '2024-09-10',
        rating: 4.5, // Average rating from reviews
    },
    {
        img_url: '/arts/painting.png',
        title: 'Sunset Painting',
        username: 'ArtistSun',
        description: 'A mesmerizing painting capturing the beauty of a sunset.',
        price: 50,
        date: '2024-09-12',
        rating: 4.8,
    },
    {
        img_url: '/arts/sculpture.png',
        title: 'Abstract Sculpture',
        username: 'ArtistSculptor',
        description: 'A modern abstract sculpture that plays with shapes and forms.',
        price: 100,
        date: '2024-09-08',
        rating: 3.9,
    },
];

// Mock Data for Reviews
const reviewsData = [
    {
        username: 'User1',
        date: '2024-09-10',
        reviewText: 'Amazing piece of art! Highly recommend.',
        stars: 5,
    },
    {
        username: 'User2',
        date: '2024-09-09',
        reviewText: 'I love the colors and composition.',
        stars: 4,
    },
    {
        username: 'User3',
        date: '2024-09-08',
        reviewText: 'Not bad, but could be more detailed.',
        stars: 3,
    },
];

export function MainSite() {
    // State to store arts and search term
    const [arts, setArts] = useState(initialArtData);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeButton, setActiveButton] = useState(null); // Track the active button
    const [isOriginal, setIsOriginal] = useState(true); // Track if the original data is shown


    // Function to reset to original state
    const resetToOriginal = () => {
        setArts(initialArtData);
        setActiveButton(null); // Reset active button
        setIsOriginal(true); // Indicate we're back to the original state
    };

    // Sorting Functions with Toggle
    const toggleSortByDate = () => {
        if (activeButton === 'date') {
            resetToOriginal();
            return
        }
        const sortedArts =
            [...arts].sort((a, b) => new Date(b.date) - new Date(a.date));
        setArts(sortedArts);
        setActiveButton('date');
        setIsOriginal(false);

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
        setSearchTerm(searchValue);
    };

    // Filter the arts based on the search term
    const filteredArts = arts.filter((art) =>
        art.title.toLowerCase().includes(searchTerm)
    );

    return (
        <>
            <h1 className="text-center">Discover new Arts</h1>
            <section className="main-header-wrapper">
                <SearchBar
                    searchId="main-searchbar"
                    handleFilter={handleFilter}
                    placeholder="Search for art..."
                />

                <div className="button-wrapper">
                    <button
                        onClick={toggleSortByDate}
                        className={activeButton === 'date' ? 'active' : ''}
                    >
                        New
                    </button>
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
            {filteredArts.map((art, index) => (
                <section className="art-review-wrapper mb-3" key={index}>
                    <Art art={art}/>
                    <ReviewList reviews={reviewsData}/>
                </section>
            ))}


        </>

    )
}