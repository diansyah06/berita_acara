import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import './MainLayout.css'; 

const MainLayout = () => {

    return (
        <div>
            <Navbar />
            <main className="page-content">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;