import { useEffect, useState, type ReactNode } from "react";
import type { Product } from "../data/products";
import { FavoritesContext } from "./FavoritesContextDefinition";

function getInitialFavorites(): Product[] {
  if (typeof window === "undefined") {
    return [];
  }

  const savedFavorites = localStorage.getItem("vanta-favorites");

  if (!savedFavorites) {
    return [];
  }

  try {
    const parsedFavorites = JSON.parse(savedFavorites);

    if (!Array.isArray(parsedFavorites)) {
      return [];
    }

    return parsedFavorites;
  } catch {
    return [];
  }
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Product[]>(getInitialFavorites);

  useEffect(() => {
    localStorage.setItem("vanta-favorites", JSON.stringify(favorites));
  }, [favorites]);

  function isFavorite(productId: number) {
    return favorites.some((product) => product.id === productId);
  }

  function toggleFavorite(product: Product) {
    setFavorites((currentFavorites) => {
      const alreadyFavorite = currentFavorites.some(
        (item) => item.id === product.id,
      );

      if (alreadyFavorite) {
        return currentFavorites.filter((item) => item.id !== product.id);
      }

      return [...currentFavorites, product];
    });
  }

  function removeFavorite(productId: number) {
    setFavorites((currentFavorites) =>
      currentFavorites.filter((item) => item.id !== productId),
    );
  }

  function clearFavorites() {
    setFavorites([]);
  }

  const favoritesCount = favorites.length;

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isFavorite,
        toggleFavorite,
        removeFavorite,
        clearFavorites,
        favoritesCount,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
