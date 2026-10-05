import { useState, type FormEvent } from "react";
import { CreditCard, MapPin, Package, ShoppingBag } from "lucide-react";
import { useCart } from "../context/useCart";
import { useAuth } from "../auth/useAuth";
import { useOrders } from "../context/useOrders";

function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();

  const { isAuthenticated, user } = useAuth();
  const { createOrder } = useOrders();

  const [name, setName] = useState(user?.name ?? "");

  const [email, setEmail] = useState(user?.email ?? "");

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const shipping = cartTotal >= 150000 ? 0 : 12000;

  const total = cartTotal + shipping;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user) {
      return;
    }

    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 700));

    const order = createOrder({
      userId: user.id,
      customerName: name.trim(),
      customerEmail: email.trim(),
      phone: phone.trim(),
      address: address.trim(),
      city: city.trim(),
      items: cart,
      subtotal: cartTotal,
      shipping,
      total,
      status: "received",
    });

    clearCart();

    window.location.href = `/pedido-confirmado?id=${order.id}`;
  };

  if (!isAuthenticated || !user) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-6 py-16">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-black/5">
            <ShoppingBag size={32} strokeWidth={1.6} />
          </div>

          <h1 className="mt-7 text-3xl font-bold tracking-tight">
            Inicia sesión para continuar
          </h1>

          <p className="mt-4 text-sm leading-6 text-black/50">
            Necesitas una cuenta para completar tu compra y consultar tus
            pedidos posteriormente.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href="/login"
              className="rounded-xl bg-black px-6 py-4 text-sm font-semibold text-white transition hover:bg-black/80"
            >
              Iniciar sesión
            </a>

            <a
              href="/registro"
              className="rounded-xl border border-black/10 bg-white px-6 py-4 text-sm font-semibold transition hover:bg-black/5"
            >
              Crear cuenta
            </a>
          </div>
        </div>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-6 py-16">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-black/5">
            <ShoppingBag size={32} strokeWidth={1.6} />
          </div>

          <h1 className="mt-7 text-3xl font-bold tracking-tight">
            Tu carrito está vacío
          </h1>

          <p className="mt-4 text-sm leading-6 text-black/50">
            Agrega algunos productos antes de comenzar el proceso de compra.
          </p>

          <a
            href="/productos"
            className="mt-7 inline-flex rounded-xl bg-black px-6 py-4 text-sm font-semibold text-white transition hover:bg-black/80"
          >
            Explorar productos
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-10 md:py-16">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-black/40">
          Checkout
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
          Finalizar compra
        </h1>

        <p className="mt-4 max-w-xl text-sm leading-6 text-black/50">
          Completa tus datos para preparar tu pedido.
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
        <form onSubmit={handleSubmit} className="space-y-6">
          <section className="rounded-3xl border border-black/10 bg-white p-6 md:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white">
                <UserIcon />
              </div>

              <div>
                <h2 className="font-bold">Información personal</h2>

                <p className="mt-1 text-xs text-black/40">
                  Datos para contactarte sobre tu pedido.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="text-sm font-semibold">
                  Nombre completo
                </label>

                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                  className="mt-2 w-full rounded-xl border border-black/10 bg-[#fafafa] px-4 py-3.5 text-sm outline-none transition focus:border-black focus:bg-white"
                />
              </div>

              <div>
                <label htmlFor="phone" className="text-sm font-semibold">
                  Teléfono
                </label>

                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="300 000 0000"
                  required
                  className="mt-2 w-full rounded-xl border border-black/10 bg-[#fafafa] px-4 py-3.5 text-sm outline-none transition focus:border-black focus:bg-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="email" className="text-sm font-semibold">
                  Correo electrónico
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  className="mt-2 w-full rounded-xl border border-black/10 bg-[#fafafa] px-4 py-3.5 text-sm outline-none transition focus:border-black focus:bg-white"
                />
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-black/10 bg-white p-6 md:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white">
                <MapPin size={18} strokeWidth={1.8} />
              </div>

              <div>
                <h2 className="font-bold">Dirección de entrega</h2>

                <p className="mt-1 text-xs text-black/40">
                  Indica dónde quieres recibir tu pedido.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="address" className="text-sm font-semibold">
                  Dirección
                </label>

                <input
                  id="address"
                  type="text"
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  placeholder="Calle 00 # 00-00"
                  required
                  className="mt-2 w-full rounded-xl border border-black/10 bg-[#fafafa] px-4 py-3.5 text-sm outline-none transition focus:border-black focus:bg-white"
                />
              </div>

              <div>
                <label htmlFor="city" className="text-sm font-semibold">
                  Ciudad
                </label>

                <input
                  id="city"
                  type="text"
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                  placeholder="Bogotá"
                  required
                  className="mt-2 w-full rounded-xl border border-black/10 bg-[#fafafa] px-4 py-3.5 text-sm outline-none transition focus:border-black focus:bg-white"
                />
              </div>

              <div>
                <label htmlFor="country" className="text-sm font-semibold">
                  País
                </label>

                <input
                  id="country"
                  type="text"
                  value="Colombia"
                  readOnly
                  className="mt-2 w-full rounded-xl border border-black/10 bg-black/5 px-4 py-3.5 text-sm text-black/50 outline-none"
                />
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-black/10 bg-white p-6 md:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white">
                <CreditCard size={18} strokeWidth={1.8} />
              </div>

              <div>
                <h2 className="font-bold">Método de pago</h2>

                <p className="mt-1 text-xs text-black/40">
                  El procesamiento de pagos se conectará posteriormente.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-black/10 bg-[#f7f7f8] p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white">
                  <CreditCard size={18} />
                </div>

                <div>
                  <p className="text-sm font-semibold">Pago seguro</p>

                  <p className="mt-1 text-xs text-black/40">
                    Pasarela de pago próximamente.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-black px-6 py-4 text-sm font-semibold text-white transition hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Package size={18} />

            {loading ? "Procesando pedido..." : "Confirmar pedido"}
          </button>
        </form>

        <aside className="h-fit rounded-3xl border border-black/10 bg-white p-6 lg:sticky lg:top-6">
          <h2 className="text-lg font-bold">Resumen del pedido</h2>

          <div className="mt-6 space-y-5">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[#eeeeef]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />

                  <span className="absolute right-1 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-[10px] font-bold text-white">
                    {item.quantity}
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{item.name}</p>

                  <p className="mt-1 text-xs text-black/40">{item.category}</p>
                </div>

                <p className="text-sm font-semibold">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-7 border-t border-black/10 pt-5">
            <div className="flex justify-between text-sm">
              <span className="text-black/50">Subtotal</span>

              <span className="font-medium">{formatPrice(cartTotal)}</span>
            </div>

            <div className="mt-3 flex justify-between text-sm">
              <span className="text-black/50">Envío</span>

              <span className="font-medium">
                {shipping === 0 ? "Gratis" : formatPrice(shipping)}
              </span>
            </div>

            <div className="mt-5 flex justify-between border-t border-black/10 pt-5">
              <span className="font-semibold">Total</span>

              <span className="text-xl font-bold">{formatPrice(total)}</span>
            </div>
          </div>

          {shipping === 0 && (
            <div className="mt-5 rounded-xl bg-green-50 px-4 py-3 text-xs font-medium text-green-700">
              Tienes envío gratis en este pedido.
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}

function UserIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21a8 8 0 0 0-16 0" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export default Checkout;
