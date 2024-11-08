import "./CartSite.css"
import CartItem from "../../components/CartItem/CartItem";

export default function CartSite() {

    return (
        <>
            <div className="cart-wrapper">
                <div className="cart-header">
                    <h1>Shopping Cart</h1>
                    <p>Your Items</p>
                </div>
                <div className="cart-items-header">
                    <p>Select</p>
                    <p>Price</p>
                </div>
                <section className="cart-items">
                    <CartItem
                        artTitle={"arttitle"}
                        imgUrl=""
                        authorName={"authorname"}
                        price={"100"}
                    >

                    </CartItem>
                </section>

            </div>

        </>
    )
}