import {ArtImage} from "../artImage/artImage";


export function Art({art, handleClick}) {
    return (
        <div className="art-wrapper">
            <div className="img-wrapper">
                <ArtImage imgUrl={art.img_url}/>

            </div>
            <div className="img-info">
                <div className="space-between-for-two-components">
                    <h3>{art.title}</h3>
                    <p>{art.username}</p>
                </div>
                <p className="art-description">
                    {art.description}
                </p>
            </div>
            <div className="space-between-for-two-components">
                <p className="price">{art.price}€</p>
                <button
                    className="button-add-to-cart"
                    onClick={handleClick}
                >
                    <i className="bi bi-cart3"></i>
                    Add to cart
                </button>
            </div>
        </div>
    )
}