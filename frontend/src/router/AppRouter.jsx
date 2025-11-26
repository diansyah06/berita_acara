import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthLayout from '../components/layouts/AuthLayout';
import MainLayout from '../components/layouts/MainLayout';
import LoginPage from '../pages/Auth/LoginPage';
import RegisterPage from '../pages/Auth/RegisterPage'; 
import DashboardPage from '../pages/Dashboard/DashboardPage';
import CreateBAPage from '../pages/BeritaAcara/CreateBAPage';
import DetailBAPage from '../pages/BeritaAcara/DetailBAPage';
import UserManagementPage from '../pages/Admin/UserManagementPage';
import TentangPage from '../pages/Tentang/TentangPage';


const AppRouter = () => {
    return (
        <Routes>
            <Route element={<AuthLayout />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Route>
            <Route element={<MainLayout />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/buat-ba" element={<CreateBAPage />} />
                <Route path="/admin/users" element={<UserManagementPage />} />
                <Route path="/ba/:id" element={<DetailBAPage />} />
                <Route path="/tentang" element={<TentangPage />} />
            </Route>
        </Routes>
    );
};

export default AppRouter;