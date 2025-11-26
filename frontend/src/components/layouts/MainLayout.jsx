import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom'; 
import Navbar from './Navbar';
import Footer from './Footer';
import './MainLayout.css'; 
import { initSocket, disconnectSocket } from '../../services/socket';

const notificationStyle = {
    position: 'fixed',
    top: '80px', 
    right: '30px',
    backgroundColor: '#1ABC9C', 
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


const MainLayout = () => {
    const [notification, setNotification] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const userSess = JSON.parse(localStorage.getItem('user_sess'));
        const userId = userSess ? userSess.id : null; 

        if (userId) {
            const socket = initSocket(userId);

            socket.on("notification", (data) => {
                console.log("Notifikasi diterima:", data);
                
                setNotification({
                    message: `${data.title}: ${data.message}`
                });
            });

            return () => {
                socket.off("notification");
            };
        }
    }, []);

    const handleCloseNotification = () => {
        setNotification(null);
    };

    return (
        <div>
            <Navbar />
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