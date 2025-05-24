import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated, hasRole } from "../utils/AuthCheck";
import { APP_ROUTER } from "../utils/Constants";
import PageTransitionWrapper from "../components/PageTransition";


const PrivateRoutes = ({ role, children }) => {
  const token = isAuthenticated();
  const isRole = role.some(r => hasRole(r));
  if (!token) return <Navigate to={APP_ROUTER.LOGIN} />;
  if (!isRole) return <Navigate to={APP_ROUTER.HOME} />;

  return (
    <PageTransitionWrapper>{children ? children : <Outlet />}</PageTransitionWrapper>
  );
};

export default PrivateRoutes;