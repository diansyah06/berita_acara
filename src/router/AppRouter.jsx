// src/router/AppRouter.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import Layouts
import AuthLayout from '../components/layouts/AuthLayout';
import MainLayout from '../components/layouts/MainLayout';

// Import Pages
import LoginPage from '../pages/Auth/LoginPage';
import DashboardPage from '../pages/Dashboard/DashboardPage';
import CreateBAPage from '../pages/BeritaAcara/CreateBAPage';
import DetailBAPage from '../pages/BeritaAcara/DetailBAPage';
import UserManagementPage from '../pages/Admin/UserManagementPage';

// --- 1. IMPORT HALAMAN BARU ---
import TentangPage from '../pages/Tentang/TentangPage'; // (Pastikan path-nya benar)


const AppRouter = () => {
    return (
        <Routes>
            {/* Rute untuk Login (menggunakan AuthLayout) */}
            <Route element={<AuthLayout />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<LoginPage />} />
            </Route>

            {/* Rute untuk App Utama (menggunakan MainLayout) */}
            <Route element={<MainLayout />}>
                
                {/* --- RUTE-RUTE INI SEKARANG AKTIF --- */}
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/buat-ba" element={<CreateBAPage />} />
                <Route path="/admin/users" element={<UserManagementPage />} />
                <Route path="/ba/:id" element={<DetailBAPage />} />
                
                {/* --- 2. TAMBAHKAN RUTE BARU DI SINI --- */}
                <Route path="/tentang" element={<TentangPage />} />

            </Route>

            {/* Rute 404 */}
            {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
    );
};

export default AppRouter;