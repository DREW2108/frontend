import { useState, type FormEvent } from "react";
import { ArrowLeft, Lock, Mail } from "lucide-react";
import { useAuth } from "../auth/useAuth";

function Login() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      await login(email.trim(), password);

      window.location.href = "/";
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "No se pudo iniciar sesión."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-80px)] px-6 py-12">
      <div className="mx-auto flex min-h-[calc(100vh-176px)] max-w-md items-center justify-center">
        <div className="w-full">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-black/50 transition hover:text-black"
          >
            <ArrowLeft size={17} />
            Volver al inicio
          </a>

          <div className="mt-10">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-black/40">
              VANTA
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight">
              Iniciar sesión
            </h1>

            <p className="mt-4 text-sm leading-6 text-black/50">
              Accede a tu cuenta para guardar productos, gestionar
              tus favoritos y continuar tus compras.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-8 rounded-3xl border border-black/10 bg-white p-6 shadow-sm md:p-8"
          >
            {error && (
              <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="text-sm font-semibold"
              >
                Correo electrónico
              </label>

              <div className="relative mt-2">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-black/35"
                />

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  placeholder="tu@email.com"
                  autoComplete="email"
                  required
                  className="w-full rounded-xl border border-black/10 bg-[#fafafa] py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-black focus:bg-white"
                />
              </div>
            </div>

            <div className="mt-5">
              <label
                htmlFor="password"
                className="text-sm font-semibold"
              >
                Contraseña
              </label>

              <div className="relative mt-2">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-black/35"
                />

                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  placeholder="Tu contraseña"
                  autoComplete="current-password"
                  required
                  minLength={6}
                  className="w-full rounded-xl border border-black/10 bg-[#fafafa] py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-black focus:bg-white"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-7 flex w-full items-center justify-center rounded-xl bg-black px-5 py-4 text-sm font-semibold text-white transition hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Iniciando sesión..."
                : "Iniciar sesión"}
            </button>

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-black/10" />

              <span className="text-xs text-black/35">
                o
              </span>

              <div className="h-px flex-1 bg-black/10" />
            </div>

            <p className="text-center text-sm text-black/50">
              ¿Todavía no tienes una cuenta?
            </p>

            <a
              href="/registro"
              className="mt-3 flex w-full items-center justify-center rounded-xl border border-black/10 bg-white px-5 py-4 text-sm font-semibold transition hover:bg-black hover:text-white"
            >
              Crear una cuenta
            </a>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Login;