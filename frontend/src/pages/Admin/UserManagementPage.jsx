// frontend/src/pages/Admin/UserManagementPage.jsx

import React, { useState, useEffect } from 'react';
import './UserManagementPage.css';
import authService from '../../services/authService';
import api from '../../services/api';

const UserManagementPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [newUser, setNewUser] = useState({
        fullname: '',
        username: '',
        email: '',
        password: '',
        role: 'picgudang',
        companyName: ''
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await api.get('/admin/users');
            setUsers(response.data.data || []);
        } catch (error) {
            console.error("Gagal ambil user:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        try {
            if (newUser.role === 'vendor' && !newUser.companyName) {
                alert("Nama Perusahaan wajib diisi untuk Vendor!");
                return;
            }

            const payload = {
                fullname: newUser.fullname,
                username: newUser.username,
                email: newUser.email,
                password: newUser.password,
                confirmPassword: newUser.password,
                role: newUser.role,
                companyName: newUser.role === 'vendor' ? newUser.companyName : 'Internal Kantor'
            };

            await authService.register(payload);
            alert('Berhasil menambahkan user baru!');
            setShowModal(false);
            setNewUser({ fullname: '', username: '', email: '', password: '', role: 'picgudang', companyName: '' });
            fetchUsers();

        } catch (error) {
            alert('Gagal menambah user: ' + (error.response?.data?.message || error.message));
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Yakin ingin menghapus user ini? Data tidak bisa dikembalikan.')) {
            try {
                await api.delete(`/admin/users/${id}`);
                setUsers(users.filter(u => u._id !== id));
            } catch (error) {
                alert('Gagal menghapus: ' + (error.response?.data?.message || error.message));
            }
        }
    };

    return (
        <div>
            <div className="admin-header">
                <div>
                    <h1>Manajemen User</h1>
                    <p>Kelola akses staf internal dan validasi vendor.</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                    + Tambah User Baru
                </button>
            </div>

            <div className="dashboard-card">
                <div className="card-body">
                    {loading ? <p style={{ padding: '20px', textAlign: 'center', color: '#888' }}>Memuat data pengguna...</p> : (
                        <table className="user-table">
                            <thead>
                                <tr>
                                    <th>Nama Lengkap</th>
                                    <th>Email</th>
                                    <th>Role / Jabatan</th>
                                    <th>Perusahaan</th>
                                    <th>Status</th>
                                    <th style={{ textAlign: 'center' }}>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id}>
                                        <td>
                                            <strong>{user.fullname}</strong>
                                            <div style={{ fontSize: '12px', color: '#888', marginTop: '2px' }}>@{user.username}</div>
                                        </td>
                                        <td>{user.email}</td>
                                        <td>
                                            <span className={`badge role-${user.role}`}>
                                                {user.role ? user.role.toUpperCase() : '-'}
                                            </span>
                                        </td>
                                        <td>
                                            {user.role === 'vendor' && user.vendorId
                                                ? user.vendorId.companyName
                                                : (user.role === 'vendor' ? <span style={{ color: 'red', fontSize: '11px' }}>Data Vendor Hilang</span> : <span style={{ color: '#999', fontStyle: 'italic' }}>Internal</span>)}
                                        </td>
                                        <td>
                                            {user.isActive ?
                                                <span className="status-active">● Aktif</span> :
                                                <span className="status-pending">⏳ Menunggu</span>
                                            }
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            <button
                                                className="btn-action btn-delete"
                                                onClick={() => handleDelete(user._id)}
                                                title="Hapus User"
                                            >
                                                🗑
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {users.length === 0 && (
                                    <tr>
                                        <td colSpan="6" style={{ textAlign: 'center', padding: '30px', color: '#888' }}>
                                            Belum ada data user. Silakan tambah user baru.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Tambah User Baru</h3>
                        <form onSubmit={handleAddUser}>

                            <div className="form-group">
                                <label>Role / Jabatan</label>
                                <select
                                    className="form-control-modal"
                                    value={newUser.role}
                                    onChange={e => setNewUser({ ...newUser, role: e.target.value })}
                                >
                                    <option value="picgudang">PIC Gudang</option>
                                    <option value="direksipekerjaan">Direksi Pekerjaan</option>
                                    <option value="vendor">Vendor (Eksternal)</option>
                                </select>
                            </div>

                            {newUser.role === 'vendor' && (
                                <div className="form-group" style={{ animation: 'fadeIn 0.3s' }}>
                                    <label>Nama Perusahaan (PT/CV)</label>
                                    <input type="text" className="form-control-modal" required
                                        placeholder="Contoh: PT. Sumber Makmur"
                                        value={newUser.companyName} onChange={e => setNewUser({ ...newUser, companyName: e.target.value })} />
                                </div>
                            )}

                            <div className="form-group">
                                <label>Nama Lengkap</label>
                                <input type="text" className="form-control-modal" required
                                    placeholder="Masukkan nama lengkap"
                                    value={newUser.fullname} onChange={e => setNewUser({ ...newUser, fullname: e.target.value })} />
                            </div>

                            <div className="form-group">
                                <label>Username</label>
                                <input type="text" className="form-control-modal" required
                                    placeholder="Username unik"
                                    value={newUser.username} onChange={e => setNewUser({ ...newUser, username: e.target.value })} />
                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" className="form-control-modal" required
                                    placeholder="contoh@email.com"
                                    value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })} />
                            </div>

                            <div className="form-group">
                                <label>Password Default</label>
                                <input type="text" className="form-control-modal" required
                                    placeholder="Minimal 6 karakter"
                                    value={newUser.password} onChange={e => setNewUser({ ...newUser, password: e.target.value })} />
                            </div>

                            <div className="modal-actions">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Batal</button>
                                <button type="submit" className="btn btn-primary">Simpan Data</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserManagementPage;