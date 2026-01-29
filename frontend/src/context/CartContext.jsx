import { createContext, useContext, useMemo, useReducer, useEffect } from "react";
import { getCart, addToCart, removeFromCart, clearCart } from "../services/cartService";

const CartContext = createContext(null);

function cartReducer(state, action) {
    switch (action.type) {
        case "ADD": {
            const { item } = action;
            const existing = state.items.find(i => i.id === item.id);
            const items = existing
                ? state.items.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i)
                : [...state.items, { ...item, qty: 1 }];
            return { ...state, items };
        }
        case "REMOVE": {
            const { id } = action;
            const items = state.items.filter(i => i.id !== id);
            return { ...state, items };
        }
        case "SET_QTY": {
            const { id, qty } = action;
            const items = state.items
                .map(i => i.id === id ? { ...i, qty: Math.max(1, qty) } : i)
                .filter(i => i.qty > 0);
            return { ...state, items };
        }
        case "CLEAR":
            return { ...state, items: [] };
        case "SET_STATE":
            return { ...state, items: action.items };
        default:
            return state;
    }
}

export function CartProvider({ children, userId }) {
    const initialState = { items: [] };
    const [state, dispatch] = useReducer(cartReducer, initialState);

    useEffect(() => {
        if (userId) {
            getCart(userId)
                .then(data => {
                    const mappedItems = (data.items || data || [].map(item => ({
                        id: item.product?.id || item.id,
                        name: item.product?.name || item.name,
                        price: item.product?.price || item.price,
                        image: item.product?.image_url || item.image,
                        qty: item.quantity || item.qty || 1
                    })))
                    dispatch({ type: "SET_STATE", items: mappedItems });
                })
                .catch(error => console.error("Error al obtener el baul:", error));
        } else {
            try {
                const stored = localStorage.getItem("cart");
                if (stored) {
                    const parsed = JSON.parse(stored);
                    dispatch({ type: "SET_STATE", items: parsed.items || [] });
                }
            } catch {

            }
        }
    }, [userId]);

    useEffect(() => {
        if (!userId) {
            localStorage.setItem("cart", JSON.stringify(state));
        }
    }, [state, userId]);

    const addItem = async (item) => {
        if (userId) {
            dispatch({ type: "ADD", item });
            try {
                await addToCart(item.id, 1);
            } catch (error) {
                console.error("Error al agregar al baul:", error);
            }
        } else {
            dispatch({ type: "ADD", item });
        }
    };

    const removeItem = async (id) => {
        if (userId) {
            dispatch({ type: "REMOVE", id });
            try {
                await removeFromCart(id);
            } catch (error) {
                console.error("Error al eliminar del baul:", error);
            }
        } else {
            dispatch({ type: "REMOVE", id });
        }
    };

    const setQty = (id, qty) => dispatch({ type: "SET_QTY", id, qty });

    const clear = async () => {
        if (userId) {
            dispatch({ type: "CLEAR" });
            try {
                await clearCart(userId);
            } catch (error) {
                console.error("Error al limpiar el baul:", error);
            }
        } else {
            dispatch({ type: "CLEAR" });
        }
    };

    const total = useMemo(
        () => state.items.reduce((sum, i) => sum + i.price * i.qty, 0),
        [state.items]
    );

    const value = {
        items: state.items,
        addItem,
        removeItem,
        setQty,
        clear,
        total
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used within CartProvider");
    return ctx;
}