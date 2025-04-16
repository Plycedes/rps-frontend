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

export const getCurrentUser = async () => {
    const res = await API.get("/users/current-user");
    return res.data;
};

export const getActiveTournaments = async () => {
    const res = await API.get("/tournaments/get-active");
    return res.data;
};

export const getPreviousTournaments = async () => {
    const res = await API.get("/tournaments/get-previous");
    return res.data;
};

export const getLeaderboard = async (tournamentId) => {
    const res = await API.get(`/tournaments/get-leaderboard/${tournamentId}`);
    return res.data;
};

export const getTournament = async (tournamentId) => {
    const res = await API.get(`/tournaments/get/${tournamentId}`);
    return res.data;
};

export const joinTournament = async (data) => {
    const res = await API.post("/tournaments/join", data);
    return res.data;
};

export const getMatchesLeaderboard = async () => {
    const res = await API.get("/matches/leaderboard");
    return res.data;
};

export const getListedNFTs = async () => {
    const res = await API.get("/nfts/nft-for-sale");
    return res.data;
};

export const getUserNFTs = async () => {
    const res = await API.get("/nfts/user-nft");
    return res.data;
};

export const listNFT = async (data) => {
    const res = await API.post("/nfts/list", data);
    return res.data;
};

export const unListNFT = async (data) => {
    const res = await API.post("/nfts/unlist", data);
    return res.data;
};

export const buytNFT = async (data) => {
    const res = await API.post("/nfts/buy", data);
    return res.data;
};

export const getUserParticipatedTournaments = async () => {
    const res = await API.get("/tournaments/get-user");
    return res.data;
};
