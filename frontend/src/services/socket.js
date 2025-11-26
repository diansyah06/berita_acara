import { io } from "socket.io-client";
const SOCKET_URL = "http://localhost:3000"; 

let socket;

export const initSocket = (userId) => {
    if (!socket) {
        socket = io(SOCKET_URL);
        console.log("Menginisialisasi Socket...");
    }

    if (socket && userId) {
        socket.emit("register_user", userId);
    }

    return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};