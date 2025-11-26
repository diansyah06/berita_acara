import React from 'react';
import { Link } from 'react-router-dom'; 
import './BATable.css'; 

const getStatusClass = (status) => {
    if (status === 'Disetujui') return 'status-disetujui';
    if (status === 'Ditolak') return 'status-ditolak';
    return 'status-menunggu'; 
};

const BATable = ({ data }) => {
    if (!data || data.length === 0) {
        return <p>Belum ada data Berita Acara.</p>;
    }

    return (
        <div className="ba-table-container">
            <table className="ba-table">
                <thead>
                    <tr>
                        <th>No. Kontrak</th>
                        <th>Jenis BA</th>
                        <th>Tanggal Dibuat</th>
                        <th>Vendor</th>
                        <th>Status</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.nomorKontrak}</td>
                            <td>{item.jenis}</td>
                            <td>{item.tanggal}</td>
                            <td>{item.vendor}</td>
                            <td>
                                <span className={`status-badge ${getStatusClass(item.status)}`}>
                                    {item.status}
                                </span>
                            </td>
                            <td>
                                <Link to={`/ba/${item.id}`} className="action-button">
                                    Detail
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BATable;