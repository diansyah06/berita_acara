// src/pages/BeritaAcara/DetailBAPage.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DetailBAPage.css'; // Import CSS baru

// --- DATA MOCK DETAIL (Simulasi Database) ---
const MOCK_DB = [
    {
        id: 1,
        nomorKontrak: 'KON/2025/001',
        jenis: 'BAPB',
        tanggal: '05 November 2025',
        vendor: 'PT. Sejahtera Jaya',
        status: 'Disetujui',
        deskripsi: 'Pembayaran termin pertama untuk pengadaan 50 unit Laptop Kantor.',
        nilai: 'Rp 750.000.000,-',
        pihakPertama: 'Budi Santoso (Manager IT)',
        pihakKedua: 'Andi Wijaya (Direktur PT. Sejahtera Jaya)'
    },
    {
        id: 2,
        nomorKontrak: 'KON/2025/002',
        jenis: 'BAPP',
        tanggal: '04 November 2025',
        vendor: 'CV. Maju Mundur',
        status: 'Menunggu',
        deskripsi: 'Peminjaman peralatan server sementara untuk migrasi data center.',
        nilai: '-',
        pihakPertama: 'Siti Aminah (Kepala Logistik)',
        pihakKedua: 'Rudi Hartono (Manager Operasional)'
    },
    {
        id: 3,
        nomorKontrak: 'KON/2025/003',
        jenis: 'BAPB',
        tanggal: '03 November 2025',
        vendor: 'PT. Sinar Abadi',
        status: 'Ditolak',
        deskripsi: 'Pembayaran jasa maintenance AC Gedung A.',
        nilai: 'Rp 15.000.000,-',
        pihakPertama: 'Budi Santoso (Manager IT)',
        pihakKedua: 'Dewi Sartika (Marketing)'
    },
];

const DetailBAPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Simulasi Fetch Data
    useEffect(() => {
        // Cari data berdasarkan ID dari URL
        const foundData = MOCK_DB.find(item => item.id === parseInt(id));

        // Simulasi delay network
        setTimeout(() => {
            setData(foundData);
            setLoading(false);
        }, 500);
    }, [id]);

    // Fungsi tombol kembali
    const handleBack = () => navigate('/dashboard');

    // Fungsi simulasi print
    const handlePrint = () => {
        window.print();
    };

    if (loading) {
        return <div style={{ textAlign: 'center', marginTop: '50px' }}>Memuat dokumen...</div>;
    }

    if (!data) {
        return (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <h2>Data tidak ditemukan</h2>
                <button className="btn btn-primary" onClick={handleBack}>Kembali ke Dashboard</button>
            </div>
        );
    }

    return (
        <div className="detail-ba-container">

            {/* 1. HEADER NAVIGASI (Tombol Kembali & Print) */}
            <div className="detail-header-nav">
                <button className="btn btn-secondary" onClick={handleBack}>
                    &larr; Kembali
                </button>
                <div>
                    <span style={{ marginRight: '15px', fontWeight: 'bold', color: '#555' }}>
                        Status: {data.status}
                    </span>
                    <button className="btn btn-print" onClick={handlePrint}>
                        🖨️ Cetak / PDF
                    </button>
                </div>
            </div>

            {/* 2. AREA KERTAS DOKUMEN */}
            <div className="paper-document">

                {/* KOP SURAT / JUDUL */}
                <div className="doc-title">
                    <h2>BERITA ACARA {data.jenis}</h2>
                    <p>NOMOR: {data.nomorKontrak}</p>
                </div>

                {/* ISI DOKUMEN */}
                <div className="doc-body">
                    <p>
                        Pada hari ini, <strong>{data.tanggal}</strong>, kami yang bertanda tangan di bawah ini:
                    </p>

                    <table className="doc-table">
                        <tbody>
                            <tr>
                                <td className="label-column">1. Nama</td>
                                <td>: <strong>{data.pihakPertama}</strong></td>
                            </tr>
                            <tr>
                                <td className="label-column">   Jabatan</td>
                                <td>: Perwakilan Perusahaan (Pihak Pertama)</td>
                            </tr>
                        </tbody>
                    </table>

                    <table className="doc-table">
                        <tbody>
                            <tr>
                                <td className="label-column">2. Nama</td>
                                <td>: <strong>{data.pihakKedua}</strong></td>
                            </tr>
                            <tr>
                                <td className="label-column">   Perusahaan</td>
                                <td>: {data.vendor}</td>
                            </tr>
                            <tr>
                                <td className="label-column">   Jabatan</td>
                                <td>: Vendor / Rekanan (Pihak Kedua)</td>
                            </tr>
                        </tbody>
                    </table>

                    <p>
                        Secara bersama-sama telah melakukan verifikasi terkait: <br />
                        <strong>"{data.deskripsi}"</strong>
                    </p>

                    <table className="doc-table">
                        <tbody>
                            <tr>
                                <td className="label-column">Jenis Dokumen</td>
                                <td>: {data.jenis}</td>
                            </tr>
                            <tr>
                                <td className="label-column">Nilai Transaksi</td>
                                <td>: {data.nilai}</td>
                            </tr>
                            <tr>
                                <td className="label-column">Keterangan</td>
                                <td>: Dokumen ini sah dan mengikat kedua belah pihak.</td>
                            </tr>
                        </tbody>
                    </table>

                    <p>
                        Demikian Berita Acara ini dibuat dengan sebenar-benarnya untuk dapat dipergunakan sebagaimana mestinya.
                    </p>
                </div>

                {/* 3. AREA TANDA TANGAN DIGITAL */}
                <div className="signature-section">

                    {/* PIHAK PERTAMA */}
                    <div className="signature-box">
                        <p>Pihak Pertama,</p>

                        {/* Logika: Jika status disetujui, tampilkan cap digital. Jika tidak, kotak kosong */}
                        {data.status === 'Disetujui' ? (
                            <div className="sign-placeholder" style={{ border: 'none' }}>
                                <div className="digital-sign-stamp">
                                    DIGITALLY SIGNED<br />
                                    <small>{new Date().toLocaleDateString()}</small><br />
                                    <small>ID: {Math.random().toString(36).substr(2, 8).toUpperCase()}</small>
                                </div>
                            </div>
                        ) : (
                            <div className="sign-placeholder">
                                <span>Menunggu TTD</span>
                            </div>
                        )}

                        <span className="sign-name">{data.pihakPertama}</span>
                    </div>

                    {/* PIHAK KEDUA */}
                    <div className="signature-box">
                        <p>Pihak Kedua,</p>

                        {data.status === 'Disetujui' ? (
                            <div className="sign-placeholder" style={{ border: 'none' }}>
                                <div className="digital-sign-stamp">
                                    DIGITALLY SIGNED<br />
                                    <small>{data.tanggal}</small><br />
                                    <small>Verf: {data.vendor.replace(/\s/g, '').toUpperCase()}</small>
                                </div>
                            </div>
                        ) : (
                            <div className="sign-placeholder">
                                <span>Menunggu TTD</span>
                            </div>
                        )}

                        <span className="sign-name">{data.pihakKedua}</span>
                    </div>

                </div>

                {/* FOOTER DOKUMEN KECIL */}
                <div style={{ marginTop: '50px', fontSize: '9pt', color: '#999', borderTop: '1px solid #ddd', paddingTop: '10px' }}>
                    Dokumen ini digenerate secara otomatis oleh sistem Digital-BA. Scan QR Code untuk validasi keaslian dokumen.
                </div>

            </div>
        </div>
    );
};

export default DetailBAPage;