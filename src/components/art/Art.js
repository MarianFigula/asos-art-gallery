import {ArtImage} from "../artImage/artImage";
import {Modal} from "../modal/Modal";
import {useState} from "react";


export function Art({art, handleClick, openArtImageModalClick}) {

    const [isArtImageModalOpen, setIsArtImageModalOpen] = useState(false)

    const openImageModal = () => {
        setIsArtImageModalOpen(true)
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
                        onClick={handleClick}
                    >
                        <i className="bi bi-cart"></i>
                        Add to cart
                    </button>
                </div>
            </div>
        </>
    )
}