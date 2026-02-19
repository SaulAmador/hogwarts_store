import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";

export default function Register() {
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
        house: ""
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await register(formData);
            alert("Registro exitoso");
            navigate("/login");
        } catch (error) {
            setError(error.toString());
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
                <h2 style={{
                    textAlign: "center",
                    marginBottom: "1.5rem",
                    color: "#d4c4a8",
                    fontFamily: '"HarryP", serif'
                }}>
                    Registro en Hogwarts Store 🧙‍♂️
                </h2>
                {error && <div style={{ color: "#ff6b6b", marginBottom: "1rem", textAlign: "center" }}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Correo electrónico"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{
                            display: "block",
                            width: "100%",
                            padding: "0.8rem",
                            marginBottom: "1rem",
                            borderRadius: "8px",
                            border: "1px solid #8b7355",
                            background: "rgba(255, 255, 255, 0.9)",
                            color: "#2c1810"
                        }}
                    />

                    <input
                        type="text"
                        name="username"
                        placeholder="Nombre de usuario"
                        value={formData.username}
                        onChange={handleChange}
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
                        name="password"
                        placeholder="Contraseña"
                        value={formData.password}
                        onChange={handleChange}
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

                    <select
                        name="house"
                        value={formData.house}
                        onChange={handleChange}
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
                    >
                        <option value="">Selecciona una casa</option>
                        <option value="gryffindor">Gryffindor</option>
                        <option value="hufflepuff">Hufflepuff</option>
                        <option value="slytherin">Slytherin</option>
                        <option value="ravenclaw">Ravenclaw</option>
                    </select>

                    <input
                        type="text"
                        name="patronus"
                        placeholder="Patronus"
                        value={formData.patronus}
                        onChange={handleChange}
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
                        Registrarse
                    </button>
                </form>

                <p style={{ marginTop: '1rem', textAlign: 'center', color: '#d4c4a8' }}>
                    ¿Ya tienes cuenta? <a href="/login" style={{ color: '#ffcc00' }}>Inicia sesión aquí</a>
                </p>
            </div>
        </div>
    );
}