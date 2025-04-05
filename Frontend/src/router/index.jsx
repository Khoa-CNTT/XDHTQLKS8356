import { createBrowserRouter, redirect } from "react-router-dom";
import { APP_ROUTER } from "../utils/Constants";
import MainLayout from "../layout/Main/MainLayout";
import HomePage from "../page/Home/HomePage";
import BookingPage from "../page/Booking/BookingPage";
import Login from "../page/Auth/Login/Login";
import Register from "../page/Auth/Register/Register";
import AuthLayout from "../layout/Auth/AuthLayout";
import ManagementLayout from "../layout/Main/ManagementLayout";
import ListOrder from "../page/Management/Order";


const router = createBrowserRouter([
    {
        path: "/",
        loader: () => {
            if (!localStorage.getItem("user")) {
                throw redirect(APP_ROUTER.HOME);
            }
            return null;
        },
    },
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: APP_ROUTER.HOME,
                element: <HomePage />,
                index: true,
            },
            {
                path: APP_ROUTER.BOOKING,
                element: <BookingPage />,
            },
            {
                path: APP_ROUTER.MANAGER,
                element: <ManagementLayout />,
               
            },
            {
                path: APP_ROUTER.ORDER,
                element: <ListOrder />,
               
            },
        ],
    },
  
    {
        path: APP_ROUTER.AUTH,
        element: <AuthLayout />,
        children: [
            {
                path: APP_ROUTER.LOGIN,
                element: <Login />,
                index: true,
            },
            {
                path: APP_ROUTER.REGISTER,
                element: <Register />,
            },
        ],
    },
]);

export default router;