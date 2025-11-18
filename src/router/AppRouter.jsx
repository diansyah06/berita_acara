// src/router/AppRouter.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import Layouts
import AuthLayout from '../components/layouts/AuthLayout';
import MainLayout from '../components/layouts/MainLayout';

// Import Pages
import LoginPage from '../pages/Auth/LoginPage';
import RegisterPage from '../pages/Auth/RegisterPage'; // <--- 1. IMPORT INI (BARU)
import DashboardPage from '../pages/Dashboard/DashboardPage';
import CreateBAPage from '../pages/BeritaAcara/CreateBAPage';
import DetailBAPage from '../pages/BeritaAcara/DetailBAPage';
import UserManagementPage from '../pages/Admin/UserManagementPage';

// --- IMPORT HALAMAN LAIN ---
import TentangPage from '../pages/Tentang/TentangPage';


const AppRouter = () => {
    return (
        <Routes>
            {/* Rute untuk Auth (Login & Register) menggunakan AuthLayout */}
            <Route element={<AuthLayout />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<LoginPage />} />

                {/* --- 2. TAMBAHKAN RUTE INI (BARU) --- */}
                <Route path="/register" element={<RegisterPage />} />
            </Route>

            {/* Rute untuk App Utama (menggunakan MainLayout) */}
            <Route element={<MainLayout />}>

                {/* --- RUTE-RUTE INI SEKARANG AKTIF --- */}
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/buat-ba" element={<CreateBAPage />} />
                <Route path="/admin/users" element={<UserManagementPage />} />
                <Route path="/ba/:id" element={<DetailBAPage />} />

                {/* Rute Tentang Aplikasi */}
                <Route path="/tentang" element={<TentangPage />} />

            </Route>

            {/* Rute 404 */}
            {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
    );
};

export default AppRouter;