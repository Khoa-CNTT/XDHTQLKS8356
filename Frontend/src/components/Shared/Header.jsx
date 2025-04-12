import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import Datepicker from "react-tailwindcss-datepicker";
import { FaUserCircle } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { RiFolderUserLine } from "react-icons/ri";
import { PiListStarFill } from "react-icons/pi";
import { HiOutlineLogout } from "react-icons/hi";
import { CiCalendar } from "react-icons/ci";
import { FaUserTie } from "react-icons/fa6";
import { MdChildCare } from "react-icons/md";
import { GrAdd, GrSubtract } from "react-icons/gr";
import { FaPlus } from "react-icons/fa6";
import { BsList } from "react-icons/bs";
import { APP_ROUTER } from "../../utils/Constants";
import { isAuthenticated } from '../../utils/AuthCheck';
import { authService } from "../../service/authService";
import Button from "../Button";
const Header = () => {
    const [checkToken, setCheckToken] = useState(false);
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [isOpenAdults, setIsOpenAdults] = useState(false);
    const [isOpenChild, setIsOpenChild] = useState(false);
    const [date, setDate] = useState({
        startDate: null,
        endDate: null
    });
    const [adults, setAdults] = useState(2)
    const [children, setChildren] = useState(0)
    const dropdownRef = useRef(null);
    const childRef = useRef(null);
    const adultRef = useRef(null);
    const detailRoomRef = useRef(null);
    const [searchButtonHeight, setSearchButtonHeight] = useState(0);
    const peopleRef = useRef(null);
    useEffect(() => {
        const token = isAuthenticated();
        console.log("checkToken", token);
        setCheckToken(token);
    }, []);
    useEffect(() => {
      const handleDropdownClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setDropdownVisible(false);
        }
      };
      const handleAdultsClickOutside = (event) => {
        if (adultRef.current && !adultRef.current.contains(event.target)) {
          setIsOpenAdults(false);
        }
      };
      const handleChildClickOutside = (event) => {
        if (childRef.current && !childRef.current.contains(event.target)) {
          setIsOpenChild(false);
        }
      };
      document.addEventListener("mousedown", handleDropdownClickOutside);
      document.addEventListener("mousedown", handleAdultsClickOutside);
      document.addEventListener("mousedown", handleChildClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleDropdownClickOutside);
        document.removeEventListener("mousedown", handleAdultsClickOutside);
        document.removeEventListener("mousedown", handleChildClickOutside);
      };
    }, []);
    useEffect(() => {
        if (peopleRef.current) {
          setSearchButtonHeight(peopleRef.current.offsetHeight);
        }
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
    const images = []

    return (
        <div >
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
            <div className="w-2/3 flex gap-1 items-end justify-evenly mx-auto pt-3 pb-5 mt-10 bg-blue-100 rounded-lg">
                <div className="flex flex-col w-5/15">
                  <div className="mb-2 font-bold text-gray-700">Ngày</div>
                  <div className="flex gap-2 bg-white p-2 rounded-lg">
                    <span className="text-3xl flex justify-center items-center"><CiCalendar /></span>
                    <Datepicker
                      value={date}
                      separator="—"
                      minDate={new Date()}
                      primaryColor={"blue"}
                      displayFormat="DD/MM/YYYY"
                      placeholder="Check-in date — Check-out date"
                      toggleClassName="hidden"
                      inputClassName="focus-visible:outline-none w-full h-full font-semibold"
                      onChange={newValue => setDate({
                        startDate: new Date(newValue.startDate.setHours(0, 0, 0, 0)),
                        endDate: new Date(newValue.endDate.setHours(0, 0, 0, 0))
                      })}
                    />
                  </div>
                </div>
                <div className="flex flex-col w-6/15">
                  <div className="mb-2 font-bold text-gray-700">Khách</div>
                  <div className="relative bg-white rounded-lg p-2 h-full" ref={peopleRef}>
                    <div className="h-full flex justify-between items-center gap-6">
                      <div className="flex items-center justify-between gap-3 relative">
                        <div className="flex gap-3 items-center">
                          <span className="text-xl"><FaUserTie /></span>
                          <span className="font-semibold text-base">Người lớn</span>
                        </div>
                        <div
                          className="flex gap-2 items-center cursor-pointer"
                          onClick={() => {setIsOpenAdults((prev) => !prev) }}
                          ref={adultRef}
                        >
                          <span className="font-semibold">{adults}</span>
                          <button className="text-xl focus:outline-none cursor-pointer"><IoIosArrowDown /></button>
                          {isOpenAdults && (
                            <div className="z-50 absolute left-[-8px] top-[100%] mt-2 p-2 bg-white border border-gray-300 rounded-lg shadow-lg cursor-default" ref={detailRoomRef}>
                              <div className="flex justify-between items-center gap-2 w-full">
                                <span className="text-nowrap">Người lớn</span>
                                <div className="flex items-center rounded-lg bg-blue-50 w-full">
                                  <GrSubtract className="w-full h-full p-2 cursor-pointer text-black"
                                    onClick={(e) => { e.stopPropagation(); setAdults(prev => (prev >= 0 ? prev - 1 : 0))}}
                                  />
                                  <span>{adults}</span>
                                  <GrAdd className="w-full h-full p-2 cursor-pointer" 
                                    onClick={(e) => {e.stopPropagation(); setAdults(prev => prev + 1)}}
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-3 relative">
                        <div className="flex gap-2 items-center">
                          <span className="text-2xl"><MdChildCare /></span>
                          <span className="font-semibold text-base">Trẻ em</span>
                        </div>
                        <div
                          className="flex gap-2 items-center cursor-pointer"
                          onClick={() => {setIsOpenChild((prev) => !prev) }}
                          ref={childRef} 
                        >
                          <span className="font-semibold">{`${children}`}</span>
                          <button className="text-xl focus:outline-none cursor-pointer"><IoIosArrowDown /></button>
                          {isOpenChild && (
                            <div className="z-50 absolute left-[-8px] top-[100%] mt-2 p-2 bg-white border border-gray-300 rounded-lg shadow-lg cursor-default" ref={detailRoomRef}>
                              <div className="flex justify-between items-center gap-2 w-full">
                                <span className="text-nowrap">Trẻ em</span>
                                <div className="flex items-center rounded-lg bg-blue-50 w-full">
                                  <GrSubtract className="w-full h-full p-2 cursor-pointer text-black" 
                                    onClick={(e) => { e.stopPropagation(); setChildren(prev => (prev > 0 ? prev - 1 : 0))}}
                                  />
                                  <span>{children}</span>
                                  <GrAdd className="w-full h-full p-2 cursor-pointer" 
                                    onClick={(e) => { e.stopPropagation(); setChildren(prev => (prev + 1))}}
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>  
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  // onClick={() => handleSearch()}
                  style={{ height: `${searchButtonHeight}px` }}
                  className="w-2/15 text-nowrap bg-blue-500 text-white rounded-lg hover:bg-blue-600 px-6 cursor-pointer"
                >
                  Tìm kiếm
                </button>
            </div>

        </div>
    );
};

export default Header;