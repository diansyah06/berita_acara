// src/router/AppRouter.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import Layouts
import AuthLayout from '../components/layouts/AuthLayout';
import MainLayout from '../components/layouts/MainLayout';

// Import Pages
import LoginPage from '../pages/Auth/LoginPage';
<<<<<<< HEAD
import RegisterPage from '../pages/Auth/RegisterPage'; // <--- 1. IMPORT INI (BARU)
=======
>>>>>>> 7335b69be347e6de3f0ebc435a04b888d778558f
import DashboardPage from '../pages/Dashboard/DashboardPage';
import CreateBAPage from '../pages/BeritaAcara/CreateBAPage';
import DetailBAPage from '../pages/BeritaAcara/DetailBAPage';
import UserManagementPage from '../pages/Admin/UserManagementPage';

<<<<<<< HEAD
// --- IMPORT HALAMAN LAIN ---
import TentangPage from '../pages/Tentang/TentangPage';
=======
// --- 1. IMPORT HALAMAN BARU ---
import TentangPage from '../pages/Tentang/TentangPage'; // (Pastikan path-nya benar)
>>>>>>> 7335b69be347e6de3f0ebc435a04b888d778558f


const AppRouter = () => {
    return (
        <Routes>
<<<<<<< HEAD
            {/* Rute untuk Auth (Login & Register) menggunakan AuthLayout */}
            <Route element={<AuthLayout />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<LoginPage />} />

                {/* --- 2. TAMBAHKAN RUTE INI (BARU) --- */}
                <Route path="/register" element={<RegisterPage />} />
=======
            {/* Rute untuk Login (menggunakan AuthLayout) */}
            <Route element={<AuthLayout />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<LoginPage />} />
>>>>>>> 7335b69be347e6de3f0ebc435a04b888d778558f
            </Route>

            {/* Rute untuk App Utama (menggunakan MainLayout) */}
            <Route element={<MainLayout />}>
<<<<<<< HEAD

=======
                
>>>>>>> 7335b69be347e6de3f0ebc435a04b888d778558f
                {/* --- RUTE-RUTE INI SEKARANG AKTIF --- */}
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/buat-ba" element={<CreateBAPage />} />
                <Route path="/admin/users" element={<UserManagementPage />} />
                <Route path="/ba/:id" element={<DetailBAPage />} />
<<<<<<< HEAD

                {/* Rute Tentang Aplikasi */}
=======
                
                {/* --- 2. TAMBAHKAN RUTE BARU DI SINI --- */}
>>>>>>> 7335b69be347e6de3f0ebc435a04b888d778558f
                <Route path="/tentang" element={<TentangPage />} />

            </Route>

            {/* Rute 404 */}
            {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
    );
};

export default AppRouter;