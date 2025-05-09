import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../../components/Shared/Header';
import Footer from '../../components/Shared/Footer';
import ChatCustomer from '../../page/Chat';

const MainLayout = () => {
    return (
        <div className="mx-auto w-full relative" style={{ maxWidth: "100vw" }}>
            <Header></Header>
            <main className='w-[85%] mx-auto'>
                <Outlet />      
            </main>
            <ChatCustomer/> 
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;