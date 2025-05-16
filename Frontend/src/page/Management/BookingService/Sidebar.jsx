import axios from "axios";
import React, { useEffect, useState } from "react";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { FaCaretDown, FaCaretRight } from "react-icons/fa";
// import { serviceService } from "../../service/serviceService";

const Sidebar = ({ data, handleBookingDetail, onSelectService, total }) => {
    const [services, setServices] = useState([]);
    const [activeRooms, setActiveRooms] = useState({});
    const [currentStatus, setCurrentStatus] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchServices = async () => {
            const data = await serviceService.getServices()
            setServices(data);
        };
        fetchServices();
    }, []);



    const handleStatusClick = (status) => {
        setCurrentStatus(status);
        setActiveRooms({})
    };

    const itemsPerPage = 12;
    const totalPages = Math.ceil(services.length / itemsPerPage);
    const paginatedServices = services.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleRoomClick = (roomName) => {
        setActiveRooms((prev) => ({
            ...prev,
            [roomName]: !prev[roomName],
        }));
    };

    return (
        <div className="relative w-[30%] bg-gray-100/80 p-4 border border-1 border-gray-300 rounded-xl">
            <div className="flex gap-2 mb-4">
                <a
                    onClick={() => handleStatusClick(1)}
                    className={`font-semibold group text-black transition-all duration-300 ease-in-out focus:text-green-700 ${currentStatus === 1 && "text-green-700"}`}
                    href="#"
                >
                    <span className="bg-gradient-to-r from-green-700 to-green-700 bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-all duration-500 ease-out hover:text-green-700 group-hover:bg-[length:100%_2px]">
                        Sản phẩm/Dịch vụ
                    </span>
                </a>
                <a
                    onClick={() => handleStatusClick(2)}
                    className={`font-semibold group text-black transition-all duration-300 ease-in-out focus:text-green-700 ${currentStatus === 2 && "text-green-700"}`}
                    href="#"
                >
                    <span className="bg-gradient-to-r from-green-700 to-green-700 bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-all duration-500 ease-out hover:text-green-700 group-hover:bg-[length:100%_2px]">
                        Danh sách
                    </span>
                </a>
            </div>
            {currentStatus === 2 ? ("") : (<div className="mb-5 bg-white flex px-4 py-3 border-b border-[#333] focus-within:border-green-500 focus-within:border-b-1 overflow-hidden max-w-md font-[sans-serif]">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 192.904 192.904"
                    width="18px"
                    className="fill-gray-600 mr-3"
                >
                    <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
                </svg>
                <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    className="w-full outline-none text-sm"
                />
            </div>)}

            <div className="">
                {currentStatus === 2 ? (
                    <div>
                        {data?.details.map((roomDetail) => (
                            <div key={roomDetail.booking_detail_id}>
                                <div
                                    className="flex items-center gap-2 p-4 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200"
                                    onClick={() =>
                                        handleRoomClick(
                                            roomDetail.room_name
                                        )
                                    }
                                >
                                    {activeRooms[
                                        roomDetail.room_name
                                    ] ? (
                                        <FaCaretDown />
                                    ) : (
                                        <FaCaretRight />
                                    )}
                                    <h3 className="text-base font-semibold">
                                        {roomDetail.room_name}
                                    </h3>
                                </div>
                                {activeRooms[roomDetail.room_name] && roomDetail.detail && roomDetail.detail.length > 0 && (
                                    <div className="mt-2 space-y-2 pl-4">
                                        {roomDetail.detail.map((detail, index) => (
                                                <div
                                                    key={index}
                                                    className="hover:scale-x-105 transition-transform duration-200 p-3 bg-gray-50 border-l-4 border-blue-500 rounded-md flex justify-between items-center"
                                                    onClick={() =>
                                                        handleBookingDetail(detail)
                                                    }
                                                >
                                                    <div className="text-sm text-gray-600 flex items-center gap-1">
                                                        <div>Số phòng:</div>
                                                        <div className="font-medium">
                                                            {detail.room_number}
                                                        </div>
                                                    </div>

                                                    <div className="text-sm text-gray-600">
                                                        <span className="font-medium text-blue-600">
                                                            {((total.service[detail.booking_detail_id] || 0) + (total.paid[detail.booking_detail_id] || 0)).toLocaleString()}
                                                        </span>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                )}

                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-4 flex-grow">
                        {paginatedServices.map((service, index) => (
                            <div
                                key={index}
                                className="border rounded-lg p-2 shadow-md flex items-center gap-2 bg-gray-50 hover:scale-110 transition-transform duration-200"
                                onClick={() => onSelectService(service)}
                            >

                                <div>
                                    <h3 className="font-semibold text-xs">
                                        {service.service_name} {service.unit}
                                    </h3>
                                    <p className="text-gray-600 text-sm">
                                        {service.price.toLocaleString()}₫
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {currentStatus === 2 ? (
                ""
            ) : (
                <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center p-4 gap-2">
                    <button
                        className={`p-2 rounded-full ${currentPage === 1
                            ? "invisible"
                            : "hover:bg-gray-200"
                            }`}
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <GrFormPrevious className="text-gray-500 w-5 h-5" />
                    </button>
                    <div className="flex items-center justify-center gap-2">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => goToPage(i + 1)}
                                className={`w-2 h-2 rounded-full mx-1 transition-all duration-300 ease-linear ${currentPage === i + 1
                                    ? "bg-green-600 w-3 h-3"
                                    : "bg-gray-300"
                                    }`}
                            ></button>
                        ))}
                    </div>
                    <button
                        className={`p-2 rounded-full ${currentPage === totalPages
                            ? "invisible"
                            : "hover:bg-gray-200"
                            }`}
                        onClick={() => goToPage(currentPage + 1)}
                    >
                        <GrFormNext className="text-gray-500 w-5 h-5" />
                    </button>
                </div>
            )}
            {currentStatus === 2 ? (
                <div className="shadow-inner absolute bottom-0 left-0 right-0 flex justify-end items-center gap-2 bg-white rounded-b-xl "><div className=" rounded-b-xl bg-white shadow-current text-sm text-green-700 font-semibold">
                    <table className="table-auto w-full border-collapse">
                        <tbody>
                            <tr className="">
                                <td className="p-2 text-left">Tổng cộng</td>
                                <td className="p-2 text-right">
                                    {(total.totalService + total.totalPaid).toLocaleString()}
                                </td>
                            </tr>
                            <tr className="">
                                <td className="p-2 pt-0 text-left">Tổng cộng cần thanh toán</td>
                                <td className="p-2 pt-0 text-right">
                                    {total.totalService.toLocaleString()}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div></div>
            ) : (
                ""
            )}
        </div>
    );
};

export default Sidebar;
