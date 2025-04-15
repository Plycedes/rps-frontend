import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8000/api/v1",
    withCredentials: true,
});

API.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem("token");
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export const registerUser = async (userData) => {
    const res = await API.post("/users/register", userData);
    return res.data;
};

export const loginUser = async (credentials) => {
    const res = await API.post("/users/login", credentials);
    return res.data;
};

export const logoutUser = async () => {
    const res = await API.post("/users/logout");
    return res.data;
};
