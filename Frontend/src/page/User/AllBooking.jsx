
import React, { useState, useEffect } from "react";
import { GiEmptyHourglass } from "react-icons/gi";

import { RiListUnordered } from "react-icons/ri";
import { bookingService } from "../../service/bookingService";
import ModalEvaluate from "../../components/ModalEvaluate";
const AllBooking = () => {
    const [orders, setOrders] = useState([]);
    const fetchData = async () => {
        const result = await bookingService.getBookingCustomer();

        console.log("booking",result)
        setOrders(result);
    };
    useEffect(() => {
        fetchData();
    }, []);
    const [dataOrders, setDataOrders] = useState([]);
    const [currentStatus, setCurrentStatus] = useState("booker");
    const [showRateModal, setShowRateModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    
    const handleOpenRateModal = (order) => {
      setSelectedOrder(order);
      setShowRateModal(true);
    };
    const filterOrdersByStatus = (status) => {
        return orders.filter(order => order.booking_status.trim() === status);
    };
    
   
    const fetchOrdersByStatus = (status) => {
        const filteredOrders = filterOrdersByStatus(status);
        console.log("dữ liệu",filteredOrders)
        setDataOrders(filteredOrders);
    };
    
  
    const handleStatusClick = (status) => {
        setCurrentStatus(status); 
        fetchOrdersByStatus(status); 
    };
    
    useEffect(() => {
        fetchData();
    }, []);
    
    useEffect(() => {
        if (orders.length > 0) {
            fetchOrdersByStatus("booker");
        }
    }, [orders]);
   
   
    return (
        <div className="">
            <div className="flex flex-row items-center justify-center">
                <RiListUnordered className="mr-2 h-6 w-6" />
                <div className="my-5 text-2xl font-bold">ĐƠN ĐẶT PHÒNG</div>
            </div>
            <hr className="mb-3 flex text-gray-300" />
            <div className="flex justify-around">
                <a
                    onClick={() => handleStatusClick("booker")}
                    className={`group text-black transition-all duration-300 ease-in-out focus:text-pink-500 ${
                        currentStatus === "pending" && "text-pink-500"
                    }`}
                    href="#"
                >
                    <span className="bg-gradient-to-r from-pink-500 to-pink-500 bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-all duration-500 ease-out hover:text-pink-500 group-hover:bg-[length:100%_2px]">
                        ĐÃ ĐẶT
                    </span>
                </a>
                <a
                    onClick={() => handleStatusClick("booked")}
                    className={`group text-black transition-all duration-300 ease-in-out focus:text-pink-500 ${
                        currentStatus === "booked" && "text-pink-500"
                    }`}
                    href="#"
                >
                    <span className="bg-gradient-to-r from-pink-500 to-pink-500 bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-all duration-500 ease-out hover:text-pink-500 group-hover:bg-[length:100%_2px]">
                        ĐANG SỬ DỤNG
                    </span>
                </a>

                <a
                    onClick={() => handleStatusClick("completed")}
                    className={`group text-black transition-all duration-300 ease-in-out focus:text-pink-500 ${
                        currentStatus === "completed" && "text-pink-500"
                    }`}
                    href="#"
                >
                    <span className="bg-gradient-to-r from-pink-500 to-pink-500 bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-all duration-500 ease-out hover:text-pink-500 group-hover:bg-[length:100%_2px]">
                        ĐÃ TRẢ
                    </span>
                </a>
            </div>
            <hr className="my-3 flex text-gray-300" />
         
            <div>
                {currentStatus && dataOrders && (
                    <div>
                        {dataOrders.length > 0 ? (
                            dataOrders.map((order, orderIndex) => (
                                <div
                                    key={orderIndex}
                                    className="mb-8 p-4 border border-gray-300 rounded-md shadow-md text-base"
                                >
                                    
                                    <div className="flex gap-10 items-center justify-between">
                                        <div className="flex gap-2 items-center mb-2">
                                            <div className="font-medium">
                                                Ngày nhận phòng:
                                            </div>
                                            <div className="">
                                                {`${order?.checkin.split("-")[2]}/${order?.checkin.split("-")[1]}/${order?.checkin.split("-")[0]}`}
                                            </div>
                                        </div>
                                        <div className="flex gap-2 items-center mb-2">
                                            <div className="font-medium">
                                                Ngày trả phòng:
                                            </div>
                                            <div className="">
                                                {`${order?.checkout.split("-")[2]}/${order?.checkout.split("-")[1]}/${order?.checkout.split("-")[0]}`}
                                            </div>
                                        </div>
                                        <div className="flex gap-2 items-center mb-2">
                                            <div className="font-medium">
                                                Tổng số ngày:
                                            </div>
                                            <div className="">
                                                {order?.total_day}
                                            </div>
                                        </div>
                                        {currentStatus === "booker" && (
                                            <button
                                                onClick={() => handleCancelOrder(order.id)}
                                                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer"
                                            >
                                                Hủy đơn
                                            </button>
                                        )}
                                            {currentStatus === "completed" && (
                                            <button
                                                onClick={() => {setShowRateModal(true); setSelectedOrder(order);}}
                                                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer"
                                            >
                                                Đánh giá
                                            </button>
                                        )}
                                        {showRateModal && (
  <ModalEvaluate
  visible={showRateModal}
    onClose={() => setShowRateModal(false)}
    onSubmit={()=>{}}
    dataOrder={selectedOrder}
  />
)}
                                    </div>
                                    <div className="">
                                        <h3 className="font-bold text-lg mb-3">Chi tiết đặt phòng:</h3>
                                        <div className="overflow-x-auto">
                                        <div className="relative w-full overflow-auto rounded-xl shadow bg-white">
                                        <>
                                            <table className="min-w-full text-left table-auto text-sm text-slate-800 mb-5">
                                                <thead className="bg-blue-100/70 text-slate-500">
                                                <tr>
                                                    <th className="p-4 border-b border-slate-300 font-normal">Tên Phòng</th>
                                                    <th className="p-4 border-b border-slate-300 font-normal text-center">Số Lượng</th>
                                                    <th className="p-4 border-b border-slate-300 font-normal text-right">Giá</th>
                                                    <th className="p-4 border-b border-slate-300 font-normal text-right">Tổng Giá</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {order.details.map((detail, detailIndex) => (
                                                    <tr key={`room-${detailIndex}`} className="hover:bg-blue-50 transition">
                                                    <td className="p-4 border-b font-semibold border-slate-200">{detail.room_name} (Số phòng: {detail.room_number})</td>
                                                    <td className="p-4 border-b font-semibold border-slate-200 text-center">1</td>
                                                    <td className="p-4 border-b font-semibold border-slate-200 text-right">{detail.price.toLocaleString()} VND</td>
                                                    <td className="p-4 border-b font-semibold border-slate-200 text-right">{detail.price.toLocaleString()} VND</td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>

                                            <div className="mb-5 flex justify-end font-semibold text-gray-700">
                                                <span className="text-lg">
                                                Tổng tiền phòng:{" "}
                                                {order.details.reduce((sum, d) => sum + (d.price ?? 0), 0).toLocaleString()} VND
                                                </span>
                                            </div>

                                            <table className="min-w-full text-left table-auto text-sm text-slate-800">
                                                <thead className="bg-blue-100/70 text-slate-500">
                                                <tr>
                                                    <th className="p-4 border-b border-slate-300 font-normal">Tên Dịch Vụ</th>
                                                    <th className="p-4 border-b border-slate-300 font-normal text-center">Số Lượng</th>
                                                    <th className="p-4 border-b border-slate-300 font-normal text-right">Giá</th>
                                                    <th className="p-4 border-b border-slate-300 font-normal text-right">Tổng Giá</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {order.services && order.services.length > 0 ? (
                                                    order.services.map((service, serviceIndex) => (
                                                    <tr key={`service-${serviceIndex}`} className="hover:bg-slate-50 bg-white transition">
                                                        <td className="p-4 border-b border-slate-200">{service.service_name ?? "Không có tên dịch vụ"}</td>
                                                        <td className="p-4 border-b border-slate-200 text-center">{service.quantity ?? "-"}</td>
                                                        <td className="p-4 border-b border-slate-200 text-right">{service.price != null ? service.price.toLocaleString() + " VND" : "-"}</td>
                                                        <td className="p-4 border-b border-slate-200 text-right">{service.total_price != null ? service.total_price.toLocaleString() + " VND" : "-"}</td>
                                                    </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                    <td colSpan={4} className="p-4 text-center text-gray-500">Chưa có dịch vụ nào</td>
                                                    </tr>
                                                )}
                                                </tbody>
                                            </table>

                                            <div className="mt-5 flex justify-end font-semibold text-gray-700">
                                                <span className="text-lg">
                                                Tổng tiền dịch vụ:{" "}
                                                {(order.services ?? []).reduce((sum, s) => sum + (s.total_price ?? 0), 0).toLocaleString()} VND
                                                </span>
                                            </div>
                                        </>
<div className="mt-4 flex justify-end gap-4">
      </div>
                                        </div>

                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center p-40">
                                <GiEmptyHourglass className="my-2 h-10 w-10" />
                                <div className="text-center text-xl text-gray-500">
                                    Chưa có đơn đặt phòng
                                </div>
                            </div>
                        )}
                      
                    </div>
                )}
                 
            </div>
        </div>
    );
};

export default AllBooking;
