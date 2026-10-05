import { useMemo, useState } from "react";
import {
  ChevronDown,
  Heart,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { products } from "../data/products";
import { useFavorites } from "../favorites/useFavorites";

function Products() {
  const { isFavorite, toggleFavorite } = useFavorites();

  const [selectedCategory, setSelectedCategory] =
    useState("Todas");

  const [maxPrice, setMaxPrice] = useState(200000);

  const [sortBy, setSortBy] =
    useState("Destacados");

  const [filtersOpen, setFiltersOpen] =
    useState(false);

  const categories = [
    "Todas",
    "Tecnología",
    "Moda",
    "Hogar",
    "Accesorios",
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesCategory =
        selectedCategory === "Todas" ||
        product.category === selectedCategory;

      const matchesPrice =
        product.price <= maxPrice;

      return matchesCategory && matchesPrice;
    });

    if (sortBy === "Precio: menor a mayor") {
      result = [...result].sort(
        (a, b) => a.price - b.price
      );
    }

    if (sortBy === "Precio: mayor a menor") {
      result = [...result].sort(
        (a, b) => b.price - a.price
      );
    }

    if (sortBy === "Nombre") {
      result = [...result].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    return result;
  }, [selectedCategory, maxPrice, sortBy]);

  const clearFilters = () => {
    setSelectedCategory("Todas");
    setMaxPrice(200000);
    setSortBy("Destacados");
  };

  const hasFilters =
    selectedCategory !== "Todas" ||
    maxPrice !== 200000 ||
    sortBy !== "Destacados";

  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium text-black/40">
              Explorar
            </p>

            <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
              Todos los productos
            </h1>

            <p className="mt-4 max-w-xl text-black/55">
              Descubre productos de diferentes categorías y encuentra
              algo que encaje contigo.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              setFiltersOpen((current) => !current)
            }
            className={`flex items-center justify-center gap-2 rounded-xl border px-5 py-3 text-sm font-semibold transition ${
              filtersOpen
                ? "border-black bg-black text-white"
                : "border-black/10 bg-white hover:bg-black/5"
            }`}
          >
            <SlidersHorizontal
              size={18}
              strokeWidth={1.8}
            />

            Filtros
          </button>
        </div>

        {filtersOpen && (
          <div className="mt-8 rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-8">
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">
                    Categoría
                  </p>

                  <button
                    type="button"
                    onClick={clearFilters}
                    className="text-xs font-medium text-black/45 transition hover:text-black"
                  >
                    Limpiar filtros
                  </button>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {categories.map((category) => {
                    const active =
                      selectedCategory === category;

                    return (
                      <button
                        key={category}
                        type="button"
                        onClick={() =>
                          setSelectedCategory(category)
                        }
                        className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                          active
                            ? "bg-black text-white"
                            : "bg-black/5 text-black/65 hover:bg-black/10"
                        }`}
                      >
                        {category}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">
                    Precio máximo
                  </p>

                  <span className="text-sm font-medium text-black/55">
                    {formatPrice(maxPrice)}
                  </span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="200000"
                  step="10000"
                  value={maxPrice}
                  onChange={(event) =>
                    setMaxPrice(
                      Number(event.target.value)
                    )
                  }
                  className="mt-5 w-full accent-black"
                />

                <div className="mt-2 flex justify-between text-xs text-black/35">
                  <span>$0</span>
                  <span>$200.000</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-10 flex flex-col gap-4 border-y border-black/10 py-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-black/50">
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1
              ? "producto"
              : "productos"}
          </p>

          <div className="flex items-center gap-3">
            <label
              htmlFor="sort"
              className="text-sm text-black/45"
            >
              Ordenar por
            </label>

            <div className="relative">
              <select
                id="sort"
                value={sortBy}
                onChange={(event) =>
                  setSortBy(event.target.value)
                }
                className="appearance-none rounded-lg border border-black/10 bg-white py-2 pl-3 pr-9 text-sm font-medium outline-none transition focus:border-black"
              >
                <option>Destacados</option>
                <option>Precio: menor a mayor</option>
                <option>Precio: mayor a menor</option>
                <option>Nombre</option>
              </select>

              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
              />
            </div>
          </div>
        </div>

        {hasFilters && (
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {selectedCategory !== "Todas" && (
              <button
                type="button"
                onClick={() =>
                  setSelectedCategory("Todas")
                }
                className="flex items-center gap-2 rounded-full bg-black/5 px-3 py-2 text-xs font-medium transition hover:bg-black/10"
              >
                {selectedCategory}

                <X size={13} />
              </button>
            )}

            {maxPrice !== 200000 && (
              <button
                type="button"
                onClick={() =>
                  setMaxPrice(200000)
                }
                className="flex items-center gap-2 rounded-full bg-black/5 px-3 py-2 text-xs font-medium transition hover:bg-black/10"
              >
                Hasta {formatPrice(maxPrice)}

                <X size={13} />
              </button>
            )}

            {sortBy !== "Destacados" && (
              <button
                type="button"
                onClick={() =>
                  setSortBy("Destacados")
                }
                className="flex items-center gap-2 rounded-full bg-black/5 px-3 py-2 text-xs font-medium transition hover:bg-black/10"
              >
                {sortBy}

                <X size={13} />
              </button>
            )}

            <button
              type="button"
              onClick={clearFilters}
              className="ml-1 text-xs font-medium text-black/45 transition hover:text-black"
            >
              Limpiar todo
            </button>
          </div>
        )}

        {filteredProducts.length === 0 ? (
          <div className="mt-16 flex min-h-87.5 items-center justify-center rounded-3xl border border-black/10 bg-white px-6 text-center">
            <div>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-black/5">
                <SlidersHorizontal
                  size={26}
                  strokeWidth={1.6}
                />
              </div>

              <h2 className="mt-6 text-2xl font-bold">
                No encontramos productos
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-black/50">
                Prueba cambiando la categoría o aumentando el
                precio máximo.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-black/80"
              >
                Limpiar filtros
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => {
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
                        fill={
                          favorite
                            ? "currentColor"
                            : "none"
                        }
                      />
                    </button>
                  </div>

                  <div className="pt-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-black/40">
                      {product.category}
                    </p>

                    <h2 className="mt-2 text-sm font-medium leading-5">
                      {product.name}
                    </h2>

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

export default Products;