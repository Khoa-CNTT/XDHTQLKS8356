import { createBrowserRouter} from "react-router-dom";
import { APP_ROUTER } from "../utils/Constants";
import MainLayout from "../layout/Main/MainLayout";
import HomePage from "../page/Home/HomePage";
import Login from "../page/Auth/Login/Login";
import Register from "../page/Auth/Register/Register";
import ManagementLayout from "../layout/Main/ManagementLayout";
import ListOrder from "../page/Management/Order";
import PrivateRoutes from "./PrivateRoutes";
import AuthLayout from "../layout/Auth/AuthLayout";
import Error from "../components/Error";
import RoomDetail from "../page/RoomDetail";
import SearchRoom from "../page/Search";
import Services from "../page/Management/Services";
import Room from "../page/Management/Room";
import ServicesPage from "../page/Services";
import AllBooking from "../page/User/AllBooking";
import Information from "../page/User/Information";

const router = createBrowserRouter([
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
                path: APP_ROUTER.ROOM_DETAIL,
                element: <RoomDetail/>
            },
            {
                path: APP_ROUTER.SERVICESPAGE,
                element: <ServicesPage />,
            },
            
            {
                path: APP_ROUTER.SEARCH,
                element: <SearchRoom />,
            },
            {
                path: APP_ROUTER.USER,
                element: <PrivateRoutes role="customer" />,
                children: [         
                    {
                        path: APP_ROUTER.INFORMATION,
                        element: <Information />,
                    },
                    {
                        path: APP_ROUTER.ALLBOOKING,
                        element: <AllBooking />,
                    },
                ],
            },
           
        ],
    },
   
    {
        path: APP_ROUTER.ADMIN,
        element: (
            <PrivateRoutes role="admin">
                <ManagementLayout />
            </PrivateRoutes>
        ),
        children: [           
            {
                path: APP_ROUTER.ORDER,
                element: <ListOrder />,
                index: true,
            },
            {
                path: APP_ROUTER.SERVICE,
                element: <Services />,
                index: true,
            },
            {
                path: APP_ROUTER.ROOM,
                element: <Room />,
                index: true,
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
    {
        path: APP_ROUTER.ERROR,
        element: <Error />,
    },
    {
        path: "*",
        element: <Error />
    },
]);

export default router;