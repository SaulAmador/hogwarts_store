import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard.jsx";
import { getPotions } from "../services/productService.js";

export default function Pociones() {
    const [potions, setPotions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPotions = async () => {
            try {
                const data = await getPotions();
                setPotions(data);
            } catch (err) {
                console.error("Error fetching potions:", err);
                setError("No se pudieron cargar las pociones.");
            } finally {
                setLoading(false);
            }
        };
        fetchPotions();
    }, []);

    if (loading) return <div className="page" style={{ textAlign: 'center', marginTop: '2rem' }}>Burbujeando pociones... 🧪</div>;
    if (error) return <div className="page" style={{ textAlign: 'center', marginTop: '2rem', color: 'red' }}>{error}</div>;

    return (
        <main className="page">
            <header className="page-header">
                <h2 className="page-title">Pociones 🧪</h2>
                <p className="page-subtitle">
                    Elige tu mezcla perfecta para cada ocasión.
                </p>
            </header>

            <section className="grid">
                {potions.map((item) => (
                    <ProductCard key={item.id} {...item} />
                ))}
            </section>
        </main>
    );
}