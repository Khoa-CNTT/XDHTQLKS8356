import { createBrowserRouter } from "react-router-dom";
import { APP_ROUTER } from "../utils/Constants";
import MainLayout from "../layout/Main/MainLayout";
import HomePage from "../page/Home/HomePage";
import Login from "../page/Auth/Login/Login";
import Register from "../page/Auth/Register/Register";
import ManagementLayout from "../layout/Main/ManagementLayout";
import ListOrder from "../page/Management/Booking";
import PrivateRoutes from "./PrivateRoutes";
import AuthLayout from "../layout/Auth/AuthLayout";
import Error from "../components/Error";
import RoomDetail from "../page/RoomDetail";
import SearchRoom from "../page/Search";
import Services from "../page/Management/Services";
import Room from "../page/Management/Room";
import Chat from "../page/Management/Chat";
import RoomType from "../page/Management/RoomType";
import Booking from "../page/Booking/Booking";
import ServicesPage from "../page/Services";
import AllBooking from "../page/User/AllBooking";
import Information from "../page/User/Information";
import Price from "../page/Management/Price";
import Extension from "../page/Management/Extension";
import Payment from "../page/Booking/Payment";
import BookingManager from "../page/Management/Booking";
import Hotel from "../page/Management/Hotel";
import BookingService from "../page/Management/BookingService";
import Timeline from "../components/Calendar/Timeline";
import RoomPage from "../page/Room";
import InformationBooking from "../page/Booking/Information";
import Personnel from "../page/Management/Personnel";
import HomeDefault from "../page/Home/HomeDefault";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: APP_ROUTER.HOME,
        element: <HomePage />,
        children: [
          {
            element: <HomeDefault />,
            index: true,
          },
          {
            path: APP_ROUTER.SEARCH,
            element: <SearchRoom />,
          },
        ],
      },
      {
        path: APP_ROUTER.BOOKING,
        element: <Booking />,
        children: [
          {
            path: APP_ROUTER.INFOR_BOOKING,
            element: <InformationBooking />,
          },
          {
            path: APP_ROUTER.PAYMENT,
            element: <Payment />,
          },
        ],
      },
      {
        path: APP_ROUTER.ROOMS,
        element: <RoomPage />,
      },
      // {
      //     path: `${APP_ROUTER.HOTELDETAIL}/:hotelId`,
      //     element: <HotelDetail />,
      // },
      {
        path: APP_ROUTER.ROOM_DETAIL,
        element: <RoomDetail />,
      },
      {
        path: APP_ROUTER.SERVICESPAGE,
        element: <ServicesPage />,
      },
      {
        path: APP_ROUTER.USER,
        element: <PrivateRoutes role='customer' />,
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
      <PrivateRoutes role='admin'>
        <ManagementLayout />
      </PrivateRoutes>
    ),
    children: [
      {
        path: APP_ROUTER.BOOKING_MANAGER,
        element: <BookingManager />,
      },
      {
        path: APP_ROUTER.SERVICE,
        element: <Services />,
      },
      {
        path: APP_ROUTER.ROOM,
        element: <Room />,
      },
      {
        path: APP_ROUTER.ROOMTYPE,
        element: <RoomType />,
      },
      {
        path: APP_ROUTER.CHAT,
        element: <Chat />,
      },
      {
        path: APP_ROUTER.PRICE,
        element: <Price />,
      },
      {
        path: APP_ROUTER.EXTENTION,
        element: <Extension />,
      },
      {
        path: APP_ROUTER.HOTEL,
        element: <Hotel />,
      },
      {
        path: APP_ROUTER.PERSONNEL,
        element: <Personnel />,
      },
      {
        path: APP_ROUTER.ROOMDETAIL,
        element: <Timeline />,
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
    element: <Error />,
  },
]);

export default router;
