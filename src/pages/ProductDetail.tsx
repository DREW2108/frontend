import { useState } from "react";
import {
  ArrowLeft,
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Star,
} from "lucide-react";
import { products } from "../data/products";
import { useCart } from "../context/useCart";
import { useFavorites } from "../favorites/useFavorites";

function ProductDetail() {
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  const productId = Number(
    window.location.pathname.split("/").pop()
  );

  const product = products.find(
    (item) => item.id === productId
  );

  const [quantity, setQuantity] = useState(1);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleIncrease = () => {
    if (!product) {
      return;
    }

    setQuantity((current) =>
      current < product.stock
        ? current + 1
        : current
    );
  };

  const handleDecrease = () => {
    setQuantity((current) =>
      current > 1 ? current - 1 : 1
    );
  };

  const handleAddToCart = () => {
    if (!product) {
      return;
    }

    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  if (!product) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-20">
        <h1 className="text-3xl font-bold">
          Producto no encontrado
        </h1>

        <a
          href="/productos"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold"
        >
          <ArrowLeft size={18} />
          Volver a productos
        </a>
      </main>
    );
  }

  const favorite = isFavorite(product.id);

  return (
    <main className="mx-auto max-w-7xl px-6 py-10 md:py-16">
      <a
        href="/productos"
        className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-black/60 transition hover:text-black"
      >
        <ArrowLeft size={18} />
        Volver a productos
      </a>

      <div className="grid gap-12 md:grid-cols-2">
        <div className="relative overflow-hidden rounded-3xl bg-[#eeeeef]">
          <img
            src={product.image}
            alt={product.name}
            className="aspect-square h-full w-full object-cover"
          />

          {product.discount && (
            <span className="absolute left-5 top-5 rounded-full bg-black px-4 py-2 text-xs font-bold text-white">
              -{product.discount}%
            </span>
          )}
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-sm font-medium uppercase tracking-widest text-black/40">
            {product.category}
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            {product.name}
          </h1>

          <div className="mt-5 flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Star
                size={17}
                fill="currentColor"
              />

              <span className="text-sm font-semibold">
                {product.rating}
              </span>
            </div>

            <span className="text-sm text-black/40">
              {product.reviews} reseñas
            </span>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <span className="text-2xl font-bold">
              {formatPrice(product.price)}
            </span>

            {product.oldPrice && (
              <span className="text-base text-black/35 line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>

          <p className="mt-6 max-w-lg text-base leading-7 text-black/55">
            {product.description}
          </p>

          <div className="mt-8 rounded-2xl border border-black/10 bg-white p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-black/50">
                Vendedor
              </span>

              <span className="text-sm font-semibold">
                {product.seller}
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-black/10 pt-4">
              <span className="text-sm text-black/50">
                Disponibilidad
              </span>

              <span
                className={`text-sm font-semibold ${
                  product.stock <= 5
                    ? "text-orange-600"
                    : "text-green-600"
                }`}
              >
                {product.stock <= 5
                  ? `Solo quedan ${product.stock}`
                  : "Disponible"}
              </span>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <div className="flex items-center rounded-xl border border-black/10 bg-white">
              <button
                type="button"
                aria-label="Reducir cantidad"
                onClick={handleDecrease}
                className="p-3 transition hover:bg-black/5"
              >
                <Minus size={17} />
              </button>

              <span className="min-w-10 text-center text-sm font-semibold">
                {quantity}
              </span>

              <button
                type="button"
                aria-label="Aumentar cantidad"
                onClick={handleIncrease}
                className="p-3 transition hover:bg-black/5"
              >
                <Plus size={17} />
              </button>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-black px-6 py-4 text-sm font-semibold text-white transition hover:bg-black/80"
            >
              <ShoppingBag size={18} />
              Agregar al carrito
            </button>

            <button
              type="button"
              aria-label={
                favorite
                  ? `Quitar ${product.name} de favoritos`
                  : `Agregar ${product.name} a favoritos`
              }
              onClick={() => toggleFavorite(product)}
              className="rounded-xl border border-black/10 bg-white p-4 transition hover:bg-black/5"
            >
              <Heart
                size={19}
                strokeWidth={1.8}
                fill={
                  favorite
                    ? "currentColor"
                    : "none"
                }
              />
            </button>
          </div>

          <div className="mt-10 border-t border-black/10 pt-6">
            <div className="flex justify-between py-3 text-sm">
              <span className="text-black/50">
                Categoría
              </span>

              <span className="font-medium">
                {product.category}
              </span>
            </div>

            <div className="flex justify-between border-t border-black/10 py-3 text-sm">
              <span className="text-black/50">
                Vendedor
              </span>

              <span className="font-medium">
                {product.seller}
              </span>
            </div>

            <div className="flex justify-between border-t border-black/10 py-3 text-sm">
              <span className="text-black/50">
                Reseñas
              </span>

              <span className="font-medium">
                {product.reviews}
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductDetail;