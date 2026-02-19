import { useCart } from "../context/CartContext";

const getPicsumImage = (id, width = 400, height = 300) => 
    `https://picsum.photos/seed/${id}/${width}/${height}`;

export default function ProductCard({ id, name, price, description, image }) {
    const { addItem } = useCart();
    
    const productImage = image || getPicsumImage(id);

    return (
        <article className="product-card pergamino-card">
            <div className="product-media">
                <img src={productImage} alt={name} />
            </div>
            <div className="product-info pergamino-text">
                <h3 className="product-title pergamino-title">{name}</h3>
                <p className="product-desc">{description}</p>
                <div className="product-actions">
                    <span className="product-price pergamino-price">${price}</span>
                    <button
                        className="product-btn pergamino-btn"
                        onClick={() => {
                            addItem({ id, name, price, image: productImage });
                            alert(`¡${name} añadido al baúl! 🪄`);
                        }}
                    >
                        Agregar a mi Baúl 🧳
                    </button>
                </div>
            </div>
        </article>
    );
}
