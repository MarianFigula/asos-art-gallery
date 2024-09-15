import {SearchBar} from "../searchBar/SearchBar";
import "./MainSite.css"
import {ReviewList} from "../reviewList/ReviewList";
import {Art} from "../art/Art";
import {useState} from "react";


// Mock Data for Arts
const initialArtData = [
    {
        img_url: '/arts/camera.png',
        title: 'Camera Art',
        username: 'Artist123',
        description: 'This is a beautiful piece of art representing the essence of photography.',
        price: 20,
    },
    {
        img_url: '/arts/painting.png',
        title: 'Sunset Painting',
        username: 'ArtistSun',
        description: 'A mesmerizing painting capturing the beauty of a sunset.',
        price: 50,
    },
    {
        img_url: '/arts/sculpture.png',
        title: 'Abstract Sculpture',
        username: 'ArtistSculptor',
        description: 'A modern abstract sculpture that plays with shapes and forms.',
        price: 100,
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
                    handleFilter={handleFilter}/>

                <div className="button-wrapper">
                    <button>New</button>
                    <button>Price <i className="bi bi-arrow-up"></i></button>
                    <button>Price <i className="bi bi-arrow-down"></i></button>
                    <button>Rating <i className="bi bi-arrow-up"></i></button>
                    <button>Rating <i className="bi bi-arrow-down"></i></button>
                </div>
            </section>

                {/* Render filtered arts */}
                {filteredArts.map((art, index) => (
                    <section className="art-review-wrapper mb-3" key={index}>
                        <Art art={art} />
                        <ReviewList reviews={reviewsData} />
                    </section>
                ))}


        </>

    )
}