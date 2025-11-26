import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user_sess');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user_sess');
        navigate('/login');
    };

    if (!user) return null;

    return (
        <header className="navbar-header">

            <div className="navbar-left-section">
                <h2 className="navbar-title">Digital-BA</h2>

                <nav className="navbar-nav">
                    
                    {user.role !== 'admin' && (
                        <NavLink to="/dashboard" className="navbar-nav-link">
                            Dashboard
                        </NavLink>
                    )}

                    {user.role === 'user' && (
                        <NavLink to="/buat-ba" className="navbar-nav-link">
                            Buat Berita Acara
                        </NavLink>
                    )}

                    {user.role === 'admin' && (
                        <NavLink to="/admin/users" className="navbar-nav-link">
                            Manajemen User
                        </NavLink>
                    )}

                    {user.role !== 'admin' && (
                        <NavLink to="/tentang" className="navbar-nav-link">
                            Tentang Aplikasi
                        </NavLink>
                    )}
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