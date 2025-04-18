import { createSlice } from "@reduxjs/toolkit";

const initialUser = localStorage.getItem("user");
const initialState = {
    user: initialUser && initialUser !== "undefined" ? JSON.parse(initialUser) : null,
    token: localStorage.getItem("token") || null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload.user;
            localStorage.setItem("user", JSON.stringify(action.payload.user));
        },
        setToken(state, action) {
            state.token = action.payload.token;
            localStorage.setItem("token", action.payload.token);
        },
        logoutUser(state) {
            state.user = null;
            state.token = null;
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        },
    },
});

export const { setUser, setToken, logoutUser } = authSlice.actions;
export default authSlice.reducer;
