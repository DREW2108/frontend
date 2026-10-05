import { useState, type FormEvent } from "react";
import {
  ArrowLeft,
  Lock,
  Mail,
  User,
} from "lucide-react";
import { useAuth } from "../auth/useAuth";

function Register() {
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (password.length < 6) {
      setError(
        "La contraseña debe tener al menos 6 caracteres."
      );
      return;
    }

    setLoading(true);

    try {
      await register(
        name.trim(),
        email.trim(),
        password
      );

      window.location.href = "/";
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "No se pudo crear la cuenta."
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
              Crear cuenta
            </h1>

            <p className="mt-4 text-sm leading-6 text-black/50">
              Crea tu cuenta para guardar tus productos y
              comenzar a construir tu experiencia en VANTA.
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
                htmlFor="name"
                className="text-sm font-semibold"
              >
                Nombre
              </label>

              <div className="relative mt-2">
                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-black/35"
                />

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  placeholder="Tu nombre"
                  autoComplete="name"
                  required
                  className="w-full rounded-xl border border-black/10 bg-[#fafafa] py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-black focus:bg-white"
                />
              </div>
            </div>

            <div className="mt-5">
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
                  placeholder="Mínimo 6 caracteres"
                  autoComplete="new-password"
                  required
                  minLength={6}
                  className="w-full rounded-xl border border-black/10 bg-[#fafafa] py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-black focus:bg-white"
                />
              </div>
            </div>

            <div className="mt-5">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-semibold"
              >
                Confirmar contraseña
              </label>

              <div className="relative mt-2">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-black/35"
                />

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(
                      event.target.value
                    )
                  }
                  placeholder="Repite tu contraseña"
                  autoComplete="new-password"
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
                ? "Creando cuenta..."
                : "Crear cuenta"}
            </button>

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-black/10" />

              <span className="text-xs text-black/35">
                o
              </span>

              <div className="h-px flex-1 bg-black/10" />
            </div>

            <p className="text-center text-sm text-black/50">
              ¿Ya tienes una cuenta?
            </p>

            <a
              href="/login"
              className="mt-3 flex w-full items-center justify-center rounded-xl border border-black/10 bg-white px-5 py-4 text-sm font-semibold transition hover:bg-black hover:text-white"
            >
              Iniciar sesión
            </a>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Register;