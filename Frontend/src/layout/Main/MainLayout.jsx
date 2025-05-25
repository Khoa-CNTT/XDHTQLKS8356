import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../../components/Shared/Header';
import Footer from '../../components/Shared/Footer';
import ChatCustomer from '../../page/Chat';
import { AnimatePresence } from 'framer-motion';
import PageTransitionWrapper from '../../components/PageTransition';
import { isAuthenticated } from '../../utils/AuthCheck';
import ChatBox from '../../page/Chat/ChatBox';

const MainLayout = () => {
    const location = useLocation();
    

    return (
        <div className="min-h-screen flex flex-col relative mx-auto" style={{ maxWidth: "100vw" }}>
            <Header />
            <main className="flex-grow w-[85%] mx-auto overflow-hidden">
                <AnimatePresence mode="wait">
                    <PageTransitionWrapper key={location.pathname}>
                        <Outlet />
                    </PageTransitionWrapper>
                </AnimatePresence>
            </main>
            {isAuthenticated() && <ChatBox/> }
            {isAuthenticated() && <ChatCustomer/> }
            <Footer />
        </div>
    );
};

export default MainLayout;
