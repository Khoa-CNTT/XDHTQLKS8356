import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PageTransitionWrapper from '../../components/PageTransition';


const AuthLayout = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <PageTransitionWrapper key={location.pathname}>
                <Outlet />
            </PageTransitionWrapper>
        </AnimatePresence>
    );
};

export default AuthLayout;
