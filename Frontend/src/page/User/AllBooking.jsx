import axios from "axios";
import React, { useState, useEffect } from "react";
import { HiMiniShoppingBag } from "react-icons/hi2";
import { GiEmptyHourglass } from "react-icons/gi";
import { FaStar } from "react-icons/fa";
import toast from 'react-hot-toast';
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { RiListUnordered } from "react-icons/ri";
import { bookingService } from "../../service/bookingService";
const AllBooking = () => {
    const [orders, setOrders] = useState([]);
    const fetchData = async () => {
        const result = await bookingService.getBookingCustomer();
        console.log(result)
        setOrders(result);
    };
    useEffect(() => {
        fetchData();
    }, []);
    const [dataOrders, setDataOrders] = useState([]);
    const [groupedOrders, setGroupedOrders] = useState([]);
    const [currentStatus, setCurrentStatus] = useState("booker");
    const [showModal, setShowModal] = useState(false);
    const [showRateModal, setShowRateModal] = useState(false);
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const [comment, setComment] = useState("");

    const [selectedOrderDetailId, setSelectedOrderDetailId] = useState(null);
    const ratingDescriptions = [
        "Tệ",
        "Không hài lòng",
        "Bình thường",
        "Hài lòng",
        "Tuyệt vời",
    ];
    const [ratingDescription, setRatingDescription] = useState("");
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
    const calculateTotalPriceByOrderId = () => {
        const totalPriceByOrderId = {};
        groupedOrders.forEach((order) => {
            const orderId = order.id;
            let totalPrice = 0;
            order.OrderDetail.forEach((detail) => {
                const price = detail.price;
                const quantity = detail.quantity;
                totalPrice += price * quantity; // Multiply price by quantity
            });
            totalPriceByOrderId[orderId] = totalPrice;
        });
        return totalPriceByOrderId;
    };
    const totalPriceByOrderId = calculateTotalPriceByOrderId();
    const [orderIdToCancel, setOrderIdToCancel] = useState(null);
    const handleCancelOrder = (orderId) => {
        setShowModal(true);
        setOrderIdToCancel(orderId);
    };
    const cancelOrder = async () => {
        try {
            const response = await axios.delete(
                `http://localhost:8080/api/customer/order/${orderIdToCancel}`
            );
            if (response.data.succes) {
                fetchOrdersByStatus(currentStatus);
                setShowModal(false);
                toast.success("Hủy đơn hàng thành công", {
                    autoClose: 1000,
                });
            }
        } catch (error) {
            console.error("Xóa đơn hàng không thành công", error);
            setShowModal(false);
        }
    };
    const handleRateProduct = (OrderDetailId) => {
        setSelectedOrderDetailId(OrderDetailId);
        setShowRateModal(true);
    };
    const [isLoading, setIsLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const handleBeforeUpload = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append("images", file);
        setIsLoading(true);
        try {
            const response = await fetch("http://localhost:8080/upload", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            setImageUrl(data[0]);
        } catch (error) {
            console.error("Tải ảnh không thành công", error);
        }
        setIsLoading(false);
    };
    const handleRate = async (status) => {
        if (!rating || !comment || !selectedOrderDetailId) {
            toast.warning("Vui lòng nhập và chọn đầy đủ thông tin", {
                autoClose: 1000,
            });
        } else {
            const requestBody = {
                startPoint: rating,
                comment: comment,
                OrderDetailId: selectedOrderDetailId,
                image: imageUrl,
            };

            try {
                const response = await axios.post(
                    "http://localhost:8080/api/customer/rating",
                    requestBody
                );
                const data = response.data;
                if (data.succes) {
                    setRating(null);
                    setComment("");
                    setImageUrl("");
                    setHover(null);
                    setShowRateModal(false);
                    setRatingDescription(false);
                    fetchOrdersByStatus(status);
                    toast.success("Đánh giá sản phẩm thành công", {
                        autoClose: 1000,
                    });
                }
            } catch (error) {
                toast.warning("Bạn đã đánh giá sản phẩm này", {
                    autoClose: 1000,
                });
            }
        }
    };
    const handleRating = (roomCode) => {
        
    };
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
                        ĐÃ ĐẶT TRƯỚC
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
                <a
                    onClick={() => handleStatusClick("cancelled")}
                    className={`group text-black transition-all duration-300 ease-in-out focus:text-pink-500 ${
                        currentStatus === "cancelled" && "text-pink-500"
                    }`}
                    href="#"
                >
                    <span className="bg-gradient-to-r from-pink-500 to-pink-500 bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-all duration-500 ease-out hover:text-pink-500 group-hover:bg-[length:100%_2px]">
                        ĐÃ HỦY
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
                                    
                                    <div className="flex gap-10 items-center">
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
                                    </div>
                                    <div className="">
                                        <h3 className="font-bold text-lg mb-3">Chi tiết đặt phòng:</h3>
                                        <div className="overflow-x-auto">
                                        <div className="relative w-full overflow-auto rounded-xl shadow bg-white">
                                            <table className="min-w-full text-left table-auto text-sm text-slate-800">
                                                <thead className="bg-blue-100/70 text-slate-500">
                                                <tr>
                                                    <th className="p-4 border-b border-slate-300 font-normal">Tên Phòng/Dịch Vụ</th>
                                                    <th className="p-4 border-b border-slate-300 font-normal text-center">Số Lượng</th>
                                                    <th className="p-4 border-b border-slate-300 font-normal text-right">Giá</th>
                                                    <th className="p-4 border-b border-slate-300 font-normal text-right">Tổng Giá</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {order.details.map((detail, detailIndex) => (
                                                    <React.Fragment key={`${orderIndex}-${detailIndex}`}>
                                                    <tr className="hover:bg-blue-50  transition">
                                                        <td className="p-4 border-b font-semibold border-slate-200">{detail.room_name} (Số phòng: {detail.room_number})</td>
                                                        <td className="p-4 border-b font-semibold border-slate-200 text-center">1</td>
                                                        <td className="p-4 border-b font-semibold border-slate-200 text-right">
                                                        {detail.price.toLocaleString()} VND
                                                        </td>
                                                        <td className="p-4 border-b font-semibold border-slate-200 text-right">
                                                        {detail.price.toLocaleString()} VND
                                                        </td>
                                                    </tr>
                                                    {order.services && order.services.map((service, serviceIndex) => (
                                                        <tr key={`${orderIndex}-${detailIndex}-${serviceIndex}`} className="hover:bg-slate-50 bg-white transition">
                                                        <td className="p-4 border-b border-slate-200">{service.service_name}</td>
                                                        <td className="p-4 border-b border-slate-200 text-center">{service.quantity}</td>
                                                        <td className="p-4 border-b border-slate-200 text-right">{service.price.toLocaleString()} VND</td>
                                                        <td className="p-4 border-b border-slate-200 text-right">{service.total_price.toLocaleString()} VND</td>
                                                        </tr>
                                                    ))}
                                                    </React.Fragment>
                                                ))}
                                                </tbody>
                                                <tfoot>
                                                <tr className="bg-slate-100 font-semibold">
                                                    <td colSpan="3" className="p-4 border-t border-slate-300 text-right">Tổng cộng:</td>
                                                    <td className="p-4 border-t border-slate-300 text-right">
                                                    {order.total_price.toLocaleString()} VND
                                                    </td>
                                                </tr>
                                                </tfoot>
                                            </table>
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
