import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import baService from '../../services/baService';
import VerificationModal from '../../components/ba/VerificationModal';
import ResubmitModal from '../../components/ba/ResubmitModal';
import AuditTrail from '../../components/ba/AuditTrail'; // Import Komponen Audit Trail
import './DetailBAPage.css';

const terbilang = (angka) => {
    const bil = ["", "Satu", "Dua", "Tiga", "Empat", "Lima", "Enam", "Tujuh", "Delapan", "Sembilan", "Sepuluh", "Sebelas"];
    let terbilang = "";

    if (angka < 12) {
        terbilang = " " + bil[angka];
    } else if (angka < 20) {
        terbilang = terbilangFn(angka - 10) + " Belas";
    } else if (angka < 100) {
        terbilang = terbilangFn(Math.floor(angka / 10)) + " Puluh" + terbilangFn(angka % 10);
    } else if (angka < 200) {
        terbilang = " Seratus" + terbilangFn(angka - 100);
    } else if (angka < 1000) {
        terbilang = terbilangFn(Math.floor(angka / 100)) + " Ratus" + terbilangFn(angka % 100);
    } else if (angka < 2000) {
        terbilang = " Seribu" + terbilangFn(angka - 1000);
    } else if (angka < 1000000) {
        terbilang = terbilangFn(Math.floor(angka / 1000)) + " Ribu" + terbilangFn(angka % 1000);
    } else if (angka < 1000000000) {
        terbilang = terbilangFn(Math.floor(angka / 1000000)) + " Juta" + terbilangFn(angka % 1000000);
    } else if (angka < 1000000000000) {
        terbilang = terbilangFn(Math.floor(angka / 1000000000)) + " Milyar" + terbilangFn(angka % 1000000000);
    }
    return terbilang;
}

// Wrapper function untuk rekursif
const terbilangFn = (angka) => {
    return terbilang(angka);
}

const DetailBAPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);

    // Modal State (Verifikasi Gudang)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalAction, setModalAction] = useState('Disetujui');

    // Modal State (Revisi Vendor)
    const [isResubmitModalOpen, setIsResubmitModalOpen] = useState(false);

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
                    contractNumber: rawData.contractNumber,
                    category: rawData.category,
                    jenisBaLabel: rawData.category === 'bapb' ? 'PEMERIKSAAN BARANG' : 'PEMERIKSAAN PEKERJAAN',

                    // Data Vendor (Pihak Pertama)
                    vendor: {
                        companyName: rawData.vendorSnapshot?.companyName || 'Vendor',
                        picName: rawData.vendorSnapshot?.picName || '-',
                        address: '-'
                    },

                    // Data Internal (Pihak Kedua) & Gudang
                    warehouse: {
                        name: rawData.warehouseCheck?.warehouseName || '-',
                    },

                    // Data Transaksi
                    paymentNominal: rawData.paymentNominal,
                    description: rawData.description,

                    // Status & Check
                    status: mapStatusToIndonesian(rawData.status),
                    rawStatus: rawData.status, // Penting untuk logika tombol revisi & audit trail
                    paymentStatus: rawData.paymentStatus,
                    warehouseCheck: rawData.warehouseCheck,
                    approvalInfo: rawData.approvalInfo,

                    // Dates
                    createdAt: rawData.createdAt,
                    formattedDate: getIndonesianDate(rawData.createdAt)
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

    // Helper: Format Tanggal Indonesia
    const getIndonesianDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    };

    const mapStatusToIndonesian = (statusBackend) => {
        switch (statusBackend) {
            case 'pending': return 'Menunggu';
            case 'approved': return 'Disetujui';
            case 'rejected': return 'Ditolak';
            case 'revision': return 'Revisi';
            default: return statusBackend;
        }
    };

    // --- Action Handlers ---
    const handleButtonClick = (actionType) => {
        if (currentUser.role === 'picgudang') {
            setModalAction(actionType);
            setIsModalOpen(true);
        } else {
            executeAction(actionType);
        }
    };

    const executeAction = async (actionType, notes = null, files = []) => {
        const isApprove = actionType === 'Disetujui';

        if (currentUser.role !== 'picgudang') {
            if (!window.confirm(`Apakah Anda yakin ingin ${isApprove ? 'menyetujui' : 'menolak'} dokumen ini?`)) return;
        }

        try {
            if (currentUser.role === 'picgudang') {
                await baService.verify(id, actionType, notes, files);
                setIsModalOpen(false);
                alert(`Verifikasi Gudang Berhasil: ${actionType}`);
            } else {
                await baService.approve(id, actionType);
                alert(`Persetujuan Berhasil: ${actionType}`);
            }
            loadDetailData();
        } catch (error) {
            console.error(error);
            const msg = error.response?.data?.meta?.message || error.message;
            alert(`Gagal memproses: ${msg}`);
        }
    };

    // --- Action Handler: Revisi ---
    const handleResubmit = async (payload) => {
        setLoading(true);
        try {
            await baService.resubmit(id, payload);
            alert("Dokumen berhasil direvisi dan dikirim ulang.");
            setIsResubmitModalOpen(false);
            loadDetailData();
        } catch (error) {
            const msg = error.response?.data?.meta?.message || error.message;
            alert(`Gagal revisi: ${msg}`);
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => navigate('/dashboard');
    const handlePrint = () => window.print();

    if (loading && !data) return <div className="loading-container">Memuat dokumen...</div>;
    if (!data) return null;

    // Logic Access Control
    const isBAPB = data.category === 'bapb';
    const isBAPP = data.category === 'bapp';
    let showButtons = false;

    if (currentUser && data.status === 'Menunggu') {
        if (currentUser.role === 'picgudang' && isBAPB) {
            if (!data.warehouseCheck || data.warehouseCheck.checkStatus === 'pending') showButtons = true;
        }
        if (currentUser.role === 'direksipekerjaan' && isBAPP) showButtons = true;
        if (currentUser.role === 'pemesanbarang' && isBAPB) {
            if (data.warehouseCheck && data.warehouseCheck.checkStatus === 'approved') showButtons = true;
        }
    }

    // Logic Tombol Revisi (Vendor Only)
    const showResubmitButton = currentUser?.role === 'vendor' && (data.rawStatus === 'rejected' || data.rawStatus === 'revision');

    return (
        <div className="detail-ba-container">
            {/* Header Navigation */}
            <div className="detail-header-nav">
                <button className="btn btn-secondary" onClick={handleBack}>&larr; Kembali</button>
                <div className="header-right-actions">
                    <span className={`status-label status-${data.rawStatus}`}>{data.status}</span>
                    <button className="btn btn-print" onClick={handlePrint}>🖨️ Cetak PDF</button>
                </div>
            </div>

            {/* Document Paper */}
            <div className="paper-document">

                {/* 1. JUDUL DOKUMEN */}
                <div className="doc-title">
                    <h2>BERITA ACARA {data.jenisBaLabel}</h2>
                    <p style={{ marginTop: '10px', fontSize: '14px', fontWeight: 'bold' }}>
                        NOMOR: {data.contractNumber}
                    </p>
                </div>

                {/* 2. ISI DOKUMEN */}
                <div className="doc-body">
                    <p>
                        Pada hari ini, <strong>{data.formattedDate}</strong>, telah dilakukan pemeriksaan dan serah terima pekerjaan/barang dengan rincian sebagai berikut:
                    </p>

                    <div style={{ marginTop: '30px', marginBottom: '30px' }}>
                        {/* IDENTITAS PIHAK */}
                        <table className="doc-table" style={{ border: 'none' }}>
                            <tbody>
                                <tr>
                                    <td className="label-column" style={{ width: '150px' }}>Pihak Pertama</td>
                                    <td style={{ width: '20px' }}>:</td>
                                    <td><strong>{data.vendor.companyName}</strong> (Vendor)</td>
                                </tr>
                                <tr>
                                    <td className="label-column">Pihak Kedua</td>
                                    <td>:</td>
                                    <td><strong>PT. INTERNAL PERUSAHAAN</strong> (User)</td>
                                </tr>
                                {isBAPB && (
                                    <tr>
                                        <td className="label-column">Lokasi Gudang</td>
                                        <td>:</td>
                                        <td>{data.warehouse.name}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        <hr style={{ border: '0', borderTop: '1px dashed #ccc', margin: '20px 0' }} />

                        {/* DETAIL TRANSAKSI */}
                        <table className="doc-table">
                            <tbody>
                                <tr>
                                    <td className="label-column" style={{ width: '150px' }}>Deskripsi</td>
                                    <td style={{ width: '20px' }}>:</td>
                                    <td>{data.description}</td>
                                </tr>
                                <tr>
                                    <td className="label-column">Nilai Pekerjaan</td>
                                    <td>:</td>
                                    <td>
                                        <strong>Rp {data.paymentNominal.toLocaleString('id-ID')}</strong>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="label-column">Terbilang</td>
                                    <td>:</td>
                                    <td style={{ fontStyle: 'italic', textTransform: 'capitalize' }}>
                                        {terbilangFn(data.paymentNominal)} Rupiah
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p>
                        Demikian Berita Acara ini dibuat dengan sebenar-benarnya untuk dapat dipergunakan sebagaimana mestinya.
                    </p>
                </div>

                {/* 3. TANDA TANGAN */}
                <div className="signature-section">
                    {/* KIRI: VENDOR */}
                    <div className="signature-box">
                        <p style={{ marginBottom: '40px' }}>Pihak Pertama (Vendor),</p>

                        <div className="sign-placeholder no-border">
                            <div className="digital-sign-stamp">
                                DIGITALLY SIGNED<br />
                                <small>{new Date(data.createdAt).toLocaleDateString()}</small>
                            </div>
                        </div>

                        <span className="sign-name">{data.vendor.picName}</span>
                        <span style={{ fontSize: '12px', display: 'block' }}>{data.vendor.companyName}</span>
                    </div>

                    {/* KANAN: INTERNAL */}
                    <div className="signature-box">
                        <p style={{ marginBottom: '5px' }}>Pihak Kedua (Internal),</p>
                        {/* Jika BAPB, tampilkan status gudang kecil di atas */}
                        {isBAPB && (
                            <div style={{ fontSize: '11px', color: '#666', marginBottom: '20px' }}>
                                {data.warehouseCheck?.checkStatus === 'approved'
                                    ? `(Diverifikasi Gudang: ${new Date(data.warehouseCheck.checkAt).toLocaleDateString()})`
                                    : '(Menunggu Verifikasi Gudang)'}
                            </div>
                        )}

                        {data.status === 'Disetujui' ? (
                            <div className="sign-placeholder no-border">
                                <div className="digital-sign-stamp stamp-approved">
                                    APPROVED<br />
                                    <small>{data.approvalInfo ? new Date(data.approvalInfo.approveAt).toLocaleDateString() : 'Verified'}</small>
                                </div>
                            </div>
                        ) : showResubmitButton ? (
                            // TAMPILAN KHUSUS VENDOR JIKA DITOLAK/REVISI
                            <div className="sign-placeholder stamp-rejected" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                                <span>PERLU REVISI</span>
                                <button
                                    className="btn btn-primary btn-sm"
                                    style={{ marginTop: '5px', width: '80%', zIndex: 10 }}
                                    onClick={() => setIsResubmitModalOpen(true)}
                                >
                                    ✏️ Perbaiki Data
                                </button>
                            </div>
                        ) : data.status === 'Ditolak' ? (
                            <div className="sign-placeholder stamp-rejected">
                                <span>DITOLAK</span>
                            </div>
                        ) : showButtons ? (
                            <div className="action-btn-group">
                                <button
                                    className="btn btn-primary btn-full-width btn-green"
                                    onClick={() => handleButtonClick('Disetujui')}
                                >
                                    ✅ {currentUser.role === 'picgudang' ? 'Verifikasi Fisik' : 'Setujui Dokumen'}
                                </button>
                                <button
                                    className="btn btn-secondary btn-full-width btn-red"
                                    onClick={() => handleButtonClick('Ditolak')}
                                >
                                    ❌ Tolak
                                </button>
                            </div>
                        ) : (
                            <div className="sign-placeholder">
                                <span>
                                    {data.warehouseCheck?.checkStatus === 'approved'
                                        ? 'Menunggu Approval Akhir...'
                                        : 'Menunggu Verifikasi...'}
                                </span>
                            </div>
                        )}

                        {/* Nama Penandatangan Internal */}
                        <span className="sign-name" style={{ marginTop: '10px' }}>
                            {data.approvalInfo?.approvalByName || (currentUser?.role === 'vendor' ? '.....' : currentUser?.fullname)}
                        </span>
                        <span style={{ fontSize: '12px', display: 'block' }}>
                            {isBAPB ? 'Pemesan Barang' : 'Direksi Pekerjaan'}
                        </span>
                    </div>
                </div>
            </div>

            {/* --- Audit Trail (Timeline Riwayat Dokumen) --- */}
            {/* Bagian ini akan disembunyikan saat Print via CSS (.no-print) */}
            {data && (
                <div className="no-print">
                    <AuditTrail data={data} />
                </div>
            )}

            {/* Modal Render (Khusus PIC Gudang) */}
            {currentUser?.role === 'picgudang' && (
                <VerificationModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={executeAction}
                    actionType={modalAction}
                    loading={loading}
                />
            )}

            {/* Modal Render Revisi (Khusus Vendor) */}
            <ResubmitModal
                isOpen={isResubmitModalOpen}
                onClose={() => setIsResubmitModalOpen(false)}
                onSubmit={handleResubmit}
                initialData={data}
                loading={loading}
            />
        </div>
    );
};

export default DetailBAPage;