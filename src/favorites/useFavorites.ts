import { useContext } from "react";
import { FavoritesContext } from "./FavoritesContextDefinition";

export function useFavorites() {
    const context = useContext(FavoritesContext);

    if (context === undefined) {
        throw new Error(
            "useFavorites debe utilizarse dentro de FavoritesProvider"
        );
    }

    return context;
}   