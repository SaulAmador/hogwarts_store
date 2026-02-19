import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { login as loginService } from "../services/authService";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth(); // Usamos el login del contexto

  useEffect(() => {
    gsap.from(".login-title", {
      opacity: 0,
      duration: 1.2,
      y: -30,
      ease: "power2.out",
    });
    gsap.from(".login-form", {
      opacity: 0,
      duration: 1.2,
      y: 30,
      ease: "power2.out",
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const data = await loginService(email, password);
      login(data.access_token); // Actualizamos el estado global
      navigate("/"); // O a donde quieras redirigir
    } catch (err) {
      setError(err.toString());
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Por favor, ingresa tu email");
      return;
    }
    try {
      await import("../services/authService").then(m => m.forgotPassword(email));
      alert("Se ha enviado un correo de recuperación (Simulado)");
    } catch (err) {
      setError(err.toString());
    }
  };

  return (
    <div style={{
      maxWidth: "400px",
      margin: "auto",
      padding: "6rem 2rem 2rem",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }}>
      <div style={{
        background: "rgba(255, 255, 255, 0.08)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        borderRadius: "16px",
        padding: "2rem",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)"
      }}>
        <h2 className="login-title" style={{
          textAlign: "center",
          marginBottom: "1.5rem",
          color: "#d4c4a8",
          fontFamily: '"HarryP", serif'
        }}>
          Acceso a Hogwarts Store ✨
        </h2>
        {error && <div style={{ color: '#ff6b6b', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              display: "block",
              width: "100%",
              marginBottom: "1rem",
              padding: "0.8rem",
              borderRadius: "8px",
              border: "1px solid #8b7355",
              background: "rgba(255, 255, 255, 0.9)",
              color: "#2c1810"
            }}
          />
          <input
            type="password"
            placeholder="Hechizo secreto"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              display: "block",
              width: "100%",
              marginBottom: "1rem",
              padding: "0.8rem",
              borderRadius: "8px",
              border: "1px solid #8b7355",
              background: "rgba(255, 255, 255, 0.9)",
              color: "#2c1810"
            }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.8rem",
              backgroundColor: "#5d4e37",
              color: "#f4e4c1",
              border: "2px solid #8b7355",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              fontFamily: '"HarryP", serif',
              transition: "all 0.3s ease"
            }}
          >
            Alohomora
          </button>
          <div style={{ textAlign: 'right', marginTop: '0.5rem' }}>
            <button
              type="button"
              onClick={handleForgotPassword}
              style={{
                background: 'none',
                border: 'none',
                color: '#d4c4a8',
                cursor: 'pointer',
                fontSize: '0.8rem',
                textDecoration: 'underline'
              }}
            >
              ¿Olvidaste tu hechizo secreto?
            </button>
          </div>
        </form>
        <p style={{ marginTop: "1rem", textAlign: "center", color: '#d4c4a8' }}>
          ¿No tienes cuenta? <a href="/register" style={{ color: '#ffcc00' }}>Regístrate aquí</a>
        </p>
      </div>
    </div>
  );
}
