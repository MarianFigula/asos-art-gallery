import "./CartSite.css"
import CartItem from "../../components/CartItem/CartItem";

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
                        imgUrl=""
                        authorName={"authorname"}
                        price={"100"}
                    />
                    <CartItem
                        artTitle={"arttitle"}
                        imgUrl=""
                        authorName={"authorname"}
                        price={"100"}
                    />
                    <CartItem
                        artTitle={"arttitle"}
                        imgUrl=""
                        authorName={"authorname"}
                        price={"100"}
                    />


                </section>

            </div>

        </>
    )
}