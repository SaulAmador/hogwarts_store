import { useCart } from "../context/CartContext.jsx";

export default function Cart() {
    const { items, setQty, removeItem, clear, total } = useCart();

    const handleCheckout = async () => {
        alert("🦉 ¡Tu lechuza está en camino!")
        clear();
    };

    return (
        <main className="page">
            <header className="page-header">
                <h2 className="page-title">Mi Baúl 🧳</h2>
                <p className="page-subtitle">Revisa tus tesoros antes de finalizar tu compra</p>
            </header>

            {items.length === 0 ? (
                <section className="empty">
                    <p>No tienes ningún tesoro en tu baúl 🧳</p>
                    <p>¿Quieres buscar algunos?</p>
                </section>
            ) : (
                <>
                    <section className="cart-list">
                        {items.map((i) => (
                            <div className="cart-item" key={i.id}>
                                <img src={i.image} alt={i.name} className="cart-thumb" />
                                <div className="cart-info">
                                    <h4>{i.name}</h4>
                                    <p>${i.price}</p>
                                    <div className="cart-controls">
                                        <label htmlFor={`qty-${i.id}`}>Cantidad:</label>
                                        <input
                                            id={`qty-${i.id}`}
                                            type="number"
                                            min="1"
                                            value={i.qty}
                                            onChange={(e) => setQty(i.id, Number(e.target.value))}
                                        />
                                        <button className="cart-remove" onClick={() => removeItem(i.id)}>
                                            Eliminar/Evanesco
                                        </button>
                                    </div>
                                </div>
                                <div className="cart-line-total">${(i.price * i.qty).toFixed(2)}</div>
                            </div>
                        ))}
                    </section>

                    <section className="cart-summary">
                        <div className="summary-row">
                            <span>Subtotal:</span>
                            <strong>${total.toFixed(2)}</strong>
                        </div>
                        <button className="checkout-btn" onClick={handleCheckout}>
                            Adquirir Ahora 🪄
                        </button>
                    </section>
                </>
            )}
        </main>
    );
}