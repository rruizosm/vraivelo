import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    // Load cart from local storage on initial render
    const [cartItems, setCartItems] = useState(() => {
        try {
            const storedCart = localStorage.getItem('vraivelo_cart');
            return storedCart ? JSON.parse(storedCart) : [];
        } catch (error) {
            console.error("Failed to load cart from local storage", error);
            return [];
        }
    });

    const [isCartOpen, setIsCartOpen] = useState(false);

    // Save cart to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem('vraivelo_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id && item.size === product.size && item.type === product.type);
            if (existingItem) {
                // Check stock limit for existing item
                if (existingItem.maxQuantity !== undefined && existingItem.quantity >= existingItem.maxQuantity) {
                    return prevItems; // Do nothing if limit reached
                }
                return prevItems.map(item =>
                    item.id === product.id && item.size === product.size && item.type === product.type
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevItems, { ...product, quantity: 1 }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (id, size, type) => {
        setCartItems(prevItems => prevItems.filter(item => !(item.id === id && item.size === size && item.type === type)));
    };

    const updateQuantity = (id, size, type, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(id, size, type);
            return;
        }
        setCartItems(prevItems =>
            prevItems.map(item => {
                if (item.id === id && item.size === size && item.type === type) {
                    // Check stock limit
                    if (item.maxQuantity !== undefined && newQuantity > item.maxQuantity) {
                        return item; // Do nothing if exceeding limit
                    }
                    return { ...item, quantity: newQuantity };
                }
                return item;
            })
        );
    };

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartTotal = cartItems.reduce((total, item) => {
        // Parse price string "3000€" -> 3000
        const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
        return total + (price * item.quantity);
    }, 0);

    const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            isCartOpen,
            toggleCart,
            clearCart,
            cartTotal,
            cartCount
        }}>
            {children}
        </CartContext.Provider>
    );
};
