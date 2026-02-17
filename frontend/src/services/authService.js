import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const setToken = (token) => {
    localStorage.setItem("access_token", token);
};

const getToken = () => {
    return localStorage.getItem("access_token");
};

const removeToken = () => {
    localStorage.removeItem("access_token");
};

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, {
            email,
            password
        });
        if (response.data.access_token) {
            setToken(response.data.access_token);
        }
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Error al iniciar sesión";
    }
};

export const register = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, userData);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Error al registrar usuario";
    }
};

export const getCurrentUser = () => {
    return getToken();
};

export const logout = () => {
    removeToken();
};

export const getMyProfile = async () => {
    try {
        const token = getToken();
        const response = await axios.get(`${API_URL}/auth/me`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Error al obtener el perfil";
    }
};