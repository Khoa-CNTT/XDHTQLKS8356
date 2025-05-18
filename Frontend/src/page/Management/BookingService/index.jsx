import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { IoClose } from "react-icons/io5";
import { bookingService } from "../../../service/bookingService";
import toast from 'react-hot-toast';
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";
const BookingService = ({ onClose, isOpen, dataRow, fetchBooking }) => {
    const [selectedServices, setSelectedServices] = useState([]);
    const handleSelectService = (service) => {
        const existing = selectedServices.find(item => item.id === service.id);
        if (existing) {
            toast.error('Vui lòng thay đổi số lượng ở bảng!', { duration: 2000 });
            return;
        }
        setSelectedServices(prev => [...prev, { ...service, quantity: 1 }]);
    };

    const handleIncrease = (id) => {
        setSelectedServices(prev => prev.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
    };

    const handleDecrease = (id) => {
        setSelectedServices(prev => prev.map(item =>item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item))
    };

    const handleRemove = (id) => {
        setSelectedServices(prev => prev.filter(item => item.id !== id));
    };
    const navigate = useNavigate()
    const handleSubmit = async () => {
        const payload = selectedServices.map(service => ({
            quantity: service.quantity,
            price: service.price,
            total_price: service.quantity * service.price,
            BookingId: dataRow.booking_id,
            ServiceId: service.id,
        }));

        try {
            await bookingService.creatBookingService(payload);
            onClose()
            toast.success('Đặt dịch vụ thành công', { duration: 2000 });
            fetchBooking()
           
        } catch (err) {
            toast.error('Đặt dịch vụ thất bại', { duration: 2000 });
            navigate('/error')
            
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-gray-800/50 flex items-center justify-center">
            <div className="bg-white rounded-xl p-4 w-[90%] max-w-[1200px] h-[90%] relative overflow-hidden shadow-lg">
                <button
                    onClick={onClose}
                    className="absolute top-0 right-0 text-2xl text-gray-600 hover:text-blue-500 p-2 hover:bg-gray-200 rounded-md bg-white cursor-pointer"
                >
                    <IoClose />
                </button>
                <div className="flex h-full gap-3 w-full">
                    <Sidebar onSelectService={handleSelectService} />
                    <div className="p-4 border border-gray-300 rounded-xl w-full overflow-y-auto">
                        <div className="mb-4">
                            <div>Ngày đến: {dataRow.checkin}</div>
                            <div>Ngày đi:    {dataRow.checkout}</div>
                            <div>Tổng số ngày: {dataRow.total_day}</div>
                        </div>
                        <div className="relative overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th className="px-6 py-3 text-center rounded-s-lg">Tên dịch vụ</th>
                                        <th className="px-6 py-3 text-center">Số lượng</th>
                                        <th className="px-6 py-3 text-center">Giá</th>
                                        <th className="px-6 py-3 text-center rounded-e-lg">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedServices.map((service) => (
                                        <tr key={service.id} className="bg-white dark:bg-gray-800">
                                            <th className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {service.service_name}
                                            </th>
                                            <td className="px-6 py-4 justify-center flex items-center gap-3">
                                                <button onClick={() => handleDecrease(service.id)} 
                                                        className={`px-2 py-1 rounded ${service.quantity <= 1 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-gray-300 text-black cursor-pointer"}`} 
                                                        disabled={service.quantity <= 1}>-</button>
                                                    {service.quantity}
                                                <button onClick={() => handleIncrease(service.id)} className="px-2 py-1 bg-gray-200 rounded cursor-pointer">+</button>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {(service.price * service.quantity).toLocaleString()}₫
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <button
                                                    onClick={() => handleRemove(service.id)}
                                                    className="text-gray-500 cursor-pointer hover:text-gray-800"
                                                >
                                                    <MdDeleteForever className="h-6 w-6" />
                                                </button>
                                            </td>
                                     
                                        </tr>
                                    ))}
                                    
                                </tbody>
                                
                                <tfoot>
                                    <tr className="font-semibold text-gray-900 dark:text-white border-t-1  border-gray-300">
                                        <th className="px-6 py-3 text-center text-base">Tổng cộng</th>
                                        <td className="px-6 py-3 text-center">
                                            {selectedServices.reduce((sum, s) => sum + s.quantity, 0)}
                                        </td>
                                        <td className="px-6 py-3 text-center" colSpan={1}>
                                            {selectedServices.reduce((sum, s) => sum + s.price * s.quantity, 0).toLocaleString()}₫
                                        </td>
                                        <th className="px-6 py-3 text-center text-base">
                                            <button
                                                type="button"
                                                onClick={handleSubmit}
                                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                            >
                                                Đặt dịch vụ
                                            </button>
                                        </th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingService;
