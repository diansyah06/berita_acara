<<<<<<< HEAD
// src/pages/Dashboard/DashboardPage.jsx

import React, { useState } from 'react'; // 1. Import useState
import { Link } from 'react-router-dom';
=======
import React from 'react';
import { Link } from 'react-router-dom'; // <-- 1. IMPORT Link
>>>>>>> 7335b69be347e6de3f0ebc435a04b888d778558f
import BATable from '../../components/ba/BATable';
import './DashboardPage.css';

const MOCK_DATA = [
    { id: 1, nomorKontrak: 'KON/2025/001', jenis: 'BAPB', tanggal: '05 Nov 2025', vendor: 'PT. Sejahtera Jaya', status: 'Disetujui' },
    { id: 2, nomorKontrak: 'KON/2025/002', jenis: 'BAPP', tanggal: '04 Nov 2025', vendor: 'CV. Maju Mundur', status: 'Menunggu' },
    { id: 3, nomorKontrak: 'KON/2025/003', jenis: 'BAPB', tanggal: '03 Nov 2025', vendor: 'PT. Sinar Abadi', status: 'Ditolak' },
<<<<<<< HEAD
    { id: 4, nomorKontrak: 'KON/2025/004', jenis: 'BAST', tanggal: '06 Nov 2025', vendor: 'PT. Teknologi Maju', status: 'Menunggu' }, // Tambahan data dummy
    { id: 5, nomorKontrak: 'KON/2025/005', jenis: 'BAPB', tanggal: '07 Nov 2025', vendor: 'CV. Sentosa', status: 'Disetujui' }, // Tambahan data dummy
];

const DashboardPage = () => {
    // 2. State untuk melacak tab yang aktif (Default: 'Semua')
    const [activeTab, setActiveTab] = useState('Semua');

    // 3. Fungsi Filtering Data
    const getFilteredData = () => {
        if (activeTab === 'Semua') {
            return MOCK_DATA; // Tampilkan semua jika tab 'Semua' dipilih
        }
        // Filter data berdasarkan status yang sesuai dengan nama tab
        return MOCK_DATA.filter(item => item.status === activeTab);
    };

    const filteredData = getFilteredData(); // Data hasil filter ini yang akan dikirim ke Tabel

    return (
        <div>
            <div className="dashboard-header">
=======
];


const DashboardPage = () => {
    return (
        <div>
            {/* 2. HEADER HALAMAN (yang "dipisah di atas") */}
            <div className="dashboard-header">
                {/* Teks di kiri */}
>>>>>>> 7335b69be347e6de3f0ebc435a04b888d778558f
                <div>
                    <h1>Dashboard</h1>
                    <p>Selamat datang kembali, Yohan!</p>
                </div>
<<<<<<< HEAD
=======
                {/* Tombol di kanan */}
>>>>>>> 7335b69be347e6de3f0ebc435a04b888d778558f
                <div>
                    <Link to="/buat-ba" className="btn btn-primary">
                        + Tambah Berita Acara
                    </Link>
                </div>
            </div>

<<<<<<< HEAD
            <div className="dashboard-card">

=======
            {/* 3. CARD KONTEN (dengan Header & Footer) */}
            <div className="dashboard-card">
                
                {/* CARD HEADER */}
>>>>>>> 7335b69be347e6de3f0ebc435a04b888d778558f
                <div className="card-header">
                    <h3>Daftar Berita Acara</h3>
                </div>

<<<<<<< HEAD
                <div className="card-body" style={{ paddingTop: '20px' }}>

                    {/* 4. KOMPONEN NAVIGASI TAB */}
                    <div className="dashboard-tabs">
                        <button
                            className={`tab-btn ${activeTab === 'Semua' ? 'active' : ''}`}
                            onClick={() => setActiveTab('Semua')}
                        >
                            Semua Data
                        </button>

                        <button
                            className={`tab-btn ${activeTab === 'Disetujui' ? 'active' : ''}`}
                            onClick={() => setActiveTab('Disetujui')}
                        >
                            Disetujui
                        </button>

                        <button
                            className={`tab-btn ${activeTab === 'Menunggu' ? 'active' : ''}`}
                            onClick={() => setActiveTab('Menunggu')}
                        >
                            Menunggu
                        </button>

                        <button
                            className={`tab-btn ${activeTab === 'Ditolak' ? 'active' : ''}`}
                            onClick={() => setActiveTab('Ditolak')}
                        >
                            Ditolak
                        </button>
                    </div>

                    {/* 5. Render Tabel dengan data yang SUDAH DIFILTER */}
                    <BATable data={filteredData} />

                </div>

                <div className="card-footer">
                    <span>
                        {/* Update teks footer agar dinamis sesuai jumlah data yang tampil */}
                        Menampilkan {filteredData.length} data ({activeTab})
=======
                {/* CARD BODY */}
                <div className="card-body">
                    <BATable data={MOCK_DATA} />
                </div>

                {/* CARD FOOTER */}
                <div className="card-footer">
                    <span>
                        Menampilkan 1-3 dari 3 data
>>>>>>> 7335b69be347e6de3f0ebc435a04b888d778558f
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