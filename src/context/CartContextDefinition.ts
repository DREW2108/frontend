import { createContext } from "react";
import type { Product } from "../data/products";

export interface CartItem extends Product {
    quantity: number;
}

export interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    increaseQuantity: (productId: number) => void;
    decreaseQuantity: (productId: number) => void;
    clearCart: () => void;
    cartCount: number;
    cartTotal: number;
}

export const CartContext = createContext<CartContextType | undefined>(
    undefined,
);