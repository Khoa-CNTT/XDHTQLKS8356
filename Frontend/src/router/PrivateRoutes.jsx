import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated, hasRole } from '../utils/AuthCheck';
import { APP_ROUTER } from '../utils/Constants';

const PrivateRoutes = ({ role, children }) => {
    const token = isAuthenticated();
    const isRole = hasRole(role);

    if (!token) {
        return <Navigate to={APP_ROUTER.LOGIN} />;
    }

    if (!isRole) {
        return <Navigate to={APP_ROUTER.HOME} />;
    }

    return children ? children : <Outlet />;
};

export default PrivateRoutes;