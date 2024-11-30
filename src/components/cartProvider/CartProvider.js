import React, {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";

// Create Cart Context
const CartContext = createContext();

// Cart Provider Component
export function CartProvider({children}) {
    const [cartCount, setCartCount] = useState(0);
    const [cartArtIds, setCartArtIds] = useState([])
    const [cartArtDetails, setCartArtDetails] = useState([]); // Store full art details

    const serverUrl = process.env.REACT_APP_SERVER_URL

    async function fetchCartArtIds() {
        try {
            const userId = 2; // Replace with session logic to get user_id
            const response = await axios.get(`${serverUrl}/api/cartArt/read.php`, {
                params: {
                    user_id: userId,
                },
            });

            console.log(response)
            const cartArtIds = response.data.data;
            setCartArtIds(cartArtIds);
            setCartCount(cartArtIds.length)
            await fetchArtDetails(cartArtIds);
        } catch (error) {
            console.error("Error fetching cart art IDs:", error);
        }

    }

    async function fetchArtDetails(artIds) {
        try {
            const response = await axios.post(`${serverUrl}/api/cartArt/artDetails.php`, {
                art_ids: artIds,
            });

            // Assuming the response contains an array of art details
            setCartArtDetails(response.data.data);

        } catch (error) {
            console.error("Error fetching art details:", error);
        }
    }

    async function removeFromCart(artId) {
        try {
            const userId = 2; // todo autentizacia
            console.log(artId, userId)
            await axios.delete(`${serverUrl}/api/cartArt/delete.php`, {
                headers: {
                    "Content-Type": "application/json", // Set the request Content-Type
                },
                data: {
                    user_id: userId,
                    art_id: artId,
                },
            });

            // Update the local state after successful deletion
            setCartArtIds((prevIds) => prevIds.filter((id) => id !== artId));
            setCartArtDetails((prevDetails) => prevDetails.filter((art) => art.id !== artId));
            decrementCartCount();
        } catch (error) {
            console.error("Error removing item from cart:", error);
        }
    }


    useEffect(() => {
        fetchCartArtIds()
    }, [cartCount]);

    const incrementCartCount = () => setCartCount(prev => prev + 1);
    const decrementCartCount = () => setCartCount(prev => Math.max(prev - 1, 0));

    console.log("car count", cartCount)
    return (
        <CartContext.Provider
            value=
                {{
                    cartArtIds,
                    cartCount,
                    cartArtDetails,
                    removeFromCart,
                    incrementCartCount,
                    decrementCartCount
                }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
