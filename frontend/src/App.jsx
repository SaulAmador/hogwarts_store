import { Routes, Route, useLocation } from "react-router-dom";
import Landing from ".//components/Landing.jsx";
import Hechizos from "./pages/Hechizos.jsx";
import Pociones from "./pages/Pociones.jsx";
import Objetos from "./pages/Objetos.jsx";
import Cart from "./pages/Cart.jsx";
import Navbar from "./components/Navbar.jsx";
import Profile from "./pages/Profile.jsx";
import Login from "./components/Login.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Register from "./components/Register.jsx";

export default function App() {
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <>
      {/* Navbar global (se oculta en la Landing) */}
      {!isLanding && <Navbar />}

      {/* Navbar fijo */}
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Landing />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/hechizos" element={<Hechizos />} />
        <Route path="/pociones" element={<Pociones />} />
        <Route path="/objetos" element={<Objetos />} />

        {/* Rutas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route path="/carrito" element={<Cart />} />
          <Route path="/perfil" element={<Profile />} />
        </Route>
      </Routes>
      {/* Footer mágico */}
    </>
  );
}