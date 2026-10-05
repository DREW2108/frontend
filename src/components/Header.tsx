import { Heart, Menu, Search, ShoppingBag, User } from "lucide-react";
import { useAuth } from "../auth/useAuth";
import { useCart } from "../context/useCart";
import { useFavorites } from "../favorites/useFavorites";

function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const { cartCount } = useCart();
  const { favoritesCount } = useFavorites();

  return (
    <header className="border-b border-black/10 bg-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <a href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white">
            V
          </div>

          <span className="text-xl font-bold tracking-tight">VANTA</span>
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          <a href="/" className="transition hover:opacity-60">
            Inicio
          </a>

          <a href="/productos" className="transition hover:opacity-60">
            Categorías
          </a>
        </nav>

        <div className="flex items-center gap-1">
          <a
            href="/buscar"
            aria-label="Buscar productos"
            className="rounded-full p-3 transition hover:bg-black/5"
          >
            <Search size={20} strokeWidth={1.8} />
          </a>

          <a
            href="/favoritos"
            aria-label={`Favoritos con ${favoritesCount} productos`}
            className="relative rounded-full p-3 transition hover:bg-black/5"
          >
            <Heart
              size={20}
              strokeWidth={1.8}
              fill={favoritesCount > 0 ? "currentColor" : "none"}
            />

            {favoritesCount > 0 && (
              <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-black px-1 text-[10px] font-bold leading-none text-white">
                {favoritesCount > 99 ? "99+" : favoritesCount}
              </span>
            )}
          </a>

          <a
            href="/carrito"
            aria-label={`Carrito con ${cartCount} productos`}
            className="relative rounded-full p-3 transition hover:bg-black/5"
          >
            <ShoppingBag size={20} strokeWidth={1.8} />

            {cartCount > 0 && (
              <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-black px-1 text-[10px] font-bold leading-none text-white">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </a>

          {isAuthenticated ? (
            <div className="group relative">
              <button
                type="button"
                aria-label="Abrir menú de usuario"
                className="flex items-center gap-2 rounded-full p-2 transition hover:bg-black/5"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-sm font-bold text-white">
                  {user?.name.charAt(0).toUpperCase()}
                </div>
              </button>

              <div className="invisible absolute right-0 top-full z-50 w-60 translate-y-2 pt-3 opacity-0 transition duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <div className="rounded-2xl border border-black/10 bg-white p-2 shadow-xl">
                  <div className="border-b border-black/10 px-4 py-3">
                    <p className="truncate text-sm font-semibold">
                      {user?.name}
                    </p>

                    <p className="mt-1 truncate text-xs text-black/40">
                      {user?.email}
                    </p>
                  </div>

                  <a
                    href="/cuenta"
                    className="mt-2 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition hover:bg-black/5"
                  >
                    <User size={17} />
                    Mi cuenta
                  </a>

                  <button
                    type="button"
                    onClick={logout}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
                  >
                    Cerrar sesión
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <a
              href="/login"
              aria-label="Iniciar sesión"
              className="rounded-full p-3 transition hover:bg-black/5"
            >
              <User size={20} strokeWidth={1.8} />
            </a>
          )}

          <button
            type="button"
            aria-label="Menú"
            className="rounded-full p-3 transition hover:bg-black/5 md:hidden"
          >
            <Menu size={21} strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
