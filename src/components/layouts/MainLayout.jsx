// src/components/layouts/MainLayout.jsx

import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom'; // 1. Import useLocation dan hooks
import Navbar from './Navbar';
import Footer from './Footer';
import './MainLayout.css'; 

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
    // 3. State untuk menampung notifikasi
    const [notification, setNotification] = useState(null);
    const location = useLocation(); // Hook untuk mendeteksi perubahan rute

    // 4. useEffect untuk mengecek localStorage setiap kali rute berubah
    useEffect(() => {
        const storedNotification = localStorage.getItem('app_notification');

        if (storedNotification) {
            try {
                const data = JSON.parse(storedNotification);
                setNotification(data); // Tampilkan notifikasi
                localStorage.removeItem('app_notification'); // Hapus agar tidak muncul lagi
            } catch (e) {
                console.error("Gagal parse notifikasi:", e);
                localStorage.removeItem('app_notification');
            }
        }
    }, [location]); // Dependensi: jalankan efek ini setiap kali 'location' berubah

    // 5. Fungsi untuk menutup notifikasi secara manual
    const handleCloseNotification = () => {
        setNotification(null);
    };

    return (
        <div>
            <Navbar />

            {/* --- 6. Area Render Notifikasi --- */}
            {notification && (
                <div style={notificationStyle}>
                    <span>{notification.message}</span>
                    <button style={closeButtonStyle} onClick={handleCloseNotification}>
                        &times;
                    </button>
                </div>
            )}
            {/* --- Selesai Area Notifikasi --- */}

            <main className="page-content">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;