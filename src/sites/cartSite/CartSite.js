import "./CartSite.css"
import CartItem from "../../components/CartItem/CartItem";

import Camera from "../../assets/user-pictures/camera.png"
import Camera2 from "../../assets/user-pictures/camera-2.png"
export default function CartSite() {

    return (
        <>
            <div className="cart-wrapper">
                <div className="cart-header">
                    <h1>Shopping Cart</h1>
                    <p className="mb-4">Your Items</p>
                </div>
                <section className="cart-items">
                    <CartItem
                        artTitle={"arttitle"}
                        imgUrl={Camera}
                        authorName={"authorname"}
                        price={"100"}
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

            </div>

        </>
    )
}