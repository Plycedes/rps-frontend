import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const socket = io("http://localhost:8000");
        // const socket = io("https://rps-backend-tweq.onrender.com");

        setSocket(socket);

        socket.on("connect", () => setIsConnected(true));
        socket.on("disconnect", () => setIsConnected(false));

        return () => {
            socket.disconnect();
        };
    }, []);

    const connectSocket = () => {
        if (socket && !socket.connected) {
            socket.connect();
        }
    };

    const disconnectSocket = () => {
        if (socket && socket.connected) {
            socket.disconnect();
        }
    };

    return (
        <SocketContext.Provider
            value={{
                socket: socket,
                connectSocket,
                disconnectSocket,
                isConnected,
            }}
        >
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => useContext(SocketContext);
