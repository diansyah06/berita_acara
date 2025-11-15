import React, { useState } from 'react';
import InputField from '../../components/common/InputField';
import Button from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        console.log("Mencoba login dengan:", { email, password });

        // Simulasi login berhasil, arahkan ke Dashboard
        // Nanti, ini akan terjadi setelah ada respons sukses dari Firebase/Backend
        if (email && password) {
            alert('Login Berhasil (Simulasi)!');
            navigate('/dashboard'); // Arahkan ke dashboard
        } else {
            alert('Email dan Password tidak boleh kosong!');
        }
    };

    return (
        <div>
            <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>
                Login - Digitalisasi BA
            </h2>
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
        </div>
    );
};

export default LoginPage;