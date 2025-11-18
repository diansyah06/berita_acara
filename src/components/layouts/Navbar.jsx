import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        console.log('User logout');
        navigate('/login');
    };

    return (
        <header className="navbar-header">
            
            <div className="navbar-left-section">
                <h2 className="navbar-title">Digital-BA</h2>
                
                <nav className="navbar-nav">
                    <NavLink to="/dashboard" className="navbar-nav-link">
                        Dashboard
                    </NavLink>
                    <NavLink to="/buat-ba" className="navbar-nav-link">
                        Buat Berita Acara
                    </NavLink>
                    <NavLink to="/admin/users" className="navbar-nav-link">
                        Manajemen User
                    </NavLink>
                    <NavLink to="/tentang" className="navbar-nav-link">
                        Tentang Aplikasi
                    </NavLink>
                </nav>
            </div>

            <div className="navbar-user-section">
                <span className="navbar-user-text">
                    Halo, Yohan (User)
                </span>
                <button onClick={handleLogout} className="logout-button">
                    Logout
                </button>
            </div>
        </header>
    );
};

export default Navbar;