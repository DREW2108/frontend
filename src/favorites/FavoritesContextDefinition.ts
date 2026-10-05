import { createContext } from "react";
import type { Product } from "../data/products";

export interface FavoritesContextType {
    favorites: Product[];
    isFavorite: (productId: number) => boolean;
    toggleFavorite: (product: Product) => void;
    removeFavorite: (productId: number) => void;
    clearFavorites: () => void;
    favoritesCount: number;
}

export const FavoritesContext = createContext<
    FavoritesContextType | undefined
>(undefined);