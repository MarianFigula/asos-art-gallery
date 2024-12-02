import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import {useLocation} from "react-router-dom";

// Create Cart Context
const CartContext = createContext();

// Cart Provider Component
export function CartProvider({ children }) {
    const [cartCount, setCartCount] = useState(0);
    const [cartArtIds, setCartArtIds] = useState([]);
    const [cartArtDetails, setCartArtDetails] = useState([]); // Store full art details

    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const location = useLocation(); // Get current route location


    async function fetchCartArtIds() {
        const token = localStorage.getItem("jwtToken");
        try {
            const response = await axios.get(
                `${serverUrl}/api/cartArt/read.php`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response)

            if (response.status == 200){
                const cartArtIds = response.data.data;
                setCartArtIds(cartArtIds);
                setCartCount(cartArtIds.length);
                await fetchArtDetails(cartArtIds);
            }
        } catch (error) {
            console.error("Error fetching cart art IDs:", error);
        }
    }

    async function fetchArtDetails(artIds) {
        try {
            const response = await axios.post(
                `${serverUrl}/api/cartArt/artDetails.php`,
                {
                    art_ids: artIds,
                }
            );

            // Assuming the response contains an array of art details
            setCartArtDetails(response.data.data);
        } catch (error) {
            console.error("Error fetching art details:", error);
        }
    }

    async function removeFromCart(artId) {
        try {
            await axios.delete(`${serverUrl}/api/cartArt/delete.php`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`, // Include JWT
                },
                data: {
                    art_id: artId,
                },
            });

            // Update local state after successful deletion
            setCartArtIds((prevIds) => prevIds.filter((id) => id !== artId));
            setCartArtDetails((prevDetails) =>
                prevDetails.filter((art) => art.id !== artId)
            );
            decrementCartCount();
        } catch (error) {
            console.error("Error removing item from cart:", error);
        }
    }

    const clearCart = () => {
        setCartArtIds([]); // Clear all art IDs
        setCartCount(0); // Reset count
    };

    useEffect(() => {
        // Fetch cart data on all routes except /login and /register
        const excludedRoutes = ["/login", "/register", "/forgot-password"];
        if (!excludedRoutes.includes(location.pathname)) {
            fetchCartArtIds();
        }
    }, [location.pathname]); // Trigger when the route changes

    const incrementCartCount = () => setCartCount((prev) => prev + 1);
    const decrementCartCount = () =>
        setCartCount((prev) => Math.max(prev - 1, 0));

    console.log("car count", cartCount);
    return (
        <CartContext.Provider
            value={{
                cartArtIds,
                cartCount,
                cartArtDetails,
                removeFromCart,
                clearCart,
                incrementCartCount,
                decrementCartCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
