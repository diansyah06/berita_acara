import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../../components/common/InputField';
import './CreateBAPage.css'; // CSS baru untuk tata letak form
// Import style card & tombol dari Dashboard
import '../../pages/Dashboard/DashboardPage.css';

const CreateBAPage = () => {
    // State untuk menampung data form
    const [nomorKontrak, setNomorKontrak] = useState('');
    const [jenisBa, setJenisBa] = useState('BAPB'); // Default value
    const [vendor, setVendor] = useState('');
    const [tanggal, setTanggal] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validasi sederhana
        if (!nomorKontrak || !vendor || !tanggal) {
            alert('Semua field wajib diisi!');
            return;
        }

        // Simulasi pengiriman data
        const dataBaru = {
            nomorKontrak,
            jenisBa,
            vendor,
            tanggal,
            status: 'Menunggu' // Status default saat dibuat
        };

        console.log('Data baru dikirim:', dataBaru);
        alert('Berita Acara berhasil dibuat!');
        
        // Arahkan kembali ke dashboard setelah berhasil
        navigate('/dashboard');
    };

    return (
        <div className="create-ba-container">
            {/* 1. Header Halaman */}
            <div className="dashboard-header">
                <div>
                    <h1>Buat Berita Acara Baru</h1>
                    <p>Isi semua field di bawah ini untuk membuat dokumen baru.</p>
                </div>
            </div>

            {/* 2. Card Konten (Gaya dari DashboardPage.css) */}
            <div className="dashboard-card">
                <form onSubmit={handleSubmit}>
                    {/* Card Body */}
                    <div className="card-body">
                        {/* Kita gunakan grid untuk tata letak form */}
                        <div className="form-grid">
                            
                            {/* Field Nomor Kontrak */}
                            <InputField
                                label="Nomor Kontrak"
                                type="text"
                                placeholder="Contoh: KON/2025/004"
                                value={nomorKontrak}
                                onChange={(e) => setNomorKontrak(e.target.value)}
                            />

                            {/* Field Jenis BA (Menggunakan Select) */}
                            <div>
                                <label style={{ fontWeight: 'bold', display: 'block', marginTop: '10px' }}>Jenis Berita Acara</label>
                                <select 
                                    className="form-select" 
                                    value={jenisBa} 
                                    onChange={(e) => setJenisBa(e.target.value)}
                                >
                                    <option value="BAPB">BAPB (Berita Acara Pembayaran)</option>
                                    <option value="BAPP">BAPP (Berita Acara Peminjaman)</option>
                                    <option value="BAST">BAST (Berita Acara Serah Terima)</option>
                                </select>
                            </div>

                            {/* Field Vendor */}
                            <InputField
                                label="Nama Vendor"
                                type="text"
                                placeholder="Contoh: PT. Mitra Sejati"
                                value={vendor}
                                onChange={(e) => setVendor(e.target.value)}
                            />

                            {/* Field Tanggal Dibuat */}
                            <InputField
                                label="Tanggal Dibuat"
                                type="date"
                                value={tanggal}
                                onChange={(e) => setTanggal(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Card Footer (Untuk Tombol Aksi) */}
                    <div className="card-footer form-actions">
                        <button 
                            type="button" 
                            className="btn-secondary" // Buat style tombol 'Batal'
                            onClick={() => navigate('/dashboard')}
                        >
                            Batal
                        </button>
                        {/* Menggunakan style tombol dari DashboardPage.css */}
                        <button type="submit" className="btn btn-primary">
                            Simpan & Buat
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateBAPage;