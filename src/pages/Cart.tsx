import {
  ArrowLeft,
  Check,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Truck,
} from "lucide-react";
import { useCart } from "../context/useCart";

function Cart() {
  const {
    cart,
    cartCount,
    cartTotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (cart.length === 0) {
    return (
      <main className="min-h-screen">
        <section className="mx-auto flex min-h-[calc(100vh-76px)] max-w-7xl items-center justify-center px-5 py-16 md:px-6">
          <div className="mx-auto max-w-xl text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-black text-white">
              <ShoppingBag size={28} strokeWidth={1.5} />
            </div>

            <p className="mt-8 text-xs font-bold uppercase tracking-[0.22em] text-black/35">
              Tu carrito
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-[-0.04em] md:text-5xl">
              Tu carrito está vacío.
            </h1>

            <p className="mx-auto mt-5 max-w-md text-base leading-7 text-black/50">
              Todavía no has agregado productos. Explora VANTA y encuentra algo
              que quieras llevar contigo.
            </p>

            <a
              href="/productos"
              className="mt-8 inline-flex items-center gap-3 rounded-xl bg-black px-6 py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-black/85"
            >
              Explorar productos
              <ArrowLeft size={17} />
            </a>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-7xl px-5 py-10 md:px-6 md:py-16">
        <div className="border-b border-black/10 pb-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-black" />

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-black/40">
                  VANTA
                </p>
              </div>

              <h1 className="text-4xl font-bold leading-[0.95] tracking-[-0.045em] md:text-6xl">
                Tu carrito.
              </h1>

              <p className="mt-5 text-sm text-black/45 md:text-base">
                {cartCount} {cartCount === 1 ? "producto" : "productos"} en tu
                selección.
              </p>
            </div>

            <button
              type="button"
              onClick={clearCart}
              className="flex items-center gap-2 self-start text-sm font-medium text-black/45 transition hover:text-black sm:self-auto"
            >
              <Trash2 size={16} strokeWidth={1.7} />
              Vaciar carrito
            </button>
          </div>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px] lg:items-start">
          <section>
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/35">
                Productos seleccionados
              </p>

              <span className="text-xs text-black/35">
                {cartCount} {cartCount === 1 ? "unidad" : "unidades"}
              </span>
            </div>

            <div className="space-y-4">
              {cart.map((item) => (
                <article
                  key={item.id}
                  className="group flex gap-4 rounded-3xl border border-black/10 bg-white p-4 transition duration-300 hover:border-black/15 hover:shadow-[0_15px_45px_rgba(0,0,0,0.05)] md:gap-6 md:p-5"
                >
                  <a
                    href={`/productos/${item.id}`}
                    className="h-28 w-28 shrink-0 overflow-hidden rounded-2xl border border-black/5 bg-[#eeeeef] md:h-40 md:w-40"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </a>

                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-black/35">
                            {item.category}
                          </p>

                          <a
                            href={`/productos/${item.id}`}
                            className="mt-2 block text-sm font-semibold leading-5 tracking-tight transition hover:opacity-60 md:text-base"
                          >
                            {item.name}
                          </a>
                        </div>

                        <button
                          type="button"
                          aria-label={`Eliminar ${item.name}`}
                          onClick={() => removeFromCart(item.id)}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-black/35 transition hover:bg-black/5 hover:text-black"
                        >
                          <Trash2 size={17} strokeWidth={1.7} />
                        </button>
                      </div>

                      <p className="mt-3 text-sm font-bold">
                        {formatPrice(item.price)}
                      </p>
                    </div>

                    <div className="mt-5 flex items-center justify-between gap-3">
                      <div className="flex h-10 items-center rounded-xl border border-black/10 bg-[#fafafa]">
                        <button
                          type="button"
                          aria-label={`Reducir cantidad de ${item.name}`}
                          onClick={() => decreaseQuantity(item.id)}
                          className="flex h-full w-10 items-center justify-center text-black/45 transition hover:bg-black/5 hover:text-black"
                        >
                          <Minus size={14} strokeWidth={1.8} />
                        </button>

                        <span className="min-w-8 text-center text-xs font-bold">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          aria-label={`Aumentar cantidad de ${item.name}`}
                          onClick={() => increaseQuantity(item.id)}
                          className="flex h-full w-10 items-center justify-center text-black/45 transition hover:bg-black/5 hover:text-black"
                        >
                          <Plus size={14} strokeWidth={1.8} />
                        </button>
                      </div>

                      <p className="hidden text-xs text-black/35 sm:block">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <aside className="overflow-hidden rounded-3xl border border-black/10 bg-white">
            <div className="border-b border-black/10 p-6 md:p-7">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/35">
                Resumen
              </p>

              <h2 className="mt-2 text-xl font-bold tracking-tight">
                Resumen del pedido
              </h2>

              <div className="mt-7 space-y-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-black/45">Productos</span>

                  <span className="font-medium">{cartCount}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-black/45">Subtotal</span>

                  <span className="font-medium">{formatPrice(cartTotal)}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-black/45">Envío</span>

                  <span className="font-semibold">Gratis</span>
                </div>
              </div>

              <div className="my-6 border-t border-black/10" />

              <div className="flex items-end justify-between gap-4">
                <span className="text-sm font-semibold">Total</span>

                <span className="text-2xl font-bold tracking-tight">
                  {formatPrice(cartTotal)}
                </span>
              </div>

              <a
                href="/checkout"
                className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-black px-6 py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-black/85"
              >
                Continuar con la compra
                <ArrowLeft className="rotate-180" size={17} />
              </a>

              <a
                href="/productos"
                className="mt-4 flex items-center justify-center gap-2 text-sm font-medium text-black/45 transition hover:text-black"
              >
                <ArrowLeft size={16} />
                Seguir comprando
              </a>
            </div>

            <div className="bg-[#f7f7f5] px-6 py-5 md:px-7">
              <div className="flex items-center gap-3">
                <Truck size={17} strokeWidth={1.7} />

                <div>
                  <p className="text-xs font-semibold">Envío nacional</p>

                  <p className="mt-0.5 text-[11px] text-black/40">
                    Disponible en Colombia.
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <ShieldCheck size={17} strokeWidth={1.7} />

                <div>
                  <p className="text-xs font-semibold">Compra segura</p>

                  <p className="mt-0.5 text-[11px] text-black/40">
                    Tu compra está protegida.
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <Check size={17} strokeWidth={1.7} />

                <div>
                  <p className="text-xs font-semibold">Productos disponibles</p>

                  <p className="mt-0.5 text-[11px] text-black/40">
                    Selección disponible para compra.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  ); 
}

export default Cart;
