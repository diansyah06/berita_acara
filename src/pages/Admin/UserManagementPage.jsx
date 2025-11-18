<<<<<<< HEAD
import React, { useState } from 'react';
import './UserManagementPage.css';
import '../../pages/Dashboard/DashboardPage.css'; // Menggunakan style card dashboard

const UserManagementPage = () => {
    // 1. Data Dummy Simulasi Database
    const [users, setUsers] = useState([
        { id: 1, nama: 'Yohan (Anda)', email: 'admin@kantor.com', role: 'admin', perusahaan: 'Internal', status: 'Active' },
        { id: 2, nama: 'Budi Santoso', email: 'budi@kantor.com', role: 'user', perusahaan: 'Internal', status: 'Active' },
        { id: 3, nama: 'Siti Aminah', email: 'siti@vendor-abadi.com', role: 'vendor', perusahaan: 'PT. Vendor Abadi', status: 'Active' },
        { id: 4, nama: 'Rudi Hartono', email: 'rudi@cv-baru.com', role: 'vendor', perusahaan: 'CV. Maju Jaya', status: 'Pending' }, // Kasus Vendor Baru Daftar
    ]);

    // --- LOGIKA ADMIN ---

    // 1. Fungsi Menghapus User
    const handleDelete = (id) => {
        if (window.confirm('Yakin ingin menghapus user ini? Akses mereka akan dicabut.')) {
            setUsers(users.filter(user => user.id !== id));
        }
    };

    // 2. Fungsi Menyetujui Vendor (Pending -> Active)
    const handleApprove = (id, nama) => {
        if (window.confirm(`Setujui pendaftaran vendor atas nama ${nama}?`)) {
            setUsers(users.map(user =>
                user.id === id ? { ...user, status: 'Active' } : user
            ));
            alert(`Berhasil! ${nama} sekarang dapat login dan menandatangani dokumen.`);
        }
    };

    return (
        <div>
            {/* Header Halaman */}
            <div className="admin-header">
                <div>
                    <h1>Manajemen User</h1>
                    <p>Kelola akses staf internal dan validasi pendaftaran vendor.</p>
                </div>
                <button className="btn btn-primary">
                    + Tambah Staf Baru
                </button>
            </div>

            {/* Card Dashboard */}
            <div className="dashboard-card">
                <div className="card-header">
                    <h3>Daftar Pengguna Sistem</h3>
                </div>

                <div className="card-body">
                    <table className="user-table">
                        <thead>
                            <tr>
                                <th>Nama Lengkap</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Perusahaan</th>
                                <th>Status</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>
                                        <strong>{user.nama}</strong>
                                        <br />
                                        <span style={{ fontSize: '12px', color: '#888' }}>ID: #{user.id}</span>
                                    </td>
                                    <td>{user.email}</td>
                                    <td>
                                        {/* Badge Role Warna-warni */}
                                        <span className={`badge role-${user.role}`}>
                                            {user.role === 'user' ? 'Staf Internal' : user.role}
                                        </span>
                                    </td>
                                    <td>{user.perusahaan}</td>
                                    <td>
                                        {/* Badge Status */}
                                        {user.status === 'Pending' ? (
                                            <span className="status-pending">⚠ Menunggu Verifikasi</span>
                                        ) : (
                                            <span className="status-active">● Aktif</span>
                                        )}
                                    </td>
                                    <td>
                                        {/* TOMBOL AKSI */}

                                        {/* Jika Pending, Tampilkan Tombol SETUJUI */}
                                        {user.status === 'Pending' && (
                                            <button
                                                className="btn-action btn-approve"
                                                onClick={() => handleApprove(user.id, user.nama)}
                                                title="Setujui Pendaftaran Vendor"
                                            >
                                                ✔ Setujui
                                            </button>
                                        )}

                                        {/* Tombol Hapus (Jangan hapus diri sendiri) */}
                                        {user.role !== 'admin' && (
                                            <button
                                                className="btn-action btn-delete"
                                                onClick={() => handleDelete(user.id)}
                                                title="Hapus User"
                                            >
                                                🗑 Hapus
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {users.length === 0 && (
                        <p style={{ textAlign: 'center', padding: '20px' }}>Tidak ada data user.</p>
                    )}
                </div>
            </div>
=======

import React from 'react';

const UserManagementPage = () => {
    return (
        <div>
            <h1>Halaman Manajemen User</h1>
            <p>Ini adalah placeholder untuk halaman admin.</p>
            <p>Link ini aktif dari Sidebar.</p>
>>>>>>> 7335b69be347e6de3f0ebc435a04b888d778558f
        </div>
    );
};

export default UserManagementPage;