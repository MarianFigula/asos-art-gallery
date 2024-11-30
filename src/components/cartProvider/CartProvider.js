import React, {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";

// Create Cart Context
const CartContext = createContext();

// Cart Provider Component
export function CartProvider({ children }) {
    const [cartCount, setCartCount] = useState(0);
    const [cartArtIds, setCartArtIds] = useState([])
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
        } catch (error) {
            console.error("Error fetching cart art IDs:", error);
        }
        
    }

    useEffect(() => {
        fetchCartArtIds()
    }, []);

    const incrementCartCount = () => setCartCount(prev => prev + 1);
    const decrementCartCount = () => setCartCount(prev => Math.max(prev - 1, 0));

    return (
        <CartContext.Provider value={{ cartArtIds, cartCount, incrementCartCount, decrementCartCount }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
