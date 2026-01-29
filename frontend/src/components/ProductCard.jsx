import { useCart } from "../context/CartContext";

export default function ProductCard({ id, name, price, description, image }) {
    const { addItem } = useCart();

    return (
        <article className="product-card">
            <img src={image} alt={name} />
            <h3>{name}</h3>
            <p>{description}</p>
            <span>${price}</span>
            <button
                className="product-btn"
                onClick={() => {
                    addItem({ id, name, price, image });
                    alert(`¡${name} añadido al baúl! 🪄`);
                }}
            >
                Agregar a mi Baúl 🧳
            </button>
        </article>
    );
}