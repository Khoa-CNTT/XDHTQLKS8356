import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../../components/Shared/Header';
import Footer from '../../components/Shared/Footer';

const MainLayout = () => {
    return (
        <div className="mx-auto w-full" style={{ maxWidth: "100vw" }}>
            <Header></Header>
            <main>
                <Outlet />       
            </main>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;