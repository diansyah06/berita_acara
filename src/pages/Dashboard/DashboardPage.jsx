import React from 'react';
import { Link } from 'react-router-dom'; // <-- 1. IMPORT Link
import BATable from '../../components/ba/BATable';
import './DashboardPage.css';

const MOCK_DATA = [
    { id: 1, nomorKontrak: 'KON/2025/001', jenis: 'BAPB', tanggal: '05 Nov 2025', vendor: 'PT. Sejahtera Jaya', status: 'Disetujui' },
    { id: 2, nomorKontrak: 'KON/2025/002', jenis: 'BAPP', tanggal: '04 Nov 2025', vendor: 'CV. Maju Mundur', status: 'Menunggu' },
    { id: 3, nomorKontrak: 'KON/2025/003', jenis: 'BAPB', tanggal: '03 Nov 2025', vendor: 'PT. Sinar Abadi', status: 'Ditolak' },
];


const DashboardPage = () => {
    return (
        <div>
            {/* 2. HEADER HALAMAN (yang "dipisah di atas") */}
            <div className="dashboard-header">
                {/* Teks di kiri */}
                <div>
                    <h1>Dashboard</h1>
                    <p>Selamat datang kembali, Yohan!</p>
                </div>
                {/* Tombol di kanan */}
                <div>
                    <Link to="/buat-ba" className="btn btn-primary">
                        + Tambah Berita Acara
                    </Link>
                </div>
            </div>

            {/* 3. CARD KONTEN (dengan Header & Footer) */}
            <div className="dashboard-card">
                
                {/* CARD HEADER */}
                <div className="card-header">
                    <h3>Daftar Berita Acara</h3>
                </div>

                {/* CARD BODY */}
                <div className="card-body">
                    <BATable data={MOCK_DATA} />
                </div>

                {/* CARD FOOTER */}
                <div className="card-footer">
                    <span>
                        Menampilkan 1-3 dari 3 data
                    </span>
                    <div className="pagination-controls">
                        <button className="disabled" disabled>Previous</button>
                        <button className="disabled" disabled>Next</button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DashboardPage;