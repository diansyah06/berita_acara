// src/components/layouts/Navbar.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    // 1. Ambil data user saat Navbar dimuat
    useEffect(() => {
        const storedUser = localStorage.getItem('user_sess');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user_sess'); // Hapus sesi
        navigate('/login');
    };

    // Jika data belum siap, tampilkan loading atau kosongan
    if (!user) return null;

    return (
        <header className="navbar-header">

            <div className="navbar-left-section">
                <h2 className="navbar-title">Digital-BA</h2>

                <nav className="navbar-nav">
                    <NavLink to="/dashboard" className="navbar-nav-link">
                        Dashboard
                    </NavLink>

                    {/* 2. KONDISI: Hanya User & Admin yang boleh buat BA (Vendor tidak boleh) */}
                    {user.role !== 'vendor' && (
                        <NavLink to="/buat-ba" className="navbar-nav-link">
                            Buat Berita Acara
                        </NavLink>
                    )}

                    {/* 3. KONDISI: Hanya ADMIN yang boleh lihat Manajemen User */}
                    {user.role === 'admin' && (
                        <NavLink to="/admin/users" className="navbar-nav-link">
                            Manajemen User
                        </NavLink>
                    )}

                    <NavLink to="/tentang" className="navbar-nav-link">
                        Tentang Aplikasi
                    </NavLink>
                </nav>
            </div>

            <div className="navbar-user-section">
                <span className="navbar-user-text">
                    Halo, {user.name}
                </span>
                <button onClick={handleLogout} className="logout-button">
                    Logout
                </button>
            </div>
        </header>
    );
};

export default Navbar;