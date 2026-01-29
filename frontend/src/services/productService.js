import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const mapProduct = (p) => ({
    ...p,
    image: p.image_url
});

export const getProducts = async () => {
    const response = await axios.get(`${API_URL}/products`);
    return response.data.map(mapProduct);
}

export const getSpells = async () => {
    const response = await axios.get(`${API_URL}/products/spells`);
    return response.data.map(mapProduct);
}

export const getPotions = async () => {
    const response = await axios.get(`${API_URL}/products/potions`);
    return response.data.map(mapProduct);
}

export const getObjects = async () => {
    const response = await axios.get(`${API_URL}/products/objects`);
    return response.data.map(mapProduct);
}