import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import InputField from '../../components/common/InputField';
import Button from '../../components/common/Button';
import authService from '../../services/authService';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'vendor',
        companyName: ''
    });

    const navigate = useNavigate();

    const handleChange = (name, value) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert('Password dan Konfirmasi Password tidak sama!');
            return;
        }

        if (formData.role === 'vendor' && !formData.companyName) {
            alert('Nama Perusahaan wajib diisi untuk Vendor!');
            return;
        }

        const payload = {
            fullname: formData.fullName,
            username: formData.username,
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
            role: formData.role,
            companyName: formData.role === 'vendor' ? formData.companyName : 'Internal Kantor'
        };

        try {
            await authService.register(payload);
            alert(`Pendaftaran Berhasil sebagai ${formData.role}! Silakan Login.`);
            navigate('/login');
        } catch (error) {
            console.error(error);
            alert('Gagal Mendaftar: ' + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
                Daftar Akun Baru
            </h2>

            <form onSubmit={handleRegister}>
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
                        <option value="vendor">Vendor (Pembuat BA)</option>
                        <option value="picgudang">PIC Gudang (Cek Barang)</option>
                        <option value="direksipekerjaan">Direksi Pekerjaan (Cek Pekerjaan)</option>
                    </select>
                </div>

                {formData.role === 'vendor' && (
                    <div style={{ animation: 'fadeIn 0.5s' }}>
                        <InputField
                            label="Nama Perusahaan / CV / PT"
                            type="text"
                            placeholder="Contoh: PT. Vendor Sejahtera"
                            value={formData.companyName}
                            onChange={(e) => handleChange('companyName', e.target.value)}
                        />
                    </div>
                )}

                <InputField
                    label="Nama Lengkap"
                    type="text"
                    placeholder="Nama Lengkap Anda"
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                />

                <InputField
                    label="Username"
                    type="text"
                    placeholder="Buat Username unik"
                    value={formData.username}
                    onChange={(e) => handleChange('username', e.target.value)}
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
                    placeholder="Buat password"
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