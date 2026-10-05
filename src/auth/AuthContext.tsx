import { useEffect, useState, type ReactNode } from "react";
import { AuthContext, type User } from "./AuthContextDefinition";

function getInitialUser(): User | null {
  if (typeof window === "undefined") {
    return null;
  }

  const savedUser = localStorage.getItem("vanta-user");

  if (!savedUser) {
    return null;
  }

  try {
    const parsedUser = JSON.parse(savedUser);

    if (
      !parsedUser ||
      typeof parsedUser !== "object" ||
      !parsedUser.id ||
      !parsedUser.name ||
      !parsedUser.email
    ) {
      return null;
    }

    return parsedUser;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(getInitialUser);

  useEffect(() => {
    if (user) {
      localStorage.setItem("vanta-user", JSON.stringify(user));
    } else {
      localStorage.removeItem("vanta-user");
    }
  }, [user]);

  async function login(email: string, password: string) {
    if (!email || !password) {
      throw new Error("El correo y la contraseña son obligatorios.");
    }

    await new Promise((resolve) => setTimeout(resolve, 500));

    const fakeUser: User = {
      id: 1,
      name: "Usuario VANTA",
      email,
    };

    setUser(fakeUser);
  }

  async function register(name: string, email: string, password: string) {
    if (!name || !email || !password) {
      throw new Error("Todos los campos son obligatorios.");
    }

    await new Promise((resolve) => setTimeout(resolve, 500));

    const newUser: User = {
      id: Date.now(),
      name,
      email,
    };

    setUser(newUser);
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== null,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
