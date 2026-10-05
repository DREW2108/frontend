import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { CartProvider } from "./context/CartContext";
import { OrderProvider } from "./context/OrderContext";
import { FavoritesProvider } from "./favorites/FavoritesContext";
import { AuthProvider } from "./auth/AuthContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <OrderProvider>
          <FavoritesProvider>
            <App />
          </FavoritesProvider>
        </OrderProvider>
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
);
