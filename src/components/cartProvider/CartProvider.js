import React, {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";

// Create Cart Context
const CartContext = createContext();

// Cart Provider Component
export function CartProvider({ children }) {
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

    useEffect(() => {
        fetchCartArtIds()
    }, []);

    const incrementCartCount = () => setCartCount(prev => prev + 1);
    const decrementCartCount = () => setCartCount(prev => Math.max(prev - 1, 0));

    return (
        <CartContext.Provider value={{ cartArtIds, cartCount, cartArtDetails, incrementCartCount, decrementCartCount }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
