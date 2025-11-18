<<<<<<< HEAD
=======
// src/pages/BeritaAcara/CreateBAPage.jsx

>>>>>>> 7335b69be347e6de3f0ebc435a04b888d778558f
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../../components/common/InputField';
import './CreateBAPage.css';
<<<<<<< HEAD
=======
import '../../pages/Dashboard/DashboardPage.css';
>>>>>>> 7335b69be347e6de3f0ebc435a04b888d778558f

const CreateBAPage = () => {
    const [nomorKontrak, setNomorKontrak] = useState('');
    const [jenisBa, setJenisBa] = useState('BAPB');
    const [vendor, setVendor] = useState('');
<<<<<<< HEAD

    // --- 1. TAMBAHKAN STATE BARU SESUAI SYARAT ---
    const [nominal, setNominal] = useState(''); // Untuk "nominal pembayaran"
    const [keterangan, setKeterangan] = useState(''); // Untuk "keterangan penyelesaian pekerjaan"

    const navigate = useNavigate();

    const getAutoDate = () => {
        const now = new Date();
        return now.toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'short' });
    };

    const tampilkanNotifikasiPerangkat = (title, body) => {
        // ... (kode notifikasi sama seperti sebelumnya)
        if (!('Notification' in window)) { alert(title + "\n" + body); return; }
        if (Notification.permission === 'granted') { new Notification(title, { body: body }); }
        else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then((permission) => {
                if (permission === 'granted') { new Notification(title, { body: body }); }
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // 2. Update Validasi: Pastikan field baru juga diisi
        if (!nomorKontrak || !vendor || !nominal || !keterangan) {
            alert('Semua field (termasuk Nominal & Keterangan) wajib diisi!');
            return;
        }

        const waktuUpload = getAutoDate();
=======
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
>>>>>>> 7335b69be347e6de3f0ebc435a04b888d778558f

        const dataBaru = {
            nomorKontrak,
            jenisBa,
            vendor,
<<<<<<< HEAD
            nominal,    // Masukkan nominal ke data
            keterangan, // Masukkan keterangan ke data
            tanggal: waktuUpload,
=======
            tanggal,
>>>>>>> 7335b69be347e6de3f0ebc435a04b888d778558f
            status: 'Menunggu'
        };

        console.log('Data baru dikirim:', dataBaru);
<<<<<<< HEAD

        tampilkanNotifikasiPerangkat(
            'Berita Acara Berhasil Dibuat',
            `Dokumen senilai ${nominal} berhasil dibuat pada: ${waktuUpload}`
        );

=======
        
        tampilkanNotifikasiPerangkat(
            'Berita Acara Berhasil Dibuat', // Judul Notifikasi
            `Jenis Berita acara adalah ${dataBaru.jenisBa}` // Isi Notifikasi
        );
        // --- Selesai ---
        
>>>>>>> 7335b69be347e6de3f0ebc435a04b888d778558f
        navigate('/dashboard');
    };

    return (
        <div className="create-ba-container">
<<<<<<< HEAD
            <div className="dashboard-header">
                <div>
                    <h1>Buat Berita Acara Baru</h1>
                    <p>Isi semua field di bawah ini sesuai persyaratan dokumen.</p>
=======
            {/* ... sisa JSX (form) tidak perlu diubah ... */}
            <div className="dashboard-header">
                <div>
                    <h1>Buat Berita Acara Baru</h1>
                    <p>Isi semua field di bawah ini untuk membuat dokumen baru.</p>
>>>>>>> 7335b69be347e6de3f0ebc435a04b888d778558f
                </div>
            </div>

            <div className="dashboard-card">
                <form onSubmit={handleSubmit}>
                    <div className="card-body">
                        <div className="form-grid">
<<<<<<< HEAD

=======
                            
>>>>>>> 7335b69be347e6de3f0ebc435a04b888d778558f
                            <InputField
                                label="Nomor Kontrak"
                                type="text"
                                placeholder="Contoh: KON/2025/004"
                                value={nomorKontrak}
                                onChange={(e) => setNomorKontrak(e.target.value)}
                            />

                            <div>
                                <label style={{ fontWeight: 'bold', display: 'block', marginTop: '10px' }}>Jenis Berita Acara</label>
<<<<<<< HEAD
                                <select
                                    className="form-select"
                                    value={jenisBa}
=======
                                <select 
                                    className="form-select" 
                                    value={jenisBa} 
>>>>>>> 7335b69be347e6de3f0ebc435a04b888d778558f
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

<<<<<<< HEAD
                            {/* --- 3. INPUT NOMINAL PEMBAYARAN (Baru) --- */}
                            <InputField
                                label="Nominal Pembayaran (Rp)"
                                type="number"
                                placeholder="Contoh: 15000000"
                                value={nominal}
                                onChange={(e) => setNominal(e.target.value)}
                            />

                            {/* --- 4. INPUT KETERANGAN PEKERJAAN (Baru - Pakai Textarea) --- */}
                            <div style={{ gridColumn: '1 / -1' }}>
                                {/* gridColumn '1 / -1' membuat textarea melebar penuh ke samping */}
                                <label style={{ fontWeight: 'bold', display: 'block', marginTop: '10px' }}>
                                    Keterangan Penyelesaian Pekerjaan
                                </label>
                                <textarea
                                    className="form-select" // Kita pinjam style form-select agar mirip
                                    rows="3"
                                    placeholder="Jelaskan rincian pekerjaan yang telah diselesaikan..."
                                    value={keterangan}
                                    onChange={(e) => setKeterangan(e.target.value)}
                                    style={{ width: '100%', resize: 'vertical' }}
                                ></textarea>
                            </div>

=======
                            <InputField
                                label="Tanggal Dibuat"
                                type="date"
                                value={tanggal}
                                onChange={(e) => setTanggal(e.target.value)}
                            />
>>>>>>> 7335b69be347e6de3f0ebc435a04b888d778558f
                        </div>
                    </div>

                    <div className="card-footer form-actions">
<<<<<<< HEAD
                        <button
                            type="button"
=======
                        <button 
                            type="button" 
>>>>>>> 7335b69be347e6de3f0ebc435a04b888d778558f
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