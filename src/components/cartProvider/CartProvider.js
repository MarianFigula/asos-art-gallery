import React, { createContext, useContext, useState } from "react";

// Create Cart Context
const CartContext = createContext();

// Cart Provider Component
export function CartProvider({ children }) {
    const [cartCount, setCartCount] = useState(0);

    const incrementCartCount = () => setCartCount(prev => prev + 1);
    const decrementCartCount = () => setCartCount(prev => Math.max(prev - 1, 0));

    return (
        <CartContext.Provider value={{ cartCount, incrementCartCount, decrementCartCount }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
