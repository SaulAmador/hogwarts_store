import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard.jsx";
import { getObjects } from "../services/productService.js";

export default function Objetos() {
    const [objects, setObjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchObjects = async () => {
            try {
                const data = await getObjects();
                setObjects(data);
            } catch (err) {
                console.error("Error fetching objects:", err);
                setError("No se pudieron cargar los objetos.");
            } finally {
                setLoading(false);
            }
        };
        fetchObjects();
    }, []);

    if (loading) return <div className="page" style={{ textAlign: 'center', marginTop: '2rem' }}>Desempolvando artefactos... 📜</div>;
    if (error) return <div className="page" style={{ textAlign: 'center', marginTop: '2rem', color: 'red' }}>{error}</div>;

    return (
        <main className="page">
            <header className="page-header">
                <h2 className="page-title">Objetos Mágicos 📜</h2>
                <p className="page-subtitle">Artefactos únicos para magos y brujas curiosos.</p>
            </header>

            <section className="grid">
                {objects.map((item) => (
                    <ProductCard key={item.id} {...item} />
                ))}
            </section>
        </main>
    );
}
