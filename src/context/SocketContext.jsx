import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const socketRef = useRef(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        //const socket = io("http://localhost:8000");
        const socket = io("https://rps-backend-tweq.onrender.com");

        socketRef.current = socket;

        socket.on("connect", () => setIsConnected(true));
        socket.on("disconnect", () => setIsConnected(false));

        return () => {
            socket.disconnect();
        };
    }, []);

    const connectSocket = () => {
        if (socketRef.current && !socketRef.current.connected) {
            socketRef.current.connect();
        }
    };

    const disconnectSocket = () => {
        if (socketRef.current && socketRef.current.connected) {
            socketRef.current.disconnect();
        }
    };

    return (
        <SocketContext.Provider
            value={{
                socket: socketRef.current,
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
