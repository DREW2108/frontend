import React from "react";
import { ArrowLeft, Heart, Search as SearchIcon, X } from "lucide-react";
import { useFavorites } from "../favorites/useFavorites";
import { products } from "../data/products";

function Search() {
  const params = new URLSearchParams(window.location.search);

  const initialQuery = params.get("q") ?? "";

  const [query, setQuery] = React.useState(initialQuery);

  const { isFavorite, toggleFavorite } = useFavorites();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const normalizedQuery = query.trim().toLowerCase();

  const results = products.filter((product) => {
    if (!normalizedQuery) {
      return true;
    }

    return (
      product.name.toLowerCase().includes(normalizedQuery) ||
      product.category.toLowerCase().includes(normalizedQuery)
    );
  });

  const handleSearch = () => {
    const cleanQuery = query.trim();

    if (!cleanQuery) {
      window.location.href = "/buscar";
      return;
    }

    window.location.href = `/buscar?q=${encodeURIComponent(cleanQuery)}`;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSearch();
  };

  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-black/60 transition hover:text-black"
        >
          <ArrowLeft size={18} />
          Volver al inicio
        </a>

        <div className="mt-10">
          <p className="text-sm font-medium text-black/40">Buscar</p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
            Encuentra lo que buscas.
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 flex max-w-3xl items-center rounded-2xl border border-black/10 bg-white p-2 shadow-sm transition focus-within:border-black/20"
        >
          <SearchIcon
            size={21}
            className="ml-3 shrink-0 text-black/35"
            strokeWidth={1.8}
          />

          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="¿Qué estás buscando?"
            autoFocus
            className="w-full bg-transparent px-4 py-3 text-sm outline-none placeholder:text-black/35"
          />

          {query && (
            <button
              type="button"
              aria-label="Limpiar búsqueda"
              onClick={() => setQuery("")}
              className="mr-1 rounded-full p-2 text-black/40 transition hover:bg-black/5 hover:text-black"
            >
              <X size={17} />
            </button>
          )}

          <button
            type="submit"
            className="shrink-0 rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-black/80"
          >
            Buscar
          </button>
        </form>

        <div className="mt-10 flex items-end justify-between border-b border-black/10 pb-5">
          <div>
            <p className="text-sm text-black/40">
              {normalizedQuery
                ? `Resultados para "${query}"`
                : "Todos los productos"}
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight">
              {results.length}{" "}
              {results.length === 1
                ? "producto encontrado"
                : "productos encontrados"}
            </h2>
          </div>
        </div>

        {results.length === 0 ? (
          <div className="flex min-h-100    ems-center justify-center">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-black/5">
                <SearchIcon size={27} strokeWidth={1.6} />
              </div>

              <h2 className="mt-6 text-2xl font-bold">
                No encontramos productos
              </h2>

              <p className="mt-3 max-w-md text-sm leading-6 text-black/50">
                Prueba con otro término, una categoría diferente o una búsqueda
                más general.
              </p>

              <a
                href="/productos"
                className="mt-6 inline-flex rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-black/80"
              >
                Ver todos los productos
              </a>
            </div>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
            {results.map((product) => {
              const favorite = isFavorite(product.id);

              return (
                <a
                  key={product.id}
                  href={`/productos/${product.id}`}
                  className="group block"
                >
                  <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#eeeeef]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    <button
                      type="button"
                      aria-label={
                        favorite
                          ? `Quitar ${product.name} de favoritos`
                          : `Agregar ${product.name} a favoritos`
                      }
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();

                        toggleFavorite(product);
                      }}
                      className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition hover:scale-105"
                    >
                      <Heart
                        size={18}
                        strokeWidth={1.8}
                        fill={favorite ? "currentColor" : "none"}
                      />
                    </button>
                  </div>

                  <div className="pt-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-black/40">
                      {product.category}
                    </p>

                    <h3 className="mt-2 text-sm font-medium leading-5">
                      {product.name}
                    </h3>

                    <p className="mt-2 text-sm font-bold">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}

export default Search;
