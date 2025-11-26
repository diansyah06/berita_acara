import React, { useState } from 'react';
import InputField from '../../components/common/InputField';
import Button from '../../components/common/Button';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../../services/authService'; 

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert('Email dan Password wajib diisi!');
            return;
        }

        setLoading(true);

        try {
            const userData = await authService.login(email, password);
            alert(`Selamat datang, ${userData.name}! (${userData.role.toUpperCase()})`);

            if (userData.role === 'admin') {
                navigate('/admin/users');
            } else {
                navigate('/dashboard');
            }

        } catch (error) {
            console.error(error);
            const errorMessage = error.response?.data?.message || "Gagal login. Cek email/password atau koneksi server.";
            alert(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>
                Login Aplikasi
            </h2>
            <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
                Silakan masuk menggunakan akun terdaftar.
            </p>


            <form onSubmit={handleLogin}>
                <InputField
                    label="Email / Username"
                    type="text"
                    placeholder="Masukkan email anda..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <InputField
                    label="Password"
                    type="password"
                    placeholder="Masukkan password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button type="submit">
                    {loading ? 'Memproses...' : 'Masuk Aplikasi'}
                </Button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px' }}>
                Belum punya akun? <Link to="/register" style={{ color: '#007bff', fontWeight: 'bold', textDecoration: 'none' }}>Daftar Akun Baru</Link>
            </div>
        </div>
    );
};

export default LoginPage;