import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { RiFolderUserLine } from "react-icons/ri";
import { PiListStarFill } from "react-icons/pi";
import { HiOutlineLogout } from "react-icons/hi";
import { BsList } from "react-icons/bs";
import { APP_ROUTER } from "../../utils/Constants";
import { isAuthenticated } from '../../utils/AuthCheck';
import { authService } from "../../service/authService";
import Button from "../Button";
const Header = () => {
    const [checkToken, setCheckToken] = useState(false);
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const dropdownRef = useRef(null);
    useEffect(() => {
        const token = isAuthenticated();
        console.log("checkToken", token);
        setCheckToken(token);
    }, []);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownVisible(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const handleSubmitInfor = () => {setDropdownVisible(!isDropdownVisible);};
    const navigate = useNavigate()
    const handleSubmitLogin = () => {navigate('/auth/login')};
    const handleSubmitRegister = () => {navigate('/auth/register')};
    const handleLogout = () => {
        setDropdownVisible(!isDropdownVisible);
        localStorage.clear(); 
        authService.logout()
        navigate('/home');
        window.location.reload();
    };
    const location = useLocation();
    const isActiveHome = location.pathname === "/home";
    const isActiveInfo = location.pathname === "/info";
    const isActiveRoom = location.pathname === "/room";
    const isActiveServices = location.pathname === "/services";
    return (
        <div>
            <div className="flex items-center flex-col bg-gray-100/40">
                <div className="flex items-center justify-between shadow-md w-full">
                    <Link to={APP_ROUTER.HOME} className="flex gap-2 items-center px-10">
                            <img src="https://ps.w.org/ameliabooking/assets/icon-256x256.gif?rev=2935468" alt="" className="w-16 h-14"/>
                    </Link>
                    <div className="flex items-center justify-center w-full font-bold">
                        <div className="relative flex flex-wrap gap-3 hover:bg-gray-100 px-10 py-1">
                            <Link to={APP_ROUTER.HOME} className="text-lg m-6 group relative focus:outline-none">
                                <span className={`inline-block text-transparent bg-clip-text text-lg transition-all duration-300 ${ isActiveHome
                                    ? "bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300"
                                    : "bg-gradient-to-r from-pink-800 via-pink-600 to-pink-400 group-hover:from-blue-700 group-hover:via-blue-500 group-hover:to-blue-300"}`}>
                                    Trang chủ
                                </span>
                                <span className={`absolute left-0 -bottom-1 h-0.5 transition-all duration-300 ${ isActiveHome
                                    ? "w-full bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300"
                                    : "w-0 group-hover:w-full bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300"
                                }`}
                                ></span>
                            </Link>
                        </div>
                        <div className="relative flex flex-wrap gap-3 hover:bg-gray-100 px-10 py-1">
                            <Link to={APP_ROUTER.HOME} className="text-lg m-6 group relative focus:outline-none">
                                <span className={`inline-block text-transparent bg-clip-text text-lg transition-all duration-300 ${ isActiveInfo
                                    ? "bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300"
                                    : "bg-gradient-to-r from-pink-800 via-pink-600 to-pink-400 group-hover:from-blue-700 group-hover:via-blue-500 group-hover:to-blue-300"}`}>
                                    Thông tin
                                </span>
                                <span className={`absolute left-0 -bottom-1 h-0.5 transition-all duration-300 ${ isActiveInfo
                                    ? "w-full bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300"
                                    : "w-0 group-hover:w-full bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300"
                                }`}
                                ></span>
                            </Link>
                        </div>
                        <div className="relative flex flex-wrap gap-3 hover:bg-gray-100 px-10 py-1">
                            <Link to={APP_ROUTER.HOME} className="text-lg m-6 group relative focus:outline-none">
                                <span className={`inline-block text-transparent bg-clip-text text-lg transition-all duration-300 ${ isActiveRoom
                                    ? "bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300"
                                    : "bg-gradient-to-r from-pink-800 via-pink-600 to-pink-400 group-hover:from-blue-700 group-hover:via-blue-500 group-hover:to-blue-300"}`}>
                                    Phòng
                                </span>
                                <span className={`absolute left-0 -bottom-1 h-0.5 transition-all duration-300 ${ isActiveRoom
                                    ? "w-full bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300"
                                    : "w-0 group-hover:w-full bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300"
                                }`}
                                ></span>
                            </Link>
                        </div>
                        <div className="relative flex flex-wrap gap-3 hover:bg-gray-100 px-10 py-1">
                            <Link to={APP_ROUTER.HOME} className="text-lg m-6 group relative focus:outline-none">
                                <span className={`inline-block text-transparent bg-clip-text text-lg transition-all duration-300 ${ isActiveServices
                                    ? "bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300"
                                    : "bg-gradient-to-r from-pink-800 via-pink-600 to-pink-400 group-hover:from-blue-700 group-hover:via-blue-500 group-hover:to-blue-300"}`}>
                                    Dịch vụ & Tiện ích
                                </span>
                                <span className={`absolute left-0 -bottom-1 h-0.5 transition-all duration-300 ${ isActiveServices
                                    ? "w-full bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300"
                                    : "w-0 group-hover:w-full bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300"
                                }`}
                                ></span>
                            </Link>
                        </div>
                    </div>
                    {!checkToken && ( <div className="flex gap-2 pr-10">
                        <Button children="Đăng nhập" color="blue" textColor="text-black" size="sm" scale handleClick={handleSubmitLogin} ></Button>
                        <Button children="Đăng kí" color="white" textColor="text-black" size="sm" scale handleClick={handleSubmitRegister}></Button>
                    </div>)}
                    
                    <div className="relative inline-block">
                    {checkToken && ( <Button  size="sm" handleClick={handleSubmitInfor} className="mr-10">
                        <div className="flex items-center gap-2"><BsList className="w-6 h-6"/> <FaUserCircle className="w-6 h-6" /></div>
                    </Button>)}
                    {isDropdownVisible && (
                        <div ref={dropdownRef} className="absolute right-10 mt-1 w-48 bg-white border border-gray-300 shadow-lg rounded-md z-10">
                            <ul className="divide-y divide-gray-200">
                                <li >
                                    <Link to={APP_ROUTER.HOME} className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"> <RiFolderUserLine className="w-5 h-5 "/>Thông tin cá nhân</Link> 
                                </li>
                                <li >
                                    <Link to={APP_ROUTER.HOME} className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"><PiListStarFill className="w-5 h-5 "/> Đơn đặt phòng</Link> 
                                </li>
                                <li className="p-2 hover:bg-gray-100 cursor-pointer text-red-500 flex items-center gap-2" onClick={handleLogout}>
                                    <HiOutlineLogout className="w-5 h-5 "/> Đăng xuất
                                </li>
                            </ul>
                        </div>
                    )}
                    </div>
                </div>
            </div>
            {/* Thanh tìm kiếm */}
            <div>Thanh tìm kiếm</div>
        </div>
    );
};

export default Header;