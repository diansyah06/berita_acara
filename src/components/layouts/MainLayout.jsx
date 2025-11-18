// src/components/layouts/MainLayout.jsx

import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom'; // 1. Import useLocation dan hooks
import Navbar from './Navbar';
import Footer from './Footer';
import './MainLayout.css'; 
import { initSocket, disconnectSocket } from '../../services/socket';

// --- 2. CSS Sederhana untuk Notifikasi (Bisa dipindah ke MainLayout.css jika mau) ---
const notificationStyle = {
    position: 'fixed',
    top: '80px', // Di bawah navbar
    right: '30px',
    backgroundColor: '#1ABC9C', // Warna hijau primer
    color: 'white',
    padding: '15px 20px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    minWidth: '300px',
    animation: 'fadeIn 0.3s'
};

const closeButtonStyle = {
    marginLeft: '15px',
    background: 'transparent',
    border: 'none',
    color: 'white',
    fontSize: '18px',
    cursor: 'pointer',
    fontWeight: 'bold'
};
// --- Selesai CSS ---


const MainLayout = () => {
    const [notification, setNotification] = useState(null);
    const location = useLocation();

    useEffect(() => {
        // 1. Ambil data user dari localStorage
        const userSess = JSON.parse(localStorage.getItem('user_sess'));
        const userId = userSess ? userSess.id : null; // Pastikan saat login Anda menyimpan ID juga

        if (userId) {
            // 2. Koneksikan Socket
            const socket = initSocket(userId);

            // 3. Dengarkan event 'notification' dari backend
            socket.on("notification", (data) => {
                console.log("Notifikasi diterima:", data);
                
                // Tampilkan notifikasi (data: { title, message, baId })
                setNotification({
                    message: `${data.title}: ${data.message}`
                });

                // Bunyikan suara notifikasi (opsional)
                // const audio = new Audio('/notification-sound.mp3');
                // audio.play();
            });

            // Cleanup saat logout/unmount
            return () => {
                socket.off("notification");
                // disconnectSocket(); // Opsional: putuskan saat ganti layout
            };
        }
    }, []);

    const handleCloseNotification = () => {
        setNotification(null);
    };

    return (
        <div>
            <Navbar />
            {/* Tampilan Notifikasi */}
            {notification && (
                <div style={notificationStyle}>
                    <span>{notification.message}</span>
                    <button style={closeButtonStyle} onClick={handleCloseNotification}>
                        &times;
                    </button>
                </div>
            )}
            <main className="page-content">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;