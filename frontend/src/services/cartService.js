import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Funcion para obtener el token de autenticacion
const getAuthHeader = () => {
    const token = localStorage.getItem("access_token");
    return token ? {
        Authorization: `Bearer ${token}`
    } : {};
};

// Obtener el carrito del usuario actual 
export const getCart = async () => {
    try {
        const response = await axios.get(`${API_URL}/cart`, {
            headers: getAuthHeader()
        });
        return response.data;
    } catch (error) {
        console.error("Error al obtener el carrito:", error);
        throw error;
    }
};

// Agregar un producto al carrito 
export const addToCart = async (productId, quantity = 1) => {
    try {
        const response = await axios.post(`${API_URL}/cart`, {
            product_id: productId,
            quantity
        }, {
            headers: getAuthHeader()
        });
        return response.data;
    } catch (error) {
        console.error("Error al agregar el producto al baúl:", error);
        throw error;
    }
};

// Eliminar un producto del carrito 
export const removeFromCart = async (itemId) => {
    try {
        const response = await axios.delete(`${API_URL}/cart/${itemId}`, {
            headers: getAuthHeader()
        });
        return response.data;
    } catch (error) {
        console.error("Error al eliminar el producto del baúl:", error);
        throw error;
    }
};

// Limpiar el carrito 
export const clearCart = async () => {
    try {
        const response = await axios.delete(`${API_URL}/cart`, {
            headers: getAuthHeader()
        });
        return response.data;
    } catch (error) {
        console.error("Error al limpiar el baúl:", error);
        throw error;
    }
};
