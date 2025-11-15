// src/pages/BeritaAcara/CreateBAPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../../components/common/InputField';
import './CreateBAPage.css';
import '../../pages/Dashboard/DashboardPage.css';

const CreateBAPage = () => {
    const [nomorKontrak, setNomorKontrak] = useState('');
    const [jenisBa, setJenisBa] = useState('BAPB');
    const [vendor, setVendor] = useState('');
    const [tanggal, setTanggal] = useState('');

    const navigate = useNavigate();

    // --- 1. Buat fungsi helper untuk menampilkan notifikasi ---
    const tampilkanNotifikasiPerangkat = (title, body) => {
        // Cek apakah browser mendukung Notifikasi
        if (!('Notification' in window)) {
            console.warn('Browser ini tidak mendukung notifikasi perangkat.');
            // Fallback ke alert biasa jika tidak didukung
            alert(title + "\n" + body);
            return;
        }

        // Cek apakah izin sudah diberikan
        if (Notification.permission === 'granted') {
            // Jika sudah diizinkan, langsung tampilkan
            new Notification(title, { body: body });
        }
        // Cek jika izin belum ditolak (masih 'default' atau 'prompt')
        else if (Notification.permission !== 'denied') {
            // Minta izin kepada pengguna
            Notification.requestPermission().then((permission) => {
                if (permission === 'granted') {
                    new Notification(title, { body: body });
                } else {
                    // Jika pengguna menolak, fallback ke alert
                    alert(title + "\n" + body);
                }
            });
        } else {
            // Jika izin ditolak (denied), fallback ke alert
             alert(title + "\n" + body);
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!nomorKontrak || !vendor || !tanggal) {
            alert('Semua field wajib diisi!');
            return;
        }

        const dataBaru = {
            nomorKontrak,
            jenisBa,
            vendor,
            tanggal,
            status: 'Menunggu'
        };

        console.log('Data baru dikirim:', dataBaru);
        
        tampilkanNotifikasiPerangkat(
            'Berita Acara Berhasil Dibuat', // Judul Notifikasi
            `Jenis Berita acara adalah ${dataBaru.jenisBa}` // Isi Notifikasi
        );
        // --- Selesai ---
        
        navigate('/dashboard');
    };

    return (
        <div className="create-ba-container">
            {/* ... sisa JSX (form) tidak perlu diubah ... */}
            <div className="dashboard-header">
                <div>
                    <h1>Buat Berita Acara Baru</h1>
                    <p>Isi semua field di bawah ini untuk membuat dokumen baru.</p>
                </div>
            </div>

            <div className="dashboard-card">
                <form onSubmit={handleSubmit}>
                    <div className="card-body">
                        <div className="form-grid">
                            
                            <InputField
                                label="Nomor Kontrak"
                                type="text"
                                placeholder="Contoh: KON/2025/004"
                                value={nomorKontrak}
                                onChange={(e) => setNomorKontrak(e.target.value)}
                            />

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

                            <InputField
                                label="Nama Vendor"
                                type="text"
                                placeholder="Contoh: PT. Mitra Sejati"
                                value={vendor}
                                onChange={(e) => setVendor(e.target.value)}
                            />

                            <InputField
                                label="Tanggal Dibuat"
                                type="date"
                                value={tanggal}
                                onChange={(e) => setTanggal(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="card-footer form-actions">
                        <button 
                            type="button" 
                            className="btn-secondary"
                            onClick={() => navigate('/dashboard')}
                        >
                            Batal
                        </button>
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