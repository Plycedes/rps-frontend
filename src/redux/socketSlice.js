import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";

const socket = io("http://localhost:8000", {
    autoConnect: false,
});

const socketSlice = createSlice({
    name: "socket",
    initialState: {
        socket: socket,
        isConnected: false,
    },
    reducers: {
        connectSocket: (state) => {
            if (!state.isConnected) {
                state.socket.connect();
                state.isConnected = true;
            }
        },
        disconnectSocket: (state) => {
            state.socket.disconnect();
            state.isConnected = false;
        },
    },
});

export const { connectSocket, disconnectSocket } = socketSlice.actions;
export default socketSlice.reducer;
