import {
  ArrowRight,
  Check,
  Package,
  ShoppingBag,
} from "lucide-react";
import { useOrders } from "../context/useOrders";

function OrderConfirmation() {
  const { getOrderById } = useOrders();

  const params = new URLSearchParams(
    window.location.search
  );

  const orderId = params.get("id");

  const order = orderId
    ? getOrderById(orderId)
    : undefined;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (!order) {
    return (
      <main className="mx-auto flex min-h-[75vh] max-w-7xl items-center justify-center px-6 py-16">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-black/5">
            <Package
              size={32}
              strokeWidth={1.6}
            />
          </div>

          <h1 className="mt-7 text-3xl font-bold tracking-tight">
            Pedido no encontrado
          </h1>

          <p className="mt-4 text-sm leading-6 text-black/50">
            No pudimos encontrar el pedido solicitado.
          </p>

          <a
            href="/"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-black px-6 py-4 text-sm font-semibold text-white transition hover:bg-black/80"
          >
            Volver al inicio
            <ArrowRight size={17} />
          </a>
        </div>
      </main>
    );
  }

  const formattedDate = new Intl.DateTimeFormat(
    "es-CO",
    {
      dateStyle: "long",
      timeStyle: "short",
    }
  ).format(new Date(order.createdAt));

  return (
    <main className="mx-auto max-w-7xl px-6 py-12 md:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-black text-white">
          <Check
            size={36}
            strokeWidth={2}
          />
        </div>

        <p className="mt-8 text-xs font-bold uppercase tracking-[0.22em] text-black/35">
          Pedido confirmado
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
          Gracias por tu compra.
        </h1>

        <p className="mt-5 text-base leading-7 text-black/50">
          Tu pedido ha sido registrado correctamente.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-4xl">
        <div className="rounded-3xl border border-black/10 bg-white p-6 md:p-8">
          <div className="flex flex-col gap-5 border-b border-black/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/35">
                Número de pedido
              </p>

              <p className="mt-2 text-xl font-bold">
                {order.id}
              </p>
            </div>

            <div className="sm:text-right">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/35">
                Fecha
              </p>

              <p className="mt-2 text-sm font-medium">
                {formattedDate}
              </p>
            </div>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-[#f7f7f8] p-5">
              <p className="text-xs text-black/40">
                Estado
              </p>

              <div className="mt-3 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500" />

                <p className="text-sm font-semibold">
                  Pedido recibido
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-[#f7f7f8] p-5">
              <p className="text-xs text-black/40">
                Productos
              </p>

              <p className="mt-3 text-sm font-semibold">
                {order.items.reduce(
                  (total, item) =>
                    total + item.quantity,
                  0
                )}{" "}
                unidades
              </p>
            </div>

            <div className="rounded-2xl bg-[#f7f7f8] p-5">
              <p className="text-xs text-black/40">
                Total
              </p>

              <p className="mt-3 text-sm font-bold">
                {formatPrice(order.total)}
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_300px]">
            <div>
              <div className="flex items-center gap-3">
                <ShoppingBag
                  size={19}
                  strokeWidth={1.7}
                />

                <h2 className="font-bold">
                  Productos
                </h2>
              </div>

              <div className="mt-5 space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 border-b border-black/10 pb-4 last:border-0"
                  >
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[#eeeeef]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold">
                        {item.name}
                      </p>

                      <p className="mt-1 text-xs text-black/40">
                        Cantidad: {item.quantity}
                      </p>
                    </div>

                    <p className="text-sm font-semibold">
                      {formatPrice(
                        item.price *
                          item.quantity
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-bold">
                Entrega
              </h2>

              <div className="mt-4 rounded-2xl bg-[#f7f7f8] p-5">
                <p className="text-sm font-semibold">
                  {order.customerName}
                </p>

                <p className="mt-2 text-sm leading-6 text-black/50">
                  {order.address}
                  <br />
                  {order.city}
                  <br />
                  {order.phone}
                  <br />
                  {order.customerEmail}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-black/10 pt-6">
            <div className="ml-auto max-w-sm space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-black/50">
                  Subtotal
                </span>

                <span className="font-medium">
                  {formatPrice(order.subtotal)}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-black/50">
                  Envío
                </span>

                <span className="font-medium">
                  {order.shipping === 0
                    ? "Gratis"
                    : formatPrice(
                        order.shipping
                      )}
                </span>
              </div>

              <div className="flex justify-between border-t border-black/10 pt-4">
                <span className="font-semibold">
                  Total
                </span>

                <span className="text-xl font-bold">
                  {formatPrice(order.total)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href="/cuenta"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-black px-6 py-4 text-sm font-semibold text-white transition hover:bg-black/80"
          >
            Ver mis pedidos
            <ArrowRight size={17} />
          </a>

          <a
            href="/productos"
            className="flex flex-1 items-center justify-center rounded-xl border border-black/10 bg-white px-6 py-4 text-sm font-semibold transition hover:bg-black/5"
          >
            Seguir comprando
          </a>
        </div>
      </div>
    </main>
  );
}

export default OrderConfirmation;