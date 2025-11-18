// src/pages/Auth/LoginPage.jsx

import React, { useState } from 'react';
import InputField from '../../components/common/InputField';
import Button from '../../components/common/Button';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        if (email && password) {
            let userData = {};

            // --- [PENTING] GANTI DENGAN ID DARI POSTMAN ---
            const REAL_ID_STAF = "691c916eae5a40b42af36904";   // Contoh: "654fb..."
            const REAL_ID_VENDOR = "691c9182ae5a40b42af36906";     // Contoh: "654fc..."

            // Logika Simulasi Login
            if (email.includes('admin')) {
                userData = { id: "admin_dummy", name: 'Administrator', role: 'admin', email };
            } 
            else if (email === 'info@vendor.com') {
                // Vendor Login
                userData = { 
                    id: REAL_ID_VENDOR, // Socket akan pakai ID ini
                    name: 'PT. Vendor Sejahtera', 
                    role: 'vendor', 
                    email 
                };
            } 
            else {
                // User Biasa Login
                userData = { 
                    id: REAL_ID_STAF, // Socket akan pakai ID ini
                    name: 'Budi (Staf)', 
                    role: 'user', 
                    email 
                };
            }

            localStorage.setItem('user_sess', JSON.stringify(userData));
            alert(`Login Berhasil sebagai: ${userData.role.toUpperCase()}`);
            navigate('/dashboard');
        } else {
            alert('Email dan Password tidak boleh kosong!');
        }
    };

    return (
        <div>
            <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>
                Login - Digitalisasi BA
            </h2>
            {/* Tips untuk testing */}
            <div style={{ backgroundColor: '#e3f2fd', padding: '10px', marginBottom: '20px', fontSize: '12px', borderRadius: '4px' }}>
                <strong>Tips Login (Simulasi):</strong><br />
                - Admin: ketik email "admin@kantor.com"<br />
                - User: ketik email "staf@kantor.com"<br />
                - Vendor: ketik email "info@vendor.com"
            </div>

            <form onSubmit={handleLogin}>
                <InputField
                    label="Email"
                    type="email"
                    placeholder="Masukkan email Anda"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <InputField
                    label="Password"
                    type="password"
                    placeholder="Masukkan password Anda"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit">
                    Login
                </Button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px' }}>
                Belum punya akun? <Link to="/register" style={{ color: '#007bff', fontWeight: 'bold', textDecoration: 'none' }}>Daftar di sini</Link>
            </div>
        </div>
    );
};

export default LoginPage;