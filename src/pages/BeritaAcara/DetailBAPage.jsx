// src/pages/BeritaAcara/DetailBAPage.jsx

import React from 'react';
import { useParams } from 'react-router-dom'; // Import hook untuk mengambil parameter URL

const DetailBAPage = () => {
    // Ambil 'id' dari URL, sesuai yang didefinisikan di AppRouter: /ba/:id
    const { id } = useParams();

    return (
        <div>
            <h1>Halaman Detail Berita Acara</h1>
            <p>Ini adalah placeholder untuk melihat detail BA.</p>
            <p>Link ini aktif dari tabel di Dashboard.</p>
            <br />
            <h3>Anda sedang melihat Berita Acara dengan ID: {id}</h3>
        </div>
    );
};

export default DetailBAPage;