import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import InputField from '../../components/common/InputField';
import Button from '../../components/common/Button';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'user', // Default role: User Internal
        companyName: '' // Khusus untuk Vendor
    });

    const navigate = useNavigate();

    // Handle perubahan input biasa
    const handleChange = (name, value) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleRegister = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert('Password dan Konfirmasi Password tidak sama!');
            return;
        }

        // Validasi tambahan: Jika Vendor, Nama Perusahaan wajib diisi
        if (formData.role === 'vendor' && !formData.companyName) {
            alert('Nama Perusahaan wajib diisi untuk pendaftaran Vendor!');
            return;
        }

        // Simulasi Pengiriman Data
        const dataFinal = {
            nama: formData.fullName,
            email: formData.email,
            password: formData.password,
            role: formData.role,
            // Jika user biasa, perusahaannya otomatis 'Internal', jika vendor ambil inputnya
            perusahaan: formData.role === 'vendor' ? formData.companyName : 'Internal Kantor'
        };

        console.log("Mendaftarkan user baru:", dataFinal);

        alert(`Pendaftaran Berhasil! Anda terdaftar sebagai ${formData.role.toUpperCase()}.`);
        navigate('/login');
    };

    return (
        <div>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
                Daftar Akun Baru
            </h2>
            <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px', fontSize: '14px' }}>
                Silakan lengkapi data diri Anda di bawah ini.
            </p>

            <form onSubmit={handleRegister}>

                {/* 1. PILIHAN ROLE (User / Vendor) */}
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
                        Daftar Sebagai
                    </label>
                    <select
                        style={{
                            width: '100%', padding: '12px', borderRadius: '4px',
                            border: '1px solid #ccc', backgroundColor: 'white'
                        }}
                        value={formData.role}
                        onChange={(e) => handleChange('role', e.target.value)}
                    >
                        <option value="user">Staf Internal (Pembuat BA)</option>
                        <option value="vendor">Vendor / Rekanan (Penanda Tangan)</option>
                    </select>
                </div>

                {/* 2. JIKA VENDOR, TAMPILKAN INPUT NAMA PERUSAHAAN */}
                {formData.role === 'vendor' && (
                    <div style={{ animation: 'fadeIn 0.5s' }}>
                        <InputField
                            label="Nama Perusahaan / CV / PT"
                            type="text"
                            placeholder="Contoh: PT. Sejahtera Abadi"
                            value={formData.companyName}
                            onChange={(e) => handleChange('companyName', e.target.value)}
                        />
                    </div>
                )}

                <InputField
                    label={formData.role === 'vendor' ? "Nama Perwakilan Vendor" : "Nama Lengkap Staf"}
                    type="text"
                    placeholder="Masukkan nama lengkap"
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                />

                <InputField
                    label="Email"
                    type="email"
                    placeholder="nama@email.com"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                />

                <InputField
                    label="Password"
                    type="password"
                    placeholder="Buat password aman"
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                />

                <InputField
                    label="Konfirmasi Password"
                    type="password"
                    placeholder="Ulangi password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange('confirmPassword', e.target.value)}
                />

                <Button type="submit">
                    Daftar Sekarang
                </Button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px' }}>
                Sudah punya akun? <Link to="/login" style={{ color: '#007bff', fontWeight: 'bold', textDecoration: 'none' }}>Login di sini</Link>
            </div>
        </div>
    );
};

export default RegisterPage;