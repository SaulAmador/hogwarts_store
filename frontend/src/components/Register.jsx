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
        <div style={{ maxWidth: "400px", margin: "auto", padding: "2rem" }}>
            <h2>Registro en Hogwarts Store 🧙‍♂️</h2>
            {error && <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>}

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
                        padding: "0.5rem",
                        marginBottom: "1rem"
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
                        padding: "0.5rem"
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
                        padding: "0.5rem"
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
                        padding: "0.5rem"
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
                        padding: "0.5rem"
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
                    Registrarse
                </button>
            </form>

            <p style={{ marginTop: '1rem', textAlign: 'center' }}>
                ¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a>
            </p>
        </div>
    );
}