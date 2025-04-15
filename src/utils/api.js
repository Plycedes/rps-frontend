import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8000/api",
    withCredentials: true,
});

export const registerUser = async (userData) => {
    const res = await API.post("/auth/register", userData);
    return res.data;
};

export const loginUser = async (credentials) => {
    const res = await API.post("/auth/login", credentials);
    return res.data;
};

export const logoutUser = async () => {
    const res = await API.post("/auth/logout");
    return res.data;
};
