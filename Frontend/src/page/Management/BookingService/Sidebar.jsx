import axios from "axios";
import React, { useEffect, useState } from "react";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { FaCaretDown, FaCaretRight } from "react-icons/fa";
import { serviceService } from "../../../service/serviceService";
// import { serviceService } from "../../service/serviceService";

const Sidebar = ({ onSelectService}) => {
    const [services, setServices] = useState([]);
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
        <div className="relative w-[40%] bg-gray-100/80 p-4 border border-gray-300 rounded-xl">
            <div className="flex gap-2 mb-4">
                <a
                    onClick={() => handleStatusClick(1)}
                    className={`font-semibold group text-black transition-all duration-300 ease-in-out focus:text-green-700 ${currentStatus === 1 && "text-green-700"}`}
                    href="#"
                >
                    <span className="bg-gradient-to-r from-green-700 to-green-700 bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-all duration-500 ease-out hover:text-green-700 group-hover:bg-[length:100%_2px]">
                        Tất cả dịch vụ
                    </span>
                </a>
               
            </div>
            <div>
                <div div className="grid grid-cols-2 gap-4 flex-grow">
                    {paginatedServices.map((service, index) => (
                        <div
                            key={index}
                            className="cursor-pointer border border-gray-300 rounded-lg p-2 shadow-md flex items-center gap-2 bg-gray-50 hover:scale-105 transition-transform duration-200"
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
            </div>
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
        </div>
    );
};

export default Sidebar;
