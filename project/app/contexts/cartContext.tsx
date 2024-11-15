
"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { MenuItem, CartItem, CartContextType } from "../types";



const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  
  const addToCart = (item: MenuItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (cartItem) => cartItem.id === item.id
      );
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  
  const removeFromCart = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  
  

  const updateQuantity = (id: number, quantity: number) => {
    setCartItems((prevItems) => {
      if (quantity > 0) {
        console.log(`Updating item ${id} to quantity ${quantity}`);
        return prevItems.map((item) =>
          item.id === id ? { ...item, quantity } : item
        );
      } else {
        console.log(`Removing item ${id} because quantity is 0`);
        return prevItems.filter((item) => item.id !== id);
      }
    });
  };

 
  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        getTotalPrice,
        clearCart: () => setCartItems([]),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};


export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
