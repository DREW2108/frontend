import type { FormEvent } from "react";
import { ArrowRight, Search, Star } from "lucide-react";
import { products } from "../data/products";

function Home() {
  const categories = [
    {
      name: "Moda",
      description: "Estilo para todos los días.",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050",
    },
    {
      name: "Tecnología",
      description: "Objetos que simplifican tu mundo.",
      image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece",
    },
    {
      name: "Hogar",
      description: "Espacios que se sienten tuyos.",
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
    },
    {
      name: "Accesorios",
      description: "Los detalles también importan.",
      image: "https://images.unsplash.com/photo-1523779917675-b6ed3a42a561",
    },
  ];

  const featuredProducts = products.slice(0, 4);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const query = String(formData.get("query") ?? "").trim();

    if (!query) {
      return;
    }

    window.location.href = `/buscar?q=${encodeURIComponent(query)}`;
  };

  return (
    <main className="overflow-hidden">
      <section className="mx-auto max-w-7xl px-5 pb-16 pt-8 md:px-6 md:pb-24 md:pt-12">
        <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
          <div
            className="relative min-h-100 overflow-hidden rounded-4xl bg-black text-white"
            style={{
              animation: "fadeIn 0.7s ease-out both",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8"
              alt="Selección de productos VANTA"
              className="absolute inset-0 h-full w-full object-cover opacity-45"
            />

            <div className="absolute inset-0 bg-linear-to-br from-black via-black/65 to-transparent" />

            <div className="relative flex min-h-100 flex-col justify-between p-7 md:p-10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-[0.22em] text-white/60">
                  VANTA / 01
                </span>

                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/70">
                  Marketplace
                </span>
              </div>

              <div className="max-w-xl">
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-white/50">
                  Algo diferente
                </p>

                <h1 className="text-5xl font-bold leading-[0.92] tracking-tighter md:text-7xl">
                  Encuentra algo
                  <br />
                  que te guste.
                </h1>

                <p className="mt-6 max-w-lg text-sm leading-6 text-white/65 md:text-base">
                  Una selección de productos pensados para acompañar tu estilo,
                  tu espacio y tu día a día.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="/productos"
                    className="inline-flex items-center gap-3 rounded-xl bg-white px-5 py-3.5 text-sm font-semibold !text-black transition duration-300 hover:-translate-y-0.5 hover:bg-white/90"
                  >
                    <span className="text-black">Explorar productos</span>

                    <ArrowRight size={17} className="text-black" />
                  </a>

                  <a
                    href="/buscar"
                    className="inline-flex items-center gap-3 rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:bg-white/15"
                  >
                    Buscar
                    <Search size={17} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div
            className="relative overflow-hidden rounded-4xl border border-black/10 bg-white p-7 md:p-9"
            style={{
              animation: "fadeIn 0.7s ease-out 0.12s both",
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-black/35">
                  Descubre
                </p>

                <p className="mt-2 text-2xl font-bold tracking-tight">
                  Busca lo que necesitas.
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white">
                <Search size={19} strokeWidth={1.8} />
              </div>
            </div>

            <form onSubmit={handleSearch} className="mt-8">
              <label htmlFor="home-search" className="sr-only">
                Buscar productos
              </label>

              <div className="flex items-center rounded-2xl border border-black/10 bg-[#f7f7f8] p-2 transition focus-within:border-black/25 focus-within:bg-white">
                <Search size={18} className="ml-3 shrink-0 text-black/35" />

                <input
                  id="home-search"
                  name="query"
                  type="search"
                  placeholder="¿Qué estás buscando?"
                  className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm outline-none placeholder:text-black/35"
                />

                <button
                  type="submit"
                  className="rounded-xl bg-black px-4 py-3 text-xs font-semibold text-white transition hover:bg-black/80"
                >
                  Buscar
                </button>
              </div>
            </form>

            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-[#f7f7f8] p-4">
                <p className="text-2xl font-bold">{products.length}+</p>

                <p className="mt-1 text-xs text-black/40">Productos</p>
              </div>

              <div className="rounded-2xl bg-[#f7f7f8] p-4">
                <p className="text-2xl font-bold">4</p>

                <p className="mt-1 text-xs text-black/40">Categorías</p>
              </div>
            </div>

            <div className="mt-8 flex items-end justify-between border-t border-black/10 pt-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/30">
                  VANTA
                </p>

                <p className="mt-2 text-sm font-medium text-black/60">
                  Compra sin complicaciones.
                </p>
              </div>

              <div className="text-right">
                <p className="text-3xl font-bold tracking-tight">01</p>

                <p className="text-[10px] uppercase tracking-wider text-black/30">
                  Inicio
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 md:px-6 md:pb-28">
        <div className="flex flex-col gap-4 border-b border-black/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-black/35">
              Explora
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
              Categorías.
            </h2>
          </div>

          <a
            href="/productos"
            className="inline-flex items-center gap-2 text-sm font-semibold transition hover:opacity-60"
          >
            Ver todos
            <ArrowRight size={16} />
          </a>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {categories.map((category, index) => (
            <a
              key={category.name}
              href={`/productos?categoria=${encodeURIComponent(category.name)}`}
              className="group relative min-h-87.5 overflow-hidden rounded-3xl bg-black"
              style={{
                animation: `fadeIn 0.6s ease-out ${index * 0.08}s both`,
              }}
            >
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 h-full w-full object-cover opacity-75 transition duration-700 group-hover:scale-105 group-hover:opacity-90"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black via-black/25 to-transparent" />

              <div className="relative flex min-h-87.5 flex-col justify-end p-5 text-white md:p-6">
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/55">
                  0{index + 1}
                </span>

                <h3 className="mt-2 text-2xl font-bold tracking-tight">
                  {category.name}
                </h3>

                <p className="mt-1 max-w-45ext-xs leading-5 text-white/60">
                  {category.description}
                </p>

                <div className="mt-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 transition duration-300 group-hover:translate-x-1 group-hover:bg-white group-hover:text-black">
                  <ArrowRight size={15} />
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-6 md:py-28">
          <div className="flex flex-col gap-4 border-b border-black/10 pb-7 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-black/35">
                Selección VANTA
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
                Lo que está destacando.
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-black/45">
                Productos seleccionados para que encuentres algo interesante sin
                tener que atravesar un océano de resultados.
              </p>
            </div>

            <a
              href="/productos"
              className="inline-flex items-center gap-2 text-sm font-semibold transition hover:opacity-60"
            >
              Ver catálogo
              <ArrowRight size={16} />
            </a>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product, index) => (
              <a
                key={product.id}
                href={`/productos/${product.id}`}
                className="group overflow-hidden rounded-3xl border border-black/10 bg-[#f7f7f8] transition duration-300 hover:-translate-y-1 hover:border-black/15 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)]"
                style={{
                  animation: `fadeIn 0.6s ease-out ${index * 0.08}s both`,
                }}
              >
                <div className="relative aspect-4/5 overflow-hidden bg-[#eeeeef]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  {product.discount && (
                    <span className="absolute left-3 top-3 rounded-full bg-black px-3 py-1.5 text-[10px] font-bold text-white">
                      -{product.discount}%
                    </span>
                  )}
                </div>

                <div className="p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-black/35">
                    {product.category}
                  </p>

                  <h3 className="mt-2 text-sm font-semibold leading-5 tracking-tight">
                    {product.name}
                  </h3>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <p className="text-base font-bold">
                      {formatPrice(product.price)}
                    </p>

                    <div className="flex items-center gap-1 text-xs text-black/45">
                      <Star size={13} fill="currentColor" />
                      {product.rating}
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-6 md:py-28">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-4xl border border-black/10 bg-[#e9e5ff] p-7 md:p-10">
            <div className="flex items-start justify-between">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-black/45">
                Selección
              </p>

              <span className="text-5xl font-bold tracking-[-0.06em] text-black/10 md:text-7xl">
                04
              </span>
            </div>

            <div className="mt-20 md:mt-28">
              <h2 className="max-w-md text-3xl font-bold leading-tight tracking-tight md:text-4xl">
                Categorías para descubrir algo nuevo.
              </h2>

              <a
                href="/productos"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-black px-5 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-black/80"
              >
                Explorar
                <ArrowRight size={16} />
              </a>
            </div>
          </div>

          <div className="rounded-4xl border border-black/10 bg-[#dcecff] p-7 md:p-10">
            <div className="flex items-start justify-between">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-black/45">
                VANTA
              </p>

              <span className="text-5xl font-bold tracking-[-0.06em] text-black/10 md:text-7xl">
                01
              </span>
            </div>

            <div className="mt-20 md:mt-28">
              <h2 className="max-w-md text-3xl font-bold leading-tight tracking-tight md:text-4xl">
                Descubrir algo diferente.
              </h2>

              <p className="mt-4 max-w-md text-sm leading-6 text-black/50">
                Una experiencia de compra simple, visual y pensada para
                encontrar productos que realmente llamen tu atención.
              </p>

              <a
                href="/buscar"
                className="mt-7 inline-flex items-center gap-2 rounded-xl border border-black/15 bg-white px-5 py-3.5 text-sm font-semibold transition hover:-translate-y-0.5 hover:bg-black hover:text-white"
              >
                Buscar productos
                <Search size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-black/10 bg-black text-white">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-6 md:py-20">
          <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/35">
                VANTA
              </p>

              <h2 className="mt-4 max-w-2xl text-4xl font-bold leading-tight tracking-[-0.04em] md:text-5xl">
                Encuentra tu próximo favorito.
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-6 text-white/45">
                Explora nuestra selección y descubre productos para tu estilo,
                tu espacio y tu día a día.
              </p>
            </div>

            <a
              href="/productos"
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-white px-6 py-4 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-white/90"
            >
              Ver productos
              <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
