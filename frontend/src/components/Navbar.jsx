import { useCart } from "../context/CartContext";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ isLanding = false }) {
    const { items } = useCart();
    const count = items.reduce((sum, i) => sum + i.qty, 0);
    const { isAuthenticated, logout } = useAuth();

    return (
        <nav className="navbar">
            {isLanding ? (
                <a href="/" target="_blank" rel="noopener noreferrer" className="navbar-logo">
                    Hogwards Store
                </a>
            ) : (
                <Link to="/" className="navbar-logo">
                    Hogwards Store
                </Link>
            )}

            <div className="navbar-menu">
                {isLanding ? (
                    <>
                        <a href="/hechizos" target="_blank" rel="noopener noreferrer">Hechizos</a>
                        <a href="/pociones" target="_blank" rel="noopener noreferrer">Pociones</a>
                        <a href="/objetos" target="_blank" rel="noopener noreferrer">Objetos</a>
                        <a href="/carrito" target="_blank" rel="noopener noreferrer" className="navbar-cart">
                            Mi Baúl 🧳 ({count})
                        </a>
                        <a href="/perfil" target="_blank" rel="noopener noreferrer">
                            Perfil
                        </a>
                    </>
                ) : (
                    <>
                        <NavLink to="/hechizos">Hechizos</NavLink>
                        <NavLink to="/pociones">Pociones</NavLink>
                        <NavLink to="/objetos">Objetos</NavLink>
                        <NavLink to="/carrito" className="navbar-cart">
                            Mi Baúl 🧳 ({count})
                        </NavLink>
                        <NavLink to="/perfil">Perfil</NavLink>

                        {isAuthenticated ? (
                            <button
                                onClick={logout}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: 'white',
                                    cursor: 'pointer',
                                    fontSize: '1rem'
                                }}>
                                Salir 🚪
                            </button>
                        ) : (
                            <NavLink to="/login">Acceso 🧙‍♂️</NavLink>
                        )}
                    </>
                )}
            </div>
        </nav>
    );
}