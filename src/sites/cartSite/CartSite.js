import "./CartSite.css"
import CartItem from "../../components/CartItem/CartItem";

import Camera from "../../assets/user-pictures/camera.png"
import Camera2 from "../../assets/user-pictures/camera-2.png"
import {Modal} from "../../components/modal/Modal";
import {ArtImage} from "../../components/artImage/artImage";
import {useState} from "react";

export default function CartSite() {

    const [isCartModalOpen, setIsCartModalOpen] = useState(false)

    function showArtModal() {
        setIsCartModalOpen(true)
    }

    const test = 1;
    return (
        <>
            <Modal
                isOpen={isCartModalOpen}
                title="arttitle"
                onClose={() => setIsCartModalOpen(false)}>
                <div className="cart-modal-img">
                    <ArtImage imgUrl={Camera}></ArtImage>
                </div>
                <div className="space-between-for-two-components">
                    <p>by artauthor</p>
                    <p className="price">100€</p>
                </div>
            </Modal>
            <div className="cart-payment-wrapper">
                <div className="cart-payment-header">
                    <h1>Shopping Cart</h1>
                    <p className="mb-3">Your Items</p>
                </div>
                {test === 1 ?
                    <>
                        <section className="cart-items">
                            <CartItem
                                artTitle={"arttitle"}
                                imgUrl={Camera}
                                authorName={"authorname"}
                                price={"100"}
                                onClick={showArtModal}
                            />
                            <CartItem
                                artTitle={"arttitle"}
                                imgUrl={Camera}
                                authorName={"authorname"}
                                price={"100"}
                            />
                            <CartItem
                                artTitle={"arttitle"}
                                imgUrl={Camera2}
                                authorName={"authorname"}
                                price={"100"}
                            />
                        </section>
                    </>
                    :
                    <h1 className="text-center">
                        Your shopping cart is empty
                    </h1>
                }
            </div>
            {test === 1 ?
                <section className="order-summary">
                    <div>
                        <button className="button-light">Continue shopping</button>
                    </div>
                    <h3 className="mb-0 mt-0">To Pay: <span className="price">300 €</span></h3>
                    <button className="button-confirm">Continue</button>
                </section> : <></>}
        </>

    )
}