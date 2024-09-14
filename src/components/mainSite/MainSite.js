import {SearchBar} from "../searchBar/SearchBar";
import "./MainSite.css"

export function MainSite() {
    const handleFilter = (event) => {

    }

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

            <section>

            </section>
        </>

    )
}