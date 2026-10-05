import {
  ArrowLeft,
  Heart,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { useFavorites } from "../favorites/useFavorites";

function Favorites() {
  const {
    favorites,
    favoritesCount,
    removeFavorite,
    clearFavorites,
  } = useFavorites();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (favorites.length === 0) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-6 py-16">
        <div className="w-full max-w-lg text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-black/5">
            <Heart
              size={32}
              strokeWidth={1.6}
            />
          </div>

          <p className="mt-8 text-sm font-medium uppercase tracking-[0.2em] text-black/40">
            Tus favoritos
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight">
            No tienes favoritos
          </h1>

          <p className="mx-auto mt-5 max-w-md text-base leading-7 text-black/50">
            Guarda los productos que te interesen para encontrarlos
            fácilmente después.
          </p>

          <a
            href="/productos"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-black px-6 py-4 text-sm font-semibold text-white transition hover:bg-black/80"
          >
            <ShoppingBag size={18} />
            Explorar productos
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-10 md:py-16">
      <a
        href="/productos"
        className="inline-flex items-center gap-2 text-sm font-medium text-black/60 transition hover:text-black"
      >
        <ArrowLeft size={18} />
        Explorar productos
      </a>

      <div className="mt-10 flex flex-col gap-5 border-b border-black/10 pb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-medium text-black/40">
            Tu selección
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
            Favoritos
          </h1>
        </div>

        <p className="text-sm text-black/50">
          {favoritesCount}{" "}
          {favoritesCount === 1
            ? "producto guardado"
            : "productos guardados"}
        </p>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
        {favorites.map((product) => (
          <article
            key={product.id}
            className="group"
          >
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#eeeeef]">
              <a href={`/productos/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </a>

              <button
                type="button"
                aria-label={`Quitar ${product.name} de favoritos`}
                onClick={() =>
                  removeFavorite(product.id)
                }
                className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition hover:scale-105"
              >
                <Heart
                  size={18}
                  strokeWidth={1.8}
                  fill="currentColor"
                />
              </button>
            </div>

            <div className="pt-4">
              <p className="text-xs font-medium uppercase tracking-wide text-black/40">
                {product.category}
              </p>

              <a
                href={`/productos/${product.id}`}
                className="mt-2 block text-sm font-medium leading-5 transition hover:opacity-60"
              >
                {product.name}
              </a>

              <p className="mt-2 text-sm font-bold">
                {formatPrice(product.price)}
              </p>

              <a
                href={`/productos/${product.id}`}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold transition hover:bg-black hover:text-white"
              >
                <ShoppingBag size={16} />
                Ver producto
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12 border-t border-black/10 pt-6">
        <button
          type="button"
          onClick={clearFavorites}
          className="flex items-center gap-2 text-sm font-medium text-black/45 transition hover:text-red-600"
        >
          <Trash2 size={17} />
          Eliminar todos los favoritos
        </button>
      </div>
    </main>
  );
}

export default Favorites;