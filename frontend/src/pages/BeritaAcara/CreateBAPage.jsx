import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../../components/common/InputField';
import baService from '../../services/baService';
import './CreateBAPage.css';

const CreateBAPage = () => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);

    const [nomorKontrak, setNomorKontrak] = useState('');
    const [jenisBa, setJenisBa] = useState('BAPB'); 
    const [nominal, setNominal] = useState('');
    const [keterangan, setKeterangan] = useState('');

    useEffect(() => {
        const userSess = JSON.parse(localStorage.getItem('user_sess'));

        if (!userSess || userSess.role !== 'vendor') {
            alert("Akses Ditolak: Hanya Vendor yang boleh membuat Berita Acara!");
            navigate('/dashboard');
            return;
        }
        setCurrentUser(userSess);
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!currentUser) return;

        const payload = {
            contractNumber: nomorKontrak,           
            type: jenisBa.toLowerCase(),            
            paymentNominal: parseInt(nominal) || 0, 
            description: keterangan                
        };

        try {
            await baService.create(payload);
            alert('Berhasil! BA telah dibuat dan dikirim ke Pihak Internal untuk diperiksa.');
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            const errorMsg = error.response?.data?.meta?.message || error.message;
            alert('Gagal membuat BA: ' + errorMsg);
        }
    };

    return (
        <div className="create-ba-container">
            <div className="dashboard-header">
                <div>
                    <h1>Buat Berita Acara (Vendor)</h1>
                    <p>Silakan input data pekerjaan yang telah Anda selesaikan.</p>
                </div>
            </div>

            <div className="dashboard-card">
                <form onSubmit={handleSubmit}>
                    <div className="card-body">
                        <div className="form-grid">

                            <InputField
                                label="Nomor Kontrak"
                                type="text"
                                placeholder="Contoh: CTR-2025-001"
                                value={nomorKontrak}
                                onChange={(e) => setNomorKontrak(e.target.value)}
                            />

                            <div>
                                <label style={{ fontWeight: 'bold', display: 'block', marginTop: '10px' }}>
                                    Jenis Berita Acara
                                </label>
                                <select
                                    className="form-select"
                                    value={jenisBa}
                                    onChange={(e) => setJenisBa(e.target.value)}
                                >
                                    <option value="BAPB">BAPB (Berita Acara Pemeriksaan Barang)</option>
                                    <option value="BAPP">BAPP (Berita Acara Pemeriksaan Pekerjaan)</option>
                                </select>
                            </div>

                            <InputField
                                label="Nominal Tagihan (Rp)"
                                type="number"
                                placeholder="Contoh: 50000000"
                                value={nominal}
                                onChange={(e) => setNominal(e.target.value)}
                            />

                            <div style={{ gridColumn: '1 / -1' }}>
                                <label style={{ fontWeight: 'bold', display: 'block', marginTop: '10px' }}>
                                    Keterangan Pekerjaan
                                </label>
                                <textarea
                                    className="form-select"
                                    rows="3"
                                    placeholder="Deskripsikan barang/pekerjaan yang diserahterimakan..."
                                    value={keterangan}
                                    onChange={(e) => setKeterangan(e.target.value)}
                                    style={{ width: '100%', resize: 'vertical' }}
                                ></textarea>
                            </div>

                        </div>
                    </div>

                    <div className="card-footer form-actions">
                        <button type="button" className="btn-secondary" onClick={() => navigate('/dashboard')}>
                            Batal
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Simpan & Kirim
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateBAPage;