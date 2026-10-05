import Header from "./components/Header";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Favorites from "./pages/Favorites";
import Search from "./pages/Search";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/Account";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";

function App() {
  const path = window.location.pathname;

  return (
    <div className="min-h-screen bg-[#f7f7f8] text-[#171717]">
      <Header />

      {path.startsWith("/productos/") ? (
        <ProductDetail />
      ) : path === "/productos" ? (
        <Products />
      ) : path === "/checkout" ? (
        <Checkout />
      ) : path === "/pedido-confirmado" ? (
        <OrderConfirmation />
      ) : path === "/carrito" ? (
        <Cart />
      ) : path === "/favoritos" ? (
        <Favorites />
      ) : path === "/buscar" ? (
        <Search />
      ) : path === "/login" ? (
        <Login />
      ) : path === "/registro" ? (
        <Register />
      ) : path === "/cuenta" ? (
        <Account />
      ) : (
        <Home />
      )}
    </div>
  );
}

export default App;
