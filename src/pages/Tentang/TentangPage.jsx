import React from 'react';
import './TentangPage.css';

const TentangPage = () => {
    return (
        <div className="tentang-container">
            <div className="tentang-header">
                <h1>Tentang Aplikasi</h1>
            </div>

            <div className="tentang-card">

                <div className="tentang-section">
                    <h2>Digital-BA</h2>
                    <p>
                        <strong>Digital-BA</strong> adalah sebuah aplikasi web yang dirancang untuk
                        mendigitalisasi dan mengelola proses pembuatan Berita Acara (BA).
                        Tujuannya adalah untuk menyederhanakan alur kerja, mengurangi penggunaan kertas (paperless),
                        dan memudahkan pelacakan dokumen secara terpusat.
                    </p>
                </div>

                <div className="tentang-section">
                    <h2>Pengembang</h2>
                    <p>
                        Aplikasi ini dikembangkan oleh <strong>Yohan Tegar Suranta Bangun</strong>
                        sebagai bagian dari proyek untuk menerapkan teknologi
                        pengembangan web modern dan membangun portofolio.
                    </p>
                </div>

                <div className="tentang-section">
                    <h2>Teknologi yang Digunakan</h2>
                    <p>Aplikasi ini dibangun menggunakan tumpukan teknologi (tech stack) berikut:</p>
                    <ul className="teknologi-list">
                        <li><strong>React.js:</strong> Untuk membangun antarmuka pengguna (UI) yang interaktif.</li>
                        <li><strong>React Router:</strong> Untuk menangani navigasi dan rute aplikasi (SPA).</li>
                        <li><strong>CSS Kustom:</strong> Untuk styling dan tata letak (Flexbox, CSS Variabel, dll.).</li>
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default TentangPage;