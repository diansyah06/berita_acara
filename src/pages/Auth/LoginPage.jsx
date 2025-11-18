<<<<<<< HEAD
// src/pages/Auth/LoginPage.jsx

import React, { useState } from 'react';
import InputField from '../../components/common/InputField';
import Button from '../../components/common/Button';
import { useNavigate, Link } from 'react-router-dom';
=======
import React, { useState } from 'react';
import InputField from '../../components/common/InputField';
import Button from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';
>>>>>>> 7335b69be347e6de3f0ebc435a04b888d778558f

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
<<<<<<< HEAD

        if (email && password) {
            // --- LOGIKA SIMULASI ROLE ---
            let role = 'user'; // Default role
            let nama = 'Yohan (Staf)';

            // Jika email mengandung kata 'admin', jadikan ADMIN
            if (email.includes('admin')) {
                role = 'admin';
                nama = 'Yohan (Administrator)';
            }
            // Jika email mengandung kata 'vendor', jadikan VENDOR
            else if (email.includes('vendor')) {
                role = 'vendor';
                nama = 'PT. Vendor Sejahtera';
            }

            // Simpan data user & role ke localStorage agar bisa dibaca halaman lain
            const userData = {
                name: nama,
                email: email,
                role: role
            };
            localStorage.setItem('user_sess', JSON.stringify(userData));

            alert(`Login Berhasil sebagai: ${role.toUpperCase()}`);
            navigate('/dashboard');
=======
        console.log("Mencoba login dengan:", { email, password });

        // Simulasi login berhasil, arahkan ke Dashboard
        // Nanti, ini akan terjadi setelah ada respons sukses dari Firebase/Backend
        if (email && password) {
            alert('Login Berhasil (Simulasi)!');
            navigate('/dashboard'); // Arahkan ke dashboard
>>>>>>> 7335b69be347e6de3f0ebc435a04b888d778558f
        } else {
            alert('Email dan Password tidak boleh kosong!');
        }
    };

    return (
        <div>
            <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>
                Login - Digitalisasi BA
            </h2>
<<<<<<< HEAD
            {/* Tips untuk testing */}
            <div style={{ backgroundColor: '#e3f2fd', padding: '10px', marginBottom: '20px', fontSize: '12px', borderRadius: '4px' }}>
                <strong>Tips Login (Simulasi):</strong><br />
                - Admin: ketik email "admin@kantor.com"<br />
                - User: ketik email "staf@kantor.com"<br />
                - Vendor: ketik email "info@vendor.com"
            </div>

=======
>>>>>>> 7335b69be347e6de3f0ebc435a04b888d778558f
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
<<<<<<< HEAD

            <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px' }}>
                Belum punya akun? <Link to="/register" style={{ color: '#007bff', fontWeight: 'bold', textDecoration: 'none' }}>Daftar di sini</Link>
            </div>
=======
>>>>>>> 7335b69be347e6de3f0ebc435a04b888d778558f
        </div>
    );
};

export default LoginPage;