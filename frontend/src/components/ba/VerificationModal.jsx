import React, { useState } from 'react';
import Button from '../common/Button';
import './VerificationModal.css';

const VerificationModal = ({ isOpen, onClose, onSubmit, actionType, loading }) => {
    const [notes, setNotes] = useState('');
    const [files, setFiles] = useState([]);

    if (!isOpen) return null;

    const isApprove = actionType === 'Disetujui';

    const handleFileChange = (e) => {
        setFiles(Array.from(e.target.files));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(actionType, notes, files);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3 className={`modal-title ${isApprove ? 'text-approve' : 'text-reject'}`}>
                    {isApprove ? '✅ Verifikasi Penerimaan Barang' : '❌ Tolak Barang'}
                </h3>
                
                <form onSubmit={handleSubmit}>
                    <div className="modal-form-group">
                        <label className="modal-label">Catatan Pemeriksaan (Wajib):</label>
                        <textarea
                            className="modal-textarea"
                            rows="4"
                            placeholder={isApprove 
                                ? "Contoh: Barang lengkap, kondisi fisik baik, segel utuh..." 
                                : "Contoh: Kemasan rusak, jumlah kurang 2 unit..."}
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            required
                        />
                    </div>

                    <div className="modal-form-group">
                        <label className="modal-label">Bukti Foto Fisik (Opsional):</label>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleFileChange}
                            className="modal-file-input"
                        />
                        <small className="modal-hint">Maksimal 5 foto (JPG/PNG).</small>
                    </div>

                    <div className="modal-actions">
                        <button type="button" onClick={onClose} className="btn-cancel" disabled={loading}>
                            Batal
                        </button>
                        <Button type="submit">
                            {loading ? 'Mengirim...' : 'Kirim Verifikasi'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VerificationModal;