import {ArtImage} from "../artImage/artImage";
import Camera from "../../assets/user-pictures/camera.png"


export default function CartItem({artTitle,imgUrl, authorName, price}){


    return (
        <>
            <div className="cart-item mb-3">
                <div className="cart-art-info">
                    <div className="cart-image">
                        <ArtImage imgUrl={Camera}/>
                    </div>
                    <div>
                        <h2>{artTitle}</h2>
                        <p>By {authorName}</p>
                    </div>
                </div>
                <i className="bi bi-trash-fill"></i>
                <h3 className="price">{price} €</h3>
            </div>
        </>
    )
}