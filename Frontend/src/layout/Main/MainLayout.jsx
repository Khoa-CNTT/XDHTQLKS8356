import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../../components/Shared/Header';
import Footer from '../../components/Shared/Footer';
import { AnimatePresence } from 'framer-motion';
import PageTransitionWrapper from '../../components/PageTransition';

const MainLayout = () => {
    const location = useLocation();

    return (
        <div className="min-h-screen flex flex-col" style={{ maxWidth: "100vw" }}>
            <Header />
            <main className="flex-grow w-[85%] mx-auto overflow-hidden">
                <AnimatePresence mode="wait">
                    <PageTransitionWrapper key={location.pathname}>
                        <Outlet />
                    </PageTransitionWrapper>
                </AnimatePresence>
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
