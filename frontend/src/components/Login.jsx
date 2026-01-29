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

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "2rem" }}>
      <h2 className="login-title">Acceso a Hogwarts Store ✨</h2>
      {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
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
          }}
        />
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "0.5rem",
            backgroundColor: "rgba(124, 124, 124, 1)",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Alohomora
        </button>
      </form>
      <p style={{ marginTop: "1rem", textAlign: "center" }}>
        ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
      </p>
    </div>
  );
}
