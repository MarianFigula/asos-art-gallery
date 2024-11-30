import {ArtImage} from "../artImage/artImage";
import {Modal} from "../modal/Modal";
import {useState} from "react";
import axios from "axios";
import {useCart} from "../cartProvider/CartProvider";


export function Art({art}) {
    const { incrementCartCount } = useCart();
    const [isArtImageModalOpen, setIsArtImageModalOpen] = useState(false)

    async function handleAddToCartClick() {
        const serverUrl = process.env.REACT_APP_SERVER_URL;

        try {
            // Replace with session logic to get user_id
            const userId = 2;
            const response = await axios.post(`${serverUrl}/api/cartArt/create.php`, {
                art_id: art.art_id,
                user_id: userId
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const result = response.data;
            if (result.success) {
                console.log("success");
                incrementCartCount()
            }
        } catch (error) {
            console.error("Error adding art to cart:", error);
            alert("An error occurred while adding art to cart.");
        }
    }


    return (
        <>
            <Modal
                isOpen={isArtImageModalOpen}
                title={art.title}
                onClose={() => setIsArtImageModalOpen(false)}>
                <div className="cart-modal-img">
                    <ArtImage imgUrl={art.img_url}></ArtImage>
                </div>
                <div className="space-between-for-two-components">
                    <p>{art.username}</p>
                    <p className="price">{art.price}€</p>
                </div>
            </Modal>

            <div className="art-wrapper">
                <div className="img-wrapper" onClick={() => setIsArtImageModalOpen(true)}>
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
                        onClick={handleAddToCartClick}
                    >
                        <i className="bi bi-cart"></i>
                        Add to cart
                    </button>
                </div>
            </div>
        </>
    )
}