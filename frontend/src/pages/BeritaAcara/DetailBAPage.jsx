import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import baService from '../../services/baService';
import './DetailBAPage.css';

const DetailBAPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const userSess = JSON.parse(localStorage.getItem('user_sess'));
        setCurrentUser(userSess);
        loadDetailData();
    }, [id]);

    const loadDetailData = async () => {
        setLoading(true);
        try {
            const allData = await baService.getAll();
            const rawData = allData.find(item => item._id === id);

            if (rawData) {
                const formattedData = {
                    _id: rawData._id,
                    nomorKontrak: rawData.contractNumber,
                    jenisBa: rawData.type ? rawData.type.toUpperCase() : '-',
                    vendor: {
                        fullname: rawData.vendorSnapshot?.companyName || rawData.createdBy?.fullname || 'Vendor'
                    },
                    nominal: rawData.paymentNominal,
                    keterangan: rawData.description,
                    status: mapStatusToIndonesian(rawData.status),
                    tanggal: rawData.createdAt,
                    createdAt: rawData.createdAt
                };
                setData(formattedData);
            } else {
                alert("Data tidak ditemukan!");
                navigate('/dashboard');
            }
        } catch (error) {
            console.error("Gagal load detail:", error);
        } finally {
            setLoading(false);
        }
    };

    const mapStatusToIndonesian = (statusBackend) => {
        switch (statusBackend) {
            case 'pending': return 'Menunggu';
            case 'approved': return 'Disetujui';
            case 'rejected': return 'Ditolak';
            default: return statusBackend;
        }
    };

    const handleApproval = async (newStatus) => {
        const actionWord = newStatus === 'Disetujui' ? 'menyetujui' : 'menolak';
        if (!window.confirm(`Apakah Anda yakin ingin ${actionWord} dokumen ini?`)) return;

        try {
            await baService.updateStatus(id, newStatus);
            alert(`Berhasil! Dokumen telah ${newStatus}.`);
            loadDetailData();
        } catch (error) {
            console.error(error);
            alert('Gagal update status.');
        }
    };

    const handleBack = () => navigate('/dashboard');
    const handlePrint = () => window.print();

    const getFullJudul = (kode) => {
        if (kode === 'BAPB') return 'PEMERIKSAAN BARANG';
        if (kode === 'BAPP') return 'PEMERIKSAAN PEKERJAAN';
        return kode || 'DOKUMEN';
    };

    if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Memuat dokumen...</div>;
    if (!data) return null;

    const isBAPB = data.jenisBa === 'BAPB';
    const isBAPP = data.jenisBa === 'BAPP';
    let canApprove = false;

    if (currentUser && data.status === 'Menunggu') {
        if (isBAPB && currentUser.role === 'picgudang') {
            canApprove = true;
        }
        if (isBAPP && currentUser.role === 'direksipekerjaan') {
            canApprove = true;
        }
    }

    const vendorName = data.vendor ? data.vendor.fullname : 'Nama Vendor';
    const approverTitle = isBAPB ? 'PIC Gudang' : 'Direksi Pekerjaan';
    const formattedDate = new Date(data.tanggal).toLocaleDateString('id-ID', { dateStyle: 'full' });

    return (
        <div className="detail-ba-container">
            <div className="detail-header-nav">
                <button className="btn btn-secondary" onClick={handleBack}>&larr; Kembali</button>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <span style={{ fontWeight: 'bold', color: '#555' }}>Status: {data.status}</span>
                    <button className="btn btn-print" onClick={handlePrint}>🖨️ Cetak</button>
                </div>
            </div>

            <div className="paper-document">
                <div className="doc-title">
                    <h2>BERITA ACARA {getFullJudul(data.jenisBa)}</h2>
                    <p>NOMOR: {data.nomorKontrak}</p>
                </div>

                <div className="doc-body">
                    <p>Pada hari ini, <strong>{formattedDate}</strong>, yang bertanda tangan di bawah ini:</p>

                    <table className="doc-table">
                        <tbody>
                            <tr>
                                <td className="label-column">1. Nama Perusahaan</td>
                                <td>: <strong>{vendorName}</strong></td>
                            </tr>
                            <tr>
                                <td className="label-column">   Jabatan</td>
                                <td>: Pihak Vendor (Pelaksana)</td>
                            </tr>
                        </tbody>
                    </table>

                    <table className="doc-table">
                        <tbody>
                            <tr>
                                <td className="label-column">2. Pihak Internal</td>
                                <td>: <strong>{approverTitle}</strong></td>
                            </tr>
                            <tr>
                                <td className="label-column">   Perusahaan</td>
                                <td>: Perusahaan Kita (Internal)</td>
                            </tr>
                        </tbody>
                    </table>

                    <p>Secara bersama-sama telah melakukan verifikasi hasil pekerjaan/barang.</p>

                    <table className="doc-table">
                        <tbody>
                            <tr>
                                <td className="label-column">Jenis Dokumen</td>
                                <td>: {data.jenisBa}</td>
                            </tr>
                            <tr>
                                <td className="label-column">Nominal</td>
                                <td>: Rp {data.nominal ? data.nominal.toLocaleString('id-ID') : '0'}</td>
                            </tr>
                            <tr>
                                <td className="label-column">Keterangan</td>
                                <td>: {data.keterangan || '-'}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="signature-section">
                    <div className="signature-box">
                        <p>Pihak Vendor,</p>
                        <div className="sign-placeholder" style={{ border: 'none' }}>
                            <div className="digital-sign-stamp">
                                DIGITALLY SIGNED<br />
                                <small>{new Date(data.createdAt).toLocaleDateString()}</small>
                            </div>
                        </div>
                        <span className="sign-name">{vendorName}</span>
                    </div>

                    <div className="signature-box">
                        <p>Pihak Internal ({approverTitle}),</p>

                        {data.status === 'Disetujui' ? (
                            <div className="sign-placeholder" style={{ border: 'none' }}>
                                <div className="digital-sign-stamp" style={{ borderColor: 'green', color: 'green' }}>
                                    APPROVED<br />
                                    <small>Verified by Internal</small>
                                </div>
                            </div>
                        ) : data.status === 'Ditolak' ? (
                            <div className="sign-placeholder" style={{ borderColor: 'red', color: 'red' }}>
                                <span>DITOLAK</span>
                            </div>
                        ) : (
                            canApprove ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
                                    <button
                                        className="btn btn-primary"
                                        style={{ margin: 0, backgroundColor: '#27ae60' }}
                                        onClick={() => handleApproval('Disetujui')}
                                    >
                                        ✅ Setujui
                                    </button>
                                    <button
                                        className="btn btn-secondary"
                                        style={{ margin: 0, backgroundColor: '#e74c3c', color: 'white', border: 'none' }}
                                        onClick={() => handleApproval('Ditolak')}
                                    >
                                        ❌ Tolak
                                    </button>
                                </div>
                            ) : (
                                <div className="sign-placeholder">
                                    <span>Menunggu Persetujuan...</span>
                                </div>
                            )
                        )}

                        <span className="sign-name" style={{ marginTop: '20px' }}>
                            {data.status === 'Disetujui' ? '(Ditandatangani Secara Digital)' : '...'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailBAPage;