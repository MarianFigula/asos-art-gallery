import {ArtImage} from "../artImage/artImage";


export default function CartItem({artTitle,imgUrl, authorName, price}){


    return (
        <>
            <div className="cart-item mb-3">
                <div className="cart-art-info">
                    <ArtImage
                        imgUrl={imgUrl}
                    ></ArtImage>
                    <div>
                        <h2>{artTitle}</h2>
                        <p>{authorName}</p>
                    </div>
                </div>
                <input type="checkbox"/>
                <p>{price}€</p>
            </div>
        </>
    )
}