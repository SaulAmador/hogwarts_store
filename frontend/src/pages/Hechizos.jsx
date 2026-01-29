import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard.jsx";
import { getSpells } from "../services/productService.js";

export default function Hechizos() {
    const [spells, setSpells] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSpells = async () => {
            try {
                const data = await getSpells();
                setSpells(data);
            } catch (err) {
                console.error("Error fetching spells:", err);
                setError("No se pudieron cargar los hechizos.");
            } finally {
                setLoading(false);
            }
        };
        fetchSpells();
    }, []);

    if (loading) return <div className="page" style={{ textAlign: 'center', marginTop: '2rem' }}>Cargando hechizos... 🪄</div>;
    if (error) return <div className="page" style={{ textAlign: 'center', marginTop: '2rem', color: 'red' }}>{error}</div>;

    return (
        <main className="page">
            <header className="page-header">
                <h2 className="page-title">Hechizos ✨</h2>
                <p className="page-subtitle">Domina el arte de la magia con nuestra selección.</p>
            </header>

            <section className="grid">
                {spells.map((item) => (
                    <ProductCard
                        key={item.id}
                        {...item}
                    />
                ))}
            </section>
        </main>
    );
}