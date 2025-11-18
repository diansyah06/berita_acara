import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../../components/common/InputField';
import './CreateBAPage.css';

const CreateBAPage = () => {
    const [nomorKontrak, setNomorKontrak] = useState('');
    const [jenisBa, setJenisBa] = useState('BAPB');
    const [vendor, setVendor] = useState('');

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

        const dataBaru = {
            nomorKontrak,
            jenisBa,
            vendor,
            nominal,    // Masukkan nominal ke data
            keterangan, // Masukkan keterangan ke data
            tanggal: waktuUpload,
            status: 'Menunggu'
        };

        console.log('Data baru dikirim:', dataBaru);

        tampilkanNotifikasiPerangkat(
            'Berita Acara Berhasil Dibuat',
            `Dokumen senilai ${nominal} berhasil dibuat pada: ${waktuUpload}`
        );

        navigate('/dashboard');
    };

    return (
        <div className="create-ba-container">
            <div className="dashboard-header">
                <div>
                    <h1>Buat Berita Acara Baru</h1>
                    <p>Isi semua field di bawah ini sesuai persyaratan dokumen.</p>
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