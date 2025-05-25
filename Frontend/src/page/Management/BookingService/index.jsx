import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { IoClose } from "react-icons/io5";
import { bookingService } from "../../../service/bookingService";
import toast from 'react-hot-toast';
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
const BookingService = ({ onClose, isOpen, dataRow, fetchBooking }) => {
    console.log(dataRow)
    const [selectedServices, setSelectedServices] = useState([]);
      const [paymentType, setPaymentType] = useState('cod')
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
        if (!selectedServices || selectedServices.length === 0) {
          toast.error('Vui lòng chọn dịch vụ muốn đặt', { duration: 2000 });
          return; // dừng hàm nếu không có dịch vụ nào được chọn
        }
      
        const payload = selectedServices.map(service => ({
          quantity: service.quantity,
          price: service.price,
          total_price: service.quantity * service.price,
          BookingId: dataRow.booking_id,
          ServiceId: service.id,
        }));
      
        try {
          await bookingService.creatBookingService(payload);
          const payment = await bookingService.payment({
            amount: payload.reduce((sum, item) => sum + item.total_price, 0),
            type: "serive",
            payment_gateway: paymentType==='qr'?'online':'cod',
            BookingId: dataRow.booking_id,
          });
          onClose();
          toast.success('Đặt dịch vụ thành công', { duration: 2000 });
          fetchBooking();
        } catch (err) {
          toast.error('Đặt dịch vụ thất bại', { duration: 2000 });
          navigate('/error');
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
                        <div className="mb-6">
                            <div className="text-base font-semibold mb-2 uppercase">Thông tin đơn đặt phòng</div>
                            <div className="flex gap-30 text-base mb-2 font">
                                <div>Khách hàng: {dataRow.fullname} </div>
                                <div>Số điện thoại: {dataRow.phone} </div>
                            </div>
                            <div className="flex gap-20 text-base mb-4">
                                <div>Ngày đến: {format(dataRow.checkin, "dd/MM/yyyy")} </div>
                                <div>Ngày đi: {format(dataRow.checkout, "dd/MM/yyyy")}  </div>
                                <div>Số ngày ở: {dataRow.total_day}  </div>
                            </div>
                        </div>
                        <div className="text-base font-semibold mb-2 text-blue-600">Thông tin phòng và dịch vụ đã đặt</div>
                        <div className="relative flex flex-col w-full text-gray-700 bg-white shadow-sm rounded-xl bg-clip-border mb-3">
                        
                            <table className="w-full text-left table-auto min-w-max">
                                <thead className="bg-gray-200">
                                <tr >
                                    <th className="px-2 py-2 border-b border-gray-100 bg-gray-100">
                                    <p className="block font-sans text-sm antialiased font-normal leading-none text-gray-900 opacity-70 text-center">
                                        Loại phòng
                                    </p>
                                    </th>
                                    <th className="px-2 py-2 border-b border-gray-100 bg-gray-100">
                                    <p className="block font-sans text-sm antialiased font-normal leading-none text-gray-900 opacity-70 text-center">
                                        Số phòng
                                    </p>
                                    </th>
                                    <th className="px-2 py-2 border-b border-gray-100 bg-gray-100 rounded-tr-xl">
                                    <p className="block font-sans text-sm antialiased font-normal leading-none text-gray-900 opacity-70 text-center">
                                        Giá/ngày
                                    </p>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {dataRow.details.map((room, idx) => (
                                    <tr
                                    key={idx}
                                    className="hover:bg-gray-50"
                                    >
                                    <td className="px-2 py-2 border-b border-gray-50">
                                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-900 text-center">
                                        {room.room_type}
                                        </p>
                                    </td>
                                    <td className="px-2 py-2 border-b border-gray-50">
                                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-900 text-center">
                                        {room.room_number}
                                        </p>
                                    </td>
                                    <td className="px-2 py-2 border-b border-gray-50">
                                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-900 text-center">
                                        {room.price.toLocaleString()}₫
                                        </p>
                                    </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                        <table className="w-full text-left table-auto min-w-max mb-10 mt-6">
                            <thead className="bg-gray-300">
                            <tr>
                                <th className="px-2 py-2 border-b border-gray-100 bg-gray-100 rounded-tl-xl">
                                <p className="block font-sans text-sm antialiased font-normal leading-none text-gray-900 opacity-70 text-center">
                                    Tên dịch vụ
                                </p>
                                </th>
                                <th className="px-2 py-2 border-b border-gray-100 bg-gray-100">
                                <p className="block font-sans text-sm antialiased font-normal leading-none text-gray-900 opacity-70 text-center">
                                    Số lượng
                                </p>
                                </th>
                                <th className="px-2 py-2 border-b border-gray-100 bg-gray-100 rounded-tr-xl">
                                <p className="block font-sans text-sm antialiased font-normal leading-none text-gray-900 opacity-70 text-center">
                                    Tổng giá
                                </p>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {dataRow.services.map((service, idx) => (
                                <tr key={idx} className="hover:bg-gray-50">
                                <td className="px-2 py-2 border-b border-gray-50">
                                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-900 text-center">
                                    {service.service_name}
                                    </p>
                                </td>
                                <td className="px-2 py-2 border-b border-gray-50">
                                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-900 text-center">
                                    {service.quantity}
                                    </p>
                                </td>
                                <td className="px-2 py-2 border-b border-gray-50">
                                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-900 text-center">
                                    {(service.price * service.quantity).toLocaleString()}₫
                                    </p>
                                </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>

                        <div className="text-base font-semibold mb-2 text-blue-600">Thông tin dịch vụ muốn đặt</div>
                        <div className="relative overflow-x-auto">
                        <div className="relative flex flex-col w-full h-[30vh] bg-white shadow-md rounded-lg bg-clip-border">

                          <div className="flex-1 overflow-auto">
                            <table className="w-full text-left table-auto min-w-max table-fixed">
                              <thead>
                                <tr>
                                  <th className="py-2 px-3 border-b border-slate-300 bg-slate-50 text-sm font-normal text-slate-500 text-center rounded-tl-lg">
                                    Tên dịch vụ
                                  </th>
                                  <th className="py-2 px-3 border-b border-slate-300 bg-slate-50 text-sm font-normal text-slate-500 text-center">
                                    Số lượng
                                  </th>
                                  <th className="py-2 px-3 border-b border-slate-300 bg-slate-50 text-sm font-normal text-slate-500 text-center">
                                    Giá
                                  </th>
                                  <th className="py-2 px-3 border-b border-slate-300 bg-slate-50 text-sm font-normal text-slate-500 text-center rounded-tr-lg">
                                    Thao tác
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {selectedServices.length === 0 ? (
                                  <tr>
                                    <td colSpan={4} className="py-4 text-center text-sm text-gray-500">
                                      Chưa có dịch vụ nào
                                    </td>
                                  </tr>
                                ) : (
                                  selectedServices.map((service) => (
                                    <tr key={service.id} className="hover:bg-slate-50">
                                      <td className="py-2 px-3 border-b border-slate-200 text-sm text-slate-800 text-center font-medium whitespace-nowrap leading-none">
                                        {service.service_name}
                                      </td>
                                      <td className="py-2 px-3 border-b border-slate-200 text-sm text-slate-800 text-center">
                                        <div className="inline-flex items-center justify-center gap-2">
                                          <button
                                            onClick={() => handleDecrease(service.id)}
                                            className={`w-6 h-6 rounded ${
                                              service.quantity <= 1
                                                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                                : "bg-gray-300 text-black cursor-pointer"
                                            }`}
                                            disabled={service.quantity <= 1}
                                          >
                                            -
                                          </button>
                                          <span className="w-5 text-center leading-none">{service.quantity}</span>
                                          <button
                                            onClick={() => handleIncrease(service.id)}
                                            className="w-6 h-6 bg-gray-200 rounded cursor-pointer"
                                          >
                                            +
                                          </button>
                                        </div>
                                      </td>
                                      <td className="py-2 px-3 border-b border-slate-200 text-sm text-slate-800 text-center leading-none">
                                        {(service.price * service.quantity).toLocaleString()}₫
                                      </td>
                                      <td className="py-2 px-3 border-b border-slate-200 text-sm text-slate-800 text-center leading-none">
                                        <button
                                          onClick={() => handleRemove(service.id)}
                                          className="text-gray-500 cursor-pointer hover:text-gray-800"
                                        >
                                          <MdDeleteForever className="h-5 w-5 mx-auto" />
                                        </button>
                                      </td>
                                    </tr>
                                  ))
                                )}
                              </tbody>
                            </table>
                          </div>


  <div className='w-full flex justify-end gap-10 my-4'>
              <label className='flex items-center gap-2'>
                <input
                  type='radio'
                  value='cod'
                  checked={paymentType === "cod"}
                  onChange={(e) => setPaymentType(e.target.value)}
                />
                Thanh toán tiền mặt
              </label>

              <label className='flex items-center gap-2'>
                <input
                  type='radio'
                  value='qr'
                  checked={paymentType === "wallet"}
                  onChange={(e) => setPaymentType(e.target.value)}
                />
                Chuyển khoản 
              </label>
            </div>
          
                          <div className="sticky bottom-0 bg-slate-50 border-t border-slate-300">
                            <table className="w-full table-fixed">
                              <tfoot>
                                <tr className="font-semibold text-gray-900">
                                  <td className="py-2 px-3 text-center text-base rounded-bl-lg leading-none">
                                    Tổng cộng
                                  </td>
                                  <td className="py-2 px-3 text-center text-base leading-none">
                                    {selectedServices.reduce((sum, s) => sum + s.quantity, 0)}
                                  </td>
                                  <td className="py-2 px-3 text-center text-base leading-none">
                                    {selectedServices
                                      .reduce((sum, s) => sum + s.price * s.quantity, 0)
                                      .toLocaleString()}
                                    ₫
                                  </td>
                                  <td className="py-2 px-3 text-center text-base rounded-br-lg">
                                    <button
                                      type="button"
                                      onClick={handleSubmit}
                                      className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                    >
                                      Đặt dịch vụ
                                    </button>
                                  </td>
                                </tr>
                              </tfoot>
                            </table>
                          </div>
                        </div>


                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingService;
