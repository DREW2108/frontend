import { Heart, LogOut, Mail, Package, ShoppingBag, User } from "lucide-react";
import { useAuth } from "../auth/useAuth";
import { useCart } from "../context/useCart";
import { useFavorites } from "../favorites/useFavorites";

function Account() {
  const { user, isAuthenticated, logout } = useAuth();
  const { cartCount } = useCart();
  const { favoritesCount } = useFavorites();

  if (!isAuthenticated || !user) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-6 py-16">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-black/5">
            <User size={32} strokeWidth={1.6} />
          </div>

          <h1 className="mt-7 text-3xl font-bold tracking-tight">
            Inicia sesión
          </h1>

          <p className="mt-4 text-sm leading-6 text-black/50">
            Necesitas una cuenta para acceder a tu perfil y gestionar tus
            compras.
          </p>

          <a
            href="/login"
            className="mt-7 inline-flex items-center justify-center rounded-xl bg-black px-6 py-4 text-sm font-semibold text-white transition hover:bg-black/80"
          >
            Iniciar sesión
          </a>
        </div>
      </main>
    );
  }

  const initial = user.name.charAt(0).toUpperCase();

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <main className="mx-auto max-w-7xl px-6 py-12 md:py-16">
      <div className="max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-black/40">
          Mi cuenta
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
          Hola, {user.name.split(" ")[0]}.
        </h1>

        <p className="mt-4 text-base leading-7 text-black/50">
          Gestiona tu información y revisa tu actividad en VANTA.
        </p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
        <section className="rounded-3xl border border-black/10 bg-white p-6 md:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-black text-2xl font-bold text-white">
              {initial}
            </div>

            <div>
              <p className="text-xl font-bold">{user.name}</p>

              <div className="mt-2 flex items-center gap-2 text-sm text-black/50">
                <Mail size={16} />
                {user.email}
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-[#f7f7f8] p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-black/50">Favoritos</span>

                <Heart size={19} strokeWidth={1.7} />
              </div>

              <p className="mt-4 text-3xl font-bold">{favoritesCount}</p>

              <a
                href="/favoritos"
                className="mt-3 inline-block text-xs font-semibold transition hover:opacity-60"
              >
                Ver favoritos
              </a>
            </div>

            <div className="rounded-2xl bg-[#f7f7f8] p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-black/50">Carrito</span>

                <ShoppingBag size={19} strokeWidth={1.7} />
              </div>

              <p className="mt-4 text-3xl font-bold">{cartCount}</p>

              <a
                href="/carrito"
                className="mt-3 inline-block text-xs font-semibold transition hover:opacity-60"
              >
                Ver carrito
              </a>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-black/10 bg-black p-6 text-white md:p-8">
          <Package size={25} strokeWidth={1.6} />

          <h2 className="mt-6 text-2xl font-bold">Mis pedidos</h2>

          <p className="mt-3 text-sm leading-6 text-white/50">
            Aquí aparecerá el historial de tus compras cuando conectemos VANTA
            con el sistema de pedidos.
          </p>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-white/35">
              Próximamente
            </p>

            <p className="mt-2 text-sm font-medium">Historial de pedidos</p>
          </div>
        </section>
      </div>

      <section className="mt-6 rounded-3xl border border-black/10 bg-white p-6 md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold">Sesión actual</p>

            <p className="mt-1 text-sm text-black/45">
              Has iniciado sesión como {user.email}
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 rounded-xl border border-red-200 px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
          >
            <LogOut size={17} />
            Cerrar sesión
          </button>
        </div>
      </section>
    </main>
  );
}

export default Account;
