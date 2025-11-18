// src/services/socket.js
import { io } from "socket.io-client";

// Ganti URL ini dengan URL backend Anda
const SOCKET_URL = "http://localhost:3000"; 

let socket;

export const initSocket = (userId) => {
    if (!socket) {
        socket = io(SOCKET_URL);
        console.log("Menginisialisasi Socket...");
    }

    if (socket && userId) {
        // Event khusus yang kita buat di backend (socketService.ts)
        // untuk mendaftarkan user ID ke socket ID
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